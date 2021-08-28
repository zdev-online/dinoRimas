import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import config from "../config";
import errorHandler from "../utils/errorHandler";

// Покормить динозавра
export const eat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let errors = validationResult(req);
        if(!errors.isEmpty()){ return res.error(400, { message: 'Ошибка валидации входных данных', errors: errors.array() }); }
    } catch(e){
        return errorHandler(res, e);
    }
}

// Напоить динозавра
export const drink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let errors = validationResult(req);
        if(!errors.isEmpty()){ return res.error(400, { message: 'Ошибка валидации входных данных', errors: errors.array() }); }
    } catch(e){
        return errorHandler(res, e);
    }
}

// Сменить цвет динозавра
export const editColor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let errors = validationResult(req);
        if(!errors.isEmpty()){ return res.error(400, { message: 'Ошибка валидации входных данных', errors: errors.array() }); }
    } catch(e){
        return errorHandler(res, e);
    }
}

