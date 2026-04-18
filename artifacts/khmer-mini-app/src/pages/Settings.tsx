import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Bell, Moon, Languages, Shield, User, CreditCard, Compass, Calendar, Star, NotebookPen } from "lucide-react";
import { useTheme } from "next-themes";
import { useUserSettings } from "@/hooks/use-user-settings";
import { useTelegram } from "@/hooks/use-telegram";

export default function SettingsPage() {
  const { setTheme } = useTheme();
  const { user } = useTelegram();
  const { settings, loading, saving, updateSettings } = useUserSettings();

  useEffect(() => {
    if (!loading) {
      setTheme(settings.dark_mode ? "dark" : "light");
    }
  }, [loading, settings.dark_mode]);

  const handleNotifToggle = (checked: boolean) => updateSettings({ notifications: checked });
  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
    updateSettings({ dark_mode: checked });
  };

  const features = [
    {
      key: "feature_payment" as const,
      icon: CreditCard,
      label: "បង់ប្រាក់",
      desc: "មុខងារទូទាត់ប្រាក់",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      key: "feature_explore" as const,
      icon: Compass,
      label: "រុករក",
      desc: "មុខងាររុករកខ្លឹមសារ",
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      key: "feature_schedule" as const,
      icon: Calendar,
      label: "កាលវិភាគ",
      desc: "មុខងារតារាងពេលវេលា",
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-950/30",
    },
    {
      key: "feature_favorites" as const,
      icon: Star,
      label: "ពេញចិត្ត",
      desc: "មុខងាររក្សាទុកចំណូលចិត្ត",
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      key: "feature_notes" as const,
      icon: NotebookPen,
      label: "កំណត់ចំណាំ",
      desc: "មុខងារសរសេរចំណាំផ្ទាល់ខ្លួន",
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-950/30",
    },
  ];

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

      {user && (
        <Card className="border-border overflow-hidden">
          <div className="p-4 bg-muted/30 border-b border-border">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">គណនីរបស់អ្នក</h2>
          </div>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {user.photo_url ? (
                  <img src={user.photo_url} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
                ) : (
                  <User className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <p className="font-semibold text-sm">{user.first_name} {user.last_name ?? ""}</p>
                {user.username && <p className="text-xs text-muted-foreground">@{user.username}</p>}
                <p className="text-xs text-muted-foreground mt-0.5">
                  Telegram ID: <span className="font-mono">{user.id}</span>
                </p>
              </div>
              {saving && (
                <span className="ml-auto text-xs text-muted-foreground animate-pulse">រក្សាទុក...</span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

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
            <Switch id="notifications" checked={settings.notifications} onCheckedChange={handleNotifToggle} disabled={loading} />
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
            <Switch id="dark-mode" checked={settings.dark_mode} onCheckedChange={handleThemeToggle} disabled={loading} />
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
            <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">ខ្មែរ</div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border overflow-hidden">
        <div className="p-4 bg-muted/30 border-b border-border">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">មុខងារ (សេវាកម្មរហ័ស)</h2>
          <p className="text-xs text-muted-foreground mt-1">ជ្រើសរើសមុខងារដែលបង្ហាញនៅទំព័រដើម</p>
        </div>
        <CardContent className="p-0">
          {features.map((f, i) => (
            <div key={f.key}>
              {i > 0 && <Separator className="ml-14" />}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${f.bg} flex items-center justify-center`}>
                    <f.icon className={`w-4 h-4 ${f.color}`} />
                  </div>
                  <div className="space-y-0.5">
                    <Label htmlFor={f.key} className="text-base font-medium cursor-pointer">{f.label}</Label>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
                <Switch
                  id={f.key}
                  checked={settings[f.key]}
                  onCheckedChange={(checked) => updateSettings({ [f.key]: checked })}
                  disabled={loading}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border overflow-hidden">
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
