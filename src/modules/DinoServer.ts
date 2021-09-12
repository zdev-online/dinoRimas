import fs from 'fs';
import path from 'path';
import { IChangeColor, IDinoServer, IDinoPlayers } from '../types';
import { Model } from 'mongoose';
import config from '../config';

class DinoServer {
    private path: string;
    private server: string;
    private coords: Array<Array<Number>>

    constructor(path_to_files: string, server: 'V3' | 'Thenyaw') {
        this.path = path_to_files;
        this.server = server;
        this.coords = [
            [-462282.156, -54966.359, -73247.383],
            [-517779.062, 128792.383, -70784.594],
            [-237888.953, 363150.5, -69253.328],
            [484007.688, 195747.594, -72550.602],
            [-21750.398, 85635.734, -68614.961],
            [46536.098, -186975.156, -65410.535],
            [-169665.875, -585717.5, -72682.609],
            [-588464.75, -229543.391, -32074.162],
            [-395896.844, -269987.312, -66561.102],
            [-191814.516, -373199.594, -40851.805],
            [13567.566, -404817.188, -42980.176],
            [107723.289, 283723.094, -40183.656],
            [-205974.016, -30537.402, -64633.398],
            [-410652.125, 471226.312, -29178.383],
            [-324573.219, 151895.031, -65705.188],
            [303773.5, -134582.484, -24480.203]
        ];
        this.genId = this.genId.bind(this);
        this.sync = this.sync.bind(this);
        this.isOnline = this.isOnline.bind(this);
        this.update = this.update.bind(this);
        this.get = this.get.bind(this);
        this.exists = this.exists.bind(this);
        this.heal = this.heal.bind(this);
        this.feed = this.feed.bind(this);
        this.drink = this.drink.bind(this);
        this.changeGender = this.changeGender.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.getRandomCoords = this.getRandomCoords.bind(this);
        this.getStandartDino = this.getStandartDino.bind(this);
    }

    public genId(): string {
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

    // Получить рандомные координаты в виде X=x Y=y Z=z
    private getRandomCoords(): string {
        let data = this.coords[Math.floor(Math.random() * this.coords.length)];
        return `X=${data[0]} Y=${data[1]} Z=${data[2]}`;
    }

    // Получить стандартый конфиг динозавра
    public getStandartDino(dino_type: string, steamId: string) {
        return {
            "CharacterClass": dino_type,
            "DNA": 'none',
            "Location_Isle_V3": this.getRandomCoords(),
            "Rotation_Isle_V3": "P=0.000000 Y=0.000000 R=0.000000",
            "Growth": "1.0",
            "Hunger": "99999",
            "Thirst": "99999",
            "Stamina": "99999",
            "Health": "99999",
            "BleedingRate": "0",
            "Oxygen": "99999",
            "bGender": false,
            "bIsResting": false,
            "bBrokenLegs": false,
            "ProgressionPoints": "0",
            "ProgressionTier": "0",
            "UnlockedCharacters": "",
            "CameraRotation_Isle_V3": "P=0.000000 Y=0.000000 R=0.000000",
            "CameraDistance_Isle_V3": "0",
            "SkinPaletteSection1": 0,
            "SkinPaletteSection2": 0,
            "SkinPaletteSection3": 0,
            "SkinPaletteSection4": 0,
            "SkinPaletteSection5": 0,
            "SkinPaletteSection6": 0,
            "SkinPaletteVariation": "6.0",
            "steamId": steamId,
            "dinoId": this.genId(),
            "isActive": false,
            "server": this.server
        }
    }
}

export default (() => ({
    V3: new DinoServer(config.servers.V3, 'V3'),
    Thenyaw: new DinoServer(config.servers.Thenyaw, 'Thenyaw')
}))();
