import { NextFunction, Request, Response } from "express";
import { IEnotIO, IPayments, IUser, PayStatus } from "../types";
import md5 from 'md5';
import config from "../config";
import { Model } from "mongoose";

class EnotIOPayments {

    private options: IEnotIO;

    constructor(options: IEnotIO) {
        this.options = options;
    }

    public getPayDataAndLink(order_amount: number, payment_id: number) {
        let data = {
            merchant_id: this.options.merchant_id,
            secret_word: this.options.secret_word,
            order_amount,
            payment_id,
            sign: ''
        };

        data.sign = md5(`${data.merchant_id}:${data.order_amount}:${data.secret_word}:${data.payment_id}`);
        return {
            data,
            link: `https://enot.io/pay?${Object.entries(data).map(x => x.map(encodeURIComponent).join('=')).join('&')}`
        };
    }

    public paymentHandler(Payments: Model<IPayments>, User: Model<IUser>) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                let {
                    merchant, amount, credited,
                    intid, merchant_id, sign,
                    sign_2, currency, payer_details,
                    commission, custom_field
                } = req.body;

                let sign_check = md5(`${merchant}:${amount}:${config.enot_io.secret_word2}:${merchant_id}`);

                if (sign_check != sign) {
                    return res.json({ message: 'Неверная подпись оплаты' });
                }
                let payment = await Payments.findOne({ payment_id: intid });
                if(!payment){ 
                    return res.error(400, { message: 'Покупка с таким ID не найдена' });
                }
                let user = await User.findById(payment.user);
                if(!user){ return res.error(400, { message: 'Пользовател не найден' }); }

                user.money += payment.amount;
                payment.status = PayStatus.success;
                
                await user.save();
                await payment.save();

                return res.json({ message: 'Успешная оплата' });
            } catch (e) {
                return res.error(500, { message: 'Ошибка сервера' });
            }
        }
    }
}

export default new EnotIOPayments(config.enot_io);