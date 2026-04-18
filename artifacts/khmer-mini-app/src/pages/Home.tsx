import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useTelegram } from "@/hooks/use-telegram";
import { useUserSettings } from "@/hooks/use-user-settings";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Compass, CreditCard, Sparkles, Star, NotebookPen } from "lucide-react";

export default function HomePage() {
  const { user } = useTelegram();
  const { settings, loading } = useUserSettings();
  const [, navigate] = useLocation();

  const allActions = [
    {
      key: "feature_payment" as const,
      icon: CreditCard,
      label: "បង់ប្រាក់",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/30",
      href: null,
    },
    {
      key: "feature_explore" as const,
      icon: Compass,
      label: "រុករក",
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      href: null,
    },
    {
      key: "feature_schedule" as const,
      icon: Calendar,
      label: "កាលវិភាគ",
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-950/30",
      href: null,
    },
    {
      key: "feature_favorites" as const,
      icon: Star,
      label: "ពេញចិត្ត",
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950/30",
      href: null,
    },
    {
      key: "feature_notes" as const,
      icon: NotebookPen,
      label: "កំណត់ចំណាំ",
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-950/30",
      href: "/notes",
    },
  ];

  const visibleActions = loading
    ? allActions
    : allActions.filter((a) => settings[a.key]);

  const cols =
    visibleActions.length <= 2
      ? "grid-cols-2"
      : visibleActions.length === 3
      ? "grid-cols-3"
      : visibleActions.length === 5
      ? "grid-cols-5"
      : "grid-cols-4";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 space-y-6"
    >
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
            <AvatarImage src={user?.photo_url} alt={user?.first_name} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
              {user?.first_name?.charAt(0) || "អ"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground font-medium">សួស្ដី!</p>
            <h1 className="text-xl font-bold font-serif text-foreground">
              {user?.first_name} {user?.last_name || ""}
            </h1>
          </div>
        </div>
        <Button size="icon" variant="ghost" className="rounded-full bg-secondary/50">
          <Sparkles className="w-5 h-5 text-accent" />
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-primary to-primary/80 border-none shadow-lg shadow-primary/20 overflow-hidden relative">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
        <CardContent className="p-6 relative z-10 text-primary-foreground">
          <QuoteIcon className="w-8 h-8 opacity-40 mb-2" />
          <p className="text-lg font-serif leading-relaxed font-bold tracking-wide">
            "ការតស៊ូគង់បានសម្រេច ការព្យាយាមគង់បានផល។"
          </p>
          <p className="text-xs opacity-80 mt-4 font-medium flex items-center gap-1">
            <Star className="w-3 h-3 fill-accent text-accent" />
            សុភាសិតខ្មែរ
          </p>
        </CardContent>
      </Card>

      {visibleActions.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4 font-serif">សេវាកម្មរហ័ស</h2>
          <div className={`grid gap-3 ${cols}`}>
            {visibleActions.map((a) => (
              <ActionBtn
                key={a.key}
                icon={a.icon}
                label={a.label}
                color={a.color}
                bg={a.bg}
                onClick={a.href ? () => navigate(a.href!) : undefined}
              />
            ))}
          </div>
        </div>
      )}

      {!loading && visibleActions.length === 0 && (
        <div className="text-center py-6 text-sm text-muted-foreground">
          <p>មិនមានមុខងារណាត្រូវបានបើក</p>
          <p className="text-xs mt-1">ទៅ ការកំណត់ ដើម្បីបើកមុខងារ</p>
        </div>
      )}

    </motion.div>
  );
}

function ActionBtn({
  icon: Icon,
  label,
  color,
  bg,
  onClick,
}: {
  icon: any;
  label: string;
  color: string;
  bg: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center transition-transform active:scale-95 shadow-sm`}
        onClick={onClick}
      >
        <Icon className={`w-6 h-6 ${color}`} />
      </button>
      <span className="text-[10px] font-medium text-center leading-tight">{label}</span>
    </div>
  );
}

function QuoteIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}
