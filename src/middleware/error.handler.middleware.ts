// import { ErrorRequestHandler } from "express";

// export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
//   let [statusError, message] = err.message.split("+");
//   let statusCode: number;

//   if (!message && !statusError) {
//     message = "해당 접속 URL을 찾을 수 없습니다.";
//     statusError = "Not Found";
//   }

//   switch (statusError) {
//     case "Bad Request":
//       statusCode = 400;
//       break;
//     case "Not Found":
//       statusCode = 404;
//       break;
//     case "Forbidden":
//       statusCode = 403;
//       break;
//     case "Unauthorized":
//       statusCode = 401;
//       break;
//     default:
//       statusCode = 500;
//       message = "Internal Server Error";
//       console.error(err.stack);
//       break;
//   }

//   res.status(statusCode).json({ status_code: statusCode, message });
// };

// 한인호 코치님 코드리뷰 추천
import { ErrorRequestHandler } from "express";

export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: number,
    description: string,
    isOperational: boolean = true
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // console.error("에러 객체:", err);
  let statusCode = err instanceof AppError ? err.httpCode : 500;
  let message = err instanceof AppError ? err.message : "Internal Server Error";

  if (statusCode === 500) {
    console.error(err.stack);
  }

  res.status(statusCode).json({ status_code: statusCode, message });
};
