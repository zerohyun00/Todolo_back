import express, { NextFunction, Request, Response } from "express";
import UserService from "./user.service";
import { AppError } from "../../middleware/error.handler.middleware";
import path from "path";
import { generateToken, verifyToken } from "../../utils/jwt";

const UserController = {
  register: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { ...userData } = req.body;
      const filePath = req.file?.path;

      let imageUrl;
      if (filePath) {
        imageUrl = `${req.protocol}://${req.get(
          "host"
        )}/uploads/${path.basename(filePath)}`;
      }

      const newUser = await UserService.register(userData, imageUrl);

      res.status(201).send({ message: "회원가입 성공", data: newUser });
    } catch (err) {
      next(err);
    }
  },

  sendTeamConfirmationEmail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.userId;

      if (!userId) {
        throw new AppError(
          "Bad Request",
          400,
          "유효한 사용자 ID를 입력해 주세요"
        );
      }

      const user = await UserService.findById(userId);
      if (!user) {
        throw new AppError("Not Found", 404, "사용자를 찾을 수 없습니다.");
      }

      const token = user.invitationToken;

      if (!token) {
        throw new AppError(
          "Unauthorized",
          401,
          "초대 토큰이 없습니다. 다시 시도하세요."
        );
      }

      await UserService.sendTeamConfirmationEmail(user, token);

      res
        .status(200)
        .send({ message: "팀 소속 확인 이메일이 전송되었습니다." });
    } catch (err) {
      next(err);
    }
  },

  confirmTeam: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, team } = req.body;

      const updatedUser = await UserService.confirmTeam(token, team);
      res
        .status(200)
        .send({ message: "팀 소속 업데이트 성공", data: updatedUser });
    } catch (err) {
      next(err);
    }
  },

  logIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken, team } = await UserService.logIn(
        email,
        password
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).send({
        message: "로그인 성공",
        data: {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          team: team,
        },
        accessToken,
        // refreshToken,
      });
    } catch (err) {
      next(err);
    }
  },

  refreshAccessToken: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).send({ message: "리프레시 토큰이 필요합니다." });
        return;
      }

      const decoded = verifyToken(refreshToken);
      const userId = (decoded as any).userId;

      const newAccessToken = generateToken(userId);
      res.status(200).send({ accessToken: newAccessToken });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        res.status(400).send({ message: "로그아웃할 유저가 없습니다." });
      }
      await UserService.logout(refreshToken);
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.status(200).send({ message: "로그아웃 성공" });
    } catch (err) {
      next(err);
    }
  },

  requestPasswordReset: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;

      await UserService.requestPasswordReset(email);
      res
        .status(200)
        .send({ message: "비밀번호 재설정 이메일이 전송되었습니다." });
    } catch (err) {
      next(err);
    }
  },

  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, newPassword } = req.body;

      await UserService.resetPassword(token, newPassword);
      res
        .status(200)
        .send({ message: "비밀번호가 성공적으로 변경되었습니다." });
    } catch (err) {
      next(err);
    }
  },

  // updateUserInformation: async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const { userId } = req.params;
  //     const updateData = req.body;

  //     if (req.file) {
  //       updateData.avatar = req.file.path;
  //     }

  //     await UserService.updateUserInformation(userId, updateData);
  //     res.status(200).send({ message: "유저 정보 수정 성공" });
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  updateUserAvatar: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = res.locals.userId;

      if (!req.file) {
        res.status(400).send({ message: "프로필 이미지가 필요합니다." });
        return;
      }

      const avatarPath = req.file.path;
      await UserService.updateUserAvatar(userId, avatarPath);

      res
        .status(200)
        .send({ message: "프로필 이미지가 성공적으로 수정되었습니다." });
    } catch (err) {
      next(err);
    }
  },

  updateUserPassword: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = res.locals.userId;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        res
          .status(400)
          .send({ message: "현재 비밀번호와 새로운 비밀번호가 필요합니다." });
        return;
      }

      const result = await UserService.updateUserPassword(
        userId,
        currentPassword,
        newPassword
      );

      if (result.status === "error") {
        res.status(401).send({ message: result.message });
      } else {
        res.status(200).send({ message: result.message });
      }
    } catch (err) {
      next(err);
    }
  },

  findUser: async (
    req: Request,
    res: Response<{ message: string; data?: any }>,
    next: NextFunction
  ) => {
    try {
      const { searchInfo } = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const userId = res.locals.userId;

      const users = await UserService.getUser(
        searchInfo as string,
        userId,
        page,
        limit
      );
      res.status(200).send({ message: "유저 검색 성공", data: users });
    } catch (e) {
      next(e);
    }
  },

  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const users = await UserService.getAllUsers(page, limit);
      res.status(200).send({ message: "모든 유저 조회 성공", data: users });
    } catch (err) {
      next(err);
    }
  },

  getUserByToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.userId;
      const user = await UserService.findById(userId);
      if (!user) {
        throw new AppError("Not Found", 404, "사용자를 찾을 수 없습니다.");
      }

      res.status(200).send({
        message: "유저 정보 조회 성공",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};

export default UserController;
