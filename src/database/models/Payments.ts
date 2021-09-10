import { IPayments, PayStatus } from '../../types';
import mongoose from '../database';

const PaymentsSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Types.ObjectId, ref: 'Products' },
    status: { type: String, required: false, default: PayStatus.waiting },
    amount: { type: Number, required: true },
    payment_id: { type: Number, required: true, unique: true }
});

export default mongoose.model<IPayments>("Payments", PaymentsSchema, 'payments');