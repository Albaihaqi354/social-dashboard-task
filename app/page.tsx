"use client";

import { useState, useEffect, useCallback } from "react";
import InputPanel from "@/components/InputPanel";
import PlatformCard, { SocialData } from "@/components/PlatformCard";
import { LayoutDashboard, AlertCircle } from "lucide-react";

export default function Home() {
  const [handles, setHandles] = useState({
    youtube: "Hindia",
    tiktok: "bian.disini",
    instagram: "bian.disini",
  });

  const [data, setData] = useState<{
    youtube: SocialData | null;
    tiktok: SocialData | null;
    instagram: SocialData | null;
  }>({
    youtube: null,
    tiktok: null,
    instagram: null,
  });

  const [loading, setLoading] = useState({
    youtube: false,
    tiktok: false,
    instagram: false,
  });

  const [error, setError] = useState<string | null>(null);

  const fetchPlatformData = useCallback(async (platform: "youtube" | "tiktok" | "instagram", handle: string) => {
    if (!handle) return;
    
    setLoading(prev => ({ ...prev, [platform]: true }));
    setError(null);

    try {
      const res = await fetch(`/api/${platform}?handle=${encodeURIComponent(handle)}`);
      const result = await res.json();

      if (res.ok) {
        setData(prev => ({ ...prev, [platform]: result }));
      } else {
        throw new Error(result.error || `Failed to fetch ${platform} data`);
      }
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(prev => ({ ...prev, [platform]: false }));
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    const initHandles = {
      youtube: "Hindia",
      tiktok: "bian.disini",
      instagram: "bian.disini",
    };
    
    fetchPlatformData("youtube", initHandles.youtube);
    fetchPlatformData("tiktok", initHandles.tiktok);
    fetchPlatformData("instagram", initHandles.instagram);
  }, [fetchPlatformData]);

  const totalLoading = loading.youtube || loading.tiktok || loading.instagram;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Sidebar Section */}
      <InputPanel 
        handles={handles} 
        setHandles={setHandles} 
        onFetch={fetchPlatformData}
        isLoading={totalLoading}
      />

      {/* Main Dashboard Section */}
      <main className="flex-1 flex flex-col p-6 lg:p-10 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold mb-1">
              <LayoutDashboard size={20} />
              <h1 className="text-2xl tracking-tight">Dashboard Overview</h1>
            </div>
          </div>
          
          {error && (
            <div className="flex items-center gap-2 px-4 py-2 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-lg animate-pulse">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Dashboard Grid */}
        <div className="flex flex-col xl:flex-row gap-6 items-stretch">
          <PlatformCard 
            platform="youtube" 
            data={data.youtube} 
            isLoading={loading.youtube} 
          />
          <PlatformCard 
            platform="tiktok" 
            data={data.tiktok} 
            isLoading={loading.tiktok} 
          />
          <PlatformCard 
            platform="instagram" 
            data={data.instagram} 
            isLoading={loading.instagram} 
          />
        </div>
      </main>
    </div>
  );
}
