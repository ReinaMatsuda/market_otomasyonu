import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "employee";
  createdAt: Date;
};
