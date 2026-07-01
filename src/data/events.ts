export interface EventData {
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  mainImage: string;
  overview: {
    title: string;
    description: string;
  };
  process: {
    title: string;
    description: string;
  };
  result: {
    title: string;
    description: string;
  };
  infoBox: {
    instructor: string;
    category: string;
    duration: string;
    startDate: string;
  };
  gallery: string[];
}

export const eventsData: Record<string, EventData> = {
  "ui-craft": {
    slug: "ui-craft",
    badge: "01 UI/UX Design",
    title: "UI CRAFT",
    subtitle:
      "A content-driven website structured to improve messaging clarity, user understanding, and engagement flow.",
    mainImage:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1440&h=650&fit=crop",
    overview: {
      title: "Program overview",
      description:
        "Banyak pemula kesulitan memahami alur pembuatan antarmuka pengguna yang terstruktur. Tujuan dari kelas ini adalah menyederhanakan konsep kompleks, memperkuat fundamental desain, dan membimbing peserta melalui narasi pembelajaran yang jelas dan efektif.",
    },
    process: {
      title: "Learning process",
      description:
        "Kita akan bekerja erat dalam mendefinisikan pesan utama dan menyempurnakan elemen desain. Materi pembelajaran disusun ulang berdasarkan kebutuhan industri, memastikan setiap pertemuan mengalir logis dari perkenalan hingga penjelasan teknis. Praktik disederhanakan tanpa kehilangan makna, meningkatkan kemampuan desain secara keseluruhan.",
    },
    result: {
      title: "Final result",
      description:
        "Strategi desain yang diperbarui akan meningkatkan kejelasan dan fungsionalitas produk digital yang Anda buat. Peserta kini dapat merancang antarmuka jauh lebih cepat, dengan alur yang lebih baik, dan menghasilkan portofolio yang meyakinkan.",
    },
    infoBox: {
      instructor: "Budi Santoso",
      category: "UI/UX Design",
      duration: "4 Minggu",
      startDate: "Jul 4, 2026",
    },
    gallery: [
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&h=600&fit=crop",
    ],
  },
  "creative-craft": {
    slug: "creative-craft",
    badge: "02 Visual Content",
    title: "CREATIVE CRAFT",
    subtitle:
      "Pelatihan pembuatan konten visual kreatif digital yang menarik perhatian dan berdampak luas di media sosial.",
    mainImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1440&h=650&fit=crop",
    overview: {
      title: "Program overview",
      description:
        "Banyak kreator kesulitan menemukan ide dan mengeksekusinya menjadi konten yang viral. Tujuan program ini adalah memberikan kerangka kerja kreatif yang dapat diulang untuk menghasilkan visual yang memukau dan strategi konten yang solid.",
    },
    process: {
      title: "Learning process",
      description:
        "Kita mulai dari proses ideasi, pembuatan storyboard, hingga eksekusi desain menggunakan berbagai alat kreatif. Pembelajaran difokuskan pada praktik langsung meniru kampanye sukses dan memodifikasinya menjadi karya orisinal.",
    },
    result: {
      title: "Final result",
      description:
        "Peserta akan memiliki serangkaian karya visual yang siap dipublikasikan, serta kemampuan untuk menganalisis tren media sosial dan meresponsnya dengan karya kreatif yang tepat sasaran.",
    },
    infoBox: {
      instructor: "Siti Rahmawati",
      category: "Content Strategy",
      duration: "4 Minggu",
      startDate: "Aug 10, 2026",
    },
    gallery: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    ],
  },
  mucrex: {
    slug: "mucrex",
    badge: "03 Exhibition",
    title: "MUCREX",
    subtitle:
      "Wadah pameran karya multimedia gabungan sekaligus pelatihan tingkat lanjut untuk menghasilkan portofolio siap kerja.",
    mainImage:
      "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1440&h=650&fit=crop",
    overview: {
      title: "Program overview",
      description:
        "Bagi mereka yang sudah menguasai dasar, tantangan berikutnya adalah membuat karya skala besar yang layak pamer. Program ini mensimulasikan lingkungan agensi di mana Anda berkolaborasi membuat instalasi atau kampanye raksasa.",
    },
    process: {
      title: "Learning process",
      description:
        "Dari pra-produksi hingga eksekusi pameran akhir. Peserta akan dibagi ke dalam divisi kreatif, bekerja di bawah arahan art director yang mensimulasikan tenggat waktu ketat dan standar kualitas tinggi.",
    },
    result: {
      title: "Final result",
      description:
        "Sebuah portofolio mahakarya yang dipamerkan secara publik. Lulusan program ini akan memiliki pengalaman nyata menangani proyek end-to-end yang menjadi nilai jual utama saat melamar kerja.",
    },
    infoBox: {
      instructor: "Alex Dharma",
      category: "Multimedia Arts",
      duration: "8 Minggu",
      startDate: "Sep 15, 2026",
    },
    gallery: [
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
    ],
  },
};
