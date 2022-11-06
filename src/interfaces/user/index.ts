export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  cellphone: number;
  isActive: boolean;
  isAdm: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  cellphone: number;
};


export interface IUserLogin {
  email: string;
  password: string;
};

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  cellphone?: number;
};

export interface IUserResponse {
  message: string,
  data: IUser
};

export interface IListUserResponse {
  message: string,
  data: IUser[]
};
