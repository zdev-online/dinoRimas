import { Request, Response, NextFunction } from "express";
import config from "../config";
import { Products, User, Dinos, Items } from "../database";
import { PRODUCT_TYPES } from "../types/Products";
import errorHandler from "../utils/errorHandler";
import Servers from '../modules/DinoServer';

export const buy = async (req: Request, res: Response) => {
    try {
        let { product_id, server, count } = req.body;
        let product = await Products.findById(product_id);
        if (!product) {
            return res.error(404, { message: 'Товар с таким ID - не найден', product_id });
        }
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.error(403, { message: 'Пользователь не найден' });
        }

        if (user.money < product.cost) {
            return res.error(400, { message: 'Недостаточно монет' });
        }

        if (product.product_type == PRODUCT_TYPES.DINO) {
            if (!Object.keys(config.dinoColors).includes(product.item_type)) {
                return res.error(500, { message: 'Серверная ошибка', desc: 'Неизвестный вид динозавра' })
            }
            if (!server) {
                return res.error(400, { message: 'Укажите сервер для покупки динозавра' });
            }
            if (!['V3', 'Thenyaw'].includes(server)) {
                return res.error(400, { message: 'Неизвестный сервер' });
            }
            let dino_object: any = {};
            let count_dinos = await Dinos.countDocuments({ steamId: req.user.steamId, server });
            if (server == 'V3') {
                if (user.v3_slots + 1 > count_dinos) {
                    return res.error(400, { message: 'Недостаточно слотов' });
                }
                dino_object = Servers['V3'].getStandartDino(product.item_type, req.user.steamId);
            }
            if (server == 'Thenyaw') {
                if (user.thenyaw_slots + 1 > count_dinos) {
                    return res.error(400, { message: 'Недостаточно слотов' });
                }
                dino_object = Servers['Thenyaw'].getStandartDino(product.item_type, req.user.steamId);
            }
            await Dinos.create(dino_object);
        }

        if (product.product_type == PRODUCT_TYPES.ITEM) {
            if(!["heal","drink","teleport","change_gender"].includes(product.item_type)){
                return res.error(500, { message: 'Серверная ошибка', desc: 'Неизвестный тип предмета' });
            }
            await Items.create({ steamId: req.user.steamId, item_type: 'item', type: product.item_type });
        }
        if (product.product_type == PRODUCT_TYPES.CASE) {
            if(![''].includes(product.item_type)){
                return res.error(500, { message: 'Серверная ошибка', desc: 'Неизвестный тип кейсы' });
            }
            await Items.create({ steamId: req.user.steamId, item_type: 'case', type: product.item_type });
        }


        user.money -= product.cost;
        product.buy_count += 1;

        await user.save();
        await product.save();

        return res.json({ message: 'Товар успешно куплен' });
    } catch (e) {
        return errorHandler(res, e);
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        let { page } = req.query;
        let limit = 10;
        let products = await Products.find({}).limit(limit).skip(limit * Number(page));
        let count = await Products.countDocuments({});
        return res.json({ products, current_page: page, limit, pages: Math.floor(count / limit) });
    } catch (e) {
        return errorHandler(res, e);
    }
}