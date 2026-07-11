import { config } from "dotenv";
config({ path: ".env" });

import { db } from "../lib/db";
import { events } from "./schema";

const defaultFormFields = [
    // Step 1: Data Diri
    {
        id: "email",
        step: 1,
        type: "email",
        label: "Alamat Email",
        required: true,
    },
    {
        id: "fullName",
        step: 1,
        type: "text",
        label: "Nama Lengkap sesuai KTP",
        required: true,
    },
    {
        id: "institution",
        step: 1,
        type: "text",
        label: "Asal Instansi (Sekolah / Kampus / Perusahaan)",
        required: true,
    },
    {
        id: "whatsapp",
        step: 1,
        type: "text",
        label: "Nomor WhatsApp (aktif)",
        required: true,
    },
    // Step 2: Pengalaman
    {
        id: "source",
        step: 2,
        type: "select",
        label: "Dari mana kamu mengetahui event ini?",
        required: true,
        options: [
            "Sosial media",
            "Teman/Sahabat",
            "Poster/Pamflet",
            "Website / Media Online",
            "Other",
        ],
    },
    {
        id: "experience",
        step: 2,
        type: "select",
        label: "Pengalaman di bidang Design?",
        required: true,
        options: [
            "Belum pernah sama sekali",
            "Pernah belajar dasar-dasarnya",
            "Pernah membuat desain Infografis",
            "Sudah cukup familiar dengan Canva & Tools lainnya",
            "Other",
        ],
    },
    {
        id: "tools",
        step: 2,
        type: "select",
        label: "Aplikasi desain yang pernah digunakan?",
        required: true,
        options: [
            "Figma",
            "Canva",
            "Adobe Family",
            "Belum pernah menggunakan aplikasi desain",
            "Other",
        ],
    },
    // Step 3: Komitmen
    {
        id: "expectations",
        step: 3,
        type: "select",
        label: "Harapan mengikuti event ini?",
        required: true,
        options: [
            "Memahami Dasar Dasar Tools Design",
            "Menambah Portofolio Desain",
            "Menambah Relasi dan Networking",
            "Sekadar ingin mencoba dan mengenal pembuatan desain",
            "Other",
        ],
    },
    {
        id: "commitment",
        step: 3,
        type: "radio",
        label: "Bersedia mengikuti seluruh rangkaian kegiatan?",
        required: true,
        options: ["Ya", "Tidak"],
    },
];

const seedEvents = [
    {
        slug: "ui-craft",
        title: "UI Craft",
        description:
            "Kelas intensif pembuatan desain antarmuka aplikasi dan website modern yang berfokus pada kemudahan pengguna.",
        imageUrl:
            "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1440&h=650&fit=crop",
        timeline: "4 Minggu",
        service: "UI/UX Design",
        kickoffDate: "Juli 2025",
        status: "PUBLISHED",
        formFields: defaultFormFields,
    },
    {
        slug: "creative-craft",
        title: "Creative Craft",
        description:
            "Pelatihan pembuatan konten visual kreatif digital yang menarik perhatian dan berdampak luas di media sosial.",
        imageUrl:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1440&h=650&fit=crop",
        timeline: "4 Minggu",
        service: "UI/UX Design",
        kickoffDate: "Juli 2025",
        status: "PUBLISHED",
        formFields: defaultFormFields,
    },
    {
        slug: "mucrex",
        title: "MUCREX",
        description:
            "Wadah pameran karya multimedia gabungan sekaligus pelatihan tingkat lanjut untuk menghasilkan portofolio siap kerja.",
        imageUrl:
            "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1440&h=650&fit=crop",
        timeline: "4 Minggu",
        service: "UI/UX Design",
        kickoffDate: "Juli 2025",
        status: "PUBLISHED",
        formFields: defaultFormFields,
    },
];

async function runSeed() {
    console.log("Seeding events...");
    for (const evt of seedEvents) {
        await db.insert(events).values(evt).onConflictDoNothing();
    }
    
    console.log("Seeding admin...");
    const bcrypt = require("bcryptjs");
    const { users } = require("./schema");
    const passwordHash = await bcrypt.hash("admin123", 10);
    
    try {
        await db.insert(users).values({
            email: "admin@mudeng.id",
            name: "Administrator",
            passwordHash,
            role: "admin",
        });
        console.log("Admin seeded successfully.");
    } catch (e: any) {
        if (e.code === '23505') {
            console.log("Admin already exists.");
        } else {
            console.error(e);
        }
    }
    
    console.log("Seeding complete!");
}

runSeed().catch(console.error);
