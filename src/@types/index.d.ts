declare namespace Express {
    export interface Request {
        token: string;
        user: {
            steamId: string;
            name: string;
            id: string;
        };
        logged: boolean;
        isStuff: boolean;
        stuff: {
            level: number;
            addBy: string | 'SYSTEM';
        }
    }
    export interface Response {
        error: (statusCode: number, json: any) => Response;
    }
}