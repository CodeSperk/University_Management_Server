import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //validation
      await schema.parseAsync({
        body: req.body,
      });

      next();
    } catch (err) {
      //error will send to the global error handler
      next(err);
    }
  };
};

export default validateRequest;
