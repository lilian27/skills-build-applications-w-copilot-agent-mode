import mongoose, { type InferSchemaType } from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    activitiesCompleted: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true },
  },
  { timestamps: true },
);

export type Leaderboard = InferSchemaType<typeof leaderboardSchema>;
export const LeaderboardModel = mongoose.model('Leaderboard', leaderboardSchema);