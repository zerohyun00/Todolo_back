import { Router } from "express";
import TaskController from "./task.controller";

const TaskRouter = Router();

TaskRouter.post("/task", TaskController.createTask);

TaskRouter.put("/task/:taskId", TaskController.updateTask);

TaskRouter.delete("/task/:taskId", TaskController.deleteTask);

TaskRouter.get("/task/:taskId", TaskController.findTask);

TaskRouter.get("/tasks", TaskController.getAllTasks);

TaskRouter.get("/taskstatus", TaskController.findTasksByStatus);

export default TaskRouter;
