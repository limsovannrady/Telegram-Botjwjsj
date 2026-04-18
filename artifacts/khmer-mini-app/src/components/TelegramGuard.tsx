import { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData?: string;
        ready?: () => void;
      };
    };
  }
}

function isTelegramWebApp(): boolean {
  try {
    const tg = window.Telegram?.WebApp;
    return !!(tg && typeof tg.initData === "string" && tg.initData.length > 0);
  } catch {
    return false;
  }
}

interface TelegramGuardProps {
  children: React.ReactNode;
  botUsername?: string;
}

export function TelegramGuard({ children, botUsername }: TelegramGuardProps) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    setAllowed(isTelegramWebApp());
  }, []);

  if (allowed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#17212b]">
        <div className="w-8 h-8 rounded-full border-2 border-[#2AABEE] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#17212b] px-8 text-center select-none">
        <div className="mb-8 relative">
          <div className="w-24 h-24 rounded-full bg-[#2AABEE]/10 flex items-center justify-center mx-auto">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-12 h-12 text-[#2AABEE]"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: "'Hanuman', sans-serif" }}>
          សូមទោស!
        </h1>

        <p className="text-[#aab8c2] text-base leading-relaxed mb-2" style={{ fontFamily: "'Noto Sans Khmer', sans-serif" }}>
          កម្មវិធីនេះអាចប្រើប្រាស់បានតែ
        </p>
        <p className="text-[#2AABEE] text-base font-semibold mb-6" style={{ fontFamily: "'Noto Sans Khmer', sans-serif" }}>
          នៅក្នុង Telegram ប៉ុណ្ណោះ
        </p>

        <div className="w-full max-w-xs bg-[#232e3c] rounded-2xl p-5 mb-8 border border-white/5">
          <p className="text-[#aab8c2] text-sm mb-3" style={{ fontFamily: "'Noto Sans Khmer', sans-serif" }}>
            របៀបបើក App
          </p>
          <ol className="space-y-2 text-left">
            {[
              "បើក Telegram",
              "ស្វែងរក Bot របស់អ្នក",
              "ចុច បើក App ឬ /start",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#2AABEE]/20 text-[#2AABEE] text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-white text-sm" style={{ fontFamily: "'Noto Sans Khmer', sans-serif" }}>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {botUsername && (
          <a
            href={`https://t.me/${botUsername}`}
            className="flex items-center gap-2 bg-[#2AABEE] hover:bg-[#2AABEE]/90 active:scale-95 transition-all text-white font-semibold px-8 py-3 rounded-full text-sm"
            style={{ fontFamily: "'Noto Sans Khmer', sans-serif" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            បើក Telegram
          </a>
        )}

        <p className="mt-8 text-[#aab8c2]/50 text-xs" style={{ fontFamily: "'Noto Sans Khmer', sans-serif" }}>
          ខ្មែរ Mini App © {new Date().getFullYear()}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
