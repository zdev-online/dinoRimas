declare namespace Express {
    export interface Request {
        token: string;
        user: {
            steamId: string;
            name: string;
        };
        logged: boolean;
    }
    export interface Response {
        error: (statusCode: number, json: any) => Response;
    }
}