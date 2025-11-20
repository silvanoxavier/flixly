import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  instances: defineTable({
    companyId: v.string(),
    name: v.string(),
    status: v.string(),
    token: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_company", ["companyId"])
    .index("by_company_name", ["companyId", "name"]),
});