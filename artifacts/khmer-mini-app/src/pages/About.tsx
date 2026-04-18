import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Heart, Mail, Share2 } from "lucide-react";
import { useTelegram } from "@/hooks/use-telegram";

export default function AboutPage() {
  const { user } = useTelegram();

  const handleShare = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=https://t.me/YourAppBot/app&text=សាកល្បងកម្មវិធីខ្មែរនេះ!`);
    }
  };

  const handleContact = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink(`https://t.me/durov`); // Placeholder for actual support bot
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 flex flex-col min-h-[calc(100dvh-5rem)]"
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 pt-8 pb-12">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-xl shadow-primary/20 relative z-10 mx-auto rotate-3">
            <span className="text-5xl font-serif font-black text-white -rotate-3">ខ</span>
          </div>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold font-serif mb-2">កម្មវិធីខ្មែរតូច</h1>
          <p className="text-sm text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
            បង្កើតឡើងដោយក្តីស្រឡាញ់សម្រាប់ប្រជាជនកម្ពុជា ដើម្បីពង្រឹងបទពិសោធន៍លើ Telegram។
          </p>
        </div>

        <Card className="w-full border-border/50 bg-card/50 backdrop-blur-sm shadow-sm mt-4">
          <CardContent className="p-4 flex justify-around">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">១០k+</p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">អ្នកប្រើប្រាស់</p>
            </div>
            <div className="w-px bg-border"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">៤.៩</p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">ចំណាត់ថ្នាក់</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3 mt-auto pb-4">
        <Button onClick={handleShare} className="w-full rounded-xl py-6 font-bold text-base shadow-lg shadow-primary/20">
          <Share2 className="w-5 h-5 mr-2" />
          ចែករំលែកទៅមិត្តភក្តិ
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={handleContact} variant="outline" className="w-full rounded-xl py-6 border-primary/20 text-primary hover:bg-primary/5">
            <Mail className="w-5 h-5 mr-2" />
            ទំនាក់ទំនង
          </Button>
          <Button variant="outline" className="w-full rounded-xl py-6 border-accent/20 text-accent-foreground hover:bg-accent/5">
            <Globe className="w-5 h-5 mr-2" />
            គេហទំព័រ
          </Button>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1 pb-4">
        បង្កើតដោយ <Heart className="w-3 h-3 text-red-500 fill-red-500" /> នៅប្រទេសកម្ពុជា
      </div>
    </motion.div>
  );
}
