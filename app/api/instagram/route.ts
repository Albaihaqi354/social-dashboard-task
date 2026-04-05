import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");

  if (!handle) {
    return NextResponse.json({ error: "Handle is required" }, { status: 400 });
  }

  // Instagram Graph API Credentials (from env - not yet configured)
  const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (INSTAGRAM_ACCESS_TOKEN) {
    // Real Instagram Graph API implementation (when token is available)
    try {
      const userRes = await fetch(
        `https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${INSTAGRAM_ACCESS_TOKEN}`
      );

      if (!userRes.ok) {
        throw new Error("Instagram API returned an error");
      }

      const userData = await userRes.json();

      // Return real data (media endpoint requires additional permissions)
      return NextResponse.json({
        platform: "instagram",
        accountName: userData.username,
        username: `@${userData.username}`,
        profilePic: `https://api.dicebear.com/7.x/initials/svg?seed=${userData.username}`,
        totalViews: "N/A", // Requires instagram_manage_insights permission
        followers: "N/A",  // Requires instagram_manage_insights permission
        recentContent: [],
        isMock: false,
        apiNote: "Connected via Instagram Graph API. Some metrics require additional permissions.",
      });
    } catch (err: unknown) {
      console.error("Instagram API Error:", err);
      // Fall through to simulated data on error
    }
  }

  // Fallback: Simulated data when token is not configured
  const formatNumber = (n: number): string => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  };

  const seed = handle.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const baseViews = 2400000 + (seed * 9876) % 3000000;
  const baseFollowers = 85000 + (seed * 231) % 200000;

  return NextResponse.json({
    platform: "instagram",
    accountName: handle.replace(/^@/, ""),
    username: handle.startsWith("@") ? handle : `@${handle}`,
    profilePic: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(handle)}`,
    totalViews: formatNumber(baseViews),
    followers: formatNumber(baseFollowers),
    recentContent: [
      {
        id: "ig1",
        title: "A day at the office",
        views: formatNumber(Math.floor(baseViews * 0.05)),
        thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop",
        date: "5h ago",
      },
      {
        id: "ig2",
        title: "Weekend vibes only",
        views: formatNumber(Math.floor(baseViews * 0.08)),
        thumbnail: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=400&h=300&fit=crop",
        date: "2d ago",
      },
      {
        id: "ig3",
        title: "Coffee and code",
        views: formatNumber(Math.floor(baseViews * 0.03)),
        thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop",
        date: "4d ago",
      },
      {
        id: "ig4",
        title: "New project alert!",
        views: formatNumber(Math.floor(baseViews * 0.12)),
        thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
        date: "6d ago",
      },
      {
        id: "ig5",
        title: "Grateful for everything",
        views: formatNumber(Math.floor(baseViews * 0.04)),
        thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
        date: "1w ago",
      },
    ],
    isMock: true,
    apiNote: "Instagram API not yet configured. Set INSTAGRAM_ACCESS_TOKEN in .env.local.",
  });
}
