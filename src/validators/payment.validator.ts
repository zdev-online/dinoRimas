import { body } from 'express-validator';

export const create = [
    body('amount', 'Не указан amount').toInt().isInt({ min: 10 })
];