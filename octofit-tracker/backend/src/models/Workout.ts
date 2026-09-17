import mongoose, { type InferSchemaType } from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true, min: 1 },
        repetitions: { type: Number, required: true, min: 1 },
      },
    ],
    recommendedFor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export type Workout = InferSchemaType<typeof workoutSchema>;
export const WorkoutModel = mongoose.model('Workout', workoutSchema);