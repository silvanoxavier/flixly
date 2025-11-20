import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getInstances = query({
  args: { companyId: v.string() },
  handler: async (ctx, { companyId }) => {
    return await ctx.db
      .query("instances")
      .withIndex("by_company", (q) => q.eq("companyId", companyId))
      .order("desc")
      .collect();
  },
});

export const createInstanceDB = mutation({
  args: {
    companyId: v.string(),
    name: v.string(),
    token: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Verificar admin: const identity = await ctx.auth.getUserIdentity(); if (!identity?.isAdmin) throw new Error("Unauthorized");
    
    // Limite 5
    const count = await ctx.db
      .query("instances")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .collect();
    if (count.length >= 5) throw new Error("Limite de 5 instâncias por empresa atingido");

    // Unique name
    const existing = await ctx.db
      .query("instances")
      .withIndex("by_company_name", (q) => q.eq("companyId", args.companyId).eq("name", args.name))
      .first();
    if (existing) throw new Error("Nome de instância já existe para esta empresa");

    return await ctx.db.insert("instances", {
      companyId: args.companyId,
      name: args.name,
      status: "creating",
      token: args.token,
      createdAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: { companyId: v.string(), name: v.string(), status: v.string() },
  handler: async (ctx, args) => {
    const instance = await ctx.db
      .query("instances")
      .withIndex("by_company_name", (q) => q.eq("companyId", args.companyId).eq("name", args.name))
      .first();
    if (!instance) throw new Error("Instância não encontrada");
    await ctx.db.patch(instance._id, { status: args.status });
  },
});