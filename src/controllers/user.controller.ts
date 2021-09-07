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
        let srvIdx: 'V3' | 'Thenyaw';
        let { dinoId, server } = req.body;

        if (server == 'V3') {
            srvIdx = 'V3';
        } else if (server == 'Thenyaw') {
            srvIdx = 'Thenyaw';
        } else {
            return res.error(400, { message: 'Неверный server' });
        }
        let dino = await Dinos.findOne({ dinoId: dinoId, steamId: req.user.steamId, server: srvIdx });
        if (!dino) { return res.error(400, { message: 'Неверный dinoId' }); }
        dino.Hunger = "99999";
        Servers[srvIdx].isOnline(req.user.steamId) && Servers[srvIdx].feed(req.user.steamId);
        await dino.save();
        return res.json({ message: 'Динозавр - накормлен', dino });
    } catch (e) {
        return errorHandler(res, e);
    }
}

// Напоить динозавра
export const drink = async (req: Request, res: Response, next: NextFunction) => {
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
            return res.error(400, { message: 'Неверный server' });
        }
        let dino = await Dinos.findOne({ dinoId: dinoId, steamId: req.user.steamId, server: srvIdx });
        if (!dino) { return res.error(400, { message: 'Неверный dinoId' }); }
        dino.Thirst = "9999";
        Servers[srvIdx].isOnline(req.user.steamId) && Servers[srvIdx].drink(req.user.steamId);
        await dino.save();
        return res.json({ message: 'Динозавр - напоен', dino });
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

        config.debug && console.log(`ServerIdx: ${srvIdx}`);
        config.debug && console.log(`DinoID: ${dinoId}`);

        let dino = await Dinos.findOne({ server: srvIdx, steamId: req.user.steamId, dinoId });
        if (!dino) {
            return res.error(400, { message: 'Неверный dinoId' });
        }

        if (!config.dinoColors[dino.CharacterClass]) { return res.error(400, { message: 'Тип динозавра не найден' }); }
        if (!config.dinoColors[dino.CharacterClass].SkinPaletteSection1.includes(req.body.color1)) {
            return res.error(400, { message: 'Неверный ID цвета #1', right_colors: config.dinoColors[dino.CharacterClass].SkinPaletteSection1 });
        }
        if (!config.dinoColors[dino.CharacterClass].SkinPaletteSection2.includes(req.body.color2)) {
            return res.error(400, { message: 'Неверный ID цвета #2', right_colors: config.dinoColors[dino.CharacterClass].SkinPaletteSection2 });
        }
        if (!config.dinoColors[dino.CharacterClass].SkinPaletteSection3.includes(req.body.color3)) {
            return res.error(400, { message: 'Неверный ID цвета #3', right_colors: config.dinoColors[dino.CharacterClass].SkinPaletteSection3 });
        }
        if (!config.dinoColors[dino.CharacterClass].SkinPaletteSection4.includes(req.body.color4)) {
            return res.error(400, { message: 'Неверный ID цвета #4', right_colors: config.dinoColors[dino.CharacterClass].SkinPaletteSection4 });
        }
        if (!config.dinoColors[dino.CharacterClass].SkinPaletteSection5.includes(req.body.color5)) {
            return res.error(400, { message: 'Неверный ID цвета #5', right_colors: config.dinoColors[dino.CharacterClass].SkinPaletteSection5 });
        }
        if (!config.dinoColors[dino.CharacterClass].SkinPaletteVariation.includes(req.body.pattern)) {
            return res.error(400, { message: 'Неверный ID pattern', right_colors: config.dinoColors[dino.CharacterClass].SkinPaletteVariation });
        }

        dino.SkinPaletteSection1 = req.body.color1;
        dino.SkinPaletteSection2 = req.body.color2;
        dino.SkinPaletteSection3 = req.body.color3;
        dino.SkinPaletteSection4 = req.body.color4;
        dino.SkinPaletteSection5 = req.body.color5;
        dino.SkinPaletteVariation = req.body.pattern;

        if (dino.isActive && Servers[srvIdx].exists(req.user.steamId) && !Servers[srvIdx].isOnline(req.user.steamId)) {
            Servers[srvIdx].changeColor(req.user.steamId, req.body);
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
        let { dinoId, server } = req.body;
        let srvIdx: 'V3' | 'Thenyaw';
        if (server == 'V3') {
            srvIdx = 'V3';
        } else if (server == 'Thenyaw') {
            srvIdx = 'Thenyaw';
        } else {
            return res.error(400, { message: 'Неверный server' });
        }

        if(Servers[srvIdx].isOnline(req.user.steamId)){ return res.error(403, { message: 'Динозавр - онлайн!' }); }

        let data = Servers[srvIdx].get(req.user.steamId);
        let now_active = await Dinos.findOne({ steamId: req.user.steamId, server: srvIdx, isActive: true });
        if(!now_active){ return res.error(400, { message: 'Неверный server или steamId' }); }

        now_active.isActive = false;
        await now_active.save();

        let activate = await Dinos.findOne({ steamId: req.user.steamId, server: srvIdx, dinoId });
        if(!activate){ return res.error(400, { message: 'Неверный dinoId' }); }
        activate.isActive = true;
        await activate.save();

        Servers[srvIdx].update(req.user.steamId, activate);

        return res.json({ message: 'Динозавр активирован', dino: activate });
    } catch (e) {
        return errorHandler(res, e);
    }
}