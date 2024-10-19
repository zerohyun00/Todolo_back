// import { Request, Response, NextFunction } from "express";
// import { verifyToken } from "../utils/jwt";

// interface TokenPayload {
//   userId: string;
// }
// interface AuthenticatedRequest extends Request {
//   user?: { userId: string };
// }

// export const authMiddleware = (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ): void => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     res.status(401).json({ message: "토큰이 필요합니다." });
//     return;
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = verifyToken(token) as TokenPayload;

//     if (decoded.userId) {
//       res.locals.userId = decoded.userId;
//       next();
//     } else {
//       res.status(401).json({ message: "유효하지 않은 토큰입니다." });
//     }
//   } catch (error) {
//     res.status(401).json({ message: "유효하지 않은 토큰입니다." });
//   }
// };

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "./error.handler.middleware";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
}
interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Unauthorized", 401, "토큰이 필요합니다.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token) as TokenPayload;

    if (!decoded || !decoded.userId) {
      throw new AppError("Unauthorized", 401, "유효하지 않은 토큰입니다.");
    }

    res.locals.userId = decoded.userId;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError("Unauthorized", 401, "토큰이 만료되었습니다.");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError("Unauthorized", 401, "잘못된 토큰 형식입니다.");
    } else {
      throw new AppError("Unauthorized", 401, "유효하지 않은 토큰입니다.");
    }
  }
};
