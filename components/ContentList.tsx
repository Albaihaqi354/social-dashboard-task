import React from "react";
import Image from "next/image";
import { Eye, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentItem {
  id: string;
  title: string;
  views: string;
  thumbnail: string;
  date?: string;
}

interface ContentListProps {
  contents: ContentItem[];
  platform: "youtube" | "tiktok" | "instagram";
}

export default function ContentList({ contents, platform }: ContentListProps) {
  return (
    <div className="space-y-4">
      {contents.map((content) => (
        <div 
          key={content.id} 
          className="flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-secondary/50 group border border-transparent hover:border-border/5 cursor-pointer"
        >
          <div className="relative w-16 h-12 shrink-0 bg-muted/20 rounded-lg overflow-hidden border border-border/5">
            <Image 
              src={content.thumbnail} 
              alt={content.title} 
              fill 
              sizes="(max-width: 768px) 100vw, 80px"
              className="object-cover transition-transform group-hover:scale-105"
            />
            {/* View Count Overlay on Hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <TrendingUp size={14} className="text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[12px] font-black uppercase italic truncate leading-tight mb-1.5 group-hover:text-black transition-colors">
              {content.title || "Untitled Intelligence"}
            </h4>
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
              <span className="flex items-center gap-1.5 bg-black/5 px-2 py-0.5 rounded">
                <Eye size={10} className={cn(
                  "text-black opacity-60",
                  platform === 'youtube' && "text-youtube opacity-100",
                  platform === 'tiktok' && "text-black opacity-100",
                  platform === 'instagram' && "text-instagram opacity-100",
                )} />
                {content.views}
              </span>
              {content.date && (
                <span className="opacity-40">{content.date}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
