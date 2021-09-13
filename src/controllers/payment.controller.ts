import { Request, Response, NextFunction } from 'express'; 
import { Payments } from '../database';
import EnotIO from '../modules/EnotIO';
import { PayStatus } from '../types';
import errorHandler from '../utils/errorHandler';
import { validationResult } from 'express-validator';

export const create = async (req: Request, res: Response) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) { return res.error(400, { message: 'Ошибка валидации входных данных', errors: errors.array() }); }

        let { amount } = req.body;
        let payment = await Payments.create({
            user: req.user.id,
            status: PayStatus.waiting,
            amount,
            payment_id: new Date().getTime()
        });
        let new_pay_data = EnotIO.getPayDataAndLink(amount, payment.payment_id);
        return res.json(new_pay_data);
    } catch(e){
        return errorHandler(res, e);
    }
}