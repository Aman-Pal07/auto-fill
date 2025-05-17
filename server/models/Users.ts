import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the interface for User methods
interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

// Define the User Document type
interface IUserDocument extends mongoose.Document, IUserMethods {
  email: string;
  password: string;
  username: string;
  createdAt: Date;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUserDocument>("User", userSchema);
