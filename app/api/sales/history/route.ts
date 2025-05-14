import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Market");
    const sales = db.collection("sales");

    const result = await sales
      .find({ userEmail: session.user?.email })
      .sort({ date: -1 })
      .toArray();

    const mapped = result.map((s) => ({
      _id: s._id.toString(),
      productName: s.productName,
      quantity: s.quantity,
      total: s.total,
      date: s.date,
    }));

    return NextResponse.json(mapped);
  } catch (err) {
    console.error("Satış geçmişi hatası:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
