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

/*


import { ErrorRequestHandler } from "express";


export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;  statusCode가 있으면 사용, 없으면 500
  let message = err.message || "Internal Server Error";  

  if (statusCode === 500) {
    console.error(err.stack);  
  }

  res.status(statusCode).json({ status_code: statusCode, message });
};

// 에러 발생 시 상태 코드와 함께 에러를 던지는 방법
// 예시: Bad Request 에러를 발생시키는 부분
if (!someCondition) {
  const error = new Error("Bad Request");  
  (error as any).statusCode = 400;  
  next(error);  
}


*/
