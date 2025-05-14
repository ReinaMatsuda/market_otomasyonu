"use server";

import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";

export async function addProduct(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Giriş yapmalısınız" };

  const name = formData.get("name")?.toString();
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const barcode = formData.get("barcode")?.toString();
  const description = formData.get("description")?.toString();
  const category = formData.get("category")?.toString();

  if (!name || !price || !stock || !barcode || !category) {
    return { error: "Tüm alanlar zorunludur" };
  }

  try {
    const client = await clientPromise;
    const db = client.db("Market");
    const products = db.collection("products");

    const existingProduct = await products.findOne({ barcode });
    if (existingProduct) {
      return { error: "Bu barkoda numarasına sahip bir ürün zaten mevcut" };
    }

    await products.insertOne({
      name,
      price,
      stock,
      barcode,
      description,
      createdAt: new Date(),
      category,
      userId: session.user?.email,
    });

    return { success: "Ürün başarıyla eklendi" };
  } catch (err) {
    console.error(err);
    return { error: "Sunucu hatası oluştu" };
  }
}
