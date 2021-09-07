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
}