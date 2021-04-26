import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";

interface UserDocument extends mongoose.Document {
  name: string;
  username: string;
  picture: string;
  email: string;
  biography: string;
  location: string;
  password: string;
  followers: string[]; // array of IDs
  following: string[];
  opinions: { question: string; stance: "Yes" | "No" | "Maybe" }; // array of IDs
  tokenVersion: number;
  generateToken: () => string;
  refreshToken: () => string;
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 55,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 55,
    trim: true,
    unique: true,
    lowercase: true,
  },
  picture: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
    lowercase: true,
  },
  biography: {
    type: String,
    minlength: 1,
    maxlength: 255,
    trim: true,
  },
  location: {
    type: String,
    minlength: 1,
    maxlength: 55,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
    default: [],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
    default: [],
  },
  opinions: {
    type: [{ question: { type: mongoose.Schema.Types.ObjectId, ref: "questions" }, stance: String }],
    default: [],
  },
  tokenVersion: {
    type: Number,
    default: 0,
  },
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY, { expiresIn: "10m" });
};

userSchema.methods.refreshToken = function () {
  return jwt.sign({ _id: this._id, tokenVersion: this.tokenVersion }, process.env.PRIVATE_KEY, { expiresIn: "7d" });
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);

// Functions ————————————————————————————————————————————————————————

export const validate = body => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(55).required(),
    username: Joi.string().min(3).max(55).required(),
    picture: Joi.string(),
    email: Joi.string().email().min(6).max(255).required(),
    biography: Joi.string().min(1).max(255),
    location: Joi.string().min(1).max(55),
    password: Joi.string().min(6).max(255).required(), //  npm i joi-password-complexity
  });

  return schema.validate(body);
};

// Export ———————————————————————————————————————————————————————————
