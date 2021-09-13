import express, { Express } from 'express';
import { Server as HTTPServer } from 'http';
import config from './config';
import mongoose from './database/database';
import init from './utils/init';

const app: Express = express();
const srv: HTTPServer = new HTTPServer(app);

(async () => {
    try {
        app.get('/9401631185714Ip3Fh_EG9hwFEo7lbgUR5yI6hbjRKhnt.txt', (req, res) => {
            res.sendFile(`${__dirname}\\9401631185714Ip3Fh_EG9hwFEo7lbgUR5yI6hbjRKhnt.txt`);
        });
        await init({ srv, app });
        config.debug && mongoose.modelNames().forEach(modelName => {
            if(modelName == 'User'){ return; }
            mongoose.models[modelName].deleteMany().catch(e => {
                console.error(`Не удалось очистить коллекцию ${modelName}: ${e.message}`);
            }).then(() => {
                console.log(`Коллекция ${modelName} - очищена!`);
            });
        });
    } catch(e){
        console.error(`Ошибка инициализации!`);
    }
})();
