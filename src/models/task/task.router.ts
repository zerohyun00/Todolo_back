// import { Router } from "express";
// import TaskController from "./task.controller";
// import { authMiddleware } from "../../../middleware/auth.middleware";

// const TaskRouter = Router();

// // 업무 생성
// TaskRouter.post("/", authMiddleware, TaskController.createTask);

// // 업무 수정
// TaskRouter.put("/:taskId", authMiddleware, TaskController.updateTask);

// // 업무 삭제
// TaskRouter.delete("/:taskId", authMiddleware, TaskController.deleteTask);

// // 댓글 추가
// TaskRouter.post("/:taskId/comments", authMiddleware, TaskController.addComment);

// // 댓글 수정
// TaskRouter.put(
//   "/:taskId/comments/:commentId",
//   authMiddleware,
//   TaskController.updateComment
// );

// // 댓글 삭제
// TaskRouter.delete(
//   "/:taskId/comments/:commentId",
//   authMiddleware,
//   TaskController.deleteComment
// );

// export default TaskRouter;

import { Router } from "express";
import TaskController from "./task.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const TaskRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: 업무 관리 API
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: 업무 생성
 *     description: 새로운 업무를 생성합니다(기존 프로젝트가 있다면 기존 프로젝트 클릭, 없다면 새롭게 생성).
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 업무 제목
 *               project_id:
 *                 type: string
 *                 description: 기존 프로젝트 선택
 *               content:
 *                 type: string
 *                 description: 업무 내용
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 description: 업무 시작일
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 description: 업무 종료일
 *               priority:
 *                 type: string
 *                 description: 우선순위 (높음, 중간, 낮음)
 *               status:
 *                 type: string
 *                 description: 상태 (할 일, 진행중, 완료)
 *     responses:
 *       201:
 *         description: 업무 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "업무가 성공적으로 생성되었습니다."
 *                 data:
 *                   type: object
 *                   description: 생성된 업무 데이터
 */
TaskRouter.post("/", authMiddleware, TaskController.createTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: 업무 수정
 *     description: 특정 업무를 수정합니다.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: 수정할 업무 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 업무 제목
 *               content:
 *                 type: string
 *                 description: 업무 내용
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 description: 업무 시작일
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 description: 업무 종료일
 *               priority:
 *                 type: string
 *                 description: 우선순위 (높음, 중간, 낮음)
 *               status:
 *                 type: string
 *                 description: 상태 (할 일, 진행중, 완료)
 *     responses:
 *       200:
 *         description: 업무 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "업무가 성공적으로 수정되었습니다."
 *                 data:
 *                   type: object
 *                   description: 수정된 업무 데이터
 */
TaskRouter.put("/:taskId", authMiddleware, TaskController.updateTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: 업무 삭제
 *     description: 특정 업무를 삭제합니다.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: 삭제할 업무 ID
 *     responses:
 *       200:
 *         description: 업무 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "업무가 성공적으로 삭제되었습니다."
 */
TaskRouter.delete("/:taskId", authMiddleware, TaskController.deleteTask);

/**
 * @swagger
 * /tasks/{taskId}/comments:
 *   post:
 *     summary: 댓글 추가
 *     description: 특정 업무에 댓글을 추가합니다.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: 댓글을 추가할 업무 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_content:
 *                 type: string
 *                 description: 댓글 내용
 *     responses:
 *       201:
 *         description: 댓글 작성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "댓글이 작성되었습니다."
 *                 data:
 *                   type: object
 *                   description: 생성된 댓글 데이터
 */
TaskRouter.post("/:taskId/comments", authMiddleware, TaskController.addComment);

/**
 * @swagger
 * /tasks/{taskId}/comments/{commentId}:
 *   put:
 *     summary: 댓글 수정
 *     description: 특정 댓글을 수정합니다.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: 수정할 댓글이 속한 업무 ID
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: 수정할 댓글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_content:
 *                 type: string
 *                 description: 수정할 댓글 내용
 *     responses:
 *       200:
 *         description: 댓글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "댓글이 수정되었습니다."
 *                 data:
 *                   type: object
 *                   description: 수정된 댓글 데이터
 */
TaskRouter.put(
  "/:taskId/comments/:commentId",
  authMiddleware,
  TaskController.updateComment
);

/**
 * @swagger
 * /tasks/{taskId}/comments/{commentId}:
 *   delete:
 *     summary: 댓글 삭제
 *     description: 특정 댓글을 삭제합니다.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: 댓글이 속한 업무 ID
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: 삭제할 댓글 ID
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "댓글이 삭제되었습니다."
 */
TaskRouter.delete(
  "/:taskId/comments/:commentId",
  authMiddleware,
  TaskController.deleteComment
);

export default TaskRouter;
