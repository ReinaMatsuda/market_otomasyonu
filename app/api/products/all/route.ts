import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("Market");

  const products = await db.collection("products").find({}).toArray();

  const mapped = products.map((p) => ({
    _id: p._id.toString(),
    name: p.name,
    stock: p.stock,
    price: p.price,
    barcode: p.barcode,
    category: p.category || "",
  }));

  return NextResponse.json(mapped);
}
