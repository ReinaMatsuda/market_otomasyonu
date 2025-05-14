"use client";

import { addProduct } from "@/actions/product-actions";
import { Input, Button, Typography } from "antd";
import { useActionState } from "react";

const { Title, Text } = Typography;

export default function AddProductPage() {
  const [state, formAction] = useActionState(addProduct, null);

  return (
    <div style={{ maxWidth: 500, margin: "auto", paddingTop: 50 }}>
      <Title level={3}>Ürün Ekle</Title>

      <form
        action={formAction}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <Input name="name" placeholder="Ürün adı" required />
        <Input name="price" placeholder="Fiyat" type="number" required />
        <Input name="stock" placeholder="Stok" type="number" required />
        <Input name="barcode" placeholder="Barkod" required />
        <select name="category" style={{ width: "100%", padding: 8 }}>
          <option value="">Kategori seçin</option>
          <option value="Meyve ve Sebze">Meyve ve Sebze</option>
          <option value="Et, Tavuk ve Balık">Et, Tavuk ve Balık</option>
          <option value="Şarküteri">Şarküteri</option>
          <option value="Süt ve Süt Ürünleri">Süt ve Süt Ürünleri</option>
          <option value="Kahvaltılık">Kahvaltılık</option>
          <option value="Fırın Ürünleri">Fırın Ürünleri</option>
          <option value="Bakliyat ve Tahıl">Bakliyat ve Tahıl</option>
          <option value="Yağlar">Yağlar</option>
          <option value="Makarna, Pirinç ve Un">Makarna, Pirinç ve Un</option>
          <option value="Konserve ve Hazır Yemek">
            Konserve ve Hazır Yemek
          </option>
          <option value="Atıştırmalık">Atıştırmalık</option>
          <option value="Tatlı ve Şekerleme">Tatlı ve Şekerleme</option>
          <option value="İçecek">İçecek</option>
          <option value="Su ve Maden Suyu">Su ve Maden Suyu</option>
          <option value="Çay ve Kahve">Çay ve Kahve</option>
          <option value="Temizlik">Temizlik</option>
          <option value="Kişisel Bakım">Kişisel Bakım</option>
          <option value="Bebek Ürünleri">Bebek Ürünleri</option>
          <option value="Ev ve Yaşam">Ev ve Yaşam</option>
          <option value="Evcil Hayvan Ürünleri">Evcil Hayvan Ürünleri</option>
          <option value="Dondurulmuş Gıdalar">Dondurulmuş Gıdalar</option>
          <option value="Glutensiz ve Diyet Ürünler">
            Glutensiz ve Diyet Ürünler
          </option>
          <option value="Organik Ürünler">Organik Ürünler</option>
          <option value="Kozmetik ve Kişisel Bakım">
            Kozmetik ve Kişisel Bakım
          </option>
        </select>
        <Input.TextArea name="description" placeholder="Açıklama (opsiyonel)" />

        <Button type="primary" htmlType="submit">
          Kaydet
        </Button>
      </form>

      {state?.error && <Text type="danger">{state.error}</Text>}
      {state?.success && <Text type="success">{state.success}</Text>}
    </div>
  );
}
