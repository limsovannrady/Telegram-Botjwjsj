import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground flex flex-col items-center">
      <main className="w-full max-w-[430px] flex-1 pb-20 relative overflow-x-hidden">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
