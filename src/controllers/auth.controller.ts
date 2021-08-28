import { Request, Response, NextFunction } from "express";
import errorHandler from "../utils/errorHandler";
import steamAuth from '../utils/steam';
import { User } from '../database';
import * as jwt from '../utils/jwt';

// Обработчик авторизации
export const steam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = await steamAuth.authenticate(req);
        let account = await User.findOne({ steamId: user.steamid });
        if(!account){
            account = await User.create({
                steamId: user.steamid,
                dinos: [],
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

        let token = jwt.gen({ steamId: user.steamid, name: user.username });
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