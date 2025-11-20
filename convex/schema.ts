import { defineSchema } from "convex/server";
import { usersSchema } from "./schemas/users";
import { companiesSchema } from "./schemas/companies";
import { departmentsSchema } from "./schemas/departments";
import { customersSchema } from "./schemas/customers";
import { chatsSchema } from "./schemas/chats";
import { messagesSchema } from "./schemas/messages";

export default defineSchema({
  users: usersSchema,
  companies: companiesSchema,
  departments: departmentsSchema,
  customers: customersSchema,
  chats: chatsSchema,
  messages: messagesSchema,
});