import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Bell, Moon, Languages, Shield } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Sync initial state
    setDarkMode(theme === "dark");
    
    // Check localStorage
    const savedNotifs = localStorage.getItem("khmer_app_notifications");
    if (savedNotifs !== null) {
      setNotifications(savedNotifs === "true");
    }
  }, [theme]);

  const handleNotifToggle = (checked: boolean) => {
    setNotifications(checked);
    localStorage.setItem("khmer_app_notifications", checked.toString());
  };

  const handleThemeToggle = (checked: boolean) => {
    setDarkMode(checked);
    setTheme(checked ? "dark" : "light");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 space-y-6"
    >
      <div className="pt-4">
        <h1 className="text-2xl font-bold font-serif mb-1">ការកំណត់</h1>
        <p className="text-sm text-muted-foreground">គ្រប់គ្រងគណនី និងកម្មវិធីរបស់អ្នក</p>
      </div>

      <Card className="border-border overflow-hidden">
        <div className="p-4 bg-muted/30 border-b border-border">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">ចំណូលចិត្ត</h2>
        </div>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bell className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="notifications" className="text-base font-medium cursor-pointer">ការជូនដំណឹង</Label>
                <p className="text-xs text-muted-foreground">ទទួលសារសំខាន់ៗ</p>
              </div>
            </div>
            <Switch 
              id="notifications" 
              checked={notifications} 
              onCheckedChange={handleNotifToggle} 
            />
          </div>
          
          <Separator className="ml-14" />
          
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Moon className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode" className="text-base font-medium cursor-pointer">ងងឹត (Dark Mode)</Label>
                <p className="text-xs text-muted-foreground">ប្តូរពណ៌កម្មវិធី</p>
              </div>
            </div>
            <Switch 
              id="dark-mode" 
              checked={darkMode} 
              onCheckedChange={handleThemeToggle} 
            />
          </div>
          
          <Separator className="ml-14" />
          
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Languages className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-0.5">
                <Label className="text-base font-medium">ភាសា</Label>
                <p className="text-xs text-muted-foreground">ភាសាខ្មែរ (លំនាំដើម)</p>
              </div>
            </div>
            <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
              ខ្មែរ
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border overflow-hidden mt-6">
        <div className="p-4 bg-muted/30 border-b border-border">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">សុវត្ថិភាព</h2>
        </div>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="space-y-0.5">
                <Label className="text-base font-medium cursor-pointer">គោលការណ៍ឯកជនភាព</Label>
                <p className="text-xs text-muted-foreground">អានបន្ថែម</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center pb-8 pt-4">
        <p className="text-xs text-muted-foreground">កំណែ ១.០.០</p>
      </div>
    </motion.div>
  );
}
