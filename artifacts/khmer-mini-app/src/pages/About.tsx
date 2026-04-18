import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Send, Youtube, Facebook, Github, Globe, Pencil, X, Check, Plus, Trash2 } from "lucide-react";
import { useTelegram } from "@/hooks/use-telegram";

const ADMIN_ID = 5002402843;
const STORAGE_KEY = "khmer_about_data";

interface SocialLink {
  id: string;
  label: string;
  handle: string;
  href: string;
  iconKey: "telegram" | "youtube" | "facebook" | "github" | "globe";
}

interface AboutData {
  name: string;
  title: string;
  bio: string;
  socials: SocialLink[];
}

const DEFAULT_DATA: AboutData = {
  name: "Lim Sovannrady",
  title: "Full-Stack Developer",
  bio: "បង្កើតកម្មវិធី Telegram Mini App សម្រាប់ប្រជាជនខ្មែរ ដោយក្តីស្រឡាញ់ និងឧទ្ទិសចិត្ត។",
  socials: [
    { id: "tg", label: "Telegram", handle: "@limsovannrady", href: "https://t.me/limsovannrady", iconKey: "telegram" },
    { id: "yt", label: "YouTube", handle: "Lim Sovannrady", href: "https://youtube.com/@limsovannrady", iconKey: "youtube" },
    { id: "fb", label: "Facebook", handle: "Lim Sovannrady", href: "https://facebook.com/limsovannrady", iconKey: "facebook" },
    { id: "gh", label: "GitHub", handle: "limsovannrady", href: "https://github.com/limsovannrady", iconKey: "github" },
    { id: "web", label: "គេហទំព័រ", handle: "limsovannrady.dev", href: "https://limsovannrady.dev", iconKey: "globe" },
  ],
};

const ICON_OPTIONS = [
  { key: "telegram", label: "Telegram" },
  { key: "youtube", label: "YouTube" },
  { key: "facebook", label: "Facebook" },
  { key: "github", label: "GitHub" },
  { key: "globe", label: "គេហទំព័រ / Other" },
];

