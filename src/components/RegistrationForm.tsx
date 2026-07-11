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
                shape[field.id] = z
                    .string()
                    .min(1, `${field.label} wajib diisi`);
            }
        } else {
            shape[field.id] = z.string().optional();
        }
    }
    return z.object(shape);
};

export default function RegistrationForm({ event }: { event: any }) {
    const formFields: FormField[] = event.formFields || [];
    const totalSteps =
        formFields.length > 0 ? Math.max(...formFields.map((f) => f.step)) : 1;

    const [currentStep, setCurrentStep] = useState(1);
    const [status, setStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
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
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/5 bg-[#0A0B10] p-10 text-center">
                <div className="mb-6 flex justify-center">
                    <CheckCircle2 className="h-16 w-16 text-[#6849E1]" />
                </div>
                <h3 className="font-display mb-4 text-3xl text-white">
                    Pendaftaran Berhasil!
                </h3>
                <p className="text-lg text-white/70">
                    Terima kasih telah mendaftar. Kami akan memproses
                    pendaftaran Anda dan menghubungi Anda lebih lanjut.
                </p>
            </div>
        );
    }

    const fieldsToRender = formFields.filter((f) => f.step === currentStep);

    return (
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-white/5 bg-[#0A0B10] p-8 text-left shadow-2xl">
            {/* Stepper Indicator */}
            <div className="mb-10">
                <div className="relative flex items-center justify-between">
                    <div className="absolute top-1/2 left-0 z-0 h-[2px] w-full -translate-y-1/2 bg-white/10"></div>
                    <div
                        className="absolute top-1/2 left-0 z-0 h-[2px] -translate-y-1/2 bg-[#6849E1] transition-all duration-300"
                        style={{
                            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                        }}
                    ></div>

                    {Array.from({ length: totalSteps }).map((_, i) => {
                        const stepNumber = i + 1;
                        const isActive = stepNumber === currentStep;
                        const isCompleted = stepNumber < currentStep;

                        return (
                            <div
                                key={stepNumber}
                                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all duration-300 ${
                                    isActive
                                        ? "bg-[#6849E1] text-white ring-4 ring-[#6849E1]/30"
                                        : isCompleted
                                          ? "bg-[#6849E1] text-white"
                                          : "border border-white/10 bg-[#1A1A1A] text-white/40"
                                }`}
                            >
                                {isCompleted ? (
                                    <CheckCircle2 className="h-5 w-5" />
                                ) : (
                                    stepNumber
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <h2 className="font-display mb-2 text-2xl text-white">
                    Langkah {currentStep} dari {totalSteps}
                </h2>

                {status === "error" && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/20 p-4 text-sm text-red-500">
                        {errorMessage}
                    </div>
                )}

                <div className="flex min-h-[300px] flex-col gap-6">
                    {fieldsToRender.map((field) => (
                        <div
                            key={field.id}
                            className="animate-in fade-in slide-in-from-bottom-2 flex flex-col gap-2 duration-300"
                        >
                            <label className="text-sm font-semibold text-white/90">
                                {field.label}{" "}
                                {field.required && (
                                    <span className="text-[#6849E1]">*</span>
                                )}
                            </label>

                            {field.type === "text" || field.type === "email" ? (
                                <input
                                    type={field.type}
                                    {...register(field.id)}
                                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all outline-none placeholder:text-white/20 focus:border-[#6849E1] focus:bg-white/10"
                                    placeholder={`Masukkan ${field.label.toLowerCase()}`}
                                />
                            ) : field.type === "textarea" ? (
                                <textarea
                                    {...register(field.id)}
                                    className="min-h-[100px] resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all outline-none placeholder:text-white/20 focus:border-[#6849E1] focus:bg-white/10"
                                    placeholder={`Masukkan ${field.label.toLowerCase()}`}
                                />
                            ) : field.type === "select" && field.options ? (
                                <select
                                    {...register(field.id)}
                                    className="appearance-none rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white transition-all outline-none focus:border-[#6849E1]"
                                >
                                    <option value="">Pilih...</option>
                                    {field.options.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            ) : field.type === "radio" && field.options ? (
                                <div className="mt-2 flex flex-col gap-4 sm:flex-row">
                                    {field.options.map((opt) => (
                                        <label
                                            key={opt}
                                            className="group flex cursor-pointer items-center gap-3 text-white/80"
                                        >
                                            <div className="relative flex h-5 w-5 items-center justify-center">
                                                <input
                                                    type="radio"
                                                    value={opt}
                                                    {...register(field.id)}
                                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-white/20 transition-colors checked:border-[#6849E1]"
                                                />
                                                <div className="pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-[#6849E1] opacity-0 transition-opacity peer-checked:opacity-100"></div>
                                            </div>
                                            <span className="transition-colors group-hover:text-white">
                                                {opt}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            ) : null}

                            {errors[field.id] && (
                                <span className="mt-1 text-xs text-red-400">
                                    {errors[field.id]?.message as string}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                    {currentStep > 1 ? (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="flex items-center gap-2 rounded-full px-6 py-3 font-medium text-white/70 transition-all hover:bg-white/5 hover:text-white"
                        >
                            <ChevronLeft className="h-4 w-4" /> Kembali
                        </button>
                    ) : (
                        <div></div> // Empty div for flex spacing
                    )}

                    {currentStep < totalSteps ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="flex items-center gap-2 rounded-full bg-[#6849E1] px-8 py-3 font-medium text-white transition-all hover:bg-[#5b3fd1]"
                        >
                            Selanjutnya <ChevronRight className="h-4 w-4" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="flex min-w-[160px] items-center justify-center gap-2 rounded-full bg-[#6849E1] px-8 py-3 font-medium text-white transition-all hover:bg-[#5b3fd1] disabled:opacity-50"
                        >
                            {status === "submitting" ? (
                                "Memproses..."
                            ) : (
                                <>
                                    Submit <CheckCircle2 className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
