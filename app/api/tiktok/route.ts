import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");

  if (!handle) {
    return NextResponse.json({ error: "Handle is required" }, { status: 400 });
  }

  // TikTok Display API Credentials (loaded from env)
  const TIKTOK_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;

  if (!TIKTOK_CLIENT_KEY) {
    console.warn("TIKTOK_CLIENT_KEY not set in environment");
  }

  const formatNumber = (n: number): string => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  };

  // Deterministic simulation based on handle for consistent results
  const seed = handle.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const baseViews = 5000000 + (seed * 12345) % 8000000;
  const baseFollowers = 120000 + (seed * 543) % 500000;

  return NextResponse.json({
    platform: "tiktok",
    accountName: handle.replace(/^@/, ""),
    username: handle.startsWith("@") ? handle : `@${handle}`,
    profilePic: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(handle)}`,
    totalViews: formatNumber(baseViews),
    followers: formatNumber(baseFollowers),
    recentContent: [
      {
        id: "tk1",
        title: "Trying out the latest viral trend!",
        views: formatNumber(Math.floor(baseViews * 0.12)),
        thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=300&fit=crop",
        date: "2h ago",
      },
      {
        id: "tk2",
        title: "Life lately in 60 seconds",
        views: formatNumber(Math.floor(baseViews * 0.08)),
        thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
        date: "1d ago",
      },
      {
        id: "tk3",
        title: "Unboxing my new setup!",
        views: formatNumber(Math.floor(baseViews * 0.15)),
        thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
        date: "3d ago",
      },
      {
        id: "tk4",
        title: "Quick morning routine",
        views: formatNumber(Math.floor(baseViews * 0.05)),
        thumbnail: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?w=400&h=300&fit=crop",
        date: "5d ago",
      },
      {
        id: "tk5",
        title: "Best travel tips for 2026",
        views: formatNumber(Math.floor(baseViews * 0.22)),
        thumbnail: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
        date: "1w ago",
      },
    ],
    isMock: true,
    apiNote: "TikTok requires user OAuth authorization. Showing simulated data.",
  });
}
