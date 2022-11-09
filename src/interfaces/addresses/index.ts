export interface IAddress {
  id: string;
  state: string;
  city: string;
  zipCode: string;
  district: string;
  road: string;
  number: string;
  complement?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddressRequest {
  state: string;
  city: string;
  zipCode: string;
  district: string;
  road: string;
  number: string;
  complement?: string;
}

export interface IAddressUpdate {
  state?: string;
  city?: string;
  zipCode?: string;
  district?: string;
  road?: string;
  number?: string;
  complement?: string;
}

export interface IAddressResponse {
  message: string;
  data: IAddress;
}

export interface IListAddressResponse {
  message: string;
  data: IAddress;
}
