import "./globals.css";
import type { Metadata, Viewport } from "next";
import { listFeatures, type Feature } from "./lib/api";
import AppShell from "./components/AppShell";

export const metadata: Metadata = {
  title: "사회복지 계산식 포털",
  description: "사적이전소득 / 이자소득 / 재산상담 / 상속분 / 긴급공제 / 해외체류 등 자주 쓰이는 사회복지 계산을 웹에서 직접 실행합니다.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let features: Feature[] = [];
  try {
    features = await listFeatures();
  } catch {
    // backend unreachable — render empty LNB; pages will surface the error
  }

  return (
    <html lang="ko">
      <body>
        <AppShell features={features}>{children}</AppShell>
      </body>
    </html>
  );
}
