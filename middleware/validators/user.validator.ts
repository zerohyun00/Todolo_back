import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const userValidator = {
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      // 이메일 형식은 유지, 비밀번호는 10자 이상, 특수문자 포함
      const schema = Joi.object({
        email: Joi.string()
          .email({
            minDomainSegments: 2,
          })
          .required(),

        password: Joi.string()
          .min(10) // 최소 10자
          .pattern(new RegExp('^(?=.*[!@#$%^&*])')) // 최소 하나의 특수문자 포함
          .required(),
      });

      const { error, value } = await schema.validateAsync(body);

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

        password: Joi.string().min(10).pattern(new RegExp('^(?=.*[!@#$%^&*])')).required(),
      });

      const { error, value } = await schema.validateAsync(body);

      if (error) throw new Error(`Bad Request+${error.message}`);

      next();
    } catch (e) {
      next(e);
    }
  },
};
