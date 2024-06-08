import { NextFunction, Request, Response } from 'express';
import catchAsync from '../middlewares/catchAsync';
import { identifyService } from '../services/identify';

export const identifyContact = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await identifyService(req.body);
        res.status(200).json({ result });
    }
);
