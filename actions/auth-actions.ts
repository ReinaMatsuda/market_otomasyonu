"use server";

import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!name || !email || !password) {
    return { error: "Tüm alanlar zorunludur" };
  }

  try {
    const client = await clientPromise;
    const db = client.db("Market");
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return { error: "Bu e-posta zaten kayıtlı" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return { success: "Kayıt başarılı, giriş yapabilirsiniz" };
  } catch (err) {
    console.error("Register error:", err);
    return { error: "Sunucu hatası oluştu" };
  }
}
