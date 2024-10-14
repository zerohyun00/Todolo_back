import { Router } from 'express';
import UserController from './user.controller';
import { upload } from '../image/image.controller'; // Multer 설정
import { authMiddleware } from '../../../middleware/auth.middleware';
import { userValidator } from '../../../middleware/validators/user.validator';

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 관리 API
 */

//가입
userRouter.post('/register', userValidator.signUp, upload.single('avatar'), (req, res, next) => {
  UserController.register(req, res, next);
});

// 팀 확인
userRouter.post('/confirm-team/:token', UserController.confirmTeam);

// 비밀번호 재설정 요청
userRouter.post('/request-password-reset', UserController.requestPasswordReset);

// 비밀번호 재설정
userRouter.post('/reset-password/:token', UserController.resetPassword);

// 로그인
userRouter.post('/login', userValidator.logIn, UserController.logIn);

// 로그아웃
userRouter.post('/logout', UserController.logout);

// 유저 정보 업데이트 (비밀번호, 아바타 업데이트)
userRouter.put('/update/:userId', upload.single('avatar'), authMiddleware, UserController.updateUserInformation);

// 특정 유저 검색  이름으로 검색 (소속 팀 기준)
userRouter.get('/search', authMiddleware, UserController.findUser);

// 모든 유저 검색
userRouter.get('/users', UserController.getAllUsers);
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: 회원가입
 *     description: 새로운 유저를 등록하고 선택적으로 프로필 이미지를 업로드합니다.
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 유저 이름
 *               email:
 *                 type: string
 *                 description: 유저 이메일
 *               password:
 *                 type: string
 *                 description: 비밀번호
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: 프로필 이미지 (선택)
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회원가입 성공"
 *                 data:
 *                   type: object
 *                   description: 생성된 유저 정보
 */
userRouter.post('/register', upload.single('avatar'), (req, res, next) => {
  UserController.register(req, res, next);
});

/**
 * @swagger
 * /users/confirm-team/{token}:
 *   post:
 *     summary: 팀 소속 확인
 *     description: 이메일로 발송된 링크를 통해 팀 소속을 확인하고 업데이트합니다.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: 팀 확인 토큰
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team:
 *                 type: string
 *                 description: 팀 이름
 *     responses:
 *       200:
 *         description: 팀 소속 업데이트 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "팀 소속 업데이트 성공"
 *                 data:
 *                   type: object
 *                   description: 업데이트된 유저 정보
 */
userRouter.post('/confirm-team/:token', UserController.confirmTeam);

/**
 * @swagger
 * /users/request-password-reset:
 *   post:
 *     summary: 비밀번호 재설정 요청
 *     description: 비밀번호 재설정을 위한 이메일을 전송합니다.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 유저 이메일
 *     responses:
 *       200:
 *         description: 비밀번호 재설정 이메일 전송 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "비밀번호 재설정 이메일이 전송되었습니다."
 */
userRouter.post('/request-password-reset', UserController.requestPasswordReset);

/**
 * @swagger
 * /users/reset-password/{token}:
 *   post:
 *     summary: 비밀번호 재설정
 *     description: 토큰을 사용하여 비밀번호를 재설정합니다.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: 비밀번호 재설정 토큰
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: 새로운 비밀번호
 *     responses:
 *       200:
 *         description: 비밀번호 재설정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "비밀번호가 성공적으로 변경되었습니다."
 */
userRouter.post('/reset-password/:token', UserController.resetPassword);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: 로그인
 *     description: 유저 로그인 후 액세스 토큰과 리프레시 토큰을 반환합니다.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 유저 이메일
 *               password:
 *                 type: string
 *                 description: 비밀번호
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "로그인 성공"
 *                 data:
 *                   type: object
 *                   description: 로그인한 유저 정보
 *                 accessToken:
 *                   type: string
 *                   description: 발급된 액세스 토큰
 */
userRouter.post('/login', UserController.logIn);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: 로그아웃
 *     description: 유저를 로그아웃시키고 리프레시 토큰을 삭제합니다.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "로그아웃 성공"
 */
userRouter.post('/logout', authMiddleware, UserController.logout);

/**
 * @swagger
 * /users/update/{userId}:
 *   put:
 *     summary: 유저 정보 업데이트
 *     description: 유저의 비밀번호 또는 프로필 이미지를 업데이트합니다.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: 유저 ID
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: 새로운 비밀번호 (선택적)
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: 프로필 이미지 (선택적)
 *     responses:
 *       200:
 *         description: 유저 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "유저 정보 수정 성공"
 */
userRouter.put('/update/:userId', upload.single('avatar'), authMiddleware, UserController.updateUserInformation);

/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: 특정 유저 검색
 *     description: 팀 소속을 기준으로 유저 이름으로 검색합니다.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: searchInfo
 *         schema:
 *           type: string
 *         required: true
 *         description: 검색할 유저 이름
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: 한 페이지당 결과 수
 *     responses:
 *       200:
 *         description: 유저 검색 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "유저 검색 성공"
 *                 data:
 *                   type: array
 *                   description: 검색된 유저 목록
 */
userRouter.get('/search', authMiddleware, UserController.findUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 모든 유저 조회
 *     description: 등록된 모든 유저 목록을 조회합니다.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: 한 페이지당 결과 수
 *     responses:
 *       200:
 *         description: 유저 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "모든 유저 조회 성공"
 *                 data:
 *                   type: array
 *                   description: 유저 목록
 */
userRouter.get('/users', UserController.getAllUsers);

export default userRouter;
