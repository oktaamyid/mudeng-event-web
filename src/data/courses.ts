export interface CourseData {
    slug: string;
    tag: string;
    title: string;
    description: string;
    image: string;
    heroImages: string[];
    overview: string;
    highlights: string[];
    tools: { name: string; logo: string }[];
    curriculum: { week: string; topic: string; description: string; mode: "Online" | "Offline" }[];
    faqs: { q: string; a: string }[];
}

export const coursesData: Record<string, CourseData> = {
    "ui-craft": {
        slug: "ui-craft",
        tag: "Real momentum",
        title: "UI Craft",
        description:
            "Pelatihan pembuatan desain antarmuka aplikasi dan website modern.",
        image: "/event/assets/uiux1.png",
        heroImages: [
            "/event/assets/uiux1.png",
            "/event/assets/uiux2.png",
            "/event/assets/uiux3.png",
        ],
        overview:
            "UI Craft adalah program pelatihan intensif yang dirancang untuk membekali peserta dengan keterampilan mendesain antarmuka pengguna (UI) yang modern, fungsional, dan estetis. Melalui pendekatan berbasis proyek, peserta akan belajar dari dasar hingga mampu menghasilkan prototype yang siap dipresentasikan.",
        highlights: [
            "Memahami prinsip dasar UI/UX Design",
            "Menguasai Figma untuk prototyping",
            "Membuat design system yang konsisten",
            "Menghasilkan portofolio UI/UX profesional",
        ],
        tools: [
            { name: "Figma", logo: "/event/assets/logo-figma.png" },
        ],
        curriculum: [
            { week: "Minggu 1", topic: "Fundamental UI/UX", description: "Pengenalan prinsip desain, wireframing, dan user research.", mode: "Online" },
            { week: "Minggu 2", topic: "Design System", description: "Membangun komponen reusable, tipografi, dan color palette.", mode: "Online" },
            { week: "Minggu 3", topic: "Prototyping", description: "Membuat prototype interaktif menggunakan Figma.", mode: "Offline" },
            { week: "Minggu 4", topic: "Final Project", description: "Menyelesaikan proyek akhir dan presentasi portofolio.", mode: "Offline" },
        ],
        faqs: [
            { q: "Apa itu UI Craft?", a: "UI Craft adalah program pelatihan intensif di bidang UI/UX Design yang dirancang untuk pemula hingga intermediate." },
            { q: "Apakah harus punya pengalaman desain?", a: "Tidak harus. Program ini dirancang untuk semua level, termasuk pemula." },
            { q: "Software apa yang digunakan?", a: "Figma sebagai tools utama, ditambah tools pendukung lainnya." },
            { q: "Berapa lama durasi program?", a: "Program berlangsung selama 4 minggu dengan pertemuan intensif." },
            { q: "Apakah ada sertifikat?", a: "Ya, peserta yang menyelesaikan program akan mendapatkan sertifikat." },
            { q: "Bagaimana cara mendaftar?", a: "Klik tombol 'Daftar Sekarang' dan isi formulir pendaftaran." },
        ],
    },
    "graphic-desain": {
        slug: "graphic-desain",
        tag: "No more falling off",
        title: "Graphic Design",
        description:
            "Pelatihan eksklusif komunikasi visual dan desain grafis modern.",
        image: "/event/assets/gd1.png",
        heroImages: [
            "/event/assets/gd1.png",
            "/event/assets/gd2.png",
            "/event/assets/gd3.png",
        ],
        overview:
            "Program Graphic Design mengajarkan peserta cara menciptakan karya visual yang komunikatif dan berdampak. Dari logo, poster, hingga identitas brand — semua dipelajari dengan pendekatan industri terkini.",
        highlights: [
            "Menguasai prinsip desain grafis dan layout",
            "Membuat identitas visual dan branding",
            "Teknik komposisi dan tipografi profesional",
            "Menghasilkan portofolio desain grafis",
        ],
        tools: [
            { name: "Canva", logo: "/event/assets/logo-canva.png" },
        ],
        curriculum: [
            { week: "Minggu 1", topic: "Dasar Desain Grafis", description: "Prinsip layout, warna, dan tipografi.", mode: "Online" },
            { week: "Minggu 2", topic: "Identitas Visual", description: "Membuat logo dan brand identity.", mode: "Online" },
            { week: "Minggu 3", topic: "Marketing Material", description: "Desain poster, brosur, dan media sosial.", mode: "Offline" },
            { week: "Minggu 4", topic: "Final Project", description: "Proyek branding lengkap dan presentasi.", mode: "Offline" },
        ],
        faqs: [
            { q: "Apa itu program Graphic Design?", a: "Program pelatihan komunikasi visual dan desain grafis modern." },
            { q: "Tools apa yang digunakan?", a: "Adobe Illustrator, Photoshop, Canva, dan Figma." },
            { q: "Apakah cocok untuk pemula?", a: "Ya, program dirancang dari dasar hingga tingkat lanjut." },
            { q: "Apa output dari program ini?", a: "Portofolio desain grafis profesional yang siap digunakan." },
            { q: "Berapa lama durasinya?", a: "Program berlangsung selama 4 minggu." },
            { q: "Bagaimana cara mendaftar?", a: "Klik tombol 'Daftar Sekarang' dan isi formulir." },
        ],
    },
    photography: {
        slug: "photography",
        tag: "Never stuck again",
        title: "Photography",
        description:
            "Pelatihan eksklusif teknik fotografi digital dan komposisi visual.",
        image: "/event/assets/pd1.png",
        heroImages: [
            "/event/assets/pd1.png",
            "/event/assets/pd2.png",
            "/event/assets/pd3.png",
        ],
        overview:
            "Program Photography membekali peserta dengan teknik fotografi profesional mulai dari komposisi, pencahayaan, hingga editing. Cocok untuk siapa saja yang ingin menguasai seni visual melalui lensa kamera.",
        highlights: [
            "Teknik komposisi dan pencahayaan",
            "Fotografi portrait dan landscape",
            "Post-processing dan editing foto",
            "Membangun portofolio fotografi",
        ],
        tools: [
            { name: "Photoshop", logo: "/event/assets/logo-photoshop.png" },
        ],
        curriculum: [
            { week: "Minggu 1", topic: "Dasar Fotografi", description: "Pengenalan kamera, exposure triangle, dan komposisi.", mode: "Online" },
            { week: "Minggu 2", topic: "Teknik Lanjutan", description: "Pencahayaan studio, portrait, dan landscape.", mode: "Online" },
            { week: "Minggu 3", topic: "Post-Processing", description: "Editing menggunakan Lightroom dan Photoshop.", mode: "Offline" },
            { week: "Minggu 4", topic: "Final Project", description: "Photo series dan presentasi portofolio.", mode: "Offline" },
        ],
        faqs: [
            { q: "Apakah harus punya kamera profesional?", a: "Tidak harus, smartphone dengan kamera yang baik juga bisa digunakan." },
            { q: "Apa saja yang dipelajari?", a: "Komposisi, pencahayaan, teknik portrait, landscape, dan editing." },
            { q: "Apakah cocok untuk pemula?", a: "Sangat cocok, materi dirancang dari dasar." },
            { q: "Berapa lama durasinya?", a: "Program berlangsung selama 4 minggu." },
            { q: "Apakah ada praktik lapangan?", a: "Ya, akan ada sesi foto outdoor dan indoor." },
            { q: "Bagaimana cara mendaftar?", a: "Klik tombol 'Daftar Sekarang' dan isi formulir." },
        ],
    },
    videography: {
        slug: "videography",
        tag: "Growth with payoff",
        title: "Videography",
        description:
            "Pelatihan eksklusif produksi video kreatif dan teknik sinematografi.",
        image: "/event/assets/vg1.png",
        heroImages: [
            "/event/assets/vg1.png",
            "/event/assets/vg2.png",
            "/event/assets/vg3.png",
        ],
        overview:
            "Program Videography mengajarkan peserta cara memproduksi video berkualitas profesional mulai dari perencanaan, pengambilan gambar, hingga editing. Peserta akan menguasai teknik sinematografi yang digunakan di industri kreatif.",
        highlights: [
            "Teknik pengambilan gambar sinematik",
            "Storytelling melalui video",
            "Editing video profesional",
            "Produksi konten untuk berbagai platform",
        ],
        tools: [
            { name: "CapCut", logo: "/event/assets/logo-capcut.png" },
        ],
        curriculum: [
            { week: "Minggu 1", topic: "Dasar Videografi", description: "Pengenalan kamera video, framing, dan movement.", mode: "Online" },
            { week: "Minggu 2", topic: "Sinematografi", description: "Teknik pencahayaan, angle, dan storytelling visual.", mode: "Online" },
            { week: "Minggu 3", topic: "Video Editing", description: "Editing menggunakan Premiere Pro dan DaVinci Resolve.", mode: "Offline" },
            { week: "Minggu 4", topic: "Final Project", description: "Produksi short film atau konten kreatif.", mode: "Offline" },
        ],
        faqs: [
            { q: "Apakah harus punya kamera video?", a: "Tidak harus, smartphone dengan fitur video yang baik juga bisa digunakan." },
            { q: "Software editing apa yang digunakan?", a: "Adobe Premiere Pro dan DaVinci Resolve." },
            { q: "Apakah cocok untuk pemula?", a: "Ya, materi dirancang dari dasar hingga lanjutan." },
            { q: "Berapa lama durasinya?", a: "Program berlangsung selama 4 minggu." },
            { q: "Apa output akhir program?", a: "Short film atau konten video kreatif untuk portofolio." },
            { q: "Bagaimana cara mendaftar?", a: "Klik tombol 'Daftar Sekarang' dan isi formulir." },
        ],
    },
    "digital-art": {
        slug: "digital-art",
        tag: "Likes, comments, saves",
        title: "Digital ART",
        description:
            "Pelatihan eksklusif ilustrasi digital dan seni visual modern.",
        image: "/event/assets/dg1.png",
        heroImages: [
            "/event/assets/dg1.png",
            "/event/assets/dg2.png",
            "/event/assets/dg3.png",
        ],
        overview:
            "Program Digital ART mengajak peserta mendalami dunia ilustrasi digital dan seni visual modern. Dari sketsa digital hingga karya seni yang siap dipublikasikan, peserta akan menguasai tools dan teknik yang digunakan oleh profesional di industri kreatif.",
        highlights: [
            "Teknik ilustrasi digital dari dasar",
            "Menguasai tools digital painting",
            "Character design dan environment art",
            "Membuat karya seni siap publikasi",
        ],
        tools: [
            { name: "Canva", logo: "/event/assets/logo-canva.png" },
            { name: "Photoshop", logo: "/event/assets/logo-photoshop.png" },
        ],
        curriculum: [
            { week: "Minggu 1", topic: "Dasar Digital Art", description: "Pengenalan tools, brushes, dan teknik dasar.", mode: "Online" },
            { week: "Minggu 2", topic: "Ilustrasi Digital", description: "Character design dan environment illustration.", mode: "Online" },
            { week: "Minggu 3", topic: "Digital Painting", description: "Teknik pewarnaan, shading, dan lighting.", mode: "Offline" },
            { week: "Minggu 4", topic: "Final Project", description: "Karya ilustrasi lengkap untuk portofolio.", mode: "Offline" },
        ],
        faqs: [
            { q: "Apakah harus punya drawing tablet?", a: "Disarankan, tapi bisa juga menggunakan mouse atau trackpad untuk awal." },
            { q: "Software apa yang digunakan?", a: "Procreate, Adobe Photoshop, dan Clip Studio Paint." },
            { q: "Apakah cocok untuk yang belum bisa menggambar?", a: "Ya, akan diajarkan dari teknik dasar." },
            { q: "Berapa lama durasinya?", a: "Program berlangsung selama 4 minggu." },
            { q: "Apa output akhir program?", a: "Karya ilustrasi digital untuk portofolio." },
            { q: "Bagaimana cara mendaftar?", a: "Klik tombol 'Daftar Sekarang' dan isi formulir." },
        ],
    },
    "motion-graphic": {
        slug: "motion-graphic",
        tag: "You're ready now",
        title: "Motion Graphic",
        description:
            "Pelatihan eksklusif animasi grafis dan efek visual modern.",
        image: "/event/assets/mg1.png",
        heroImages: [
            "/event/assets/mg1.png",
            "/event/assets/mg2.png",
            "/event/assets/mg3.png",
        ],
        overview:
            "Program Motion Graphic membekali peserta dengan keterampilan membuat animasi grafis dan efek visual yang memukau. Dari logo animation hingga motion design untuk konten digital, peserta akan menguasai teknik yang dibutuhkan industri kreatif.",
        highlights: [
            "Prinsip dasar animasi dan motion",
            "Menguasai After Effects dan tools animasi",
            "Logo animation dan kinetic typography",
            "Membuat motion content untuk media sosial",
        ],
        tools: [
            { name: "Canva", logo: "/event/assets/logo-canva.png" },
            { name: "After Effect", logo: "/event/assets/ae.png" },
            { name: "CapCut", logo: "/event/assets/logo-capcut.png" },
        ],
        curriculum: [
            { week: "Minggu 1", topic: "Dasar Motion Graphic", description: "Prinsip animasi, keyframe, dan timing.", mode: "Online" },
            { week: "Minggu 2", topic: "After Effects", description: "Menguasai tools, layer, dan efek dasar.", mode: "Online" },
            { week: "Minggu 3", topic: "Motion Design", description: "Logo animation, kinetic typography, dan transisi.", mode: "Offline" },
            { week: "Minggu 4", topic: "Final Project", description: "Motion reel dan portofolio animasi.", mode: "Offline" },
        ],
        faqs: [
            { q: "Apa itu Motion Graphic?", a: "Motion Graphic adalah seni menghidupkan elemen grafis melalui animasi." },
            { q: "Software apa yang digunakan?", a: "Adobe After Effects sebagai tools utama." },
            { q: "Apakah harus punya pengalaman animasi?", a: "Tidak harus, materi dimulai dari dasar." },
            { q: "Berapa lama durasinya?", a: "Program berlangsung selama 4 minggu." },
            { q: "Apa output akhir program?", a: "Motion reel dan konten animasi untuk portofolio." },
            { q: "Bagaimana cara mendaftar?", a: "Klik tombol 'Daftar Sekarang' dan isi formulir." },
        ],
    },
};

export const coursesList = Object.values(coursesData);
