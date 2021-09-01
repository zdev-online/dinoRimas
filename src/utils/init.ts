import { Express } from "express";
import { Server as HTTP } from "http";
import config from "../config";
import jwtMiddleware from "../middlewares/jwt.middleware";
import resAddFuncMiddleware from "../middlewares/resAddFunc.middleware";
import Routes from '../routes';
import helmet from 'helmet';
import cors from 'cors';

interface Options {
    app: Express;
    srv: HTTP;
}



export default async ({ srv, app }: Options) => {
    try {
        app.use(helmet());
        app.use(cors({ origin: '*' }));
        app.use(resAddFuncMiddleware);
        app.use(jwtMiddleware);
        app.use(Routes);
        app.use((req, res, next) => res.error(400, { message: 'Неизвестный путь' }));
        

        srv.listen(config.port, () => console.log(`Сервер успешно запущен на порту: ${config.port}`));
    } catch (e) {
        console.error(`Ошибка запуска сервера: ${e.message}\n${e.stack}`);
        return process.exit(-1);
    }
}

