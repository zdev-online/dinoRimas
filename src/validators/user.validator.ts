import { body, query } from 'express-validator';

export const dinoPostStandart = [
    body('dinoId', 'dinoId - не указан'),
    body('server', 'server - не указан')
];

export const editColorValidate = [
    body('color1', 'color1 - не указан').toInt().isInt({ min: 0, max: 70 }).withMessage('color1 < 0 или color1 > 70'),
    body('color2', 'color2 - не указан').toInt().isInt({ min: 0, max: 70 }).withMessage('color2 < 0 или color2 > 70'),
    body('color3', 'color3 - не указан').toInt().isInt({ min: 0, max: 70 }).withMessage('color3 < 0 или color3 > 70'),
    body('color4', 'color4 - не указан').toInt().isInt({ min: 0, max: 70 }).withMessage('color4 < 0 или color4 > 70'),
    body('color5', 'color5 - не указан').toInt().isInt({ min: 0, max: 70 }).withMessage('color5 < 0 или color5 > 70'),
    body('pattern','pattern - не указан').toInt().isInt()
];

export const dinoGetStandart = [
    query('dinoId', 'dinoId - не указан'),
    query('server', 'server - не указан')
];

export const getDinos = [
    query('server', 'server - не указан')
];