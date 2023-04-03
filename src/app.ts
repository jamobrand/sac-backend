require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import config from 'config';
import morgan from "morgan"
import cors from "cors"
import validateEnv from './utils/validateEnv';
import { AppDataSource } from './utils/data-source';
import memberRouter from "./routes/member.routes"
import redisClient from './utils/connectRedis';
import AppError from './utils/appError';
import bodyParser from 'body-parser';

AppDataSource.initialize()
    .then(async () => {
      // Validate Env
      validateEnv()
        
      const app = express()

      // MIDDLEWARE

      // 1. Body parser
      // app.use(express.json({ limit: '10kb' }));
      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({ extended: true }))

      // 2. Logger
      if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

      // 3. Cookie Parser

      // 4. Cors
      app.use(
        cors({
          origin: config.get<string>('origin'),
          credentials: true,
        })
      );

      // ROUTES
      app.use("/api/members", memberRouter)
        
      // HEALTH CHECKER
      app.get('/api/healthchecker', async (_, res: Response) => {
        const message = await redisClient.get('try');
        res.status(200).json({
            status: 'success',
            message,
        });
      });
        
      // UNHANDLED ROUTE
      app.all('*', (req: Request, res: Response, next: NextFunction) => {
        next(new AppError(404, `Route ${req.originalUrl} not found`));
      });

     // GLOBAL ERROR HANDLER
      app.use(
        (error: AppError, req: Request, res: Response, next: NextFunction) => {
          error.status = error.status || 'error';
          error.statusCode = error.statusCode || 500;

          res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
          });
        }
      );
        
     const port = config.get<number>('port');
     app.listen(port);

      console.log(`Server started on port: ${port}`);
    })
    .catch((error) => console.log(error));