import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const userValidator = {
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      // 이메일, 비밀번호, 이름 검증
      const schema = Joi.object({
        name: Joi.string()
          .min(3) // 최소 3자
          .max(30) // 최대 30자
          .required()
          .messages({
            "string.empty": "이름을 입력해 주세요.",
            "string.min": "이름은 최소 3자 이상이어야 합니다.",
            "string.max": "이름은 최대 30자까지 가능합니다.",
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
          .min(10) // 최소 10자
          .pattern(new RegExp("^(?=.*[!@#$%^&*])")) // 최소 하나의 특수문자 포함
          .required()
          .messages({
            "string.empty": "비밀번호를 입력해 주세요.",
            "string.min": "비밀번호는 최소 10자 이상이어야 합니다.",
            "string.pattern.base": "비밀번호는 특수문자를 포함해야 합니다.",
            "any.required": "비밀번호는 필수 항목입니다.",
          }),

        // avatar 필드를 optional로 설정
        avatar: Joi.any().optional(),
      });

      const { error } = await schema.validateAsync(body);

      if (error) throw new Error(`Bad Request+${error.message}`);

      next();
    } catch (e) {
      next(e);
    }
  },

  logIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const schema = Joi.object({
        email: Joi.string()
          .email({
            minDomainSegments: 2,
          })
          .required(),

        password: Joi.string()
          .min(10)
          .pattern(new RegExp("^(?=.*[!@#$%^&*])"))
          .required(),
      });

      const { error, value } = await schema.validateAsync(body);

      if (error) throw new Error(`Bad Request+${error.message}`);

      next();
    } catch (e) {
      next(e);
    }
  },
};
