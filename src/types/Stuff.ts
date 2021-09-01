import { IUser } from ".";

export interface Stuff {
    steamId: string;
    level: number;
    addBy: string | 'SYSTEM';
}