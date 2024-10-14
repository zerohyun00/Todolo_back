// import { Router } from "express";
// import ProjectController from "./project.controller";
// import { authMiddleware } from "../../../middleware/auth.middleware";

// const ProjectRouter = Router();

// // 프로젝트 생성

// ProjectRouter.post("/", authMiddleware, ProjectController.createProject);

// // 특정 유저 프로젝트 조회

// ProjectRouter.get("/:id", authMiddleware, ProjectController.findProjectByUser);

// // 프로젝트 수정

// ProjectRouter.put("/:id", authMiddleware, ProjectController.updateProject);

// // 모든 프로젝트 조회

// ProjectRouter.get("/", authMiddleware, ProjectController.getAllProjects);

// // 특정 프로젝트 삭제

// ProjectRouter.delete("/:id", authMiddleware, ProjectController.deleteProject);

// ProjectRouter.get(
//   "/user/:id",
//   authMiddleware,
//   ProjectController.findProjectWithTasksByUser
// );

// export default ProjectRouter;

import { Router } from "express";
import ProjectController from "./project.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const ProjectRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: 프로젝트 관리 API
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: 프로젝트 생성
 *     description: 새로운 프로젝트를 생성합니다.
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 프로젝트 제목
 *               team_id:
 *                 type: string
 *                 description: 프로젝트가 속한 팀 ID
 *     responses:
 *       201:
 *         description: 프로젝트 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "프로젝트 생성 성공"
 *                 data:
 *                   type: object
 *                   description: 생성된 프로젝트 데이터
 */
ProjectRouter.post("/", authMiddleware, ProjectController.createProject);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: 모든 프로젝트 조회
 *     description: 등록된 모든 프로젝트를 조회합니다.
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: 모든 프로젝트 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "모든 프로젝트 조회 성공"
 *                 data:
 *                   type: array
 *                   description: 조회된 프로젝트 목록
 */
ProjectRouter.get("/", authMiddleware, ProjectController.getAllProjects);

/**
 * @swagger
 * /projects/user/{id}:
 *   get:
 *     summary: 유저별 프로젝트 및 업무 조회
 *     description: 특정 유저의 프로젝트 및 그 안의 업무를 조회합니다.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 유저 ID
 *     responses:
 *       200:
 *         description: 프로젝트 및 업무 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "프로젝트 및 업무 조회 성공"
 *                 data:
 *                   type: array
 *                   description: 조회된 프로젝트 및 업무 목록
 */
ProjectRouter.get(
  "/user/:id",
  authMiddleware,
  ProjectController.findProjectWithTasksByUser
);

export default ProjectRouter;
