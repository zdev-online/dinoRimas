import jwt from 'jsonwebtoken';
import config from '../config';

export const gen = (data: string | object | Buffer) => jwt.sign(data, config.jwt_secret, { algorithm: 'HS256' });

export const check = (token: string) => jwt.verify(token, config.jwt_secret, { algorithms: ['HS256'] });

export const getUserData = (token: string): { steamId: string; name: string; id: string } => {
    let data = JSON.parse(JSON.stringify(jwt.verify(token, config.jwt_secret, { algorithms: ['HS256'] })));
    return {
        steamId: data.steamId,
        name: data.name,
        id: data.id
    }
}