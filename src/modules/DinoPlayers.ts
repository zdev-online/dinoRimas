import fs from 'fs';
import path from 'path';
import { IDinoPlayers } from '../types';

class DinoPlayers {
    private path: string;

    constructor(path_to_files: string) {
        this.path = path_to_files;
        this.isOnline = this.isOnline.bind(this);
        this.update = this.update.bind(this);
        this.get = this.get.bind(this);
        this.exists = this.exists.bind(this);

        console.log(path.join(this.path, '1.json'))
    }

    // "Онлайн" ли пользователь
    public isOnline(steamId: number): boolean {
        let stats = fs.statSync(path.join(this.path, `${steamId}.json`));
        return Math.abs(Math.floor(stats.mtimeMs) - Math.floor(new Date().getTime())) < 1000 * 60 * 6;
    }

    // Обновить файл пользователя
    private update(steamId: number, data: IDinoPlayers): IDinoPlayers {
        fs.writeFileSync(path.join(this.path, `${steamId}.json`), JSON.stringify(data), { encoding: 'utf-8' });
        return data;
    }

    // Получить файл пользователя
    private get(steamId: number): IDinoPlayers {
        let data = JSON.parse(fs.readFileSync(path.join(this.path, `${steamId}.json`), { encoding: 'utf-8' }));
        return data;
    }

    // Существует ли файл пользователя
    public exists(steamId: number): boolean {
        return fs.existsSync(path.join(this.path, `${steamId}.json`));
    }

    // Вылечить
    public heal(steamId: number){
        let data = this.get(steamId);
        data.Health = '99999'
        data.BleedingRate = '0'
        data.bIsResting = false
        data.bBrokenLegs = false
        return this.update(steamId, data);
    }

    // Накормить
    public feed(steamId: number){
        let data = this.get(steamId);
        data.Hunger = '99999';
        return this.update(steamId, data);
    }
    
    // Напоить
    public drink(steamId: number){
        let data = this.get(steamId);
        data.Thirst = '9999';
        return this.update(steamId, data);
    }

    // Сменить гендер
    public changeGender(steamId: number){
        let data = this.get(steamId);
        data.bGender = !data.bGender;
        return this.update(steamId, data);
    }

    // Сменить цвет
    public changeColor(steamId: number){
        let data = this.get(steamId);
        // Какие параметры отвечают за цвета?
        return this.update(steamId, data);
    }

}

export default DinoPlayers;