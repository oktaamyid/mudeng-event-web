import { config } from "dotenv";
config({ path: ".env" });

import { db } from "../lib/db";
import { events, users } from "./schema";
import { eq } from "drizzle-orm";

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

const mucrexFormFields = [
    // Step 1: Data Diri (sama dengan default)
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
    // Step 2: Karya & Pengalaman
    {
        id: "source",
        step: 2,
        type: "select",
        label: "Dari mana kamu mengetahui MuCreX?",
        required: true,
        options: [
            "Sosial media",
            "Teman/Sahabat",
            "Poster/Pamflet",
            "Website / Media Online",
            "Informasi dari Kampus",
            "Other",
        ],
    },
    {
        id: "portfolioType",
        step: 2,
        type: "select",
        label: "Jenis karya yang ingin dipamerkan?",
        required: true,
        options: [
            "Desain Grafis",
            "Fotografi",
            "Videografi",
            "Motion Graphic",
            "Digital Art / Ilustrasi",
            "UI/UX Design",
            "Other",
        ],
    },
    {
        id: "exhibitionExperience",
        step: 2,
        type: "select",
        label: "Apakah kamu pernah mengikuti pameran karya sebelumnya?",
        required: true,
        options: [
            "Belum pernah sama sekali",
            "Pernah 1 kali",
            "Pernah 2-3 kali",
            "Sudah sering mengikuti pameran",
        ],
    },
    // Step 3: Komitmen & Harapan
    {
        id: "expectations",
        step: 3,
        type: "select",
        label: "Harapan kamu mengikuti MuCreX?",
        required: true,
        options: [
            "Mendapatkan apresiasi atas karya yang dibuat",
            "Memperluas relasi dan networking di industri kreatif",
            "Menambah pengalaman dalam pameran karya",
            "Mendapatkan feedback untuk pengembangan karya",
            "Other",
        ],
    },
    {
        id: "commitment",
        step: 3,
        type: "radio",
        label: "Bersedia hadir di lokasi pameran (Kampus B STT NF) selama acara berlangsung?",
        required: true,
        options: ["Ya", "Tidak"],
    },
];

