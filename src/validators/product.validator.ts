import { body } from "express-validator";


export const buy = [
    body('product_id', 'Не указан product_id')
]