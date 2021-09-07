import express, { Express } from 'express';
import { Server as HTTPServer } from 'http';
import config from './config';
import mongoose from './database/database';
import init from './utils/init';

const app: Express = express();
const srv: HTTPServer = new HTTPServer(app);

(async () => {
    try {
        await init({ srv, app });
        config.debug && mongoose.modelNames().forEach(modelName => {
            if(modelName == 'User'){ return; }
            // mongoose.models[modelName].deleteMany().catch(e => {
            //     console.error(`Не удалось очистить коллекцию ${modelName}: ${e.message}`);
            // }).then(() => {
            //     console.log(`Коллекция ${modelName} - очищена!`);
            // });
        });
    } catch(e){
        console.error(`Ошибка инициализации!`);
    }
})();
