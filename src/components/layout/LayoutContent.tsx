'use client';

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  return (
    <>
      {!isAuthPage && <Header />}
      <main style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        {children}
      </main>
    </>
  );
}
