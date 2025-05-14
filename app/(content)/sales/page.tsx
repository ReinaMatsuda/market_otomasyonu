"use client";

import { useEffect, useState } from "react";
import { Button, InputNumber, Select, Typography, message } from "antd";
import { Product } from "@/types/product";

const { Title } = Typography;

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleSale = async () => {
    if (!productId || quantity < 1)
      return message.warning("Tüm alanları doldurun");

    setLoading(true);
    const res = await fetch("/api/sales", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });

    const result = await res.json();

    if (result.error) {
      message.error(result.error);
    } else {
      message.success(result.success);
      setQuantity(1);
      setProductId(null);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", paddingTop: 50 }}>
      <Title level={3}>Ürün Satışı</Title>
      <Select
        showSearch
        placeholder="Ürün seçin"
        style={{ width: "100%", marginBottom: 16 }}
        optionFilterProp="label"
        value={productId}
        onChange={setProductId}
        options={products.map((p) => ({
          value: p._id,
          label: `${p.name} (Stok: ${p.stock})`,
        }))}
        filterOption={(input, option) =>
          (option?.label as string).toLowerCase().includes(input.toLowerCase())
        }
      />

      <InputNumber
        min={1}
        value={quantity}
        onChange={(value) => {
          if (value !== null) setQuantity(value);
        }}
        style={{ width: "100%", marginBottom: 16 }}
      />

      <Button type="primary" block onClick={handleSale} loading={loading}>
        Sat
      </Button>
    </div>
  );
}
