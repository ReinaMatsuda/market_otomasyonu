"use client";

import { useEffect, useState } from "react";
import { Typography, Card, Table, Row, Col } from "antd";
import { Sale } from "@/types/sales";

const { Title } = Typography;

export default function Dashboard() {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    fetch("/api/sales/history")
      .then((res) => res.json())
      .then((data) => setSales(data));
  }, []);

  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);

  const columns = [
    {
      title: "Ürün",
      dataIndex: "productName",
    },
    {
      title: "Adet",
      dataIndex: "quantity",
    },
    {
      title: "Toplam",
      dataIndex: "total",
      render: (val: number) => `${val} ₺`,
    },
    {
      title: "Tarih",
      dataIndex: "date",
      render: (val: string) =>
        new Date(val).toLocaleString("tr-TR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Kontrol Paneli</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="Toplam Satış">{totalSales}</Card>
        </Col>
        <Col span={12}>
          <Card title="Toplam Hasılat (₺)">{totalRevenue}</Card>
        </Col>
      </Row>

      <Card title="Son Satışlar">
        <Table columns={columns} dataSource={sales} rowKey="_id" />
      </Card>
    </div>
  );
}
