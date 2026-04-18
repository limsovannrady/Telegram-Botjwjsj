export interface WebAppUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

export const getTelegramUser = (): WebAppUser => {
  if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
    const user = window.Telegram.WebApp.initDataUnsafe?.user;
    if (user) {
      return user;
    }
  }
  // Fallback demo data
  return {
    id: 123456789,
    first_name: "អ្នកប្រើ",
    last_name: "តេស្ត",
    username: "khmeruser",
    photo_url: "https://i.pravatar.cc/150?img=11"
  };
};

export const initTelegramApp = () => {
  if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
    try {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    } catch (e) {
      console.error("Failed to initialize Telegram WebApp", e);
    }
  }
};
