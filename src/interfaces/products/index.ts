export interface IProductRequest { 
    name : string
    category_id: string
    seller_id: string
    price: number
    stock : number
    description : string
}

export interface IProduct { 
    id : string
    name : string
    category_id: string
    seller_id: string
    price: number
    stock : number
    description : string
    isActive : boolean
    createdAt: Date
    updatedAt: Date
}

export interface IProductUpdate { 
    name? : string
    price?: number
    stock? : number
    description? : string
}