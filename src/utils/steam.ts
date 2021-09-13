import axios from "axios";
import { Request } from "express";
import openid from 'openid';
import config from "../config";
import { ISteamPlayer } from "../types";

interface Options {
    realm: string;
    returnUrl: string;
    apiKey: string;
}

class SteamAuth {
    private realm: string;
    private returnUrl: string;
    private apiKey: string;
    private relyingParty: openid.RelyingParty;

    constructor({ realm, returnUrl, apiKey }: Options) {
        if (!realm || !returnUrl || !apiKey) {
            throw new Error("Укажите все параметры: realm, returnUrl, apiKey!");
        }

        this.realm = realm;
        this.returnUrl = returnUrl;
        this.apiKey = apiKey;
        this.relyingParty = new openid.RelyingParty(
            returnUrl,
            realm,
            true,
            true,
            []
        );
    }

    async getRedirectUrl(): Promise<string> {
        return new Promise((ok, err) => {
            this.relyingParty.authenticate(
                "https://steamcommunity.com/openid",
                false,
                (error, authUrl) => {
                    if (error) return err(new Error("Ошибка авторизации: " + error.message));
                    if (!authUrl) return err(new Error("Ошибка авторизации"));

                    return ok(authUrl);
                }
            );
        });
    }

    private async fetchIdentifier(steamOpenId: string): Promise<ISteamPlayer> {
        return new Promise(async (ok, err) => {
            try {
                const steamId = steamOpenId.replace("https://steamcommunity.com/openid/id/", "");

                const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${this.apiKey}&steamids=${steamId}`);
                const players = response.data && response.data.response && response.data.response.players;

                if (players && players.length > 0) {
                    const player = players[0];

                    return ok({
                        _json: player,
                        steamid: steamId,
                        username: player.personaname,
                        name: player.realname,
                        profile: player.profileurl,
                        avatar: {
                            small: player.avatar,
                            medium: player.avatarmedium,
                            large: player.avatarfull
                        }
                    });
                } else {
                    return err(new Error("Неверный SteamID"));
                }
            } catch (error) {
                return err(new Error("Ошибка серверов Steam: " + error.message ? error.message : ''));
            }
        });
    }

    async authenticate(req: Request): Promise<ISteamPlayer> {
        return new Promise((ok, err) => {
            this.relyingParty.verifyAssertion(req, async (error, result) => {
                try {
                    if (error) return err(error);
                    if (!result || !result.authenticated || !result.claimedIdentifier) {
                        return err(new Error('Ошибка авторизации'));
                    }
                    if (!/^https?:\/\/steamcommunity\.com\/openid\/id\/\d+$/.test(result.claimedIdentifier)) {
                        return err(new Error("ClaimedID - неверный"));
                    }
                    const user = await this.fetchIdentifier(result.claimedIdentifier);
                    return ok(user);
                } catch (error) {
                    return err(error);
                }
            });
        });
    }
}


export default new SteamAuth({
    realm: config.steam.realm,
    returnUrl: config.steam.return_url,
    apiKey: config.steam.api_key
});
