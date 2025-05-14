import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Satış",
  description: "Satış yapma sayfası",
};

export default function SalesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
