import { ObjectId } from "mongodb";

export type Sale = {
  _id: ObjectId;
  productId: ObjectId;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  userEmail: string;
  date: Date;
};
