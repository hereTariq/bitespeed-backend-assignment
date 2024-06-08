import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import ErrorHandler from '../utils/errorHandler';

const validate =
    (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
        const { value, error } = schema.validate(req.body);
        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(', ');
            return next(new ErrorHandler(422, errorMessage));
        }
        return next();
    };
export default validate;
