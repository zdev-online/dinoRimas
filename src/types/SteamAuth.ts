export interface SteamPlayer {
    _json: any;
    steamid: string;
    username: string;
    name: string;
    profile: string;
    avatar: {
        small: string;
        medium: string;
        large: string;
    }
}