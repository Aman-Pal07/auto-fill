import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertUserSchema,
  insertProfileSchema,
  insertResumeSchema,
  insertFormHistorySchema,
  insertExtensionSettingsSchema,
  insertStatisticsSchema,
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Middleware to handle authentication (simplified for demo)
const authenticate = async (req: Request, res: Response, next: Function) => {
  // For this demo we'll assume a simple user ID in header
  const userId = req.headers["user-id"];

  if (!userId || typeof userId !== "string") {
    return res.status(401).json({ error: "Unauthorized: Missing user ID" });
  }

  const user = await storage.getUser(userId);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized: Invalid user ID" });
  }

  req.body.userId = user.id;
  next();
};

// Helper for validation errors
const handleZodError = (error: ZodError, res: Response) => {
  const validationError = fromZodError(error);
  return res.status(400).json({ error: validationError.message });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefix
  const apiPrefix = "/api";

  // Authentication middleware

  const generateToken = (user: any) => {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );
  };

  // Auth routes
  app.post(`${apiPrefix}/auth/login`, async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = generateToken(user);
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Server error during login" });
    }
  });

  app.post(`${apiPrefix}/auth/register`, async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);

      // Check if email already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);

      const user = await storage.createUser(userData);
      const token = generateToken(user);

      res.status(201).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return handleZodError(error, res);
      }
      res.status(500).json({ error: "Server error during registration" });
    }
  });

  // Protected user routes
  app.post(`${apiPrefix}/users/register`, async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);

      // Check if username or email already exists
      const existingUsername = await storage.getUserByUsername(
        userData.username
      );
      if (existingUsername) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const user = await storage.createUser(userData);

      // Create default profile, settings, and statistics
      await storage.createProfile({
        userId: user.id,
        personalInfo: {
          name: user.name,
          email: user.email,
          phone: user.phone || "",
          location: user.location || "",
          currentPosition: user.currentPosition || "",
        },
        workExperience: [],
        education: [],
        skills: [],
        completionPercentage: 20, // Basic profile
      });

      await storage.createExtensionSettings({
        userId: user.id,
        autoFillOnLoad: true,
        showNotifications: true,
        saveFormHistory: true,
      });

      await storage.createStatistics({
        userId: user.id,
        applicationsFilled: 0,
        successRate: 0,
        formsDetected: 0,
        timeSaved: 0,
        weeklyStats: {
          applicationsFilled: [0, 0, 0, 0],
          successRates: [0, 0, 0, 0],
        },
      });

      res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      if (error instanceof ZodError) {
        return handleZodError(error, res);
      }
      res.status(500).json({ error: "Server error creating user" });
    }
  });

  app.post(`${apiPrefix}/users/login`, async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);

      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      res.status(500).json({ error: "Server error during login" });
    }
  });

  // Profile routes
  app.get(`${apiPrefix}/profile`, authenticate, async (req, res) => {
    try {
      const userId = req.body.userId;
      const profile = await storage.getProfile(userId);

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Server error fetching profile" });
    }
  });

  app.put(`${apiPrefix}/profile`, authenticate, async (req, res) => {
    try {
      const userId = req.body.userId;
      const profileData = req.body.profile;

      const existingProfile = await storage.getProfile(userId);

      if (!existingProfile) {
        // Create new profile
        const newProfileData = insertProfileSchema.parse({
          userId,
          ...profileData,
        });
        const newProfile = await storage.createProfile(newProfileData);
        return res.json(newProfile);
      }

      // Update existing profile
      const updatedProfile = await storage.updateProfile(userId, profileData);
      res.json(updatedProfile);
    } catch (error) {
      if (error instanceof ZodError) {
        return handleZodError(error, res);
      }
      res.status(500).json({ error: "Server error updating profile" });
    }
  });

  // Resume routes
  app.get(`${apiPrefix}/resumes`, authenticate, async (req, res) => {
    try {
      const userId = req.body.userId;
      const resumes = await storage.getResumes(userId);
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ error: "Server error fetching resumes" });
    }
  });

  app.post(`${apiPrefix}/resumes`, authenticate, async (req, res) => {
    try {
      const userId = req.body.userId;
      const resumeData = {
        userId,
        filename: req.body.filename,
        fileContent: req.body.fileContent,
        isDefault: req.body.isDefault || false,
      };

      const validatedData = insertResumeSchema.parse(resumeData);
      const resume = await storage.createResume(validatedData);
      res.status(201).json(resume);
    } catch (error) {
      if (error instanceof ZodError) {
        return handleZodError(error, res);
      }
      res.status(500).json({ error: "Server error uploading resume" });
    }
  });

  app.delete(`${apiPrefix}/resumes/:id`, authenticate, async (req, res) => {
    try {
      const resumeId = parseInt(req.params.id);
      await storage.deleteResume(resumeId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Server error deleting resume" });
    }
  });

  app.put(
    `${apiPrefix}/resumes/:id/default`,
    authenticate,
    async (req, res) => {
      try {
        const resumeId = parseInt(req.params.id);
        const userId = req.body.userId;

        const success = await storage.setDefaultResume(resumeId.toString(), userId);

        if (!success) {
          return res
            .status(404)
            .json({ error: "Resume not found or not owned by user" });
        }

        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: "Server error setting default resume" });
      }
    }
  );

  // Form history routes
  app.get(`${apiPrefix}/form-history`, authenticate, async (req, res) => {
    try {
      const userId = req.body.userId;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string)
        : undefined;

      const histories = await storage.getFormHistories(userId, limit);
      res.json(histories);
    } catch (error) {
      res.status(500).json({ error: "Server error fetching form histories" });
    }
  });

  app.post(`${apiPrefix}/form-history`, authenticate, async (req, res) => {
    try {
      const userId = req.body.userId;
      const historyData = {
        userId,
        site: req.body.site,
        positionTitle: req.body.positionTitle,
        fieldsAttempted: req.body.fieldsAttempted,
        fieldsCompleted: req.body.fieldsCompleted,
        status: req.body.status,
        details: req.body.details,
      };

      const validatedData = insertFormHistorySchema.parse(historyData);
      const history = await storage.createFormHistory(validatedData);

      // Update statistics
      const stats = await storage.getStatistics(userId);
      if (stats) {
        // Increment application count
        const applicationsFilled = stats.applicationsFilled + 1;

        // Update success rate
        const totalApps = applicationsFilled;
        const successfulApps =
          (stats.successRate * stats.applicationsFilled) / 100 +
          (historyData.status === "success" ? 1 : 0);
        const successRate = Math.round((successfulApps / totalApps) * 100);

        // Increment forms detected
        const formsDetected = stats.formsDetected + 1;

        // Update time saved (assume 5 minutes per form)
        const timeSaved = stats.timeSaved + 5;

        await storage.updateStatistics(userId, {
          applicationsFilled,
          successRate,
          formsDetected,
          timeSaved,
        });
      }

      res.status(201).json(history);
    } catch (error) {
      if (error instanceof ZodError) {
        return handleZodError(error, res);
      }
      res.status(500).json({ error: "Server error creating form history" });
    }
  });

  // Extension settings routes
  app.get(`${apiPrefix}/extension-settings`, authenticate, async (req, res) => {
    try {
      const userId = req.body.userId;
      const settings = await storage.getExtensionSettings(userId);

      if (!settings) {
        return res.status(404).json({ error: "Settings not found" });
      }

      res.json(settings);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Server error fetching extension settings" });
    }
  });

  app.put(`${apiPrefix}/extension-settings`, authenticate, async (req, res) => {
    try {
      const userId = req.body.userId;
      const settingsData = req.body.settings;

      const existingSettings = await storage.getExtensionSettings(userId);

      if (!existingSettings) {
        // Create new settings
        const newSettingsData = insertExtensionSettingsSchema.parse({
          userId,
          ...settingsData,
        });
        const newSettings = await storage.createExtensionSettings(
          newSettingsData
        );
        return res.json(newSettings);
      }

      // Update existing settings
      const updatedSettings = await storage.updateExtensionSettings(
        userId,
        settingsData
      );
      res.json(updatedSettings);
    } catch (error) {
      if (error instanceof ZodError) {
        return handleZodError(error, res);
      }
      res
        .status(500)
        .json({ error: "Server error updating extension settings" });
    }
  });

  // Statistics routes
  app.get(`${apiPrefix}/statistics`, authenticate, async (req, res) => {
    try {
      const userId = req.body.userId;
      const stats = await storage.getStatistics(userId);

      if (!stats) {
        return res.status(404).json({ error: "Statistics not found" });
      }

      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Server error fetching statistics" });
    }
  });

  // Extension data routes - get all needed data for extension
  app.get(`${apiPrefix}/extension-data`, authenticate, async (req, res) => {
    try {
      const userId = req.body.userId;

      // Fetch all required data for extension
      const [profile, settings, defaultResume] = await Promise.all([
        storage.getProfile(userId),
        storage.getExtensionSettings(userId),
        storage.getDefaultResume(userId),
      ]);

      if (!profile || !settings) {
        return res.status(404).json({ error: "User data incomplete" });
      }

      res.json({
        profile,
        settings,
        defaultResume,
      });
    } catch (error) {
      res.status(500).json({ error: "Server error fetching extension data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
