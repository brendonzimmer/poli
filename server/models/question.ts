import mongoose from "mongoose";
import Joi from "joi";

interface QuestionDocument extends mongoose.Document {
  question: string;
  emoji: string;
}

const questionSchema = new mongoose.Schema<QuestionDocument>({
  question: {
    type: String,
    required: true,
    minlength: 15,
    maxlength: 255,
    trim: true,
    unique: true,
  },
  emoji: {
    type: String,
    required: true,
    // minlength: 1,
    maxlength: 1,
    trim: true,
  },
});

export const Question =
  (mongoose.models.Question as mongoose.Model<QuestionDocument>) ||
  mongoose.model<QuestionDocument>("Question", questionSchema);

export const validate = body => {
  const schema = Joi.object({
    question: Joi.string().min(15).max(255).required(),
    emoji: Joi.string() /*.length(1)*/
      .required(),
  });

  return schema.validate(body);
};
