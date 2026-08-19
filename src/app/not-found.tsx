import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#6849E1]/10 p-5">
          <Image
              src="https://cdn.mudeng.oktaa.my.id/logo/logo-monogram.svg"
              alt="Mudeng Logo"
              width={64}
              height={64}
              className="h-full w-full object-contain"
          />
        </div>
        
        <h1 className="font-['Anton'] text-[80px] leading-[80px] tracking-[-0.02em] text-[#1A1A1A] sm:text-[120px] sm:leading-[120px]">
          404
        </h1>
        
        <h2 className="mt-4 font-['Inter'] text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Ups! Sepertinya Kamu Tersesat.
        </h2>
        
        <p className="mt-4 max-w-[500px] font-['Inter'] text-base text-gray-500 sm:text-lg">
          Halaman yang kamu cari tidak ditemukan atau telah dipindahkan. Jangan biarkan kreativitasmu terhenti di sini, mari kembali ke halaman utama!
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full bg-[#6849E1] px-8 py-4 font-['Inter'] text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-1 hover:bg-[#5a3ec5] hover:shadow-lg sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    </div>
  );
}