const seedEvents = [
    {
        slug: "ui-craft",
        title: "UI Craft",
        subtitle:
            "Wadah belajar UI/UX Design melalui praktik dan proyek nyata untuk mengembangkan kreativitas serta keterampilan desain digital.",
        category: "UI/UX Design",
        description:
            "Pelatihan pembuatan desain antarmuka aplikasi dan website modern.",
        imageUrl:
            "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1440&h=650&fit=crop",
        timeline: "4 Minggu",
        service: "UI/UX Design",
        kickoffDate: "Juli 2025",
        instructor: "Tim MUDENG",
        duration: "4 Minggu",
        status: "PUBLISHED",
        formFields: defaultFormFields,
        overview: {
            title: "Project overview",
            description:
                "UI Craft merupakan program kerja yang berfokus pada pengembangan kemampuan di bidang UI/UX Design. Melalui berbagai kegiatan seperti workshop, praktik langsung, dan diskusi, peserta diajak untuk memahami proses perancangan antarmuka digital yang menarik, fungsional, dan memberikan pengalaman pengguna yang optimal.",
        },
        process: {
            title: "Project process",
            description:
                "Peserta mengikuti rangkaian pembelajaran yang dimulai dari pengenalan konsep UI/UX, perancangan wireframe, hingga pembuatan prototype menggunakan Figma. Setiap sesi dilengkapi dengan praktik langsung, diskusi, dan pendampingan agar peserta mampu memahami proses desain secara terstruktur serta mampu menerapkan prinsip antarmuka yang efektif.",
        },
        result: {
            title: "Final result",
            description:
                "Hasil akhir berupa desain UI/UX yang dapat dimanfaatkan sebagai portofolio sekaligus menjadi bekal untuk mengikuti kompetisi seperti GEMASTIK dan proyek desain lainnya.",
        },
        gallery: [
            "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
        ],
        focus: "Perancangan antarmuka digital",
        output: "Prototype & Portofolio UI/UX",
    },
    {
        slug: "creative-craft",
        title: "Creative Craft",
        subtitle:
            "Wadah untuk mengembangkan kreativitas melalui berbagai karya visual, mulai dari desain grafis, fotografi, videografi, motion graphic, hingga konten digital yang inovatif.",
        category: "Desain & Multimedia",
        description:
            "Pelatihan multimedia yang berfokus pada pengembangan kreativitas.",
        imageUrl:
            "/event/assets/creative-craftt.png",
        timeline: "4 Minggu",
        service: "Desain & Multimedia",
        kickoffDate: "Juli 2025",
        instructor: "Tim MUDENG",
        duration: "4 Minggu",
        status: "PUBLISHED",
        formFields: defaultFormFields,
        overview: {
            title: "Project overview",
            description:
                "Creative Craft menghadirkan pelatihan multimedia yang berfokus pada pengembangan kreativitas melalui desain grafis, fotografi, videografi, dan motion graphic. Setiap peserta didorong untuk menghasilkan karya terbaik yang dapat dipublikasikan dan dipamerkan dalam MuCreX.",
        },
        process: {
            title: "Project process",
            description:
                "Peserta mengikuti berbagai sesi pembelajaran yang mencakup desain grafis, fotografi, videografi, motion graphic, dan digital branding. Setiap kegiatan dipadukan dengan praktik langsung serta bimbingan agar peserta mampu menghasilkan karya yang berkualitas dan memiliki nilai estetika.",
        },
        result: {
            title: "Final result",
            description:
                "Peserta menghasilkan berbagai karya kreatif yang dapat dijadikan portofolio, dipublikasikan melalui MuCrex, serta menjadi bekal untuk mengikuti kompetisi maupun proyek kreatif di bidang multimedia.",
        },
        gallery: [],
        focus: "Creative Design",
        output: "Portofolio & Karya Kreatif",
        faqs: [
            { question: "Apa itu Creative Craft?", answer: "Creative Craft adalah program pelatihan multimedia yang berfokus pada pengembangan kreativitas melalui desain grafis, fotografi, videografi, dan motion graphic." },
            { question: "Siapa yang dapat mengikuti Creative Craft?", answer: "Creative Craft terbuka untuk semua kalangan yang ingin mengembangkan keterampilan di bidang desain dan multimedia." },
            { question: "Apakah harus memiliki pengalaman sebelumnya?", answer: "Tidak harus. Program ini dirancang untuk semua level, termasuk pemula yang belum memiliki pengalaman sama sekali." },
            { question: "Materi apa saja yang dipelajari?", answer: "Peserta akan mempelajari desain grafis, fotografi, videografi, motion graphic, dan digital branding." },
            { question: "Apakah ada tugas atau proyek selama Creative Craft?", answer: "Ya, setiap sesi dilengkapi dengan tugas praktik dan proyek akhir yang akan menjadi bagian dari portofolio peserta." },
            { question: "Apa manfaat mengikuti Creative Craft?", answer: "Peserta mendapatkan keterampilan multimedia, portofolio karya kreatif, serta kesempatan untuk dipamerkan di MuCreX." },
        ],
    },
    {
        slug: "mucrex",
        title: "MUCREX",
        subtitle:
            "Pameran karya multimedia yang menjadi wadah apresiasi, kolaborasi, dan inspirasi bagi peserta untuk menampilkan hasil karya terbaik di bidang kreativitas digital.",
        category: "Pameran Karya",
        description:
            "Kegiatan pameran dan apresiasi karya multimedia.",
        imageUrl:
            "/event/assets/mucrexx.png",
        timeline: "4 Minggu",
        service: "Pameran Karya",
        kickoffDate: "Juli 2025",
        instructor: "Tim MUDENG",
        duration: "4 Minggu",
        status: "PUBLISHED",
        formFields: mucrexFormFields,
        overview: {
            title: "Project overview",
            description:
                "MuCreX merupakan kegiatan pameran dan apresiasi karya yang diselenggarakan oleh Mudeng STT NF sebagai wadah untuk menampilkan hasil karya terbaik di bidang multimedia dan kreativitas digital. Kegiatan ini memberikan ruang bagi peserta untuk memperoleh apresiasi, memperluas wawasan, serta membangun jejaring dengan komunitas dan industri kreatif.",
        },
        process: {
            title: "Project process",
            description:
                "Kegiatan diawali dengan proses seleksi karya terbaik dari setiap program kerja, dilanjutkan dengan persiapan pameran, kurasi, dan penyusunan galeri. Selama pameran berlangsung, peserta mempresentasikan karya, berbagi pengalaman, serta berinteraksi dengan pengunjung dan pihak eksternal.",
        },
        result: {
            title: "Final result",
            description:
                "MuCreX menghadirkan pameran yang menampilkan karya-karya terbaik peserta sebagai bentuk apresiasi atas kreativitas dan inovasi. Selain memperkuat portofolio, kegiatan ini juga membuka peluang kolaborasi, memperluas relasi, dan meningkatkan pengalaman peserta di dunia industri kreatif.",
        },
        gallery: [],
        focus: "Apresiasi & Kolaborasi",
        output: "Galeri karya multimedia",
        faqs: [
            { question: "Apa itu MuCreX?", answer: "MuCreX adalah kegiatan pameran dan apresiasi karya multimedia yang diselenggarakan oleh Mudeng STT NF." },
            { question: "Siapa saja yang dapat mengikuti MuCreX?", answer: "MuCreX terbuka untuk semua peserta program Mudeng yang ingin menampilkan karya terbaik mereka." },
            { question: "Karya apa saja yang dapat dipamerkan?", answer: "Karya yang dapat dipamerkan mencakup desain grafis, fotografi, videografi, motion graphic, dan karya multimedia lainnya." },
            { question: "Bagaimana cara mengirimkan karya ke MuCreX?", answer: "Peserta dapat mengirimkan karya melalui formulir pendaftaran yang tersedia di halaman ini." },
            { question: "Apakah semua karya akan dipamerkan?", answer: "Karya akan melalui proses kurasi untuk memastikan kualitas dan kesesuaian dengan tema pameran." },
            { question: "Apa manfaat mengikuti MuCreX?", answer: "Peserta mendapatkan apresiasi, memperluas relasi, dan membuka peluang kolaborasi di dunia industri kreatif." },
        ],
    },
];

