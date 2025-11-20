import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import { messagesRules } from "../security/rules";

// CREATE
export const create = mutation({
  args: {
    chatId: v.id("chats"),
    companyId: v.id("companies"),
    sender: v.union(v.literal("agent"), v.literal("customer")),
    type: v.union(v.literal("text"), v.literal("image"), v.literal("file"), v.literal("audio")),
    content: v.union(v.string(), v.any()),
  },
  handler: async (ctx, args) => {
    if (!(await messagesRules.write(ctx, args.companyId.toString(), args.chatId.toString()))) {
      throw new Error("Unauthorized to create message");
    }
    const now = Date.now();
    return await ctx.db.insert("messages", { ...args, createdAt: now });
  },
});

// LIST (por chat)
export const listByChat = query({
  args: {
    companyId: v.id("companies"),
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {
    if (!(await messagesRules.read(ctx, args.companyId.toString(), args.chatId.toString()))) {
      throw new Error("Unauthorized to list messages");
    }
    return await ctx.db.query("messages").filter(q => q.eq(q.field("chatId"), args.chatId)).collect();
  },
});

// GET BY ID
export const getById = query({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.id);
    if (!message) return null;
    if (!(await messagesRules.read(ctx, message.companyId.toString(), message.chatId.toString()))) {
      throw new Error("Unauthorized to view message");
    }
    return message;
  },
});

// REMOVE (hard delete, pois a retenção já cuida do soft delete conceitual)
export const remove = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    const existingMessage = await ctx.db.get(args.id);
    if (!existingMessage) throw new Error("Message not found");

    if (!(await messagesRules.write(ctx, existingMessage.companyId.toString(), existingMessage.chatId.toString()))) {
      throw new Error("Unauthorized to remove message");
    }
    await ctx.db.delete(args.id);
    return { success: true };
  },
});