export interface BenefitCardItem {
    slug: string;
    image: string;
    tag: string;
    title: string;
    desc: string;
    objectPosition?: string;
}

export interface TestimonialItem {
    text: string;
    name: string;
    avatar: string;
    bgColor: string;
}

export interface HomeFaqItem {
    question: string;
    answer: string;
}

export interface AboutStatItem {
    number: string;
    suffix: string;
    label: string;
}

export interface HomeAboutContent {
    stats: AboutStatItem[];
}

export interface TestimonialsCmsConfig {
    mode: "instagram" | "cards";
    instagramUrl: string;
    items: TestimonialItem[];
}

export interface HomeCmsContent {
    benefits: BenefitCardItem[];
    testimonials: TestimonialsCmsConfig;
    faqs: HomeFaqItem[];
    about: HomeAboutContent;
}

export const DEFAULT_BENEFIT_CARDS: BenefitCardItem[] = [
    {
        slug: "ui-craft",
        image: "/event/assets/uiux1.png",
        tag: "Real momentum",
        title: "UI Craft",
        desc: "Pelatihan pembuatan desain antarmuka aplikasi dan website modern.",
    },
    {
        slug: "graphic-desain",
        image: "/event/assets/gd1.png",
        tag: "No more falling off",
        title: "Graphic Design",
        desc: "Pelatihan eksklusif komunikasi visual dan desain grafis modern.",
    },
    {
        slug: "photography",
        image: "/event/assets/pd1.png",
        tag: "Never stuck again",
        title: "Photography",
        desc: "Pelatihan eksklusif teknik fotografi digital dan komposisi visual.",
    },
    {
        slug: "videography",
        image: "/event/assets/vg1.png",
        tag: "Growth with payoff",
        title: "Videography",
        desc: "Pelatihan eksklusif produksi video kreatif dan teknik sinematografi.",
    },
    {
        slug: "digital-art",
        image: "/event/assets/dg1.png",
        tag: "Likes, comments, saves",
        title: "Digital ART",
        desc: "Pelatihan eksklusif ilustrasi digital dan seni visual modern.",
        objectPosition: "right center",
    },
    {
        slug: "motion-graphic",
        image: "/event/assets/mg1.png",
        tag: "You're ready now",
        title: "Motion Graphic",
        desc: "Pelatihan eksklusif animasi grafis dan efek visual modern.",
    },
];

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
    {
        text: "Dulu bingung bikin layout web. Setelah ikut kelas UI Craft, sekarang paham workflow riset user sampai bikin komponen matang di Figma",
        name: "Bayu",
        avatar: "https://ui-avatars.com/api/?background=6849E1&color=fff&name=Bayu",
        bgColor: "#FFFFFF",
    },
    {
        text: "Materinya daging banget! Membuka mata tentang pentingnya komposisi grid dan psikologi warna untuk branding.",
        name: "Raihan",
        avatar: "https://ui-avatars.com/api/?background=4A7CF7&color=fff&name=Raihan",
        bgColor: "#E0F0FF",
    },
    {
        text: "Event multimedia paling worth it! Gabungan materi UI Craft dan teknik visual lainnya jadi modal kuat buat nyusun portofolio pertama.",
        name: "Siti",
        avatar: "https://ui-avatars.com/api/?background=7C7AEA&color=fff&name=Siti",
        bgColor: "#EDE5FF",
    },
    {
        text: "Sesi Videography seru parah! Trik angle dinamis dan dasar editing video dikupas habis, sangat mudah dipahami pemula.",
        name: "Nurul H.",
        avatar: "https://ui-avatars.com/api/?background=5B6DEA&color=fff&name=Nurul+H.",
        bgColor: "#FFFFFF",
    },
    {
        text: "Belajar segitiga eksposur dan teknik komposisi di sini sangat membantu. Hasil foto produk saya sekarang jauh lebih estetik dan profesional!",
        name: "Zahra F.",
        avatar: "https://ui-avatars.com/api/?background=8B5CF6&color=fff&name=Zahra+F.",
        bgColor: "#E0F0FF",
    },
];

export const DEFAULT_INSTAGRAM_PROFILE_URL =
    "https://www.instagram.com/mudengsttnf/";

export const DEFAULT_TESTIMONIALS_CONFIG: TestimonialsCmsConfig = {
    mode: "instagram",
    instagramUrl: DEFAULT_INSTAGRAM_PROFILE_URL,
    items: DEFAULT_TESTIMONIALS,
};

export const DEFAULT_HOME_FAQS: HomeFaqItem[] = [
    {
        question: "Apakah materi MUDENG ini cocok untuk pemula??",
        answer: "Ya, kursus ini dirancang untuk pemula hingga intermediate. Semua materi disampaikan secara bertahap dan mudah dipahami, bahkan jika kamu belum punya pengalaman di bidang digital kreatif sebelumnya.",
    },
    {
        question: "Program belajar multimedia mana yang paling sesuai untuk saya?",
        answer: "Setiap program memiliki fokus yang berbeda. Jika Anda belum yakin, konsultasikan kebutuhan Anda dengan tim kami agar mendapatkan rekomendasi program yang paling sesuai.",
    },
    {
        question: "Apakah materi kelas digital ini bisa diakses lewat HP?",
        answer: "Ya. Materi dapat diakses melalui HP, tablet, maupun laptop. Namun, untuk praktik menggunakan software multimedia, kami menyarankan menggunakan laptop atau PC agar proses belajar lebih optimal.",
    },
    {
        question: "Apakah ada sesi konsultasi langsung dengan mentor jika saya menemui kesulitan?",
        answer: "Ya. Anda dapat berkonsultasi langsung dengan mentor selama proses pembelajaran untuk bertanya, berdiskusi, dan mendapatkan solusi ketika mengalami kesulitan.",
    },
    {
        question: "Bagaimana portofolio MUDENG ini dapat membantu saya dalam melamar kerja?",
        answer: "Portofolio yang Anda bangun selama mengikuti program dapat menjadi bukti kemampuan dan pengalaman Anda, sehingga meningkatkan kepercayaan perusahaan saat melamar pekerjaan atau mencari peluang freelance.",
    },
];

export const DEFAULT_ABOUT_CONTENT: HomeAboutContent = {
    stats: [
        { number: "500", suffix: "+", label: "Peserta Berpartisipasi" },
        { number: "3", suffix: "", label: "Kategori Pelatihan Utama" },
        { number: "10", suffix: "+", label: "Mentor Berpengalaman" },
        { number: "100", suffix: "%", label: "Berorientasi Portofolio" },
    ],
};
