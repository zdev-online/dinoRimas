import fs from 'fs';
import path from 'path';
import { IConfig } from '../types';

const defaultConfig: IConfig = {
    port: 3000,
    jwt_secret: '',
    steam: {
        return_url: 'http://localhost:3000/auth/steam',
        realm: 'http://localhost:3000/',
        api_key: ''
    },
    enot_io: {
        merchant_id: 0,
        secret_word: '',
        secret_word2: ''
    },
    database_url: "mongodb://localhost:27017/dino_rimas",
    debug: false,
    start_stuff: [],
    dinoColors: {},
    servers: {
        V3: '',
        Thenyaw: ''
    }
}

if (!fs.existsSync(path.resolve(__dirname, './', 'config.json'))) {
    fs.writeFileSync(path.resolve(__dirname, './', 'config.json'), JSON.stringify(defaultConfig, null, 4), { encoding: 'utf-8' });
}

export default ((): IConfig => JSON.parse(fs.readFileSync(path.resolve(__dirname, './', 'config.json'), { encoding: 'utf-8' })))();