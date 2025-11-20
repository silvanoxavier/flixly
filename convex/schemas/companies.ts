import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const companiesSchema = defineTable({
  name: v.string(),
  cnpj: v.string(),
  ownerId: v.id("users"), // Usuário admin principal
  phone: v.string(),
  retentionDays: v.union(v.literal(7), v.literal(15), v.literal(30), v.literal(90), v.literal(180), v.null()), // null para ilimitado
  createdAt: v.number(),
  updatedAt: v.number(),
}).index("by_cnpj", ["cnpj"]);