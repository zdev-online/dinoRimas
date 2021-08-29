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
    start_stuff: { steamId: number; level: number; }[]
}

