import { IProducts } from '../../types';
import mongoose from '../database';

const ProductsSchema = new mongoose.Schema({
    product_type: { type: String, required: true },
    item_type: { type: String, required: true },
    cost: { type: Number, required: true },
    img: { type: String, required: false, default: '' },
    title: { type: String, reuired: true },
    desc: { type: String, required: false, default: '' },
    buy_count: { type: Number, required: false, default: 0 }
});

export default mongoose.model<IProducts>('Products', ProductsSchema, 'products');