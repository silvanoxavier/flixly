import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const customersSchema = defineTable({
  companyId: v.id("companies"),
  name: v.string(),
  phone: v.string(),
  email: v.optional(v.string()),
  tags: v.array(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
}).index("by_company_phone", ["companyId", "phone"]);