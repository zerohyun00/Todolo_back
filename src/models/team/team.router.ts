import { Router } from 'express';

import TeamController from './team.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const teamRouter = Router();

teamRouter.get('/:id', authMiddleware, TeamController);

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: 특정 팀 정보 조회
 *     description: Headers에 Bearer token 필요, 팀 ID를 기반으로 팀 정보를 조회하고, 해당 팀의 프로젝트와 각 프로젝트에 속한 태스크 정보를 반환합니다.
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
 *                   example: "670d1b7447bbb95d1a06fca4"
 *                 projects:
 *                   type: array
 *                   description: 팀에 속한 프로젝트 목록
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 프로젝트 ID
 *                         example: "670d20271cd6769c673a19da"
 *                       title:
 *                         type: string
 *                         description: 프로젝트 제목
 *                         example: "A project"
 *                       created_AT:
 *                         type: string
 *                         format: date-time
 *                         description: 프로젝트 생성일
 *                         example: "2024-10-14T13:44:07.466Z"
 *                       updated_AT:
 *                         type: string
 *                         format: date-time
 *                         description: 프로젝트 수정일
 *                         example: "2024-10-14T13:44:07.466Z"
 *                       tasks:
 *                         type: array
 *                         description: 프로젝트에 속한 태스크 목록
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               description: 태스크 ID
 *                               example: "670d20be1cd6769c673a19e8"
 *                             title:
 *                               type: string
 *                               description: 태스크 제목
 *                               example: "A project of B task"
 *                             content:
 *                               type: string
 *                               description: 태스크 내용
 *                               example: "A project of B task"
 *                             status:
 *                               type: string
 *                               description: 태스크 상태
 *                               example: "할 일"
 *                             priority:
 *                               type: string
 *                               description: 태스크 우선순위
 *                               example: "높음"
 *                             task_member_details:
 *                               type: array
 *                               description: 태스크에 참여한 팀원 정보
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                     description: 팀원 ID
 *                                     example: "670d1b9547bbb95d1a06fca8"
 *                                   name:
 *                                     type: string
 *                                     description: 팀원 이름
 *                                     example: "kimgang"
 *                                   email:
 *                                     type: string
 *                                     description: 팀원 이메일
 *                                     example: "kimgang@naver.com"
 *                             comments:
 *                               type: array
 *                               description: 태스크에 달린 댓글 목록
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   user_id:
 *                                     type: string
 *                                     description: 댓글 작성자 ID
 *                                     example: "670d1b6547bbb95d1a06fc9f"
 *                                   commentContent:
 *                                     type: string
 *                                     description: 댓글 내용
 *                                     example: "이것은 새로운 댓글입니다."
 *                                   createdAt:
 *                                     type: string
 *                                     format: date-time
 *                                     description: 댓글 생성일
 *                                     example: "2024-10-14T13:56:19.384Z"
 *                                   updatedAt:
 *                                     type: string
 *                                     format: date-time
 *                                     description: 댓글 수정일
 *                                     example: "2024-10-14T13:56:19.384Z"
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

export default teamRouter;
