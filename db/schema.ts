import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// ----------------------------------------------------------------------
// 1. ENUMS
// ----------------------------------------------------------------------
// Matches the SQL types we defined for strict status control
export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "pending_verification",
  "active",
  "rejected",
  "expired",
]);

export const serviceTypeEnum = pgEnum("service_type", [
  "learning_deutsch",
  "document_assistance",
  "company_finder",
]);

// ----------------------------------------------------------------------
// 2. TABLES
// ----------------------------------------------------------------------

// PROFILES (Synced with Clerk)
export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(), // Matches Clerk User ID (e.g., user_2q...)
  email: text("email").notNull(),
  fullName: text("full_name"),
  // The column for the "One Device" security feature
  activeSessionId: text("active_session_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// SERVICES (The plans you sell)
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: serviceTypeEnum("name").notNull().unique(),
  displayName: text("display_name").notNull(), // e.g. "German Job Placement"
  price: integer("price").notNull(),
  durationDays: integer("duration_days").notNull().default(30),
});

// SUBSCRIPTIONS (The core logic)
export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    // Foreign Keys
    userId: text("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    serviceId: integer("service_id")
      .notNull()
      .references(() => services.id),

    // State Management
    status: subscriptionStatusEnum("status").default("pending_verification"),

    // Dates (Managed by Database Triggers usually, but defined here)
    startDate: timestamp("start_date", { withTimezone: true }),
    endDate: timestamp("end_date", { withTimezone: true }),

    // Payment Audit Trail
    paymentProofUrl: text("payment_proof_url").notNull(),
    transactionRef: text("transaction_ref"), // Optional user input
    adminNotes: text("admin_notes"), // Rejection reasons

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    // Indexes for performance
    userIdIdx: index("idx_subscriptions_user").on(table.userId),
    statusIdx: index("idx_subscriptions_status").on(table.status),
  }),
);

// ----------------------------------------------------------------------
// 3. RELATIONS (Application Level)
// ----------------------------------------------------------------------
// These allow you to do: db.query.profiles.findFirst({ with: { subscriptions: true } })

export const profilesRelations = relations(profiles, ({ many }) => ({
  subscriptions: many(subscriptions),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(profiles, {
    fields: [subscriptions.userId],
    references: [profiles.id],
  }),
  service: one(services, {
    fields: [subscriptions.serviceId],
    references: [services.id],
  }),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  subscriptions: many(subscriptions),
}));
