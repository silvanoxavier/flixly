import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const departmentsSchema = defineTable({
  companyId: v.id("companies"),
  name: v.string(),
  createdAt: v.number(),
}).index("by_company_id", ["companyId"]);