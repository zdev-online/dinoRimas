export interface Products {
    product_type: string;
    item_type: string;
    cost: number;
    img: string;
    title: string;
    desc: string;
    buy_count: number;
}

export const PRODUCT_TYPES = {
    DINO: 'dino',
    ITEM: 'item',
    CASE: 'case'
}