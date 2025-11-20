import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import { customersRules } from "../security/rules";

// CREATE
export const create = mutation({
  args: {
    companyId: v.id("companies"),
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    if (!(await customersRules.write(ctx, args.companyId.toString()))) {
      throw new Error("Unauthorized to create customer");
    }
    const now = Date.now();
    return await ctx.db.insert("customers", { ...args, createdAt: now, updatedAt: now });
  },
});

// LIST
export const list = query({
  args: {
    companyId: v.id("companies"),
  },
  handler: async (ctx, args) => {
    if (!(await customersRules.read(ctx, args.companyId.toString()))) {
      throw new Error("Unauthorized to list customers");
    }
    return await ctx.db.query("customers").filter(q => q.eq(q.field("companyId"), args.companyId)).collect();
  },
});

// GET BY ID
export const getById = query({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    const customer = await ctx.db.get(args.id);
    if (!customer) return null;
    if (!(await customersRules.read(ctx, customer.companyId.toString()))) {
      throw new Error("Unauthorized to view customer");
    }
    return customer;
  },
});

// UPDATE
export const update = mutation({
  args: {
    id: v.id("customers"),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const existingCustomer = await ctx.db.get(args.id);
    if (!existingCustomer) throw new Error("Customer not found");

    if (!(await customersRules.write(ctx, existingCustomer.companyId.toString()))) {
      throw new Error("Unauthorized to update customer");
    }
    const now = Date.now();
    await ctx.db.patch(args.id, { ...args, updatedAt: now });
    return ctx.db.get(args.id);
  },
});

// REMOVE (hard delete, pois não é soft delete para clientes)
export const remove = mutation({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    const existingCustomer = await ctx.db.get(args.id);
    if (!existingCustomer) throw new Error("Customer not found");

    if (!(await customersRules.write(ctx, existingCustomer.companyId.toString()))) {
      throw new Error("Unauthorized to remove customer");
    }
    await ctx.db.delete(args.id);
    return { success: true };
  },
});