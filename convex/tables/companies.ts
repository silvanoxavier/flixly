import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import { companiesRules, canSuperAdmin, canAdmin } from "../security/rules";

// CREATE
export const create = mutation({
  args: {
    name: v.string(),
    cnpj: v.string(),
    ownerId: v.id("users"),
    phone: v.string(),
    retentionDays: v.union(v.literal(7), v.literal(15), v.literal(30), v.literal(90), v.literal(180), v.null()),
  },
  handler: async (ctx, args) => {
    if (!(await canSuperAdmin(ctx))) {
      throw new Error("Unauthorized to create company");
    }
    const now = Date.now();
    return await ctx.db.insert("companies", { ...args, createdAt: now, updatedAt: now });
  },
});

// LIST
export const list = query({
  args: {},
  handler: async (ctx) => {
    const authUser = await ctx.db.query("users").filter(q => q.eq(q.field("email"), (ctx.auth.getUserIdentity() as any).email)).first();
    if (!authUser) throw new Error("Unauthorized");

    if (authUser.role === "superadmin") {
      return await ctx.db.query("companies").collect();
    } else if (authUser.companyId) {
      const company = await ctx.db.get(authUser.companyId);
      return company ? [company] : [];
    }
    return [];
  },
});

// GET BY ID
export const getById = query({
  args: { id: v.id("companies") },
  handler: async (ctx, args) => {
    const company = await ctx.db.get(args.id);
    if (!company) return null;
    if (!(await companiesRules.read(ctx, company._id.toString()))) {
      throw new Error("Unauthorized to view company");
    }
    return company;
  },
});

// UPDATE
export const update = mutation({
  args: {
    id: v.id("companies"),
    name: v.optional(v.string()),
    cnpj: v.optional(v.string()),
    ownerId: v.optional(v.id("users")),
    phone: v.optional(v.string()),
    retentionDays: v.optional(v.union(v.literal(7), v.literal(15), v.literal(30), v.literal(90), v.literal(180), v.null())),
  },
  handler: async (ctx, args) => {
    const existingCompany = await ctx.db.get(args.id);
    if (!existingCompany) throw new Error("Company not found");

    if (!(await companiesRules.write(ctx, existingCompany._id.toString()))) {
      throw new Error("Unauthorized to update company");
    }
    const now = Date.now();
    await ctx.db.patch(args.id, { ...args, updatedAt: now });
    return ctx.db.get(args.id);
  },
});

// REMOVE (hard delete, pois não é soft delete para empresas)
export const remove = mutation({
  args: { id: v.id("companies") },
  handler: async (ctx, args) => {
    const existingCompany = await ctx.db.get(args.id);
    if (!existingCompany) throw new Error("Company not found");

    if (!(await companiesRules.write(ctx, existingCompany._id.toString()))) {
      throw new Error("Unauthorized to remove company");
    }
    await ctx.db.delete(args.id);
    return { success: true };
  },
});