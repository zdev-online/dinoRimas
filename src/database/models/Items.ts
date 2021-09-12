import { IItems } from '../../types';
import mongoose from '../database';

const ItemsSchema = new mongoose.Schema({
    steamId: { type: String, required: true },
    item_type: { type: String, required: true },
    type: { type: String, required: true }
});

export default mongoose.model<IItems>('Items', ItemsSchema, 'items');