// import { Request, Response, NextFunction } from "express";

// export function errorHandler(
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   let [statusError, message] = err.message.split("+");
//   let statusCode;

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
//       console.log(err.stack);
//       break;
//   }

//   return res.status(statusCode).send({ status_code: statusCode, message });
// }

// // 참조 아 여기 뭔가 더 깔쌈하게 할 수 있는 방법 찾아보기

import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let [statusError, message] = err.message.split("+");
  let statusCode: number;

  if (!message && !statusError) {
    message = "해당 접속 URL을 찾을 수 없습니다.";
    statusError = "Not Found";
  }

  switch (statusError) {
    case "Bad Request":
      statusCode = 400;
      break;
    case "Not Found":
      statusCode = 404;
      break;
    case "Forbidden":
      statusCode = 403;
      break;
    case "Unauthorized":
      statusCode = 401;
      break;
    default:
      statusCode = 500;
      message = "Internal Server Error";
      console.error(err.stack);
      break;
  }

  res.status(statusCode).json({ status_code: statusCode, message });
};
