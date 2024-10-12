import { Router } from "express";
import UserController from "./user.controller";
import { upload } from "../image/image.controller"; // Multer 설정
import { authMiddleware } from "../../../middleware/auth.middleware";

const userRouter = Router();

// userRouter.post("/register", UserController.register);

//가입
userRouter.post("/register", upload.single("avatar"), (req, res, next) => {
  UserController.register(req, res, next);
});

// 팀 확인
userRouter.post("/confirm-team/:token", UserController.confirmTeam);

// 로그인
userRouter.post("/login", UserController.logIn);

// 로그아웃
userRouter.post("/logout", UserController.logout);

// 유저 정보 업데이트 (비밀번호, 아바타, 팀 정보 업데이트)
userRouter.put(
  "/update/:userId",

  authMiddleware,
  UserController.updateUserInformation
);

// 특정 유저 검색 ( 이름으로 검색)
userRouter.get("/search", UserController.findUser);

// 모든 유저 검색
userRouter.get("/users", UserController.getAllUsers);

export default userRouter;
