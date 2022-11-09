export interface IDelivery {
  id: string;
  address_id: string;
  delivery: boolean;
  receiver: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDeliveryRequest {
  address_id: string;
  receiver: string;
}

export interface IDeliveryResponse {
  message: string;
  data: IDelivery;
}

export interface IDeliveryUpdate {
  address_id: string;
  receiver?: string;
}
