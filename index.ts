import express, { Request, Response, NextFunction } from "express";
import userRouter from "./src/models/user/user.router";
import ImageRouter from "./src/models/image/image.router";
import ProjectRouter from "./src/models/project/project.router";
import { dbConnect } from "./db/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.handler.middleware";
import path from "path";
import TaskRouter from "./src/models/task/task.router";

const app = express();
const port = process.env.PORT || 3000;
dbConnect();

app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// 정적 파일 제공 설정
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/users", userRouter);
app.use("/images", ImageRouter);
app.use("/projects", ProjectRouter);
app.use("/tasks", TaskRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
