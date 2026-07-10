"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerEvent } from "@/lib/actions/events";

const schema = z.object({
  email: z.string().email("Email tidak valid"),
  fullName: z.string().min(2, "Nama lengkap harus diisi"),
  institution: z.string().min(2, "Asal instansi harus diisi"),
  whatsapp: z.string().min(9, "Nomor WhatsApp harus diisi"),
  source: z.string().min(1, "Wajib dipilih"),
  experience: z.string().min(1, "Wajib dipilih"),
  tools: z.string().min(1, "Wajib dipilih"),
  expectations: z.string().min(1, "Wajib dipilih"),
  commitment: z.string().min(1, "Wajib dipilih"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function RegistrationForm({ eventId }: { eventId: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const res = await registerEvent(eventId, formData);
    if (res.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(res.error || "Terjadi kesalahan. Coba lagi.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-[#0A0B10] p-10 text-center">
        <h3 className="font-display text-2xl text-white mb-4">Pendaftaran Berhasil!</h3>
        <p className="text-white/70">
          Terima kasih telah mendaftar. Kami akan memproses pendaftaran Anda dan menghubungi Anda melalui WhatsApp atau Email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-2xl mx-auto p-8 rounded-2xl bg-[#0A0B10] text-left">
      <h2 className="font-display text-3xl text-white mb-4">Form Pendaftaran</h2>

      {status === "error" && (
        <div className="bg-red-500/20 text-red-500 p-4 rounded-xl text-sm">{errorMessage}</div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-white text-sm font-semibold">Alamat Email *</label>
        <input {...register("email")} className="bg-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#6849E1]" placeholder="Email aktif" />
        {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white text-sm font-semibold">Nama Lengkap *</label>
        <input {...register("fullName")} className="bg-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#6849E1]" placeholder="Nama lengkap sesuai KTP" />
        {errors.fullName && <span className="text-red-400 text-xs">{errors.fullName.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white text-sm font-semibold">Asal Instansi *</label>
        <input {...register("institution")} className="bg-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#6849E1]" placeholder="Sekolah / Kampus / Perusahaan" />
        {errors.institution && <span className="text-red-400 text-xs">{errors.institution.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white text-sm font-semibold">Nomor WhatsApp (aktif) *</label>
        <input {...register("whatsapp")} className="bg-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#6849E1]" placeholder="08123456789" />
        {errors.whatsapp && <span className="text-red-400 text-xs">{errors.whatsapp.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white text-sm font-semibold">Dari mana kamu mengetahui event ini? *</label>
        <select {...register("source")} className="bg-[#1A1A1A] rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#6849E1]">
          <option value="">Pilih...</option>
          <option value="Sosial media">Sosial media</option>
          <option value="Teman/Sahabat">Teman/Sahabat</option>
          <option value="Poster/Pamflet">Poster/Pamflet</option>
          <option value="Website / Media Online">Website / Media Online</option>
          <option value="Other">Other</option>
        </select>
        {errors.source && <span className="text-red-400 text-xs">{errors.source.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white text-sm font-semibold">Pengalaman di bidang Design? *</label>
        <select {...register("experience")} className="bg-[#1A1A1A] rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#6849E1]">
          <option value="">Pilih...</option>
          <option value="Belum pernah sama sekali">Belum pernah sama sekali</option>
          <option value="Pernah belajar dasar-dasarnya">Pernah belajar dasar-dasarnya</option>
          <option value="Pernah membuat desain Infografis">Pernah membuat desain Infografis</option>
          <option value="Sudah cukup familiar dengan Canva & Tools lainnya">Sudah cukup familiar dengan Canva & Tools lainnya</option>
          <option value="Other">Other</option>
        </select>
        {errors.experience && <span className="text-red-400 text-xs">{errors.experience.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white text-sm font-semibold">Aplikasi desain yang pernah digunakan? *</label>
        <select {...register("tools")} className="bg-[#1A1A1A] rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#6849E1]">
          <option value="">Pilih...</option>
          <option value="Figma">Figma</option>
          <option value="Canva">Canva</option>
          <option value="Adobe Family">Adobe Family</option>
          <option value="Belum pernah menggunakan aplikasi desain">Belum pernah menggunakan aplikasi desain</option>
          <option value="Other">Other</option>
        </select>
        {errors.tools && <span className="text-red-400 text-xs">{errors.tools.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white text-sm font-semibold">Harapan mengikuti event ini? *</label>
        <select {...register("expectations")} className="bg-[#1A1A1A] rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#6849E1]">
          <option value="">Pilih...</option>
          <option value="Memahami Dasar Dasar Tools Design">Memahami Dasar Dasar Tools Design</option>
          <option value="Menambah Portofolio Desain">Menambah Portofolio Desain</option>
          <option value="Menambah Relasi dan Networking">Menambah Relasi dan Networking</option>
          <option value="Sekadar ingin mencoba dan mengenal pembuatan desain">Sekadar ingin mencoba dan mengenal pembuatan desain</option>
          <option value="Other">Other</option>
        </select>
        {errors.expectations && <span className="text-red-400 text-xs">{errors.expectations.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white text-sm font-semibold">Bersedia mengikuti seluruh rangkaian kegiatan? *</label>
        <div className="flex gap-6 mt-1">
          <label className="flex items-center gap-2 text-white">
            <input type="radio" value="Ya" {...register("commitment")} className="accent-[#6849E1]" /> Ya
          </label>
          <label className="flex items-center gap-2 text-white">
            <input type="radio" value="Tidak" {...register("commitment")} className="accent-[#6849E1]" /> Tidak
          </label>
        </div>
        {errors.commitment && <span className="text-red-400 text-xs">{errors.commitment.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white text-sm font-semibold">Deskripsi Tambahan / Pesan</label>
        <textarea {...register("description")} className="bg-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#6849E1] h-24 resize-none" placeholder="Opsional..." />
      </div>

      <button 
        type="submit" 
        disabled={status === "submitting"}
        className="mt-4 font-body rounded-full bg-[#1A1A1A] hover:bg-black border border-[#333] px-6 py-4 text-sm font-semibold text-white transition-all disabled:opacity-50 w-full flex justify-center"
      >
        {status === "submitting" ? "Memproses..." : "Submit Pendaftaran"}
      </button>
    </form>
  );
}
