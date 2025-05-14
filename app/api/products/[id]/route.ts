import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = await clientPromise;
  const db = client.db("Market");

  const id = (await params).id;
  const product = await db
    .collection("products")
    .findOne({ _id: new ObjectId(id) });

  if (!product) {
    return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
  }

  return NextResponse.json({
    _id: product._id.toString(),
    name: product.name,
    stock: product.stock,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { stock } = await req.json();
  const id = (await params).id;

  if (typeof stock !== "number" || stock < 0) {
    return NextResponse.json(
      { error: "Geçersiz stok değeri" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db("Market");
  const result = await db
    .collection("products")
    .updateOne({ _id: new ObjectId(id) }, { $set: { stock } });

  return NextResponse.json({ success: "Stok güncellendi", result });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Geçersiz ürün ID'si" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("Market");

  const result = await db
    .collection("products")
    .deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return NextResponse.json(
      { error: "Ürün bulunamadı veya silinemedi" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: "Ürün başarıyla silindi" });
}
