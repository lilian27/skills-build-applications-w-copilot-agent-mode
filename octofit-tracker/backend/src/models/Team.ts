import mongoose, { type InferSchemaType } from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

export type Team = InferSchemaType<typeof teamSchema>;
export const TeamModel = mongoose.model('Team', teamSchema);