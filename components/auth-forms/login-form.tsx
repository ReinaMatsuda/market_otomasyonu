"use client";

import { useState } from "react";
import { Input, Button, Typography, message } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setErrorMsg("E-posta veya şifre hatalı");
    } else {
      message.success("Giriş başarılı!");
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", paddingTop: 50 }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Giriş Yap
      </Title>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <label>E-posta</label>
        <Input type="email" name="email" required />

        <label>Şifre</label>
        <Input.Password name="password" required />

        <Button type="primary" htmlType="submit" loading={loading}>
          Giriş Yap
        </Button>
      </form>

      {errorMsg && <Text type="danger">{errorMsg}</Text>}
    </div>
  );
}
