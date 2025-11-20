import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import { usersRules, canSuperAdmin, canAdmin, canSelf } from "../security/rules";

// CREATE
export const create = mutation({
  args: {
    email: v.string(),
    passwordHash: v.string(),
    name: v.string(),
    role: v.union(v.literal("superadmin"), v.literal("admin"), v.literal("agent"), v.literal("viewer")),
    companyId: v.optional(v.id("companies")),
    departmentId: v.optional(v.id("departments")),
  },
  handler: async (ctx, args) => {
    if (!(await canSuperAdmin(ctx)) && !(await canAdmin(ctx, args.companyId?.toString() || ""))) {
      throw new Error("Unauthorized to create user");
    }
    const now = Date.now();
    return await ctx.db.insert("users", { ...args, createdAt: now, updatedAt: now });
  },
});

// LIST
export const list = query({
  args: {
    companyId: v.optional(v.id("companies")),
  },
  handler: async (ctx, args) => {
    const authUser = await ctx.db.query("users").filter(q => q.eq(q.field("email"), (ctx.auth.getUserIdentity() as any).email)).first();
    if (!authUser) throw new Error("Unauthorized");

    if (authUser.role === "superadmin") {
      return await ctx.db.query("users").collect();
    } else if (authUser.role === "admin" && authUser.companyId) {
      if (args.companyId && args.companyId.toString() !== authUser.companyId.toString()) {
        throw new Error("Unauthorized to list users for this company");
      }
      return await ctx.db.query("users").filter(q => q.eq(q.field("companyId"), authUser.companyId)).collect();
    } else if (authUser.role === "agent" || authUser.role === "viewer") {
      return [authUser]; // Agente/Viewer só vê a si mesmo
    }
    throw new Error("Unauthorized to list users");
  },
});

// GET BY ID
export const getById = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    if (!user) return null;
    if (!(await usersRules.read(ctx, user._id.toString()))) {
      throw new Error("Unauthorized to view user");
    }
    return user;
  },
});

// UPDATE
export const update = mutation({
  args: {
    id: v.id("users"),
    email: v.optional(v.string()),
    passwordHash: v.optional(v.string()),
    name: v.optional(v.string()),
    role: v.optional(v.union(v.literal("superadmin"), v.literal("admin"), v.literal("agent"), v.literal("viewer"))),
    companyId: v.optional(v.id("companies")),
    departmentId: v.optional(v.id("departments")),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db.get(args.id);
    if (!existingUser) throw new Error("User not found");

    if (!(await usersRules.write(ctx, existingUser._id.toString(), existingUser.companyId?.toString()))) {
      throw new Error("Unauthorized to update user");
    }
    const now = Date.now();
    await ctx.db.patch(args.id, { ...args, updatedAt: now });
    return ctx.db.get(args.id);
  },
});

// REMOVE (hard delete, pois não é soft delete para usuários)
export const remove = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db.get(args.id);
    if (!existingUser) throw new Error("User not found");

    if (!(await usersRules.write(ctx, existingUser._id.toString(), existingUser.companyId?.toString()))) {
      throw new Error("Unauthorized to remove user");
    }
    await ctx.db.delete(args.id);
    return { success: true };
  },
});