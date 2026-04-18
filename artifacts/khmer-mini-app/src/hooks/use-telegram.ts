import { useEffect, useState } from "react";
import { getTelegramUser, initTelegramApp, WebAppUser } from "@/lib/telegram";

export function useTelegram() {
  const [user, setUser] = useState<WebAppUser | null>(null);
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    initTelegramApp();
    setUser(getTelegramUser());
    
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      setColorScheme(window.Telegram.WebApp.colorScheme || "light");
      
      const handleThemeChange = () => {
        setColorScheme(window.Telegram.WebApp.colorScheme || "light");
      };
      
      window.Telegram.WebApp.onEvent("themeChanged", handleThemeChange);
      return () => {
        window.Telegram.WebApp.offEvent("themeChanged", handleThemeChange);
      };
    }
  }, []);

  return { user, colorScheme };
}
