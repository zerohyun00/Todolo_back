import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../error.handler.middleware";

export const userValidator = {
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      // 이메일, 비밀번호, 이름 검증
      const schema = Joi.object({
        name: Joi.string().min(2).max(10).required().messages({
          "string.empty": "이름을 입력해 주세요.",
          "string.min": "이름은 최소 2자 이상이어야 합니다.",
          "string.max": "이름은 최대 10자까지 가능합니다.",
          "any.required": "이름은 필수 항목입니다.",
        }),
        email: Joi.string()
          .email({
            minDomainSegments: 2,
          })
          .required()
          .messages({
            "string.empty": "이메일을 입력해 주세요.",
            "string.email": "유효한 이메일 주소를 입력해 주세요.",
            "any.required": "이메일은 필수 항목입니다.",
          }),
        password: Joi.string()
          .max(10)
          .pattern(new RegExp("^(?=.*[!@#$%^&*])"))
          .required()
          .messages({
            "string.empty": "비밀번호를 입력해 주세요.",
            "string.min": "비밀번호는 최대 9자까지 가능합니다.",
            "string.pattern.base": "비밀번호는 특수문자를 포함해야 합니다.",
            "any.required": "비밀번호는 필수 항목입니다.",
          }),
        avatar: Joi.any().optional(),
      });

      const { error } = await schema.validateAsync(body);

      if (error) {
        throw new AppError("ValidationError", 400, error.message);
      }

      next();
    } catch (err) {
      next(err);
    }
  },

  logIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      // 이메일, 비밀번호 검증
      const schema = Joi.object({
        email: Joi.string()
          .email({
            minDomainSegments: 2,
          })
          .required()
          .messages({
            "string.empty": "이메일을 입력해 주세요.",
            "string.email": "유효한 이메일 주소를 입력해 주세요.",
            "any.required": "이메일은 필수 항목입니다.",
          }),
        password: Joi.string()
          .max(9)
          .pattern(new RegExp("^(?=.*[!@#$%^&*])"))
          .required()
          .messages({
            "string.empty": "비밀번호를 입력해 주세요.",
            "string.max": "비밀번호는 최대 9자까지 가능합니다.",
            "string.pattern.base": "비밀번호는 특수문자를 포함해야 합니다.",
            "any.required": "비밀번호는 필수 항목입니다.",
          }),
      });

      const { error } = await schema.validateAsync(body);

      if (error) {
        throw new AppError("ValidationError", 400, error.message);
      }

      next();
    } catch (err) {
      next(err);
    }
  },
};
