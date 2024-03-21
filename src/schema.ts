import { pgTable, uuid, text, boolean, timestamp, integer, primaryKey } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: uuid("user_id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  username: text("username").unique().notNull(),
  passwordHash: text("password_hash"),
  status: text("status"),
  isPaidUser: boolean("is_paid_user").default(false),
  currentInboxUrl: text("current_inbox_url").unique().notNull(),
  previousInboxUrl: text("previous_inbox_url"),
  previousUrlExpiry: timestamp("previous_url_expiry", {withTimezone: true}),
});

export const socialAuths = pgTable("social_auths", {
  authId: uuid("auth_id").primaryKey(),
  userId: uuid("user_id").references(() => users.userId),
  provider: text("provider").notNull(),
  providerUserId: text("provider_user_id").unique().notNull(),
});

export const messages = pgTable("messages", {
  messageId: uuid("message_id").primaryKey(),
  content: text("content").notNull(),
  messageCreatedTimestamp: timestamp("message_created_timestamp", {withTimezone: true}).notNull(),
  senderUserId: uuid("sender_user_id").references(() => users.userId),
  recipientUserId: uuid("recipient_user_id").references(() => users.userId).notNull(),
  hasBeenDisplayed: boolean("has_been_displayed").default(false),
  lastDisplayedTimestamp: timestamp("last_displayed_timestamp", {withTimezone:true}),
  isLiked: boolean("is_liked").default(false),
});

export const userLinks = pgTable("user_links", {
    userId: uuid("user_id").references(() => users.userId),
    friendUserId: uuid("friend_user_id").references(() => users.userId),
  }, (table) => {
    return {
      primaryKey: primaryKey({ columns: [table.userId, table.friendUserId] }),
    };
  });