import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// Função auxiliar para obter o usuário autenticado e seu papel
export const getAuthenticatedUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }
    // Assumindo que o email do usuário é o identificador único
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    return user;
  },
});

// Funções de permissão
export const canSuperAdmin = async (ctx: any) => {
  const user = await getAuthenticatedUser.handler(ctx, {});
  return user && user.role === "superadmin";
};

export const canAdmin = async (ctx: any, companyId: string) => {
  const user = await getAuthenticatedUser.handler(ctx, {});
  return user && user.role === "admin" && user.companyId?.toString() === companyId;
};

export const canAgent = async (ctx: any, companyId: string, departmentId?: string) => {
  const user = await getAuthenticatedUser.handler(ctx, {});
  return user && user.role === "agent" && user.companyId?.toString() === companyId && (!departmentId || user.departmentId?.toString() === departmentId);
};

export const canViewer = async (ctx: any, companyId: string) => {
  const user = await getAuthenticatedUser.handler(ctx, {});
  return user && user.role === "viewer" && user.companyId?.toString() === companyId;
};

export const canSelf = async (ctx: any, userId: string) => {
  const user = await getAuthenticatedUser.handler(ctx, {});
  return user && user._id.toString() === userId;
};

// Regras de acesso para tabelas
export const usersRules = {
  read: async (ctx: any, targetUserId?: string) => {
    const authUser = await getAuthenticatedUser.handler(ctx, {});
    if (!authUser) return false;

    if (authUser.role === "superadmin") return true;
    if (authUser.role === "admin" && targetUserId) {
      const targetUser = await ctx.db.get(targetUserId);
      return targetUser && targetUser.companyId?.toString() === authUser.companyId?.toString();
    }
    if (authUser.role === "agent" || authUser.role === "viewer") {
      return targetUserId && targetUserId === authUser._id.toString();
    }
    return false;
  },
  write: async (ctx: any, targetUserId?: string, companyId?: string) => {
    const authUser = await getAuthenticatedUser.handler(ctx, {});
    if (!authUser) return false;

    if (authUser.role === "superadmin") return true;
    if (authUser.role === "admin" && targetUserId && companyId) {
      const targetUser = await ctx.db.get(targetUserId);
      return targetUser && targetUser.companyId?.toString() === authUser.companyId?.toString() && authUser.companyId?.toString() === companyId;
    }
    return false;
  },
};

export const companiesRules = {
  read: async (ctx: any, companyId?: string) => {
    const authUser = await getAuthenticatedUser.handler(ctx, {});
    if (!authUser) return false;

    if (authUser.role === "superadmin") return true;
    if (authUser.role === "admin" || authUser.role === "agent" || authUser.role === "viewer") {
      return companyId && companyId === authUser.companyId?.toString();
    }
    return false;
  },
  write: async (ctx: any, companyId?: string) => {
    const authUser = await getAuthenticatedUser.handler(ctx, {});
    if (!authUser) return false;

    if (authUser.role === "superadmin") return true;
    if (authUser.role === "admin") {
      return companyId && companyId === authUser.companyId?.toString();
    }
    return false;
  },
};

export const departmentsRules = {
  read: async (ctx: any, companyId: string) => {
    const authUser = await getAuthenticatedUser.handler(ctx, {});
    if (!authUser) return false;
    return authUser.companyId?.toString() === companyId;
  },
  write: async (ctx: any, companyId: string) => {
    const authUser = await getAuthenticatedUser.handler(ctx, {});
    if (!authUser) return false;
    return (authUser.role === "superadmin" || authUser.role === "admin") && authUser.companyId?.toString() === companyId;
  },
};

export const customersRules = {
  read: async (ctx: any, companyId: string) => {
    const authUser = await getAuthenticatedUser.handler(ctx, {});
    if (!authUser) return false;
    return authUser.companyId?.toString() === companyId;
  },
  write: async (ctx: any, companyId: string) => {
    const authUser = await getAuthenticatedUser.handler(ctx, {});
    if (!authUser) return false;
    return (authUser.role === "superadmin" || authUser.role === "admin" || authUser.role === "agent") && authUser.companyId?.toString() === companyId;
  },
};

export const chatsRules = {
  read: async (ctx: any, companyId: string, departmentId?: string, assignedUserId?: string) => {
    const authUser = await getAuthenticatedUser.handler(ctx, {});
    if (!authUser) return false;
    if (authUser.companyId?.toString() !== companyId) return false;

    if (authUser.role === "superadmin") return true; // Superadmin vê tudo (mas não mensagens)
    if (authUser.role === "admin") return true; // Admin vê todos os chats da empresa
    if (authUser.role === "agent") {
      // Agente só vê chats do seu departamento ou chats atribuídos a ele
      return authUser.departmentId?.toString() === departmentId || authUser._id.toString() === assignedUserId;
    }
    if (authUser.role === "viewer") return true; // Viewer vê todos os chats da empresa
    return false;
  },
  write: async (ctx: any, companyId: string, departmentId?: string, assignedUserId?: string) => {
    const authUser = await getAuthenticatedUser.handler(ctx, {});
    if (!authUser) return false;
    if (authUser.companyId?.toString() !== companyId) return false;

    if (authUser.role === "superadmin" || authUser.role === "admin") return true;
    if (authUser.role === "agent") {
      // Agente pode criar/atualizar chats no seu departamento ou atribuídos a ele
      return authUser.departmentId?.toString() === departmentId || authUser._id.toString() === assignedUserId;
    }
    return false;
  },
};

export const messagesRules = {
  read: async (ctx: any, companyId: string, chatId: string) => {
    const authUser = await getAuthenticatedUser.handler(ctx, {});
    if (!authUser) return false;
    if (authUser.companyId?.toString() !== companyId) return false;

    // Superadmin nunca acessa mensagens (segurança extra)
    if (authUser.role === "superadmin") return false;

    const chat = await ctx.db.get(chatId);
    if (!chat || chat.companyId.toString() !== companyId) return false;

    if (authUser.role === "admin") return true;
    if (authUser.role === "agent") {
      return authUser.departmentId?.toString() === chat.departmentId.toString() || authUser._id.toString() === chat.assignedUserId?.toString();
    }
    if (authUser.role === "viewer") return true;
    return false;
  },
  write: async (ctx: any, companyId: string, chatId: string) => {
    const authUser = await getAuthenticatedUser.handler(ctx, {});
    if (!authUser) return false;
    if (authUser.companyId?.toString() !== companyId) return false;

    // Superadmin nunca acessa mensagens (segurança extra)
    if (authUser.role === "superadmin") return false;

    const chat = await ctx.db.get(chatId);
    if (!chat || chat.companyId.toString() !== companyId) return false;

    if (authUser.role === "admin") return true;
    if (authUser.role === "agent") {
      return authUser.departmentId?.toString() === chat.departmentId.toString() || authUser._id.toString() === chat.assignedUserId?.toString();
    }
    return false;
  },
};