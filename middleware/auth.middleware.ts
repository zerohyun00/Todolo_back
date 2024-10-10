// import { Request, Response, NextFunction } from "express";
// import { verifyToken } from "../src/utils/jwt";

// export const authMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ message: "토큰이 필요합니다." });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = verifyToken(token);
//     // as { userId: string };

//     if (typeof decoded === "object" && decoded.userId) {
//       req.user = decoded;
//       next();
//     } else {
//       return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
//     }
//   } catch (error) {
//     return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
//   }
// };

/*
 위 코드는 req를 글로벌로 확장했을 시 사용할 수 있는 코드
 아래 코드는 res 제네릭

*/

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../src/utils/jwt";

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
    res.status(401).json({ message: "토큰이 필요합니다." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token) as TokenPayload;

    if (decoded.userId) {
      req.user = { userId: decoded.userId };
      next();
    } else {
      res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    }
  } catch (error) {
    res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
};
