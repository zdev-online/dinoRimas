import { User } from "./User";

export interface Payments {
    user: User;
    status: string;
    amount: number;
    payment_id: number;
}

export const PayStatus =  {
    waiting: 'waiting',
    success: 'success',
    fail: 'fail'
}