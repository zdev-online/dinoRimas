import { NextFunction, Request, Response } from "express"

export const ifLogged = (req: Request, res: Response, next: NextFunction) => {
    if(!req.logged){ return res.error(401, { message: 'Не авторизирован' }); }
    return next();
}
export const ifNotLogged = (req: Request, res: Response, next: NextFunction) => {
    if(req.logged){ return res.error(403, { message: 'Действие запрещено' }); }
    return next();
}