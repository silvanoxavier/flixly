import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const messagesSchema = defineTable({
  chatId: v.id("chats"),
  companyId: v.id("companies"),
  sender: v.union(v.literal("agent"), v.literal("customer")),
  type: v.union(v.literal("text"), v.literal("image"), v.literal("file"), v.literal("audio")),
  content: v.union(v.string(), v.any()), // string para texto, objeto JSON para outros tipos de mídia
  createdAt: v.number(),
}).index("by_chat_id", ["chatId"])
  .index("by_company_chat_id", ["companyId", "chatId"]);