async function runSeed() {
    console.log("Seeding events...");
    for (const evt of seedEvents) {
        // Check if event already exists by slug (MySQL doesn't support onConflictDoNothing)
        const existing = await db
            .select()
            .from(events)
            .where(eq(events.slug, evt.slug))
            .limit(1);
        if (existing.length === 0) {
            await db.insert(events).values(evt);
            console.log(`  Inserted event: ${evt.title}`);
        } else {
            // Update existing event with new data
            await db
                .update(events)
                .set(evt)
                .where(eq(events.slug, evt.slug));
            console.log(`  Updated event: ${evt.title}`);
        }
    }

    console.log("Seeding admin...");
    const bcrypt = require("bcryptjs");
    const passwordHash = await bcrypt.hash("admin123", 10);

    const existingAdmin = await db
        .select()
        .from(users)
        .where(eq(users.email, "admin@mudeng.id"))
        .limit(1);

    if (existingAdmin.length === 0) {
        await db.insert(users).values({
            email: "admin@mudeng.id",
            name: "Administrator",
            passwordHash,
            role: "admin",
        });
        console.log("Admin seeded successfully.");
    } else {
        console.log("Admin already exists.");
    }

    console.log("Seeding complete!");
    process.exit(0);
}

runSeed().catch((err) => {
    console.error(err);
    process.exit(1);
});
