export interface IProduct { 
    id : string
    name : string
    price: number
    stock : number
    description : string
    isActive : boolean
    createdAt: Date
    updatedAt: Date
};

export interface IProductRequest { 
    name : string
    categoryId: string
    sellerId: string
    price: number
    stock : number
    description : string
};

export interface IProductUpdate { 
    name? : string
    price?: number
    stock? : number
    description? : string
};

export interface IProductResponse {
    message: string,
    data: IProduct
};

export interface IListProducsResponse {
    message: string,
    data: IProduct[]
};
