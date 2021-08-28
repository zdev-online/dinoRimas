import { Response } from "express";
import { TokenExpiredError, NotBeforeError, JsonWebTokenError } from 'jsonwebtoken';
import { Error as MongoError } from 'mongoose';

export default (res: Response, e: Error) => {
    if(e instanceof TokenExpiredError){ return res.error(400, { message: 'Токен просрочен' }); }
    if(e instanceof NotBeforeError){ return res.error(400, { message: 'Неверный токен' }); }
    if(e instanceof JsonWebTokenError){ return res.error(400, { message: 'Неверный токен' }); }
    if(e instanceof MongoError.ValidatorError){ return res.error(400, { message: 'Серверная ошибка', desc: e.name, error: e }); }
    if(e instanceof MongoError.ValidationError){ return res.error(400, { message: 'Серверная ошибка', desc: e.name, error: e }); }

    if(e instanceof MongoError.CastError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }
    if(e instanceof MongoError.DivergentArrayError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }
    if(e instanceof MongoError.DocumentNotFoundError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }
    if(e instanceof MongoError.MissingSchemaError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }
    if(e instanceof MongoError.OverwriteModelError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }
    if(e instanceof MongoError.ParallelSaveError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }
    if(e instanceof MongoError.StrictModeError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }
    if(e instanceof MongoError.VersionError){ return res.error(500, { message: 'Серверная ошибка', desc: e.name }); }

    console.error(`Server Error: ${!e.message ? e + '\n' : ''}${e.message}\n${e.stack}`);
    return res.error(500, { message: 'Серверная ошибка!', desc: "SERVER_ERROR" });
}