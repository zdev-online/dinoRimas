import fs from 'fs';
import path from 'path';
import { IChangeColor, IDinoServer, IDinoPlayers } from '../types';
import { Model } from 'mongoose';
import config from '../config';

class DinoServer {
    private path: string;
    private server: string;

    constructor(path_to_files: string, server: 'V3' | 'Thenyaw') {
        this.path = path_to_files;
        this.server = server;
        this.isOnline = this.isOnline.bind(this);
        this.update = this.update.bind(this);
        this.get = this.get.bind(this);
        this.exists = this.exists.bind(this);
        this.genId = this.genId.bind(this);
        this.sync = this.sync.bind(this);
    }

    private genId(): string {
        return [...Array(20)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
    }

    // Синхронизировать динозавров
    public async sync(steamId: string, model: Model<IDinoPlayers>): Promise<Boolean> {
        if (this.exists(steamId)) {
            let data = this.get(steamId);
            if (!data.dinoId) {
                data.dinoId = this.genId();
                await model.create({ ...data, steamId, isActive: true, server: this.server });
                this.update(steamId, data);
                return true;
            } else {
                await model.findOneAndUpdate({ dinoId: data.dinoId }, { ...data });
                return false;
            }
        }
        console.log(`Файл ${steamId}.json - не найден!`)
        return false;
    }

    // "Онлайн" ли пользователь
    public isOnline(steamId: string): boolean {
        let stats = fs.statSync(path.join(this.path, `${steamId}.json`));
        return Math.abs(Math.floor(stats.mtimeMs) - Math.floor(new Date().getTime())) < 1000 * 60 * 6;
    }

    // Обновить файл пользователя
    public update(steamId: string, data: IDinoServer): IDinoServer {
        fs.writeFileSync(path.join(this.path, `${steamId}.json`), JSON.stringify(data), { encoding: 'utf-8' });
        return data;
    }

    // Получить файл пользователя
    public get(steamId: string): IDinoServer {
        let data = JSON.parse(fs.readFileSync(path.join(this.path, `${steamId}.json`), { encoding: 'utf-8' }));
        return data;
    }

    // Существует ли файл пользователя
    public exists(steamId: string): boolean {
        return fs.existsSync(path.join(this.path, `${steamId}.json`));
    }

    // Вылечить
    public heal(steamId: string) {
        let data = this.get(steamId);
        data.Health = '99999'
        data.BleedingRate = '0'
        data.bIsResting = false
        data.bBrokenLegs = false
        return this.update(steamId, data);
    }

    // Накормить
    public feed(steamId: string) {
        let data = this.get(steamId);
        data.Hunger = '99999';
        return this.update(steamId, data);
    }

    // Напоить
    public drink(steamId: string) {
        let data = this.get(steamId);
        data.Thirst = '9999';
        return this.update(steamId, data);
    }

    // Сменить гендер
    public changeGender(steamId: string) {
        let data = this.get(steamId);
        data.bGender = !data.bGender;
        return this.update(steamId, data);
    }

    // Сменить цвет
    public changeColor(steamId: string, colors: IChangeColor) {
        let data = this.get(steamId);
        data.SkinPaletteSection1 = colors.color1;
        data.SkinPaletteSection2 = colors.color2;
        data.SkinPaletteSection3 = colors.color3;
        data.SkinPaletteSection4 = colors.color4;
        data.SkinPaletteSection5 = colors.color5;
        data.SkinPaletteSection6 = 0;
        data.SkinPaletteVariation = colors.pattern;
        return this.update(steamId, data);
    }

}

export default (() => ({
    V3: new DinoServer(config.servers.V3, 'V3'),
    Thenyaw: new DinoServer(config.servers.Thenyaw, 'Thenyaw')
}))();
