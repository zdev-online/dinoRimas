import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    res.error = (statusCode: number, json: any) => res.status(statusCode).json(json);
    return next();
}