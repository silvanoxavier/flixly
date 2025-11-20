import { action } from "../_generated/server";
import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

// Função interna para excluir mensagens (não acessível diretamente via API)
const deleteOldMessages = internalMutation({
  args: {
    companyId: v.id("companies"),
    cutoffTimestamp: v.number(),
  },
  handler: async (ctx, { companyId, cutoffTimestamp }) => {
    const messagesToDelete = await ctx.db
      .query("messages")
      .withIndex("by_company_chat_id", (q) =>
        q.eq("companyId", companyId).lt("createdAt", cutoffTimestamp)
      )
      .collect();

    for (const message of messagesToDelete) {
      await ctx.db.delete(message._id);
    }
    console.log(`Deleted ${messagesToDelete.length} old messages for company ${companyId}`);
  },
});

// Ação cron que será agendada
export const cleanupMessages = action({
  args: {},
  handler: async (ctx) => {
    const companies = await ctx.runQuery("companies/list", {}); // Usar a função list da tabela companies

    for (const company of companies) {
      if (company.retentionDays !== null) {
        const retentionMillis = company.retentionDays * 24 * 60 * 60 * 1000;
        const cutoffTimestamp = Date.now() - retentionMillis;

        // Chamar a mutação interna para excluir as mensagens
        await ctx.runMutation(deleteOldMessages, {
          companyId: company._id,
          cutoffTimestamp,
        });
      }
    }
  },
});

// Para agendar esta ação, você precisaria adicioná-la ao seu `convex/crons.ts` (se existir)
// Exemplo de como seria em `convex/crons.ts`:
// import { cronJobs } from "convex/server";
// import { cleanupMessages } from "./cron/cleanupMessages";
// const crons = cronJobs();
// crons.daily("cleanup", { hourUTC: 2, minuteUTC: 0 }, cleanupMessages);
// export default crons;