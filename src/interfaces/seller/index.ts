export interface ISeller {
 companyName: string
 cnpj:string
 isActive: boolean
 createdAt: Date
 updatedAt: Date
}

export interface ISellerRequest {
  companyName: string;
  cnpj: string;
  userId: string;
}

export interface ISellerUpdate {
  companyName?: string;
  cnpj?: string;
}

export interface ISellerResponse {
  message: string
  data: ISeller
}
