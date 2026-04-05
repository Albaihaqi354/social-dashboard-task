# Social Media Dashboard

A Next.js application to display real-time and simulated view statistics from YouTube, TikTok, and Instagram accounts.

## 🔗 Submission Details
- **Website**: https://social-dashboard-task.vercel.app/
- **Repository**: https://github.com/Albaihaqi354/social-dashboard-task

## 🛠 Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS

## 📝 Short Explanation

### Pendekatan
- Menggunakan **YouTube Data API v3** untuk data live channel YouTube.
- Menggunakan **Simulated Data Logic** untuk TikTok dan Instagram karena keterbatasan izin privasi/OAuth platform tersebut. Data simulasi dibuat konsisten berdasarkan input username untuk mendemonstrasikan fungsionalitas UI.

### Kendala & Solusi
- **Kendala**: API resmi TikTok dan Instagram membutuhkan proses otentikasi user (OAuth) yang kompleks untuk penggunaan publik.
- **Solusi**: Diimplementasikan logika simulasi data yang akurat dengan indikator status di UI agar penilai tetap dapat melihat cara data divisualisasikan dalam dashboard.

## 🚀 Setup Lokal
1. `npm install`
2. Isi `YOUTUBE_API_KEY` di file `.env.local`
3. `npm run dev`
