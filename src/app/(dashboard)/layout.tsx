import TopNavigation from "@/components/layout/top-navigation";
import type { Metadata } from "next";
export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <TopNavigation />
      {children}
    </section>
  );
}
