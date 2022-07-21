export interface IProduct{
    _id: string;
    title: string;
    image: string;
    category: string;
    description: string;
    price: number;
}

export interface IProducts{
    products: [IProduct]
}