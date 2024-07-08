import { pgTable, uuid, text, boolean, timestamp, integer, serial, primaryKey } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid('id').default('gen_random_uuid()').primaryKey(),
  userId: uuid("user_id").notNull(),
  email: text("email").unique().notNull(),
  username: text("username").unique().notNull(),
  passwordHash: text("password_hash"),
  status: text("status"),
  isPaidUser: boolean("is_paid_user").default(false),
  isInboxrpivate: boolean("is_inbox_private").default(false),
  currentInboxUrl: text("current_inbox_url").unique().notNull(),
  previousInboxUrl: text("previous_inbox_url"),
  previousUrlExpiry: timestamp("previous_url_expiry", {withTimezone: true}),
});

export const socialAuths = pgTable("social_auths", {
  authId: uuid("auth_id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  provider: text("provider").notNull(),
  providerUserId: text("provider_user_id").unique().notNull(),
});

export const messages = pgTable("messages", {
  messageId: uuid("message_id").primaryKey(),
  content: text("content").notNull(),
  messageCreatedTimestamp: timestamp("message_created_timestamp", {withTimezone: true}).notNull(),
  senderUserId: uuid("sender_user_id").references(() => users.id),
  recipientUserId: uuid("recipient_user_id").references(() => users.id).notNull(),
  hasBeenDisplayed: boolean("has_been_displayed").default(false),
  lastDisplayedTimestamp: timestamp("last_displayed_timestamp", {withTimezone:true}),
  isLiked: boolean("is_liked").default(false),
});

export const userLinks = pgTable("user_links", {
    userId: uuid("user_id").references(() => users.id),
    friendUserId: uuid("friend_user_id").references(() => users.id),
  }, (table) => {
    return {
      primaryKey: primaryKey({ columns: [table.userId, table.friendUserId] }),
    };
  });