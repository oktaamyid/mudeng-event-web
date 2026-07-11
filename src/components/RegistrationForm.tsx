"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerEvent } from "@/lib/actions/events";
import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

type FormField = {
  id: string;
  step: number;
  type: "text" | "email" | "select" | "radio" | "textarea";
  label: string;
  required?: boolean;
  options?: string[];
};

const buildSchema = (fields: FormField[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) {
    if (field.required) {
      if (field.type === "email") {
        shape[field.id] = z.string().email("Email tidak valid");
      } else {
        shape[field.id] = z.string().min(1, `${field.label} wajib diisi`);
      }
    } else {
      shape[field.id] = z.string().optional();
    }
  }
  return z.object(shape);
};

export default function RegistrationForm({ event }: { event: any }) {
  const formFields: FormField[] = event.formFields || [];
  const totalSteps = formFields.length > 0 ? Math.max(...formFields.map((f) => f.step)) : 1;

  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const schema = buildSchema(formFields);
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const nextStep = async () => {
    const fieldsInCurrentStep = formFields
      .filter((f) => f.step === currentStep)
      .map((f) => f.id as keyof FormData);
    
    const isValid = await trigger(fieldsInCurrentStep);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    const res = await registerEvent(event.id, data);
    if (res.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(res.error || "Terjadi kesalahan. Coba lagi.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-[#0A0B10] p-10 text-center max-w-2xl mx-auto border border-white/5">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-16 h-16 text-[#6849E1]" />
        </div>
        <h3 className="font-display text-3xl text-white mb-4">Pendaftaran Berhasil!</h3>
        <p className="text-white/70 text-lg">
          Terima kasih telah mendaftar. Kami akan memproses pendaftaran Anda dan menghubungi Anda lebih lanjut.
        </p>
      </div>
    );
  }

  const fieldsToRender = formFields.filter((f) => f.step === currentStep);

  return (
    <div className="w-full max-w-3xl mx-auto p-8 rounded-3xl bg-[#0A0B10] text-left border border-white/5 shadow-2xl">
      {/* Stepper Indicator */}
      <div className="mb-10">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white/10 z-0"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#6849E1] z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
          
          {Array.from({ length: totalSteps }).map((_, i) => {
            const stepNumber = i + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            
            return (
              <div 
                key={stepNumber} 
                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300
                  ${isActive ? "bg-[#6849E1] text-white ring-4 ring-[#6849E1]/30" : 
                    isCompleted ? "bg-[#6849E1] text-white" : "bg-[#1A1A1A] text-white/40 border border-white/10"}`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : stepNumber}
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="font-display text-2xl text-white mb-2">
          Langkah {currentStep} dari {totalSteps}
        </h2>

        {status === "error" && (
          <div className="bg-red-500/20 text-red-500 p-4 rounded-xl text-sm border border-red-500/30">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col gap-6 min-h-[300px]">
          {fieldsToRender.map((field) => (
            <div key={field.id} className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <label className="text-white/90 text-sm font-semibold">
                {field.label} {field.required && <span className="text-[#6849E1]">*</span>}
              </label>
              
              {field.type === "text" || field.type === "email" ? (
                <input
                  type={field.type}
                  {...register(field.id)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#6849E1] focus:bg-white/10 transition-all placeholder:text-white/20"
                  placeholder={`Masukkan ${field.label.toLowerCase()}`}
                />
              ) : field.type === "textarea" ? (
                <textarea
                  {...register(field.id)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#6849E1] focus:bg-white/10 transition-all placeholder:text-white/20 min-h-[100px] resize-y"
                  placeholder={`Masukkan ${field.label.toLowerCase()}`}
                />
              ) : field.type === "select" && field.options ? (
                <select
                  {...register(field.id)}
                  className="bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#6849E1] transition-all appearance-none"
                >
                  <option value="">Pilih...</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === "radio" && field.options ? (
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  {field.options.map((opt) => (
                    <label key={opt} className="flex items-center gap-3 text-white/80 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input
                          type="radio"
                          value={opt}
                          {...register(field.id)}
                          className="peer appearance-none w-5 h-5 border-2 border-white/20 rounded-full checked:border-[#6849E1] transition-colors cursor-pointer"
                        />
                        <div className="absolute w-2.5 h-2.5 rounded-full bg-[#6849E1] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
                      </div>
                      <span className="group-hover:text-white transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
              ) : null}

              {errors[field.id] && (
                <span className="text-red-400 text-xs mt-1">
                  {errors[field.id]?.message as string}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-all font-medium"
            >
              <ChevronLeft className="w-4 h-4" /> Kembali
            </button>
          ) : (
            <div></div> // Empty div for flex spacing
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 bg-[#6849E1] hover:bg-[#5b3fd1] px-8 py-3 rounded-full text-white font-medium transition-all"
            >
              Selanjutnya <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex items-center justify-center gap-2 bg-[#6849E1] hover:bg-[#5b3fd1] px-8 py-3 rounded-full text-white font-medium transition-all disabled:opacity-50 min-w-[160px]"
            >
              {status === "submitting" ? (
                "Memproses..."
              ) : (
                <>Submit <CheckCircle2 className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
