import { useState, useEffect, useCallback } from "react";
import { getTelegramUser } from "@/lib/telegram";

export interface UserSettings {
  telegram_id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  notifications: boolean;
  dark_mode: boolean;
}

const DEFAULT_SETTINGS: Omit<UserSettings, "telegram_id"> = {
  notifications: true,
  dark_mode: false,
};

export function useUserSettings() {
  const user = getTelegramUser();
  const telegramId = user?.id;

  const [settings, setSettings] = useState<UserSettings>({
    telegram_id: telegramId,
    ...DEFAULT_SETTINGS,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!telegramId) {
      setLoading(false);
      return;
    }
    fetch(`/api/users/${telegramId}/settings`)
      .then((res) => res.json())
      .then((data) => {
        setSettings({
          telegram_id: telegramId,
          notifications: data.notifications ?? true,
          dark_mode: data.dark_mode ?? false,
          first_name: user?.first_name,
          last_name: user?.last_name,
          username: user?.username,
        });
      })
      .catch(() => {
        setSettings({
          telegram_id: telegramId,
          ...DEFAULT_SETTINGS,
          first_name: user?.first_name,
          last_name: user?.last_name,
          username: user?.username,
        });
      })
      .finally(() => setLoading(false));
  }, [telegramId]);

  const updateSettings = useCallback(
    async (updates: Partial<Omit<UserSettings, "telegram_id">>) => {
      if (!telegramId) return;
      setSaving(true);
      const next = { ...settings, ...updates };
      setSettings(next);
      try {
        await fetch(`/api/users/${telegramId}/settings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...updates,
            first_name: user?.first_name,
            last_name: user?.last_name,
            username: user?.username,
          }),
        });
      } catch (err) {
        console.error("Failed to save settings", err);
      } finally {
        setSaving(false);
      }
    },
    [telegramId, settings, user]
  );

  return { settings, loading, saving, updateSettings };
}
