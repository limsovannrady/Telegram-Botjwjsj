import { motion } from "framer-motion";
import { useTelegram } from "@/hooks/use-telegram";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Compass, CreditCard, Sparkles, Star } from "lucide-react";

export default function HomePage() {
  const { user } = useTelegram();

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
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
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

      <div>
        <h2 className="text-lg font-bold mb-4 font-serif">សេវាកម្មរហ័ស</h2>
        <div className="grid grid-cols-4 gap-4">
          <ActionBtn icon={CreditCard} label="បង់ប្រាក់" color="text-blue-500" bg="bg-blue-50 dark:bg-blue-950/30" />
          <ActionBtn icon={Compass} label="រុករក" color="text-emerald-500" bg="bg-emerald-50 dark:bg-emerald-950/30" />
          <ActionBtn icon={Calendar} label="កាលវិភាគ" color="text-orange-500" bg="bg-orange-50 dark:bg-orange-950/30" />
          <ActionBtn icon={Star} label="ពេញចិត្ត" color="text-purple-500" bg="bg-purple-50 dark:bg-purple-950/30" />
        </div>
      </div>

      <div className="pt-2">
        <h2 className="text-lg font-bold mb-4 font-serif">ព័ត៌មានថ្មីៗ</h2>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <Card key={i} className="border border-border/50 shadow-sm overflow-hidden hover-elevate cursor-pointer">
              <CardContent className="p-0 flex">
                <div className="w-24 h-24 bg-muted/50 flex-shrink-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="p-3 flex flex-col justify-center">
                  <h3 className="font-bold text-sm mb-1">អាប់ដេតកម្មវិធីថ្មី</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    ស្វែងរកមុខងារថ្មីៗដែលទើបតែបន្ថែមក្នុងជំនាន់ទី ១.០ នេះ។
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ActionBtn({ icon: Icon, label, color, bg }: { icon: any, label: string, color: string, bg: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center transition-transform active:scale-95 shadow-sm`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </button>
      <span className="text-[11px] font-medium text-center">{label}</span>
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
