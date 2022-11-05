export interface ISellerRequest {
  companyName: string;
  cnpj: string;
  userId: string;
}

export interface ISellerUpdate {
  companyName?: string;
  cnpj?: string;
}
