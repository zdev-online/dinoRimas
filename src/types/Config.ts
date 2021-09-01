export interface Config {
    port: number;
    jwt_secret: string;
    steam: {
        realm: string;
        api_key: string;
        return_url: string;
    },
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
    }
}

