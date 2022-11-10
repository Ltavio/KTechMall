import { IAddress } from "../addresses";

export interface IDelivery {
  id: string;
  address: IAddress;
  delivery: boolean;
  receiver: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDeliveryRequest {
  addressId: string;
  receiver: string;
}

export interface IDeliveryResponse {
  message: string;
  data: IDelivery;
}

export interface IDeliveryUpdate {
  address: string;
  receiver?: string;
}
