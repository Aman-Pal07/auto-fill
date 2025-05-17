import { pgTable, text, serial, integer, boolean, timestamp, jsonb, primaryKey, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  location: text("location"),
  currentPosition: text("current_position"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Personal profiles schema - contains detailed user profile data
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  personalInfo: jsonb("personal_info").notNull(), // Contains name, email, phone, location, etc.
  workExperience: jsonb("work_experience").notNull(), // Array of work experiences
  education: jsonb("education").notNull(), // Array of education history
  skills: jsonb("skills").notNull(), // Array of skills
  customFields: jsonb("custom_fields"), // Custom fields mappings for specific sites
  completionPercentage: integer("completion_percentage").notNull(), // Profile completion percentage
});

// Resumes schema - tracks uploaded resumes
export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  filename: text("filename").notNull(),
  fileContent: text("file_content").notNull(), // Base64 encoded PDF content
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Form histories schema - tracks form filling history
export const formHistories = pgTable("form_histories", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  site: text("site").notNull(),
  positionTitle: text("position_title"),
  fieldsAttempted: integer("fields_attempted").notNull(),
  fieldsCompleted: integer("fields_completed").notNull(),
  status: text("status").notNull(), // 'success', 'partial', 'failed'
  timestamp: timestamp("timestamp").defaultNow(),
  details: jsonb("details"), // Details about what fields were filled
});

// Extension settings schema - stores user preferences for the extension
export const extensionSettings = pgTable("extension_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id).unique(),
  autoFillOnLoad: boolean("auto_fill_on_load").default(true),
  showNotifications: boolean("show_notifications").default(true),
  saveFormHistory: boolean("save_form_history").default(true),
  fieldMappings: jsonb("field_mappings"), // Custom field mappings
});

// Statistics schema - aggregated stats for dashboard
export const statistics = pgTable("statistics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id).unique(),
  applicationsFilled: integer("applications_filled").default(0),
  successRate: integer("success_rate").default(0),
  formsDetected: integer("forms_detected").default(0),
  timeSaved: integer("time_saved").default(0), // Time saved in minutes
  weeklyStats: jsonb("weekly_stats"), // Weekly aggregated stats
});

// Zod schemas for data validation
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertProfileSchema = createInsertSchema(profiles).omit({ id: true });
export const insertResumeSchema = createInsertSchema(resumes).omit({ id: true, createdAt: true });
export const insertFormHistorySchema = createInsertSchema(formHistories).omit({ id: true, timestamp: true });
export const insertExtensionSettingsSchema = createInsertSchema(extensionSettings).omit({ id: true });
export const insertStatisticsSchema = createInsertSchema(statistics).omit({ id: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;

export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;

export type FormHistory = typeof formHistories.$inferSelect;
export type InsertFormHistory = z.infer<typeof insertFormHistorySchema>;

export type ExtensionSettings = typeof extensionSettings.$inferSelect;
export type InsertExtensionSettings = z.infer<typeof insertExtensionSettingsSchema>;

export type Statistics = typeof statistics.$inferSelect;
export type InsertStatistics = z.infer<typeof insertStatisticsSchema>;
