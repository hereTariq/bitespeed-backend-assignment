import express, { Application } from 'express';
import dotenv from 'dotenv';
import { PORT } from './config/constants';
import './config/db';
import errorMiddleware from './middlewares/errorMiddleware';
import identifyRoute from './routes/identifyRoutes';
dotenv.config();

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(identifyRoute);

app.use(errorMiddleware);
app.listen(PORT, () =>
    console.info('server is running on http://localhost:' + PORT)
);
