// import { Router } from "express";
// import { authMiddleware } from "../../../middleware/auth.middleware";
// import TeamController from "./team.controller";

// const teamRouter = Router();

// teamRouter.get("/:id", authMiddleware, TeamController);

// export default teamRouter;

import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth.middleware";
import TeamController from "./team.controller";

const teamRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: 팀 관리 API
 */

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: 특정 팀 정보 조회
 *     description: 팀 ID를 기반으로 팀 정보를 조회하고, 해당 팀의 프로젝트와 각 프로젝트에 속한 태스크 정보를 반환합니다.
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 조회할 팀의 ID
 *     responses:
 *       200:
 *         description: 팀 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: 팀 ID
 *                 team_name:
 *                   type: string
 *                   description: 팀 이름
 *                 projects:
 *                   type: array
 *                   description: 팀에 속한 프로젝트 목록
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 프로젝트 ID
 *                       title:
 *                         type: string
 *                         description: 프로젝트 제목
 *                       created_AT:
 *                         type: string
 *                         format: date-time
 *                         description: 프로젝트 생성일
 *                       updated_AT:
 *                         type: string
 *                         format: date-time
 *                         description: 프로젝트 수정일
 *                       tasks:
 *                         type: array
 *                         description: 프로젝트에 속한 태스크 목록
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               description: 태스크 ID
 *                             title:
 *                               type: string
 *                               description: 태스크 제목
 *                             content:
 *                               type: string
 *                               description: 태스크 내용
 *                             status:
 *                               type: string
 *                               description: 태스크 상태
 *                             priority:
 *                               type: string
 *                               description: 태스크 우선순위
 *                             task_member_details:
 *                               type: array
 *                               description: 태스크에 참여한 팀원 정보
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                     description: 팀원 ID
 *                                   name:
 *                                     type: string
 *                                     description: 팀원 이름
 *                             comments:
 *                               type: array
 *                               description: 태스크에 달린 댓글 목록
 *                               items:
 *                                 type: string
 *                                 description: 댓글 ID
 *       404:
 *         description: 팀을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "팀을 찾을 수 없습니다."
 *       500:
 *         description: 서버 오류
 */
teamRouter.get("/:id", authMiddleware, TeamController);

export default teamRouter;
