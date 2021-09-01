import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import config from "../config";
import { Dinos } from "../database";
import errorHandler from "../utils/errorHandler";
import Servers from '../modules/DinoServer';

// Покормить динозавра
export const eat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) { return res.error(400, { message: 'Ошибка валидации входных данных', errors: errors.array() }); }
    } catch (e) {
        return errorHandler(res, e);
    }
}

// Напоить динозавра
export const drink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) { return res.error(400, { message: 'Ошибка валидации входных данных', errors: errors.array() }); }
    } catch (e) {
        return errorHandler(res, e);
    }
}

// Сменить цвет динозавра
export const editColor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) { return res.error(400, { message: 'Ошибка валидации входных данных', errors: errors.array() }); }

        let srvIdx: 'V3' | 'Thenyaw';
        let { dinoId, server } = req.body;
        if (server == 'V3') {
            srvIdx = 'V3';
        } else if (server == 'Thenyaw') {
            srvIdx = 'Thenyaw';
        } else {
            return res.error(400, { message: 'Сервер не найден!' });
        }

        let dino = await Dinos.findOne({ server: srvIdx, steamId: req.user.steamId });
        if (!dino) {
            return res.error(400, { message: 'Неверный dinoId или server' });
        }

        if (!config.dinoColors[dino.CharacterClass].SkinPaletteSection1.includes(req.body.color1)) { return res.error(400, { message: 'Неверный ID цвета #1' }) }
        if (!config.dinoColors[dino.CharacterClass].SkinPaletteSection2.includes(req.body.color2)) { return res.error(400, { message: 'Неверный ID цвета #2' }) }
        if (!config.dinoColors[dino.CharacterClass].SkinPaletteSection3.includes(req.body.color3)) { return res.error(400, { message: 'Неверный ID цвета #3' }) }
        if (!config.dinoColors[dino.CharacterClass].SkinPaletteSection4.includes(req.body.color4)) { return res.error(400, { message: 'Неверный ID цвета #4' }) }
        if (!config.dinoColors[dino.CharacterClass].SkinPaletteSection5.includes(req.body.color5)) { return res.error(400, { message: 'Неверный ID цвета #5' }) }
        if (!config.dinoColors[dino.CharacterClass].SkinPaletteVariation.includes(req.body.pattern)) { return res.error(400, { message: 'Неверный ID pattern' }) }

        dino.SkinPaletteSection1 = req.body.color1;
        dino.SkinPaletteSection2 = req.body.color2;
        dino.SkinPaletteSection3 = req.body.color3;
        dino.SkinPaletteSection4 = req.body.color4;
        dino.SkinPaletteSection5 = req.body.color5;
        dino.SkinPaletteVariation = req.body.pattern;

        if (dino.isActive && Servers[srvIdx].exists(Number(req.user.steamId)) && !Servers[srvIdx].isOnline(Number(req.user.steamId))) {
            Servers[srvIdx].changeColor(Number(req.user.steamId), req.body);
        }
        await dino.save();

        return res.json({ message: 'Цвет динозавра успешно сменен', dino });
    } catch (e) {
        return errorHandler(res, e);
    }
}

// Получить динозавров
export const dinos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) { return res.error(400, { message: 'Ошибка валидации входных данных', errors: errors.array() }); }
        if (!req.query || !req.query.server) { return res.error(400, { message: 'server - не указан' }); }
        if (!Object.keys(config.servers).includes(String(req.query.server))) {
            return res.error(400, { message: 'Сервер не найден' });
        }

        let dinos = await Dinos.find({ steamId: req.user.steamId, server: String(req.query.server) });
        return res.json({ dinos });
    } catch (e) {
        return errorHandler(res, e);
    }
}

// Добавить динозавров
export const addDino = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) { return res.error(400, { message: 'Ошибка валидации входных данных', errors: errors.array() }); }
    } catch (e) {
        return errorHandler(res, e);
    }
}

// Активировать другой слот
export const activateDino = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) { return res.error(400, { message: 'Ошибка валидации входных данных', errors: errors.array() }); }

    } catch (e) {
        return errorHandler(res, e);
    }
}