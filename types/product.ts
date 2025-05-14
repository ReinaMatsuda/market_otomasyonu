import { ObjectId } from "mongodb";

export type Product = {
  _id: ObjectId;
  name: string;
  price: number;
  stock: number;
  barcode: string;
  description?: string;
  createdAt: Date;
  userId: string;
  category?: string
};