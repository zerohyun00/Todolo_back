import { Router } from "express";
import TaskController from "./task.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";

const TaskRouter = Router();

// 업무 생성
TaskRouter.post("/", authMiddleware, TaskController.createTask);

// 업무 수정
TaskRouter.put("/:taskId", authMiddleware, TaskController.updateTask);

// 업무 삭제
TaskRouter.delete("/:taskId", authMiddleware, TaskController.deleteTask);

// 댓글 추가
TaskRouter.post("/:taskId/comments", authMiddleware, TaskController.addComment);

// 댓글 수정
TaskRouter.put(
  "/:taskId/comments/:commentId",
  authMiddleware,
  TaskController.updateComment
);

// 댓글 삭제
TaskRouter.delete(
  "/:taskId/comments/:commentId",
  authMiddleware,
  TaskController.deleteComment
);

export default TaskRouter;
