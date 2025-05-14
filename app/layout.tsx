import type { Metadata } from "next";
import "./globals.css";
import "@ant-design/v5-patch-for-react-19";
import MainHeader from "@/components/header";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata: Metadata = {
  title: "Market",
  description: "Market Otomasyonu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="tr">
        <body>
          <SessionWrapper>
            <MainHeader />
            {children}
          </SessionWrapper>
        </body>
      </html>
    </>
  );
}
