import { Response } from "express";
import { TokenExpiredError, NotBeforeError, JsonWebTokenError } from 'jsonwebtoken';
import { Error as MongoError } from 'mongoose';

export default (res: Response, e: Error | any) => {
    if(e instanceof TokenExpiredError){ return res.error(400, { message: 'Токен просрочен' }); }
    if(e instanceof NotBeforeError){ return res.error(400, { message: 'Неверный токен' }); }
    if(e instanceof JsonWebTokenError){ return res.error(400, { message: 'Неверный токен' }); }
    if(e instanceof MongoError.ValidatorError){ return res.error(400, { message: 'Ошибка ввода данных в базу', desc: e.name, error: e }); }
    if(e instanceof MongoError.ValidationError){ return res.error(400, { message: 'Ошибка ввода данных в базу', desc: e.name, error: e }); }

    if(e instanceof MongoError.CastError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }
    if(e instanceof MongoError.DivergentArrayError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }
    if(e instanceof MongoError.DocumentNotFoundError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }
    if(e instanceof MongoError.MissingSchemaError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }
    if(e instanceof MongoError.OverwriteModelError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }
    if(e instanceof MongoError.ParallelSaveError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }
    if(e instanceof MongoError.StrictModeError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }
    if(e instanceof MongoError.VersionError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }

    if(e.message.toUpperCase() == 'INVALID SIGNATURE'){ return res.error(400, { message: 'Неверная подпись Steam' }); }
    if(e.message.toUpperCase() == 'INVALID OR REPLAYED NONCE'){ return res.error(400, { message: 'Неверная подпись Steam' }); }


    console.error(`Server Error: ${e.message ? e.message : 'MESSAGE: null'}\n${e.stack ? e.stack : 'STACK: null'}\n${e.name ? e.name : ''}`);
    return res.error(500, { message: 'Серверная ошибка!', desc: "SERVER_ERROR" });
}