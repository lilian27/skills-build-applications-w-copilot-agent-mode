import express from 'express';
import { connectDatabase } from './config/database.js';
import { ActivityModel } from './models/Activity.js';
import { LeaderboardModel } from './models/Leaderboard.js';
import { TeamModel } from './models/Team.js';
import { UserModel } from './models/User.js';
import { WorkoutModel } from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-backend', baseUrl });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await UserModel.find().sort({ username: 1 }));
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await TeamModel.find().populate('members', 'username firstName lastName').sort({ name: 1 }));
});

app.get('/api/activities/', async (_request, response) => {
  response.json(await ActivityModel.find().populate('user', 'username firstName lastName').sort({ completedAt: -1 }));
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(
    await LeaderboardModel.find()
      .populate('user', 'username firstName lastName')
      .populate('team', 'name')
      .sort({ rank: 1 }),
  );
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await WorkoutModel.find().populate('recommendedFor', 'username firstName lastName').sort({ difficulty: 1 }));
});

const startServer = async (): Promise<void> => {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening at ${baseUrl}`);
  });
};

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit Tracker API:', error);
  process.exit(1);
});