"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Typography, InputNumber, Button, message } from "antd";

const { Title } = Typography;

export default function ProductUpdate() {
  const { id } = useParams();
  const router = useRouter();
  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStock(data.stock);
        setName(data.name);
      });
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true);
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock }),
    });

    const result = await res.json();

    if (result.success) {
      message.success("Stok güncellendi");
      router.push("/products");
    } else {
      message.error(result.error || "Hata oluştu");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", paddingTop: 50 }}>
      <Title level={3}>{name} - Stok Güncelle</Title>

      <InputNumber
        min={0}
        value={stock}
        onChange={(val) => val !== null && setStock(val)}
        style={{ width: "100%", marginBottom: 16 }}
      />

      <Button type="primary" block onClick={handleUpdate} loading={loading}>
        Güncelle
      </Button>
    </div>
  );
}
