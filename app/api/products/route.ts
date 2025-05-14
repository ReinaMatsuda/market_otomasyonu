import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Market");
    const products = await db
      .collection("products")
      .find({}, { projection: { name: 1, stock: 1 } })
      .toArray();

    const result = products.map((p) => ({
      _id: p._id.toString(),
      name: p.name,
      stock: p.stock,
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error("Ürünleri çekerken hata:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
