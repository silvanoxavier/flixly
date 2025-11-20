import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const chatsSchema = defineTable({
  companyId: v.id("companies"),
  customerId: v.id("customers"),
  departmentId: v.id("departments"),
  assignedUserId: v.optional(v.id("users")), // Opcional, pode ser null se não atribuído
  active: v.boolean(),
  lastMessageAt: v.number(),
  createdAt: v.number(),
}).index("by_company_customer", ["companyId", "customerId"])
  .index("by_company_department_active", ["companyId", "departmentId", "active"])
  .index("by_company_assigned_active", ["companyId", "assignedUserId", "active"]);