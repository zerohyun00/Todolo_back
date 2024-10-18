import express, { Request, Response, NextFunction } from "express";
import userRouter from "./src/models/user/user.router";

import ProjectRouter from "./src/models/project/project.router";
import { dbConnect } from "./db/db";
import cors from "cors";
import cookieParser from "cookie-parser";

import path from "path";
import TaskRouter from "./src/models/task/task.router";
import teamRouter from "./src/models/team/team.router";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import imageRouter from "./src/models/image/image.router";
import { errorHandler } from "./src/middleware/error.handler.middleware";

const app = express();
const port = process.env.PORT ?? 3000;
dbConnect();

app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3002",
  credentials: true,
};
app.use(cors(corsOptions));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API 문서",
      version: "1.0.0",
      description: "API 문서입니다.",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "개발 서버",
      },
    ],
  },
  apis: ["./src/models/**/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
app.use("/api/users", userRouter);
app.use("/api/images", imageRouter);
app.use("/api/teams", teamRouter);
app.use("/api/tasks", TaskRouter);
app.use("/api/projects", ProjectRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(
    `Swagger 문서는 http://localhost:${port}/api-docs 에서 확인 가능합니다.`
  );
});
