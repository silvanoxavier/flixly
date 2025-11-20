import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const usersSchema = defineTable({
  email: v.string(),
  passwordHash: v.string(),
  name: v.string(),
  role: v.union(v.literal("superadmin"), v.literal("admin"), v.literal("agent"), v.literal("viewer")),
  companyId: v.optional(v.id("companies")), // Opcional para superadmin
  departmentId: v.optional(v.id("departments")), // Opcional
  createdAt: v.number(),
  updatedAt: v.number(),
}).index("by_email", ["email"]);