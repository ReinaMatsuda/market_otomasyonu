"use client";

import { useEffect, useState } from "react";
import { Table, Typography, Button, message, Input } from "antd";
import { Product } from "@/types/product";
import Link from "next/link";

const { Title } = Typography;

export default function ShowProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products/all")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();

    if (result.success) {
      message.success("Ürün başarıyla silindi");
      setProducts((prev) =>
        prev.filter((product) => product._id.toString() !== id)
      );
      setFilteredProducts((prev) =>
        prev.filter((product) => product._id.toString() !== id)
      );
    } else {
      message.error(result.error || "Hata oluştu");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const columns = [
    { title: "Ad", dataIndex: "name" },
    { title: "Kategori", dataIndex: "category" },
    { title: "Fiyat", dataIndex: "price", render: (p: number) => `${p} ₺` },
    { title: "Stok", dataIndex: "stock" },
    {
      title: "İşlem",
      render: (_: undefined, record: Product) => (
        <>
          <Link href={`/products/update/${record._id}`}>
            <Button type="link">Stok Güncelle</Button>
          </Link>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record._id.toString())}
          >
            Sil
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Ürün Listesi</Title>
      <Input
        placeholder="Ürün adı ara"
        allowClear
        onChange={handleSearch}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Table dataSource={filteredProducts} columns={columns} rowKey="_id" />
    </div>
  );
}
