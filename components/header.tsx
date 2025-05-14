"use client";

import { Layout, Menu, Button } from "antd";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const menuItems = [
  { key: "1", label: <Link href="/products/add">Ürün Ekle</Link> },
  { key: "2", label: <Link href="/dashboard">Panel</Link> },
  { key: "3", label: <Link href="/sales">Satış Yap</Link> },
  { key: "4", label: <Link href="/products">Ürünler</Link> },
];

export default function MainHeader() {
  const { data: session, status } = useSession();

  return (
    <Header
      style={{ display: "flex", alignItems: "center", padding: "0 20px" }}
    >
      {/*LOGO */}
      <div
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 20,
          marginRight: 40,
        }}
      >
        <Link href="/" style={{ color: "white" }}>
          MarketApp
        </Link>
      </div>

      {/*Menu*/}
      {session && (
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          style={{ flex: 1 }}
        />
      )}

      {/*Login-Logout*/}
      <div style={{ display: "flex", gap: 10, marginLeft: "auto" }}>
        {status === "loading" ? null : session ? (
          <Button
            type="link"
            danger
            icon={<LogoutOutlined />}
            onClick={() => signOut()}
          >
            Çıkış Yap
          </Button>
        ) : (
          <>
            <Link href="/login">
              <Button type="link" icon={<LoginOutlined />}>
                Giriş Yap
              </Button>
            </Link>
            <Link href="/register">
              <Button type="link" icon={<UserAddOutlined />}>
                Kayıt Ol
              </Button>
            </Link>
          </>
        )}
      </div>
    </Header>
  );
}
