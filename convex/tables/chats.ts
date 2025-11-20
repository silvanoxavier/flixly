import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import { chatsRules } from "../security/rules";

// CREATE
export const create = mutation({
  args: {
    companyId: v.id("companies"),
    customerId: v.id("customers"),
    departmentId: v.id("departments"),
    assignedUserId: v.optional(v.id("users")),
    active: v.boolean(),
    lastMessageAt: v.number(),
  },
  handler: async (ctx, args) => {
    if (!(await chatsRules.write(ctx, args.companyId.toString(), args.departmentId.toString(), args.assignedUserId?.toString()))) {
      throw new Error("Unauthorized to create chat");
    }
    const now = Date.now();
    return await ctx.db.insert("chats", { ...args, createdAt: now });
  },
});

// LIST
export const list = query({
  args: {
    companyId: v.id("companies"),
    departmentId: v.optional(v.id("departments")),
    assignedUserId: v.optional(v.id("users")),
    active: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    if (!(await chatsRules.read(ctx, args.companyId.toString(), args.departmentId?.toString(), args.assignedUserId?.toString()))) {
      throw new Error("Unauthorized to list chats");
    }

    let q = ctx.db.query("chats").filter(f => f.eq(f.field("companyId"), args.companyId));

    if (args.departmentId) {
      q = q.filter(f => f.eq(f.field("departmentId"), args.departmentId));
    }
    if (args.assignedUserId) {
      q = q.filter(f => f.eq(f.field("assignedUserId"), args.assignedUserId));
    }
    if (typeof args.active === "boolean") {
      q = q.filter(f => f.eq(f.field("active"), args.active));
    }

    return await q.collect();
  },
});

// GET BY ID
export const getById = query({
  args: { id: v.id("chats") },
  handler: async (ctx, args) => {
    const chat = await ctx.db.get(args.id);
    if (!chat) return null;
    if (!(await chatsRules.read(ctx, chat.companyId.toString(), chat.departmentId.toString(), chat.assignedUserId?.toString()))) {
      throw new Error("Unauthorized to view chat");
    }
    return chat;
  },
});

// UPDATE
export const update = mutation({
  args: {
    id: v.id("chats"),
    departmentId: v.optional(v.id("departments")),
    assignedUserId: v.optional(v.id("users")),
    active: v.optional(v.boolean()),
    lastMessageAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existingChat = await ctx.db.get(args.id);
    if (!existingChat) throw new Error("Chat not found");

    if (!(await chatsRules.write(ctx, existingChat.companyId.toString(), existingChat.departmentId.toString(), existingChat.assignedUserId?.toString()))) {
      throw new Error("Unauthorized to update chat");
    }
    await ctx.db.patch(args.id, { ...args });
    return ctx.db.get(args.id);
  },
});

// REMOVE (soft delete para chats)
export const remove = mutation({
  args: { id: v.id("chats") },
  handler: async (ctx, args) => {
    const existingChat = await ctx.db.get(args.id);
    if (!existingChat) throw new Error("Chat not found");

    if (!(await chatsRules.write(ctx, existingChat.companyId.toString(), existingChat.departmentId.toString(), existingChat.assignedUserId?.toString()))) {
      throw new Error("Unauthorized to soft delete chat");
    }
    // Soft delete: marcar como inativo
    await ctx.db.patch(args.id, { active: false });
    return { success: true };
  },
});