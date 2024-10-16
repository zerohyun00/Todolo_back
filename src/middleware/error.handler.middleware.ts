// 한인호 코치님 코드리뷰 추천
// import { ErrorRequestHandler } from "express";

// export class AppError extends Error {
//   public readonly name: string;
//   public readonly httpCode: number;
//   public readonly isOperational: boolean;

//   constructor(
//     name: string,
//     httpCode: number,
//     description: string,
//     isOperational: boolean = true
//   ) {
//     super(description);
//     Object.setPrototypeOf(this, new.target.prototype);

//     this.name = name;
//     this.httpCode = httpCode;
//     this.isOperational = isOperational;

//     Error.captureStackTrace(this);
//   }
// }

// export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
//   // console.error("에러 객체:", err);
//   let statusCode = err instanceof AppError ? err.httpCode : 500;
//   let message = err instanceof AppError ? err.message : "Internal Server Error";

//   if (statusCode === 500) {
//     console.error(err.stack);
//   }

//   res.status(statusCode).json({ status_code: statusCode, message });
// };

import { ErrorRequestHandler } from "express";
import Joi from "joi";

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
  let statusCode = err instanceof AppError ? err.httpCode : 500;
  let message = err instanceof AppError ? err.message : "Internal Server Error";

  if (Joi.isError(err)) {
    statusCode = 400;
    message = err.details[0].message;
  }

  if (statusCode === 500) {
    console.error(err.stack);
  }

  res.status(statusCode).json({ status_code: statusCode, message });
};
