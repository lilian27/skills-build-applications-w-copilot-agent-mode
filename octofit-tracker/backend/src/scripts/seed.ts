import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { ActivityModel } from '../models/Activity.js';
import { LeaderboardModel } from '../models/Leaderboard.js';
import { TeamModel } from '../models/Team.js';
import { UserModel } from '../models/User.js';
import { WorkoutModel } from '../models/Workout.js';

const seed = async (): Promise<void> => {
  console.log('Seed the octofit_db database with test data');
  await connectDatabase();

  await Promise.all([
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    TeamModel.deleteMany({}),
    UserModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.create([
    {
      username: 'maya.runner',
      email: 'maya.runner@mergington.edu',
      firstName: 'Maya',
      lastName: 'Rivera',
      profile: { age: 16, fitnessLevel: 'intermediate' },
    },
    {
      username: 'liam.lifts',
      email: 'liam.lifts@mergington.edu',
      firstName: 'Liam',
      lastName: 'Chen',
      profile: { age: 17, fitnessLevel: 'advanced' },
    },
    {
      username: 'sofia.moves',
      email: 'sofia.moves@mergington.edu',
      firstName: 'Sofia',
      lastName: 'Patel',
      profile: { age: 15, fitnessLevel: 'beginner' },
    },
  ]);

  const teams = await TeamModel.create([
    {
      name: 'Summit Striders',
      description: 'A steady team focused on running and consistent progress.',
      members: [users[0]._id, users[2]._id],
      totalPoints: 410,
    },
    {
      name: 'Peak Performers',
      description: 'Strength and conditioning enthusiasts chasing new records.',
      members: [users[1]._id],
      totalPoints: 285,
    },
  ]);

  await ActivityModel.create([
    {
      user: users[0]._id,
      type: 'running',
      durationMinutes: 32,
      distanceKm: 5.1,
      calories: 360,
      points: 120,
      completedAt: new Date('2026-09-15T16:30:00Z'),
    },
    {
      user: users[1]._id,
      type: 'strength',
      durationMinutes: 45,
      calories: 290,
      points: 145,
      completedAt: new Date('2026-09-16T17:00:00Z'),
    },
    {
      user: users[2]._id,
      type: 'walking',
      durationMinutes: 38,
      distanceKm: 3.2,
      calories: 180,
      points: 90,
      completedAt: new Date('2026-09-16T15:15:00Z'),
    },
  ]);

  await LeaderboardModel.create([
    { user: users[0]._id, team: teams[0]._id, points: 410, activitiesCompleted: 6, rank: 1, period: 'September 2026' },
    { user: users[1]._id, team: teams[1]._id, points: 285, activitiesCompleted: 4, rank: 2, period: 'September 2026' },
    { user: users[2]._id, team: teams[0]._id, points: 220, activitiesCompleted: 4, rank: 3, period: 'September 2026' },
  ]);

  await WorkoutModel.create([
    {
      title: 'After-school Energy Circuit',
      description: 'A short full-body circuit for building a consistent routine.',
      difficulty: 'beginner',
      durationMinutes: 20,
      recommendedFor: users[2]._id,
      exercises: [
        { name: 'Bodyweight squats', sets: 3, repetitions: 12 },
        { name: 'Incline push-ups', sets: 3, repetitions: 8 },
        { name: 'Marching plank', sets: 2, repetitions: 10 },
      ],
    },
    {
      title: '5K Pace Builder',
      description: 'Intervals that improve endurance while keeping the session focused.',
      difficulty: 'intermediate',
      durationMinutes: 35,
      recommendedFor: users[0]._id,
      exercises: [
        { name: 'Easy warm-up jog', sets: 1, repetitions: 5 },
        { name: 'Tempo intervals', sets: 5, repetitions: 2 },
        { name: 'Cool-down walk', sets: 1, repetitions: 5 },
      ],
    },
  ]);

  console.log('Seed complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, 2 workouts');
};

seed()
  .catch((error: unknown) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
