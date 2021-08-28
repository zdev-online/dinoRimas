import { NextFunction, Request, Response } from "express";
import moment from "moment";

export default (req: Request, res: Response, next: NextFunction) => {
    return res.error(404, {
        message: "Маршрут не существует",
        time: moment().format('DD.MM.YYYY, HH:mm:ss'),
        devBy: 'https://vk.com/id171745503'
    });
}