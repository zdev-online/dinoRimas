import { Request, Response, NextFunction } from "express";

export default (required_level: number) => (req: Request, res: Response, next: NextFunction) => {
    if (req.isStuff && req.stuff.level >= required_level) {
        return next();
    }
    return res.error(403, { message: 'Действие запрещено', desc: "REQUIRED_LEVEL_CONTROL" });
}