import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import CrmSidebar from "@/components/crm/CrmSidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "CRM Dashboard",
  robots: { index: false, follow: false },
};

export default function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#060a13] text-slate-100 min-h-screen`}>
      <div className="flex min-h-screen">
        <CrmSidebar />
        <main className="flex-1 ml-64 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
