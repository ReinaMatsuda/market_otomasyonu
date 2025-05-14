import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }

  const body = await req.json();
  const { productId, quantity } = body;

  if (!productId || !quantity || quantity < 1) {
    return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Market");
    const products = db.collection("products");
    const sales = db.collection("sales");

    const product = await products.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    if (product.stock < quantity) {
      return NextResponse.json({ error: "Yetersiz stok" }, { status: 400 });
    }

    const total = product.price * quantity;

    await sales.insertOne({
      productId: product._id,
      productName: product.name,
      quantity,
      price: product.price,
      total,
      userEmail: session.user?.email,
      date: new Date(),
    });

    await products.updateOne(
      { _id: new ObjectId(productId) },
      { $inc: { stock: -quantity } }
    );

    return NextResponse.json({ success: "Satış başarılı" });
  } catch (err) {
    console.error("Satış hatası:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
