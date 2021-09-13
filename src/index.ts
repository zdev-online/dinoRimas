import express, { Express } from 'express';
import { Server as HTTPServer } from 'http';
import config from './config';
import mongoose from './database/database';
import { PRODUCT_TYPES } from './types/Products';
import init from './utils/init';

const app: Express = express();
const srv: HTTPServer = new HTTPServer(app);

(async () => {
    try {
        await init({ srv, app });
        config.debug && mongoose.modelNames().forEach(modelName => {
            mongoose.models[modelName].deleteMany().catch(e => {
                console.error(`Не удалось очистить коллекцию ${modelName}: ${e.message}`);
            }).then(() => {
                console.log(`Коллекция ${modelName} - очищена!`);

                if(modelName == 'Products'){
                    for(let i = 0; i < 50; i++){
                        let item_type = Object.keys(config.dinoColors)[Math.floor(Math.random() * Object.keys(config.dinoColors).length)];
                        mongoose.models[modelName].create({
                            product_type: PRODUCT_TYPES.DINO,
                            item_type: item_type,
                            cost: 0,
                            img: '',
                            title: 'Дино',
                            desc: 'Динозавр',
                            buy_count: 0
                        }).catch(e => {
                            console.log(e);
                        }).then(() => {
                            mongoose.models[modelName].countDocuments().then(d => {
                                console.log(`Products count: ${d}`);
                            });
                        });
                    }
                    
                }

            });
        });
    } catch(e){
        console.error(`Ошибка инициализации!`);
    }
})();
