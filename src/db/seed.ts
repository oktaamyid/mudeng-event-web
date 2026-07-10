import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "../lib/db";
import { events } from "./schema";

const seedEvents = [
  {
    slug: "ui-craft",
    title: "UI Craft",
    description: "Kelas intensif pembuatan desain antarmuka aplikasi dan website modern yang berfokus pada kemudahan pengguna.",
    imageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1440&h=650&fit=crop",
    timeline: "4 Minggu",
    service: "UI/UX Design",
    kickoffDate: "Juli 2025",
    status: "PUBLISHED"
  },
  {
    slug: "creative-craft",
    title: "Creative Craft",
    description: "Pelatihan pembuatan konten visual kreatif digital yang menarik perhatian dan berdampak luas di media sosial.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1440&h=650&fit=crop",
    timeline: "4 Minggu",
    service: "UI/UX Design",
    kickoffDate: "Juli 2025",
    status: "PUBLISHED"
  },
  {
    slug: "mucrex",
    title: "MUCREX",
    description: "Wadah pameran karya multimedia gabungan sekaligus pelatihan tingkat lanjut untuk menghasilkan portofolio siap kerja.",
    imageUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1440&h=650&fit=crop",
    timeline: "4 Minggu",
    service: "UI/UX Design",
    kickoffDate: "Juli 2025",
    status: "PUBLISHED"
  }
];

async function runSeed() {
  console.log("Seeding events...");
  for (const evt of seedEvents) {
    await db.insert(events).values(evt).onConflictDoNothing();
  }
  console.log("Seeding complete!");
}

runSeed().catch(console.error);
