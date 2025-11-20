import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import { departmentsRules, canSuperAdmin, canAdmin } from "../security/rules";

// CREATE
export const create = mutation({
  args: {
    companyId: v.id("companies"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    if (!(await departmentsRules.write(ctx, args.companyId.toString()))) {
      throw new Error("Unauthorized to create department");
    }
    const now = Date.now();
    return await ctx.db.insert("departments", { ...args, createdAt: now });
  },
});

// LIST
export const list = query({
  args: {
    companyId: v.id("companies"),
  },
  handler: async (ctx, args) => {
    if (!(await departmentsRules.read(ctx, args.companyId.toString()))) {
      throw new Error("Unauthorized to list departments");
    }
    return await ctx.db.query("departments").filter(q => q.eq(q.field("companyId"), args.companyId)).collect();
  },
});

// GET BY ID
export const getById = query({
  args: { id: v.id("departments") },
  handler: async (ctx, args) => {
    const department = await ctx.db.get(args.id);
    if (!department) return null;
    if (!(await departmentsRules.read(ctx, department.companyId.toString()))) {
      throw new Error("Unauthorized to view department");
    }
    return department;
  },
});

// UPDATE
export const update = mutation({
  args: {
    id: v.id("departments"),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingDepartment = await ctx.db.get(args.id);
    if (!existingDepartment) throw new Error("Department not found");

    if (!(await departmentsRules.write(ctx, existingDepartment.companyId.toString()))) {
      throw new Error("Unauthorized to update department");
    }
    await ctx.db.patch(args.id, { ...args });
    return ctx.db.get(args.id);
  },
});

// REMOVE (hard delete, pois não é soft delete para departamentos)
export const remove = mutation({
  args: { id: v.id("departments") },
  handler: async (ctx, args) => {
    const existingDepartment = await ctx.db.get(args.id);
    if (!existingDepartment) throw new Error("Department not found");

    if (!(await departmentsRules.write(ctx, existingDepartment.companyId.toString()))) {
      throw new Error("Unauthorized to remove department");
    }
    await ctx.db.delete(args.id);
    return { success: true };
  },
});