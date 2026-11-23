import type { Metadata } from "next";
import Link from "next/link";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

// Font có đủ dấu tiếng Việt (Geist mặc định của create-next-app thiếu subset vietnamese)
const font = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  title: "3 Lớp Lá Chắn",
  description: "Hệ thống AI chống lừa đảo tài chính: phát hiện thao túng, phanh thức tỉnh, đấu với chính mình.",
};

const NAV = [
  { href: "/", label: "A9 Radar" },
  { href: "/chuyen-tien", label: "Chuyển tiền (M1)" },
  { href: "/doi-thoai", label: "Đấu với chính mình (M3)" },
  { href: "/cai-dat", label: "Thu giọng nhắc" },
  { href: "/vaccine", label: "Vaccine (B9')" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${font.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <header className="border-b border-zinc-200">
          <nav className="mx-auto flex max-w-3xl flex-wrap gap-x-4 gap-y-1 px-4 py-3 text-sm">
            <span className="font-bold">3 Lớp Lá Chắn</span>
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="text-zinc-600 hover:text-zinc-950">
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
