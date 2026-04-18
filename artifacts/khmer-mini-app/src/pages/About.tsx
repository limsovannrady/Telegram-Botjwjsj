import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Send, Youtube, Facebook, Github, Globe } from "lucide-react";

const SOCIAL_LINKS = [
  {
    label: "Telegram",
    handle: "@limsovannrady",
    href: "https://t.me/limsovannrady",
    icon: Send,
    color: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    border: "border-sky-200 dark:border-sky-800",
  },
  {
    label: "YouTube",
    handle: "Lim Sovannrady",
    href: "https://youtube.com/@limsovannrady",
    icon: Youtube,
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
  },
  {
    label: "Facebook",
    handle: "Lim Sovannrady",
    href: "https://facebook.com/limsovannrady",
    icon: Facebook,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    label: "GitHub",
    handle: "limsovannrady",
    href: "https://github.com/limsovannrady",
    icon: Github,
    color: "text-foreground",
    bg: "bg-muted/50",
    border: "border-border",
  },
  {
    label: "គេហទំព័រ",
    handle: "limsovannrady.dev",
    href: "https://limsovannrady.dev",
    icon: Globe,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
  },
];

export default function AboutPage() {
  const openLink = (href: string) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openLink(href);
    } else {
      window.open(href, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 space-y-6 min-h-screen"
    >
      <div className="pt-4">
        <h1 className="text-2xl font-bold font-serif mb-1">យើង</h1>
        <p className="text-sm text-muted-foreground">អំពី developer</p>
      </div>

      {/* Profile Card */}
      <Card className="border-border overflow-hidden">
        <div className="h-24 bg-gradient-to-br from-primary via-primary/80 to-accent relative">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }}
          />
        </div>
        <CardContent className="p-4 pt-0 -mt-12 relative">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-background shadow-xl mb-3">
              <img
                src="/developer.jpg"
                alt="Lim Sovannrady"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold font-serif">Lim Sovannrady</h2>
            <p className="text-sm text-primary font-medium mt-0.5">Full-Stack Developer</p>
            <p className="text-xs text-muted-foreground mt-2 max-w-[260px] leading-relaxed">
              បង្កើតកម្មវិធី Telegram Mini App សម្រាប់ប្រជាជនខ្មែរ
              ដោយក្តីស្រឡាញ់ និងឧទ្ទិសចិត្ត។
            </p>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border w-full justify-center">
              <div className="text-center">
                <p className="text-lg font-bold text-primary">E-GetS</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">ក្រុមហ៊ុន</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-lg font-bold text-accent">🇰🇭</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">កម្ពុជា</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <div>
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">បណ្ដាញសង្គម</h3>
        <div className="space-y-2.5">
          {SOCIAL_LINKS.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.label}
                onClick={() => openLink(s.href)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border ${s.bg} ${s.border} transition-all active:scale-[0.98] text-left`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-background shadow-sm`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{s.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{s.handle}</p>
                </div>
                <div className="text-muted-foreground/40">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1 pb-8">
        បង្កើតដោយ <Heart className="w-3 h-3 text-red-500 fill-red-500" /> Lim Sovannrady នៅប្រទេសកម្ពុជា
      </div>
    </motion.div>
  );
}
