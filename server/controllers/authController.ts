import { Request, Response } from "express";
import { User } from "../models/Users";
import jwt from "jsonwebtoken";

const generateToken = (user: any) => {
  try {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );
    return token;
  } catch (error: any) {
    console.error('Token generation error:', error);
    throw new Error('Failed to generate authentication token');
  }
};

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, username } = req.body;

      // Validate required fields
      if (!email || !password || !username) {
        return res.status(400).json({
          error: 'All fields are required'
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: 'Please enter a valid email address'
        });
      }

      // Validate password length
      if (password.length < 6) {
        return res.status(400).json({
          error: 'Password must be at least 6 characters long'
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const user = await User.create({ email, password, username });
      
      // Convert Mongoose document to plain object
      const userObject = user.toObject();
      const token = generateToken(userObject);

      res.status(201).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error: any) {
      console.error('Registration error details:');
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
      console.error('Full error:', error);
      res.status(500).json({
        error: error.message || "Server error during registration",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = generateToken(user);
      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Server error during login" });
    }
  },
};
