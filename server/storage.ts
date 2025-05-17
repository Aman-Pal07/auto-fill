import {
  User,
  Profile,
  Resume,
  FormHistory,
  ExtensionSettings,
  Statistics,
} from "./db";
import type {
  InsertUser,
  InsertProfile,
  InsertResume,
  InsertFormHistory,
  InsertExtensionSettings,
  InsertStatistics,
} from "@shared/schema";

export class Storage {
  async getUser(id: string) {
    return await User.findById(id);
  }

  async getUserByUsername(username: string) {
    return await User.findOne({ username });
  }

  async getUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  async createUser(userData: InsertUser) {
    const user = new User(userData);
    return await user.save();
  }

  async updateUser(id: string, userData: Partial<InsertUser>) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  async getProfile(userId: string) {
    return await Profile.findOne({ userId });
  }

  async createProfile(profileData: InsertProfile) {
    const profile = new Profile(profileData);
    return await profile.save();
  }

  async updateProfile(userId: string, profileData: Partial<InsertProfile>) {
    return await Profile.findOneAndUpdate({ userId }, profileData, {
      new: true,
    });
  }

  async getResumes(userId: string) {
    return await Resume.find({ userId });
  }

  async getDefaultResume(userId: string) {
    return await Resume.findOne({ userId, isDefault: true });
  }

  async createResume(resumeData: InsertResume) {
    const resume = new Resume(resumeData);
    return await resume.save();
  }

  async deleteResume(id: string) {
    const result = await Resume.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  async setDefaultResume(id: string, userId: string) {
    await Resume.updateMany({ userId }, { isDefault: false });
    const result = await Resume.updateOne(
      { _id: id, userId },
      { isDefault: true }
    );
    return result.modifiedCount > 0;
  }

  async getFormHistories(userId: string, limit?: number) {
    const query = FormHistory.find({ userId });
    if (limit) {
      query.limit(limit);
    }
    return await query.exec();
  }

  async createFormHistory(formHistoryData: InsertFormHistory) {
    const formHistory = new FormHistory(formHistoryData);
    return await formHistory.save();
  }

  async getExtensionSettings(userId: string) {
    return await ExtensionSettings.findOne({ userId });
  }

  async createExtensionSettings(settingsData: InsertExtensionSettings) {
    const settings = new ExtensionSettings(settingsData);
    return await settings.save();
  }

  async updateExtensionSettings(
    userId: string,
    settingsData: Partial<InsertExtensionSettings>
  ) {
    return await ExtensionSettings.findOneAndUpdate({ userId }, settingsData, {
      new: true,
    });
  }

  async getStatistics(userId: string) {
    return await Statistics.findOne({ userId });
  }

  async createStatistics(statisticsData: InsertStatistics) {
    const statistics = new Statistics(statisticsData);
    return await statistics.save();
  }

  async updateStatistics(
    userId: string,
    statisticsData: Partial<InsertStatistics>
  ) {
    return await Statistics.findOneAndUpdate({ userId }, statisticsData, {
      new: true,
    });
  }
}

export const storage = new Storage();
