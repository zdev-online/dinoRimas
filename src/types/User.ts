export interface User {
    steamId: string;
    name: string;
    realName: string;
    profile: string;
    avatar: {
        small: string;
        medium: string;
        large: string;
    };
    money: number;
    v3_slots: number;
    thenyaw_slots: number;
}