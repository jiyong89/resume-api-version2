import express from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import usersRouter from './routers/users.router.js';
import resumesRouter from './routers/resumes.router.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json()); //미들웨어 등록

app.use('/users', usersRouter);
app.use('/resumes', resumesRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`${port} 포트로 서버가 열렸습니다.`);
});
