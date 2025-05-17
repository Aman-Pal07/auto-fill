import {
  users, profiles, resumes, formHistories, extensionSettings, statistics,
  type User, type InsertUser, type Profile, type InsertProfile,
  type Resume, type InsertResume, type FormHistory, type InsertFormHistory,
  type ExtensionSettings, type InsertExtensionSettings, type Statistics, type InsertStatistics
} from "@shared/schema";

// Storage interface to handle all database operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined>;
  
  // Profile operations
  getProfile(userId: number): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(userId: number, profileData: Partial<InsertProfile>): Promise<Profile | undefined>;
  
  // Resume operations
  getResumes(userId: number): Promise<Resume[]>;
  getDefaultResume(userId: number): Promise<Resume | undefined>;
  createResume(resume: InsertResume): Promise<Resume>;
  deleteResume(id: number): Promise<boolean>;
  setDefaultResume(id: number, userId: number): Promise<boolean>;
  
  // Form history operations
  getFormHistories(userId: number, limit?: number): Promise<FormHistory[]>;
  createFormHistory(formHistory: InsertFormHistory): Promise<FormHistory>;
  
  // Extension settings operations
  getExtensionSettings(userId: number): Promise<ExtensionSettings | undefined>;
  createExtensionSettings(settings: InsertExtensionSettings): Promise<ExtensionSettings>;
  updateExtensionSettings(userId: number, settingsData: Partial<InsertExtensionSettings>): Promise<ExtensionSettings | undefined>;
  
  // Statistics operations
  getStatistics(userId: number): Promise<Statistics | undefined>;
  createStatistics(stats: InsertStatistics): Promise<Statistics>;
  updateStatistics(userId: number, statsData: Partial<InsertStatistics>): Promise<Statistics | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private profiles: Map<number, Profile>;
  private resumes: Map<number, Resume>;
  private formHistories: Map<number, FormHistory>;
  private extensionSettings: Map<number, ExtensionSettings>;
  private statistics: Map<number, Statistics>;
  private currentUserId: number;
  private currentProfileId: number;
  private currentResumeId: number;
  private currentFormHistoryId: number;
  private currentExtensionSettingsId: number;
  private currentStatisticsId: number;

  constructor() {
    this.users = new Map();
    this.profiles = new Map();
    this.resumes = new Map();
    this.formHistories = new Map();
    this.extensionSettings = new Map();
    this.statistics = new Map();
    this.currentUserId = 1;
    this.currentProfileId = 1;
    this.currentResumeId = 1;
    this.currentFormHistoryId = 1;
    this.currentExtensionSettingsId = 1;
    this.currentStatisticsId = 1;
    
    // Create a default user for demo purposes
    this.createUser({
      username: "johndoe",
      password: "password123",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      currentPosition: "Software Engineer"
    }).then(user => {
      // Create default profile
      this.createProfile({
        userId: user.id,
        personalInfo: {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "(555) 123-4567",
          location: "San Francisco, CA",
          currentPosition: "Software Engineer",
          website: "https://johndoe.com"
        },
        workExperience: [
          {
            title: "Software Engineer",
            company: "Tech Corp",
            location: "San Francisco, CA",
            startDate: "2020-01",
            endDate: "Present",
            description: "Full-stack development with React and Node.js"
          },
          {
            title: "Junior Developer",
            company: "StartUp Inc",
            location: "San Jose, CA",
            startDate: "2018-05",
            endDate: "2019-12",
            description: "Frontend development with React"
          }
        ],
        education: [
          {
            institution: "University of California",
            degree: "Bachelor of Science in Computer Science",
            startDate: "2014-09",
            endDate: "2018-05",
            gpa: "3.8"
          }
        ],
        skills: [
          "JavaScript", "TypeScript", "React", "Node.js", "MongoDB", 
          "Express.js", "HTML", "CSS", "Git", "REST APIs"
        ],
        customFields: {
          linkedin: {
            headline: "Full-stack developer with 5 years of experience",
            summary: "Passionate about building web applications"
          }
        },
        completionPercentage: 85
      });
      
      // Create default resume
      this.createResume({
        userId: user.id,
        filename: "John_Doe_Resume_2023.pdf",
        fileContent: "Sample base64 content",
        isDefault: true
      });
      
      // Create extension settings
      this.createExtensionSettings({
        userId: user.id,
        autoFillOnLoad: true,
        showNotifications: true,
        saveFormHistory: true,
        fieldMappings: {
          linkedin: {
            name: "input[name='name']",
            email: "input[name='email']"
          }
        }
      });
      
      // Create statistics
      this.createStatistics({
        userId: user.id,
        applicationsFilled: 24,
        successRate: 92,
        formsDetected: 38,
        timeSaved: 324, // 5.4 hours
        weeklyStats: {
          applicationsFilled: [5, 7, 3, 9],
          successRates: [90, 92, 88, 94]
        }
      });
      
      // Create form histories
      this.createFormHistory({
        userId: user.id,
        site: "LinkedIn",
        positionTitle: "Software Engineer",
        fieldsAttempted: 18,
        fieldsCompleted: 18,
        status: "success",
        details: {
          fields: ["name", "email", "phone", "resume"]
        }
      });
      
      this.createFormHistory({
        userId: user.id,
        site: "Indeed",
        positionTitle: "Full Stack Developer",
        fieldsAttempted: 22,
        fieldsCompleted: 18,
        status: "partial",
        details: {
          fields: ["name", "email", "phone", "resume"]
        }
      });
      
      this.createFormHistory({
        userId: user.id,
        site: "Google Careers",
        positionTitle: "UX Designer",
        fieldsAttempted: 15,
        fieldsCompleted: 15,
        status: "success",
        details: {
          fields: ["name", "email", "phone", "resume"]
        }
      });
      
      this.createFormHistory({
        userId: user.id,
        site: "Microsoft Careers",
        positionTitle: "Product Manager",
        fieldsAttempted: 20,
        fieldsCompleted: 0,
        status: "failed",
        details: {
          error: "Unknown form structure"
        }
      });
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const timestamp = new Date();
    const user: User = { ...insertUser, id, createdAt: timestamp };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Profile operations
  async getProfile(userId: number): Promise<Profile | undefined> {
    return Array.from(this.profiles.values()).find(
      (profile) => profile.userId === userId
    );
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const id = this.currentProfileId++;
    const profile: Profile = { ...insertProfile, id };
    this.profiles.set(id, profile);
    return profile;
  }
  
  async updateProfile(userId: number, profileData: Partial<InsertProfile>): Promise<Profile | undefined> {
    const profile = await this.getProfile(userId);
    if (!profile) return undefined;
    
    const updatedProfile = { ...profile, ...profileData };
    this.profiles.set(profile.id, updatedProfile);
    return updatedProfile;
  }

  // Resume operations
  async getResumes(userId: number): Promise<Resume[]> {
    return Array.from(this.resumes.values()).filter(
      (resume) => resume.userId === userId
    );
  }
  
  async getDefaultResume(userId: number): Promise<Resume | undefined> {
    return Array.from(this.resumes.values()).find(
      (resume) => resume.userId === userId && resume.isDefault
    );
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const id = this.currentResumeId++;
    const timestamp = new Date();
    const resume: Resume = { ...insertResume, id, createdAt: timestamp };
    
    // If this is set as default, unset any existing default
    if (resume.isDefault) {
      const userResumes = await this.getResumes(resume.userId);
      for (const existingResume of userResumes) {
        if (existingResume.isDefault) {
          existingResume.isDefault = false;
          this.resumes.set(existingResume.id, existingResume);
        }
      }
    }
    
    this.resumes.set(id, resume);
    return resume;
  }
  
  async deleteResume(id: number): Promise<boolean> {
    return this.resumes.delete(id);
  }
  
  async setDefaultResume(id: number, userId: number): Promise<boolean> {
    const resume = this.resumes.get(id);
    if (!resume || resume.userId !== userId) return false;
    
    // Unset any existing default
    const userResumes = await this.getResumes(userId);
    for (const existingResume of userResumes) {
      if (existingResume.isDefault) {
        existingResume.isDefault = false;
        this.resumes.set(existingResume.id, existingResume);
      }
    }
    
    // Set the new default
    resume.isDefault = true;
    this.resumes.set(id, resume);
    return true;
  }

  // Form history operations
  async getFormHistories(userId: number, limit?: number): Promise<FormHistory[]> {
    const histories = Array.from(this.formHistories.values())
      .filter((history) => history.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    return limit ? histories.slice(0, limit) : histories;
  }

  async createFormHistory(insertFormHistory: InsertFormHistory): Promise<FormHistory> {
    const id = this.currentFormHistoryId++;
    const timestamp = new Date();
    const formHistory: FormHistory = { ...insertFormHistory, id, timestamp };
    this.formHistories.set(id, formHistory);
    return formHistory;
  }

  // Extension settings operations
  async getExtensionSettings(userId: number): Promise<ExtensionSettings | undefined> {
    return Array.from(this.extensionSettings.values()).find(
      (settings) => settings.userId === userId
    );
  }

  async createExtensionSettings(insertSettings: InsertExtensionSettings): Promise<ExtensionSettings> {
    const id = this.currentExtensionSettingsId++;
    const settings: ExtensionSettings = { ...insertSettings, id };
    this.extensionSettings.set(id, settings);
    return settings;
  }
  
  async updateExtensionSettings(userId: number, settingsData: Partial<InsertExtensionSettings>): Promise<ExtensionSettings | undefined> {
    const settings = await this.getExtensionSettings(userId);
    if (!settings) return undefined;
    
    const updatedSettings = { ...settings, ...settingsData };
    this.extensionSettings.set(settings.id, updatedSettings);
    return updatedSettings;
  }

  // Statistics operations
  async getStatistics(userId: number): Promise<Statistics | undefined> {
    return Array.from(this.statistics.values()).find(
      (stats) => stats.userId === userId
    );
  }

  async createStatistics(insertStats: InsertStatistics): Promise<Statistics> {
    const id = this.currentStatisticsId++;
    const statistics: Statistics = { ...insertStats, id };
    this.statistics.set(id, statistics);
    return statistics;
  }
  
  async updateStatistics(userId: number, statsData: Partial<InsertStatistics>): Promise<Statistics | undefined> {
    const stats = await this.getStatistics(userId);
    if (!stats) return undefined;
    
    const updatedStats = { ...stats, ...statsData };
    this.statistics.set(stats.id, updatedStats);
    return updatedStats;
  }
}

export const storage = new MemStorage();
