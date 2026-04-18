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
}

export function TelegramGuard({ children }: TelegramGuardProps) {
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
        <div className="mb-8">
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
        <p className="text-[#2AABEE] text-base font-semibold mb-8" style={{ fontFamily: "'Noto Sans Khmer', sans-serif" }}>
          នៅក្នុង Telegram ប៉ុណ្ណោះ
        </p>

        <div className="w-full max-w-xs bg-[#232e3c] rounded-2xl p-5 border border-white/5">
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

        <p className="mt-8 text-[#aab8c2]/50 text-xs" style={{ fontFamily: "'Noto Sans Khmer', sans-serif" }}>
          ខ្មែរ Mini App © {new Date().getFullYear()}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
