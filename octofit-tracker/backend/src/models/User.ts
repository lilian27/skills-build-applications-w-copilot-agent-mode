import mongoose, { type InferSchemaType } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    profile: {
      age: { type: Number, required: true, min: 13 },
      fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;
export const UserModel = mongoose.model('User', userSchema);