"use client";

import { registerUser } from "@/actions/auth-actions";
import { Input, Button, Typography } from "antd";
import { useActionState } from "react";

const { Title, Text } = Typography;

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, null);

  return (
    <div style={{ maxWidth: 400, margin: "auto", paddingTop: 50 }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Kayıt Ol
      </Title>

      <form
        action={formAction}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <label>İsim</label>
        <Input name="name" placeholder="Adınızı girin" required />

        <label>E-posta</label>
        <Input
          name="email"
          type="email"
          placeholder="E-posta adresiniz"
          required
        />

        <label>Şifre</label>
        <Input.Password name="password" placeholder="Şifre girin" required />

        <Button type="primary" htmlType="submit">
          Kayıt Ol
        </Button>
      </form>

      {state?.error && <Text type="danger">{state.error}</Text>}
      {state?.success && <Text type="success">{state.success}</Text>}
    </div>
  );
}