const ICON_STYLES: Record<string, { icon: any; color: string; bg: string; border: string }> = {
  telegram: { icon: Send, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-950/30", border: "border-sky-200 dark:border-sky-800" },
  youtube:  { icon: Youtube, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-200 dark:border-red-800" },
  facebook: { icon: Facebook, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800" },
  github:   { icon: Github, color: "text-foreground", bg: "bg-muted/50", border: "border-border" },
  globe:    { icon: Globe, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800" },
};

function loadData(): AboutData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_DATA;
    return { ...DEFAULT_DATA, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_DATA;
  }
}

export default function AboutPage() {
  const { user } = useTelegram();
  const isAdmin = user?.id === ADMIN_ID;
  const [data, setData] = useState<AboutData>(DEFAULT_DATA);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<AboutData>(DEFAULT_DATA);

  useEffect(() => {
    const loaded = loadData();
    setData(loaded);
    setDraft(loaded);
  }, []);

  const openLink = (href: string) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openLink(href);
    } else {
      window.open(href, "_blank");
    }
  };

  const handleEdit = () => {
    setDraft({ ...data, socials: data.socials.map((s) => ({ ...s })) });
    setEditing(true);
  };

  const handleSave = () => {
    setData(draft);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(data);
    setEditing(false);
  };

  const updateSocial = (id: string, field: keyof SocialLink, value: string) => {
    setDraft((d) => ({
      ...d,
      socials: d.socials.map((s) => s.id === id ? { ...s, [field]: value } : s),
    }));
  };

  const addSocial = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      label: "ថ្មី",
      handle: "",
      href: "https://",
      iconKey: "globe",
    };
    setDraft((d) => ({ ...d, socials: [...d.socials, newLink] }));
  };

  const removeSocial = (id: string) => {
    setDraft((d) => ({ ...d, socials: d.socials.filter((s) => s.id !== id) }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 space-y-6 min-h-screen pb-10"
    >
      <div className="pt-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif mb-1">យើង</h1>
          <p className="text-sm text-muted-foreground">អំពី developer</p>
        </div>
        {isAdmin && !editing && (
          <Button size="icon" variant="ghost" className="rounded-full" onClick={handleEdit}>
            <Pencil className="w-4 h-4" />
          </Button>
        )}
        {isAdmin && editing && (
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              <X className="w-4 h-4 mr-1" /> បោះបង់
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Check className="w-4 h-4 mr-1" /> រក្សាទុក
            </Button>
          </div>
        )}
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
              <img src="/developer.jpg" alt={data.name} className="w-full h-full object-cover" />
            </div>

            {editing ? (
              <div className="w-full space-y-2 mt-1">
                <input
                  value={draft.name}
                  onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                  placeholder="ឈ្មោះ"
                  className="w-full text-center text-base font-bold bg-muted/40 rounded-lg px-3 py-1.5 outline-none border border-border focus:border-primary"
                />
                <input
                  value={draft.title}
                  onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                  placeholder="Title"
                  className="w-full text-center text-sm bg-muted/40 rounded-lg px-3 py-1.5 outline-none border border-border focus:border-primary"
                />
                <textarea
                  value={draft.bio}
                  onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
                  placeholder="Bio..."
                  rows={3}
                  className="w-full text-center text-xs bg-muted/40 rounded-lg px-3 py-1.5 outline-none border border-border focus:border-primary resize-none"
                />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold font-serif">{data.name}</h2>
                <p className="text-sm text-primary font-medium mt-0.5">{data.title}</p>
                <p className="text-xs text-muted-foreground mt-2 max-w-[260px] leading-relaxed">{data.bio}</p>
              </>
            )}

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border w-full justify-center">
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
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">បណ្ដាញសង្គម</h3>
          {editing && (
            <Button size="sm" variant="outline" className="h-7 text-xs rounded-full" onClick={addSocial}>
              <Plus className="w-3 h-3 mr-1" /> បន្ថែម
            </Button>
          )}
        </div>

        <div className="space-y-2.5">
          {(editing ? draft.socials : data.socials).map((s) => {
            const style = ICON_STYLES[s.iconKey] || ICON_STYLES.globe;
            const Icon = style.icon;
            if (editing) {
              return (
                <div key={s.id} className="rounded-2xl border border-border bg-muted/20 p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <select
                      value={s.iconKey}
                      onChange={(e) => updateSocial(s.id, "iconKey", e.target.value)}
                      className="text-xs bg-background border border-border rounded-lg px-2 py-1 outline-none"
                    >
                      {ICON_OPTIONS.map((o) => (
                        <option key={o.key} value={o.key}>{o.label}</option>
                      ))}
                    </select>
                    <input
                      value={s.label}
                      onChange={(e) => updateSocial(s.id, "label", e.target.value)}
                      placeholder="Label"
                      className="flex-1 text-xs bg-background border border-border rounded-lg px-2 py-1 outline-none focus:border-primary"
                    />
                    <button onClick={() => removeSocial(s.id)} className="text-destructive p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    value={s.handle}
                    onChange={(e) => updateSocial(s.id, "handle", e.target.value)}
                    placeholder="Handle (ឧ. @username)"
                    className="w-full text-xs bg-background border border-border rounded-lg px-2 py-1 outline-none focus:border-primary"
                  />
                  <input
                    value={s.href}
                    onChange={(e) => updateSocial(s.id, "href", e.target.value)}
                    placeholder="URL (ឧ. https://t.me/...)"
                    className="w-full text-xs bg-background border border-border rounded-lg px-2 py-1 outline-none focus:border-primary"
                  />
                </div>
              );
            }
            return (
              <button
                key={s.id}
                onClick={() => openLink(s.href)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border ${style.bg} ${style.border} transition-all active:scale-[0.98] text-left`}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-background shadow-sm">
                  <Icon className={`w-5 h-5 ${style.color}`} />
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

      <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1 pb-4">
        បង្កើតដោយ <Heart className="w-3 h-3 text-red-500 fill-red-500" /> {data.name} នៅប្រទេសកម្ពុជា
      </div>
    </motion.div>
  );
}
