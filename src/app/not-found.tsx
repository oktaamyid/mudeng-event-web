import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-6xl font-black text-[#6849E1] font-['Anton']">404</h1>
        <h2 className="text-2xl font-bold font-['Inter']">Halaman Tidak Ditemukan (EVENT-WEB)</h2>
        <p className="text-gray-400 font-['Inter']">
          INI ADALAH BUKTI BAHWA TRAEFIK BERHASIL MASUK KE DALAM KONTAINER EVENT-WEB!
          Jika Anda melihat halaman ini, berarti Dockploy & Traefik sukses besar.
        </p>
        <div className="pt-8">
          <Link 
            href="/"
            className="bg-[#6849E1] hover:bg-[#5a3ec5] text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            Kembali ke Beranda Event
          </Link>
        </div>
      </div>
    </div>
  );
}
