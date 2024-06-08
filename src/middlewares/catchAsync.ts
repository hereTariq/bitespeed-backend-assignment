import { Request, RequestHandler, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';

function catchAsync(passedFunction: RequestHandler) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(passedFunction(req, res, next)).catch(next);
    };
}

export default catchAsync;
