export interface ICategoryRequest {
  name: string;
  description: string;
}

export interface ICategory extends ICategoryRequest {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface ICreateCategoryResponse {
  message: string
  data: ICategory
}

export interface IListCategoryResponse {
  message: string
  data: ICategory[]
}