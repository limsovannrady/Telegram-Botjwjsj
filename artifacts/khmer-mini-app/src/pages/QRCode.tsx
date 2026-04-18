import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { QRCodeSVG } from "qrcode.react";
import { Html5Qrcode } from "html5-qrcode";
import {
  ArrowLeft, QrCode, ScanLine, Download, Copy, Check,
  Camera, ImageUp, X, Send, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useTelegram } from "@/hooks/use-telegram";

type Tab = "generate" | "scan";

export default function QRCodePage() {
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>("generate");
  const { user } = useTelegram();
  const telegramId = user?.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 space-y-4 min-h-screen"
    >
      <div className="flex items-center gap-3 pt-4">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold font-serif">QR Code</h1>
          <p className="text-xs text-muted-foreground">បង្កើត និងស្កេន QR Code</p>
        </div>
      </div>

      <div className="flex rounded-xl overflow-hidden border border-border bg-muted/30">
        <button
          onClick={() => setTab("generate")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
            tab === "generate"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <QrCode className="w-4 h-4" />
          បង្កើត QR
        </button>
        <button
          onClick={() => setTab("scan")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
            tab === "scan"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ScanLine className="w-4 h-4" />
          ស្កេន QR
        </button>
      </div>

      {tab === "generate"
        ? <GenerateTab telegramId={telegramId} />
        : <ScanTab />}
    </motion.div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

async function svgToPngBase64(svgEl: SVGElement, size = 1024): Promise<string> {
  const serializer = new XMLSerializer();
  const clone = svgEl.cloneNode(true) as SVGElement;
  clone.setAttribute("width", size.toString());
  clone.setAttribute("height", size.toString());
  const svgStr = serializer.serializeToString(clone);
  const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png", 1.0));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(); };
    img.src = url;
  });
}

// ── Generate Tab ─────────────────────────────────────────────────────────────

function GenerateTab({ telegramId }: { telegramId?: number }) {
  const [text, setText] = useState("");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "sent" | "error">("idle");
  const svgRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    if (text.trim()) {
      setGenerated(text.trim());
      setSaveState("idle");
    }
  };

  const handleCopy = async () => {
    if (!generated) return;
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    const svg = svgRef.current?.querySelector("svg");
    if (!svg || !generated) return;

    setSaveState("saving");
    try {
      const pngBase64 = await svgToPngBase64(svg as SVGElement);

      // 1. Download PNG locally
      const a = document.createElement("a");
      a.href = pngBase64;
      a.download = "qrcode.png";
      a.click();

      // 2. Send to Telegram if we have the telegramId
      if (telegramId) {
        const res = await fetch(`/api/users/${telegramId}/send-qr`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: pngBase64, text: generated }),
        });
        const data = await res.json();
        if (!data.ok) throw new Error(data.error);
      }

      setSaveState("sent");
      setTimeout(() => setSaveState("idle"), 3000);
    } catch {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 3000);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardContent className="p-4 space-y-3">
          <label className="text-sm font-medium">វាយ Text ឬ Link</label>
          <Textarea
            placeholder="ឧ. https://t.me/yourbot ឬ ពាក្យសម្ងាត់..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="resize-none text-sm"
          />
          <Button className="w-full" onClick={handleGenerate} disabled={!text.trim()}>
            <QrCode className="w-4 h-4 mr-2" />
            បង្កើត QR Code
          </Button>
        </CardContent>
      </Card>

      {generated && (
        <Card className="border-border">
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <div ref={svgRef} className="p-4 bg-white rounded-2xl shadow-sm">
              <QRCodeSVG value={generated} size={200} level="H" includeMargin={false} />
            </div>
            <p className="text-xs text-center text-muted-foreground break-all max-w-xs line-clamp-2">
              {generated}
            </p>

            {/* Save status feedback */}
            {saveState === "sent" && (
              <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
                <Check className="w-4 h-4" />
                ទាញយក &amp; ផ្ញើទៅ Telegram ជោគជ័យ!
              </div>
            )}
            {saveState === "error" && (
              <p className="text-xs text-red-500">មានបញ្ហា សូមព្យាយាមម្តងទៀត</p>
            )}

            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1" onClick={handleCopy}>
                {copied
                  ? <><Check className="w-4 h-4 mr-2 text-green-500" />បានចម្លង!</>
                  : <><Copy className="w-4 h-4 mr-2" />ចម្លង Text</>}
              </Button>
              <Button
                className="flex-1"
                onClick={handleSave}
                disabled={saveState === "saving"}
              >
                {saveState === "saving" ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />កំពុងផ្ញើ...</>
                ) : (
                  <><Download className="w-4 h-4 mr-2" />រក្សាទុក</>
                )}
              </Button>
            </div>

            {telegramId && saveState === "idle" && (
              <p className="text-[10px] text-muted-foreground text-center flex items-center gap-1">
                <Send className="w-3 h-3" />
                នឹងផ្ញើ QR ទៅ Telegram ស្វ័យប្រវត្តិ
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── Scan Tab ──────────────────────────────────────────────────────────────────

function ScanTab() {
  const [mode, setMode] = useState<"idle" | "camera" | "result">("idle");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const stopScanner = async () => {
    try {
      if (scannerRef.current?.isScanning) {
        await scannerRef.current.stop();
      }
    } catch {}
  };

  const startCamera = async () => {
    setError("");
    setMode("camera");
    await new Promise((r) => setTimeout(r, 100));
    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (text) => {
          stopScanner();
          setResult(text);
          setMode("result");
        },
        undefined
      );
    } catch {
      setError("មិនអាចប្រើ Camera បានទេ។ សូមអនុញ្ញាត Camera ក្នុង Telegram Settings។");
      setMode("idle");
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    const scanner = new Html5Qrcode("qr-file-reader");
    scannerRef.current = scanner;
    scanner
      .scanFile(file, true)
      .then((text) => {
        setResult(text);
        setMode("result");
      })
      .catch(() => {
        setError("មិនអាចអាន QR Code ក្នុងរូបភាពនេះបានទេ។");
      });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = async () => {
    await stopScanner();
    setResult("");
    setError("");
    setMode("idle");
    if (fileRef.current) fileRef.current.value = "";
  };

  useEffect(() => {
    return () => { stopScanner(); };
  }, []);

  return (
    <div className="space-y-4">
      <div id="qr-file-reader" style={{ display: "none" }} />

      {mode === "idle" && (
        <Card className="border-border">
          <CardContent className="p-6 space-y-3">
            <p className="text-sm text-muted-foreground text-center mb-2">ជ្រើសរើសវិធីស្កេន</p>
            <Button className="w-full" onClick={startCamera}>
              <Camera className="w-4 h-4 mr-2" />
              ប្រើ Camera ស្កេន
            </Button>
            <Button variant="outline" className="w-full" onClick={() => fileRef.current?.click()}>
              <ImageUp className="w-4 h-4 mr-2" />
              ជ្រើសរូបភាព QR
            </Button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            {error && <p className="text-xs text-red-500 text-center mt-2">{error}</p>}
          </CardContent>
        </Card>
      )}

      {mode === "camera" && (
        <Card className="border-border overflow-hidden">
          <CardContent className="p-0">
            <div id="qr-reader" className="w-full" />
            <div className="p-4">
              <Button variant="outline" className="w-full" onClick={reset}>
                <X className="w-4 h-4 mr-2" />
                បញ្ឈប់ Camera
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {mode === "result" && (
        <Card className="border-border">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-green-500">
              <Check className="w-5 h-5" />
              <span className="font-semibold text-sm">ស្កេនបានជោគជ័យ!</span>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <p className="text-sm break-all">{result}</p>
            </div>
            {result.startsWith("http") && (
              <Button className="w-full" onClick={() => window.open(result, "_blank")}>
                បើក Link
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleCopy}>
                {copied
                  ? <><Check className="w-4 h-4 mr-2 text-green-500" />បានចម្លង!</>
                  : <><Copy className="w-4 h-4 mr-2" />ចម្លង</>}
              </Button>
              <Button variant="outline" className="flex-1" onClick={reset}>
                <ScanLine className="w-4 h-4 mr-2" />
                ស្កេនម្តងទៀត
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
