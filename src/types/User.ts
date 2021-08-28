import { DinoPlayers } from "./DinoPlayers";

export interface User {
    steamId: string;
    dinos: Array<DinoPlayers>;
    name: string;
    realName: string;
    profile: string;
    avatar: {
        small: string;
        medium: string;
        large: string;
    };
}