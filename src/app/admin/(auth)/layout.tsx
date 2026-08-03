import { montserrat, inter } from "@/lib/fonts";
import "../../globals.css";

export const metadata = { title: "Admin Login | VVIP" };

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex items-center justify-center bg-navy px-4">
        {children}
      </body>
    </html>
  );
}
