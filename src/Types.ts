export interface IUser {
  _id: string;
  name: string;
  created_at: Date;
}

export interface ICar {
  _id: string;
  owner: string;
  brand: string;
  model: string;
  year: number;
  kms: number;
  color: string;
  price: number;
  modifications: string[];
  damaged_parts: string[];
}

export interface IUserWithCars extends IUser {
  cars: ICar[];
}
