import { IStuff } from '../../types';
import mongoose from '../database';

const StuffSchema = new mongoose.Schema({
    steamId: { type: String, required: true },
    level: { type: Number, required: true },
    addBy: { type: String, required: true }
});

export default mongoose.model<IStuff>('Stuff', StuffSchema, 'stuff');
