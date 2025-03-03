import express, { Request, Response } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { createRouteHandler } from 'uploadthing/express';
import { uploadRouter } from './uploadthing';
import { authRouter } from './routes/auth';
import { furnitureRouter } from './routes/furniture';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from the frontend site
    credentials: true, // Allow frontend to send cookies to our API
  })
);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.use(
  '/api/uploadthing',
  createRouteHandler({
    router: uploadRouter,
    // config: { ... },
  })
);

app.use('/auth', authRouter);
app.use('/furniture', furnitureRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
