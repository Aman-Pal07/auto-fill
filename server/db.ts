import mongoose from "mongoose";
import { config } from "dotenv";

config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/applicationauto";

export async function connectDB() {
  try {
    mongoose.set('debug', true); // Enable debug mode
    console.log('Attempting to connect to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Successfully connected to MongoDB');
  } catch (error: any) {
    console.error('MongoDB connection error:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Profile Schema
const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  personalInfo: {
    type: Object,
    required: true,
  },
  workExperience: [Object],
  education: [Object],
  skills: [Object],
  customFields: Object,
  completionPercentage: { type: Number, required: true },
});

// Resume Schema
const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  filename: { type: String, required: true },
  fileContent: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Form History Schema
const formHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  site: { type: String, required: true },
  positionTitle: String,
  fieldsAttempted: { type: Number, required: true },
  fieldsCompleted: { type: Number, required: true },
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  details: Object,
});

// Extension Settings Schema
const extensionSettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  autoFillOnLoad: { type: Boolean, default: true },
  showNotifications: { type: Boolean, default: true },
  saveFormHistory: { type: Boolean, default: true },
  fieldMappings: Object,
});

// Statistics Schema
const statisticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  applicationsFilled: { type: Number, default: 0 },
  successRate: { type: Number, default: 0 },
  formsDetected: { type: Number, default: 0 },
  timeSaved: { type: Number, default: 0 },
  weeklyStats: Object,
});

export const User = mongoose.model("User", userSchema);
export const Profile = mongoose.model("Profile", profileSchema);
export const Resume = mongoose.model("Resume", resumeSchema);
export const FormHistory = mongoose.model("FormHistory", formHistorySchema);
export const ExtensionSettings = mongoose.model(
  "ExtensionSettings",
  extensionSettingsSchema
);
export const Statistics = mongoose.model("Statistics", statisticsSchema);
