import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");

  if (!handle) {
    return NextResponse.json({ error: "Handle is required" }, { status: 400 });
  }

  const API_KEY = process.env.YOUTUBE_API_KEY;
  if (!API_KEY) {
    console.error("YouTube API Key is missing");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
    // 1. Find Channel ID by Handle or Name
    const cleanHandle = handle.startsWith("@") ? handle : `@${handle}`;
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(cleanHandle)}&key=${API_KEY}`;
    
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (!searchData.items || searchData.items.length === 0) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    const channelId = searchData.items[0].id.channelId;

    // 2. Fetch Channel Statistics
    const statsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${API_KEY}`;
    const statsRes = await fetch(statsUrl);
    const statsData = await statsRes.json();

    const channelStats = statsData.items[0].statistics;
    const fullSnippet = statsData.items[0].snippet;

    // 3. Fetch Recent Videos
    const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&order=date&type=video&key=${API_KEY}`;
    const videosRes = await fetch(videosUrl);
    const videosData = await videosRes.json();

    const videoIds = videosData.items.map((item: { id: { videoId: string } }) => item.id.videoId).join(",");
    
    // 4. Get Statistics for those videos
    const videoStatsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`;
    const videoStatsRes = await fetch(videoStatsUrl);
    const videoStatsData = await videoStatsRes.json();

    const formatNumber = (num: string | number) => {
      const n = Number(num);
      if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
      if (n >= 1000) return (n / 1000).toFixed(1) + "K";
      return n.toString();
    };

    const recentContent = videosData.items.map((item: { id: { videoId: string }, snippet: { title: string, publishedAt: string, thumbnails: { default: { url: string } } } }) => {
      const stats = videoStatsData.items.find((v: { id: string }) => v.id === item.id.videoId);
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        views: formatNumber(stats?.statistics.viewCount || "0"),
        thumbnail: item.snippet.thumbnails.default.url,
        date: new Date(item.snippet.publishedAt).toLocaleDateString("id-ID", { month: "short", day: "numeric" }),
      };
    });

    return NextResponse.json({
      platform: "youtube",
      accountName: fullSnippet.title,
      username: cleanHandle,
      profilePic: fullSnippet.thumbnails.medium.url,
      totalViews: formatNumber(channelStats.viewCount),
      followers: formatNumber(channelStats.subscriberCount),
      recentContent,
    });
  } catch (error: unknown) {
    console.error("YouTube Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch YouTube data" }, { status: 500 });
  }
}
