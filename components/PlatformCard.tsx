import React from "react";
import Image from "next/image";
import { Youtube, Instagram, Music2, TrendingUp, Users, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import ContentList from "./ContentList";

export interface SocialData {
  platform: "youtube" | "tiktok" | "instagram";
  accountName: string;
  username: string;
  profilePic: string;
  totalViews: string;
  followers: string;
  recentContent: {
    id: string;
    title: string;
    views: string;
    thumbnail: string;
    date?: string;
  }[];
  isMock?: boolean;
}

interface PlatformCardProps {
  data: SocialData | null;
  isLoading: boolean;
  platform: "youtube" | "tiktok" | "instagram";
}

export default function PlatformCard({ data, isLoading, platform }: PlatformCardProps) {
  const icons = {
    youtube: <Youtube className="text-youtube" size={20} />,
    tiktok: <Music2 className="text-tiktok" size={20} />,
    instagram: <Instagram className="text-instagram" size={20} />,
  };

  if (isLoading) {
    return (
      <div className="flex-1 min-w-[320px] rounded-2xl border border-border bg-card p-8 animate-pulse space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-3 w-20 bg-muted rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-muted rounded-2xl" />
          <div className="h-24 bg-muted rounded-2xl" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={cn("flex-1 min-w-[320px] flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-12 text-center bg-muted/5 group hover:bg-muted/10 transition-colors")}>
        <div className="opacity-20 mb-4 group-hover:scale-110 transition-transform">{icons[platform]}</div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Enter {platform} Profile</p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-85 rounded-2xl border border-border/10 bg-white p-8 transition-all hover:translate-y-1 shadow-sm hover:shadow-2xl hover:shadow-black/5 overflow-hidden relative">
      {/* Platform Indicator */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border p-1 transition-all group-hover:border-black">
              <Image 
                src={data.profilePic || "/placeholder.png"} 
                alt={data.accountName} 
                width={64} 
                height={64} 
                className="rounded-full object-cover grayscale-20 group-hover:grayscale-0 transition-all"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 border border-border shadow-sm">
              {icons[platform]}
            </div>
          </div>
          <div>
            <h3 className="font-black text-xl leading-tight uppercase italic">{data.accountName}</h3>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">{data.username}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {data.isMock ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/5 border border-amber-500/10 text-[9px] font-black text-amber-600 uppercase tracking-widest">
              <AlertCircle size={10} /> Simulated
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/10 text-[9px] font-black text-green-600 uppercase tracking-widest">
              <span>● Live Data</span>
            </div>
          )}
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-secondary p-5 rounded-2xl border border-border/5 flex flex-col items-center text-center gap-1 group cursor-default">
          <div className="flex items-center gap-2 text-muted-foreground mb-1 group-hover:scale-110 transition-transform">
            <TrendingUp size={12} className="text-black" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Total Reach</span>
          </div>
          <span className="text-2xl font-black tracking-tight">{data.totalViews}</span>
        </div>
        <div className="bg-secondary p-5 rounded-2xl border border-border/5 flex flex-col items-center text-center gap-1 group cursor-default">
          <div className="flex items-center gap-2 text-muted-foreground mb-1 group-hover:scale-110 transition-transform">
            <Users size={12} className="text-black" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Audience</span>
          </div>
          <span className="text-2xl font-black tracking-tight">{data.followers}</span>
        </div>
      </div>

      {/* Content Feed Section */}
      <div className="space-y-6">
        <ContentList contents={data.recentContent} platform={platform} />
      </div>
    </div>
  );
}
