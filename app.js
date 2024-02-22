import express from "express";
import cookieParser from "cookie-parser";
import UsersRouter from "./src/routes/user.router.js";
import ResumeRouter from "./src/routes/resume.router.js";

const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());
app.use('/resumes', ResumeRouter);
app.use('/users', UsersRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} 포트로 서버가 열렸어요!`);
});