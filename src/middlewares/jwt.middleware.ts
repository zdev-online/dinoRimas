import { NextFunction, Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import * as jwt from '../utils/jwt';

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        req.token   = '';
        req.user    = { steamId: '', name: '' };
        req.logged  = false;
        if (!req.headers.authorization) { return next(); }
        
        let { authorization } = req.headers;
        let token   = authorization.replace('Bearer ', '');
        
        req.user    = jwt.getUserData(token);
        req.token   = token;
        req.logged  = true;   
        return next();
    } catch (e) {
        return errorHandler(res, e);
    }
}