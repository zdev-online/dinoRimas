import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import config from "../config";
import { Dinos } from "../database";
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

// Получить динозавров
export const dinos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let errors = validationResult(req);
        if(!errors.isEmpty()){ return res.error(400, { message: 'Ошибка валидации входных данных', errors: errors.array() }); }
        if(!req.query || !req.query.server){ return res.error(400, { message: 'server - не указан' }); }
        if(!Object.keys(config.servers).includes(req.query.server)){
            return res.error(400, { message: 'Сервер не найден' });
        }
        let dinos = await Dinos.find({ steamId: req.user.steamId });
        return res.json({ dinos });
    } catch(e){
        return errorHandler(res, e);
    }
}

// Добавить динозавров
export const addDino = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let errors = validationResult(req);
        if(!errors.isEmpty()){ return res.error(400, { message: 'Ошибка валидации входных данных', errors: errors.array() }); }
    } catch(e){
        return errorHandler(res, e);
    }
}

// Активировать другой слот
export const activateDino = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let errors = validationResult(req);
        if(!errors.isEmpty()){ return res.error(400, { message: 'Ошибка валидации входных данных', errors: errors.array() }); }
    } catch(e){
        return errorHandler(res, e);
    }
}