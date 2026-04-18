import { Link, useLocation } from "wouter";
import { Home, Info, Settings, User, NotebookPen } from "lucide-react";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "ទំព័រដើម", icon: Home },
    { href: "/notes", label: "កំណត់ចំណាំ", icon: NotebookPen },
    { href: "/info", label: "ព័ត៌មាន", icon: Info },
    { href: "/settings", label: "ការកំណត់", icon: Settings },
    { href: "/about", label: "យើង", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border safe-area-bottom">
      <div className="max-w-[430px] mx-auto w-full px-1 flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "fill-primary/20" : ""}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[9px] font-medium ${isActive ? "font-bold" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
