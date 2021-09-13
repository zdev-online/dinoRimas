import { body, query } from "express-validator";

export const buy = [
    body('product_id', 'Не указан product_id')
];

export const get = [
    query('page', 'Укажите page').toInt()
];

