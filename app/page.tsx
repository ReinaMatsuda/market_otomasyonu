"use client";

import { Typography, Button } from "antd";
import Link from "next/link";
import { useSession } from "next-auth/react";

const { Title } = Typography;

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <Title>Market Otomasyon Sistemi</Title>

      {session ? (
        <Link href="/dashboard">
          <Button type="primary" size="large">
            Panele Git
          </Button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
