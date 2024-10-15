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
 *     description: Headers에 Bearer token 필요, 새로운 업무를 생성합니다. (기존 프로젝트가 있으면 해당 프로젝트로 생성, 없으면 새로 프로젝트 생성)
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
 *                 example: "A project of C task"
 *               content:
 *                 type: string
 *                 description: 업무 내용
 *                 example: "A project of C task"
 *               projectTitle:
 *                 type: string
 *                 description: 기존 프로젝트 제목
 *                 example: "설마 바ㅜ낌용?"
 *               team_id:
 *                 type: string
 *                 description: 팀 ID
 *                 example: "670d1b7447bbb95d1a06fca4"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: 업무 시작일
 *                 example: "2024-10-15"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: 업무 종료일
 *                 example: "2024-10-20"
 *               priority:
 *                 type: string
 *                 description: 우선순위 (높음, 중간, 낮음)
 *                 example: "높음"
 *               status:
 *                 type: string
 *                 description: 상태 (할 일, 진행 중, 완료)
 *                 example: "할 일"
 *               taskMember:
 *                 type: array
 *                 description: 업무 할당 유저 ID 배열
 *                 items:
 *                   type: string
 *                 example: ["670d1b9547bbb95d1a06fca8", "670d1baf47bbb95d1a06fcb0", "670d1bcc47bbb95d1a06fcb8"]
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
 *                   properties:
 *                     user_id:
 *                       type: string
 *                       description: 업무 생성한 유저 ID
 *                       example: "670d38c3678f3611689915ba"
 *                     project_id:
 *                       type: string
 *                       description: 프로젝트 ID
 *                       example: "670e1f93617e939b3baf5356"
 *                     taskMember:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: 업무 할당된 유저들 ID 배열
 *                       example: ["670d1b9547bbb95d1a06fca8", "670d1baf47bbb95d1a06fcb0", "670d1bcc47bbb95d1a06fcb8"]
 *                     title:
 *                       type: string
 *                       description: 업무 제목
 *                       example: "A project of C task"
 *                     content:
 *                       type: string
 *                       description: 업무 내용
 *                       example: "A project of C task"
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       description: 업무 시작일
 *                       example: "2024-10-15T00:00:00.000Z"
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                       description: 업무 종료일
 *                       example: "2024-10-20T00:00:00.000Z"
 *                     status:
 *                       type: string
 *                       description: 업무 상태
 *                       example: "할 일"
 *                     priority:
 *                       type: string
 *                       description: 업무 우선순위
 *                       example: "높음"
 *                     _id:
 *                       type: string
 *                       description: 생성된 업무의 ID
 *                       example: "670e1f93617e939b3baf535a"
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *                       description: 댓글 배열
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: 생성된 시간
 *                       example: "2024-10-15T07:53:55.909Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: 마지막 업데이트 시간
 *                       example: "2024-10-15T07:53:55.909Z"
 *                     __v:
 *                       type: number
 *                       example: 0
 */
TaskRouter.post("/", authMiddleware, TaskController.createTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: 업무 수정
 *     description: 특정 업무를 수정합니다. Headers에 Bearer token 필요.
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
 *                 example: "Updated Task Title"
 *               content:
 *                 type: string
 *                 description: 업무 내용
 *                 example: "Updated task content."
 *               team_id:
 *                 type: string
 *                 description: 팀 ID
 *                 example: "670d1b7447bbb95d1a06fca4"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: 업무 시작일
 *                 example: "2024-10-16"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: 업무 종료일
 *                 example: "2024-10-30"
 *               priority:
 *                 type: string
 *                 description: 우선순위 (높음, 중간, 낮음)
 *                 example: "높음"
 *               status:
 *                 type: string
 *                 description: 업무 상태 (할 일, 진행중, 완료)
 *                 example: "진행 중"
 *               taskMember:
 *                 type: array
 *                 description: 업무 할당된 유저 ID 배열
 *                 items:
 *                   type: string
 *                 example: ["670d1b9547bbb95d1a06fca8", "670d1baf47bbb95d1a06fcb0", "670d1bcc47bbb95d1a06fcb8"]
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
 *                   properties:
 *                     user_id:
 *                       type: string
 *                       description: 업무 수정한 유저 ID
 *                       example: "670d38c3678f3611689915ba"
 *                     project_id:
 *                       type: string
 *                       description: 프로젝트 ID
 *                       example: "670e1f93617e939b3baf5356"
 *                     taskMember:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: 업무 할당된 유저들 ID 배열
 *                       example: ["670d1b9547bbb95d1a06fca8", "670d1baf47bbb95d1a06fcb0", "670d1bcc47bbb95d1a06fcb8"]
 *                     title:
 *                       type: string
 *                       description: 업무 제목
 *                       example: "Updated Task Title"
 *                     content:
 *                       type: string
 *                       description: 업무 내용
 *                       example: "Updated task content."
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       description: 업무 시작일
 *                       example: "2024-10-16"
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       description: 업무 종료일
 *                       example: "2024-10-30"
 *                     status:
 *                       type: string
 *                       description: 업무 상태
 *                       example: "진행 중"
 *                     priority:
 *                       type: string
 *                       description: 업무 우선순위
 *                       example: "높음"
 *                     _id:
 *                       type: string
 *                       description: 수정된 업무의 ID
 *                       example: "670e1f93617e939b3baf535a"
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *                       description: 댓글 배열
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: 생성된 시간
 *                       example: "2024-10-15T07:53:55.909Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: 마지막 업데이트 시간
 *                       example: "2024-10-15T07:53:55.909Z"
 *                     __v:
 *                       type: number
 *                       example: 0
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
 *               commentContent:
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
 *               commentContent:
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
