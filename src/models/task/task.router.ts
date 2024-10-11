import { Router } from "express";
import TaskController from "./task.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";

const TaskRouter = Router();

// 업무 생성
TaskRouter.post("/task", authMiddleware, TaskController.createTask);

// 업무 수정
TaskRouter.put("/task/:taskId", authMiddleware, TaskController.updateTask);

// 업무 삭제
TaskRouter.delete("/task/:taskId", authMiddleware, TaskController.deleteTask);

// 업무 조회
TaskRouter.get("/task/:taskId", authMiddleware, TaskController.findTask);

// 모든 업무 조회
// 아직 업무나 프로젝트에는 유저는 추가를 안했음
TaskRouter.get("/tasks", authMiddleware, TaskController.getAllTasks);

// 업무상태 조회
// 필요한지 의문 캄반보드에서 이걸 기준으로 드랍엔드랍을 할 수 있으니 보류
TaskRouter.get("/taskstatus", authMiddleware, TaskController.findTasksByStatus);

export default TaskRouter;
