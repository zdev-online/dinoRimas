import { IStuff } from '../../types';
import mongoose from '../database';

const StuffSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    level: { type: Number, required: true },
    addBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model<IStuff>('Stuff', StuffSchema, 'stuff');