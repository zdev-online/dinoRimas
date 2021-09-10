import { EnotIO } from "./EnotIO";

export interface Config {
    port: number;
    jwt_secret: string;
    steam: {
        realm: string;
        api_key: string;
        return_url: string;
    };
    enot_io: EnotIO;
    database_url: string;
    debug: boolean;
    start_stuff: { steamId: number; level: number; }[];
    dinoColors: {
        [key: string]: {
            SkinPaletteSection1: number[];
            SkinPaletteSection2: number[];
            SkinPaletteSection3: number[];
            SkinPaletteSection4: number[];
            SkinPaletteSection5: number[];
            SkinPaletteVariation: number[];
        }
    };
    servers: {
        V3: string;
        Thenyaw: string;
    }
}

