import React from "react";
import { Youtube, Instagram, Music2, RefreshCw, Send } from "lucide-react";

interface InputPanelProps {
  onFetch: (platform: "youtube" | "tiktok" | "instagram", handle: string) => void;
  handles: {
    youtube: string;
    tiktok: string;
    instagram: string;
  };
  setHandles: (handles: { youtube: string; tiktok: string; instagram: string }) => void;
  isLoading: boolean;
}

export default function InputPanel({ onFetch, handles, setHandles, isLoading }: InputPanelProps) {
  return (
    <div className="w-full lg:w-80 flex flex-col gap-8 p-8 bg-secondary border-r border-border/5 h-full overflow-y-auto">
      <div>
        <h2 className="text-2xl font-black tracking-tight mb-2 text-foreground uppercase italic">Social Media</h2>
      </div>

      <div className="space-y-6">
        {/* YouTube Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
            <Youtube size={12} className="text-youtube" /> YouTube
          </label>
          <input
            type="text"
            placeholder="@username"
            className="w-full bg-background/50 border border-border/30 rounded-lg px-4 py-3 text-sm transition-all focus:ring-1 focus:ring-black focus:border-black outline-none placeholder:text-muted-foreground/50 font-medium"
            value={handles.youtube}
            onChange={(e) => setHandles({ ...handles, youtube: e.target.value })}
          />
        </div>

        {/* TikTok Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
            <Music2 size={12} className="text-tiktok" /> TikTok
          </label>
          <input
            type="text"
            placeholder="@username"
            className="w-full bg-background/50 border border-border/30 rounded-lg px-4 py-3 text-sm transition-all focus:ring-1 focus:ring-black focus:border-black outline-none placeholder:text-muted-foreground/50 font-medium"
            value={handles.tiktok}
            onChange={(e) => setHandles({ ...handles, tiktok: e.target.value })}
          />
        </div>

        {/* Instagram Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
            <Instagram size={12} className="text-instagram" /> Instagram
          </label>
          <input
            type="text"
            placeholder="@username"
            className="w-full bg-background/50 border border-border/30 rounded-lg px-4 py-3 text-sm transition-all focus:ring-1 focus:ring-black focus:border-black outline-none placeholder:text-muted-foreground/50 font-medium"
            value={handles.instagram}
            onChange={(e) => setHandles({ ...handles, instagram: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <button
          onClick={() => {
            if (handles.youtube) onFetch("youtube", handles.youtube);
            if (handles.tiktok) onFetch("tiktok", handles.tiktok);
            if (handles.instagram) onFetch("instagram", handles.instagram);
          }}
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[0.98] active:scale-[0.95] disabled:opacity-50 shadow-2xl shadow-black/10 text-xs uppercase tracking-widest"
        >
          {isLoading ? <RefreshCw className="animate-spin" size={16} /> : <Send size={16} />}
          Update Stats
        </button> 
      </div>
    </div>
  );
}
