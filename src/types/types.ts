import { ObjectId } from "mongodb";

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  images: string[];
  reviews:string[]
};
type DBUser = {
  _id: ObjectId;
  role: string;
  name: string;
  email: string;
}
