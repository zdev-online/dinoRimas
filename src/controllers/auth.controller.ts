import { Request, Response, NextFunction } from "express";
import errorHandler from "../utils/errorHandler";
import steamAuth from '../utils/steam';
import { User, Dinos } from '../database';
import * as jwt from '../utils/jwt';
import Servers from '../modules/DinoServer';
import config from "../config";

// Обработчик авторизации
export const steam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = await steamAuth.authenticate(req);
        let account = await User.findOne({ steamId: user.steamid });
        if(!account){
            account = await User.create({
                steamId: user.steamid,
                name: user.username,
                realName: user.name,
                profile: user.profile,
                avatar: {
                    small: user.avatar.small,
                    medium: user.avatar.medium,
                    large: user.avatar.large
                }
            });
        }

        // Синхронизация и добавление динозавров в БД, если их нет
        let sync1 = await Servers.Thenyaw.sync(account.steamId, Dinos);
        sync1 && config.debug && console.log(`[Sync] Thenyaw - ${account.steamId}`);
        let sync2 = await Servers.V3.sync(account.steamId, Dinos);
        sync2 && config.debug && console.log(`[Sync] V3 - ${account.steamId}`);
        
        let token = jwt.gen({ steamId: user.steamid, name: user.username, id: account.id });
        return res.json({ message: 'Успешная авторизация', access_token: token });
    } catch(e){
        return errorHandler(res, e);
    }
}

// Получает стим-ссылку для авторизации
export const link = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let link = await steamAuth.getRedirectUrl();
        return res.json({ message: 'Ссылка для авторизации', link });
    } catch(e){
        return errorHandler(res, e);
    }
}

// Выход с аккаунта
export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ message: 'Вы успешно вышли из системы'});
    } catch (e) {
        return errorHandler(res, e);
    }
}

// Получить данные пользователя
export const user = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let steamId = req.user.steamId;
        let userData = await User.findOne({ steamId });
        return res.json({ message: 'Данные пользователя получены', data: userData });
    } catch(e){
        return errorHandler(res, e);
    }
}