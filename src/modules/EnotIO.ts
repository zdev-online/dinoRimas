import { NextFunction, Request, Response } from "express";
import { IEnotIO } from "../types";
import md5 from 'md5';
import config from "../config";

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

    public paymentHandler(req: Request, res: Response, next: NextFunction) {
        try {
            let {
                merchant, amount, credited,
                intid, merchant_id, sign,
                sign_2, currency, payer_details,
                commission, custom_field
            } = req.body;

            let sign_check = md5(`${merchant}:${amount}:${config.enot_io.secret_word2}:${merchant_id}`);

            if(sign_check != sign){
                return res.json({ message: 'Неверная подпись оплаты' });
            }

            return res.json({ message: 'Успешная оплата' });
        } catch (e) {
            return res.error(500, { message: 'Ошибка сервера' });
        }
    }
}

export default new EnotIOPayments(config.enot_io); 