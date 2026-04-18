import { useState, useEffect, useCallback } from "react";

export interface UserSettings {
  notifications: boolean;
  dark_mode: boolean;
  feature_payment: boolean;
  feature_explore: boolean;
  feature_schedule: boolean;
  feature_favorites: boolean;
  feature_notes: boolean;
  feature_qr: boolean;
}

const STORAGE_KEY = "khmer_settings";

const DEFAULT_SETTINGS: UserSettings = {
  notifications: true,
  dark_mode: false,
  feature_payment: true,
  feature_explore: true,
  feature_schedule: true,
  feature_favorites: true,
  feature_notes: true,
  feature_qr: true,
};

function loadSettings(): UserSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSettings(loadSettings());
    setLoading(false);
  }, []);

  const updateSettings = useCallback((updates: Partial<UserSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { settings, loading, saving: false, updateSettings };
}
