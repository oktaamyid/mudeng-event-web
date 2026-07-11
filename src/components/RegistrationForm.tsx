/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerEvent } from "@/lib/actions/events";
import {
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion, AnimatePresence } from "framer-motion";

export type FormFieldType =
    | "text"
    | "email"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "number"
    | "phone"
    | "date"
    | "file";

export interface FormField {
    id: string;
    step: number;
    type: FormFieldType;
    label: string;
    description?: string;
    placeholder?: string;
    required?: boolean;
    options?: string[];
    dependsOn?: string;
    dependsOnValue?: string;
    allowOtherOption?: boolean;
}

const buildSchema = (fields: FormField[]) => {
    const shape: Record<string, z.ZodTypeAny> = {};
    for (const field of fields) {
        if (field.required) {
            if (field.type === "email") {
                shape[field.id] = z.string().email("Email tidak valid");
            } else if (field.type === "checkbox") {
                shape[field.id] = z
                    .array(z.string())
                    .min(1, `${field.label} wajib diisi`);
            } else {
                shape[field.id] = z
                    .string()
                    .min(1, `${field.label} wajib diisi`);
            }
        } else {
            if (field.type === "checkbox") {
                shape[field.id] = z.array(z.string()).optional();
            } else {
                shape[field.id] = z.string().optional();
            }
        }
    }
    return z.object(shape);
};

export default function RegistrationForm({ event }: { event: any }) {
    const formFields: FormField[] = event.formFields || [];

    // Sort fields by step, then index
    const sortedFields = [...formFields].sort((a, b) => a.step - b.step);

    const totalSteps =
        sortedFields.length > 0
            ? Math.max(...sortedFields.map((f) => f.step))
            : 1;

    const [currentStep, setCurrentStep] = useState(1);
    const [status, setStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    const schema = buildSchema(sortedFields);
    type FormData = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        control,
        watch,
        reset,
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {}, // Will be populated by localStorage
    });

    const watchedValues = watch();

    // Is field visible based on Conditional Logic
    const isFieldVisible = (field: FormField) => {
        if (!field.dependsOn) return true;
        const parentValue = watchedValues[field.dependsOn];

        if (!parentValue) return false;

        if (field.dependsOnValue) {
            // Handle arrays (checkboxes)
            if (Array.isArray(parentValue)) {
                return parentValue.includes(field.dependsOnValue);
            }
            return parentValue === field.dependsOnValue;
        }

        return !!parentValue;
    };

    // Only render fields that belong to the current step AND are visible based on logic
    const fieldsToRender = sortedFields.filter(
        (f) => f.step === currentStep && isFieldVisible(f),
    );

    // Auto-save Draft
    useEffect(() => {
        setIsMounted(true);
        const draftKey = `event_draft_${event.id}`;
        const saved = localStorage.getItem(draftKey);
        if (saved) {
            try {
                reset(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse draft", e);
            }
        }
    }, [event.id, reset]);

    useEffect(() => {
        if (isMounted && status !== "success") {
            const draftKey = `event_draft_${event.id}`;
            localStorage.setItem(draftKey, JSON.stringify(watchedValues));
        }
    }, [watchedValues, event.id, isMounted, status]);

    const nextStep = async () => {
        // Only validate visible fields in the current step
        const visibleFieldIdsInStep = sortedFields
            .filter((f) => f.step === currentStep && isFieldVisible(f))
            .map((f) => f.id as keyof FormData);

        const isValid = await trigger(visibleFieldIdsInStep);
        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const onSubmit = async (data: FormData) => {
        // Clean up data based on conditional logic and "Other" fields
        const cleanedData = { ...data };
        for (const field of sortedFields) {
            if (!isFieldVisible(field)) {
                delete cleanedData[field.id];
                delete cleanedData[`${field.id}_other`];
            } else if (field.allowOtherOption) {
                if (field.type === "checkbox") {
                    const arr = (cleanedData[field.id] as string[]) || [];
                    if (arr.includes("__other__")) {
                        const otherVal = cleanedData[`${field.id}_other`];
                        cleanedData[field.id] = arr.map((v) =>
                            v === "__other__" ? otherVal || "Lainnya" : v,
                        );
                    }
                } else if (cleanedData[field.id] === "__other__") {
                    cleanedData[field.id] =
                        cleanedData[`${field.id}_other`] || "Lainnya";
                }
                delete cleanedData[`${field.id}_other`]; // Clean up the auxiliary field
            }
        }

        setStatus("submitting");
        const res = await registerEvent(event.id, cleanedData);
        if (res.success) {
            setStatus("success");
            localStorage.removeItem(`event_draft_${event.id}`);
        } else {
            setStatus("error");
            setErrorMessage(res.error || "Terjadi kesalahan. Coba lagi.");
        }
    };

    if (!isMounted) {
        return (
            <div className="mx-auto flex min-h-[400px] w-full max-w-3xl items-center justify-center rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-2xl">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#6849E1]"></div>
            </div>
        );
    }

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-lg"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="mb-6 flex justify-center"
                >
                    <CheckCircle2 className="h-20 w-20 text-green-500" />
                </motion.div>
                <h3 className="font-display mb-4 text-3xl text-gray-900">
                    Pendaftaran Berhasil!
                </h3>
                <p className="text-lg whitespace-pre-wrap text-gray-600">
                    {event.confirmationMessage ||
                        "Terima kasih telah mendaftar. Kami akan memproses pendaftaran Anda dan menghubungi Anda lebih lanjut."}
                </p>
                <Button
                    className="mt-8 rounded-full bg-[#6849E1] px-8 text-white hover:bg-[#5a3ec5]"
                    onClick={() => window.location.reload()}
                >
                    Selesai
                </Button>
            </motion.div>
        );
    }

    const progressPercentage = ((currentStep - 1) / totalSteps) * 100;

    return (
        <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-2xl sm:p-10">
            {/* Progress Bar Top */}
            <div className="absolute top-0 left-0 h-1.5 w-full bg-gray-100">
                <div
                    className="h-full bg-[#6849E1] transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>

            {/* Stepper Indicator */}
            <div className="mt-2 mb-10">
                <div className="relative flex items-center justify-between">
                    <div className="absolute top-1/2 left-0 z-0 h-[2px] w-full -translate-y-1/2 bg-gray-100"></div>
                    <div
                        className="absolute top-1/2 left-0 z-0 h-[2px] -translate-y-1/2 bg-[#6849E1] transition-all duration-500 ease-out"
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
                                        ? "bg-[#6849E1] text-white shadow-md ring-4 ring-[#6849E1]/20"
                                        : isCompleted
                                          ? "bg-[#6849E1] text-white"
                                          : "border-2 border-gray-200 bg-white text-gray-400"
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
                className="flex min-h-[400px] flex-col"
            >
                <div className="mb-6">
                    <h2 className="font-display mb-1 text-2xl font-bold text-gray-900">
                        Langkah {currentStep} dari {totalSteps}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Harap isi semua field yang diwajibkan (*)
                    </p>
                </div>

                {status === "error" && (
                    <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        {errorMessage}
                    </div>
                )}

                {/* Form Fields Container (Flex-1 ensures buttons stick to bottom) */}
                <div className="relative flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="flex flex-col gap-6 pb-8"
                        >
                            {fieldsToRender.map((field) => (
                                <div key={field.id} className="space-y-2">
                                    <Label className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                                        {field.label}
                                        {field.required && (
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        )}
                                    </Label>

                                    {field.description && (
                                        <p className="text-xs text-gray-500">
                                            {field.description}
                                        </p>
                                    )}

                                    {/* TEXT / EMAIL / NUMBER / PHONE */}
                                    {[
                                        "text",
                                        "email",
                                        "number",
                                        "phone",
                                    ].includes(field.type) && (
                                        <Input
                                            type={
                                                field.type === "email"
                                                    ? "email"
                                                    : field.type === "number"
                                                      ? "number"
                                                      : "text"
                                            }
                                            {...register(field.id)}
                                            className={`rounded-xl bg-gray-50/50 px-4 py-6 ${errors[field.id] ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-[#6849E1]"}`}
                                            placeholder={
                                                field.placeholder ||
                                                `Masukkan ${field.label.toLowerCase()}`
                                            }
                                        />
                                    )}

                                    {/* TEXTAREA */}
                                    {field.type === "textarea" && (
                                        <Textarea
                                            {...register(field.id)}
                                            className={`min-h-[120px] rounded-xl bg-gray-50/50 px-4 py-3 ${errors[field.id] ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-[#6849E1]"}`}
                                            placeholder={
                                                field.placeholder ||
                                                `Masukkan ${field.label.toLowerCase()}`
                                            }
                                        />
                                    )}

                                    {/* SELECT */}
                                    {field.type === "select" &&
                                        field.options && (
                                            <Controller
                                                control={control}
                                                name={field.id}
                                                render={({
                                                    field: { onChange, value },
                                                }) => (
                                                    <div className="space-y-3">
                                                        <Select
                                                            onValueChange={
                                                                onChange
                                                            }
                                                            value={value || ""}
                                                        >
                                                            <SelectTrigger
                                                                className={`h-12 rounded-xl bg-gray-50/50 px-4 ${errors[field.id] ? "border-red-500" : "focus:ring-[#6849E1]"}`}
                                                            >
                                                                <SelectValue
                                                                    placeholder={
                                                                        field.placeholder ||
                                                                        "Pilih salah satu..."
                                                                    }
                                                                />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {field.options!.map(
                                                                    (opt) => (
                                                                        <SelectItem
                                                                            key={
                                                                                opt
                                                                            }
                                                                            value={
                                                                                opt
                                                                            }
                                                                        >
                                                                            {
                                                                                opt
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                                {field.allowOtherOption && (
                                                                    <SelectItem value="__other__">
                                                                        Lainnya
                                                                        (Other)
                                                                    </SelectItem>
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                        {value ===
                                                            "__other__" && (
                                                            <motion.div
                                                                initial={{
                                                                    opacity: 0,
                                                                    height: 0,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    height: "auto",
                                                                }}
                                                            >
                                                                <Input
                                                                    {...register(
                                                                        `${field.id}_other`,
                                                                    )}
                                                                    className="rounded-xl bg-white px-4 py-6 focus-visible:ring-[#6849E1]"
                                                                    placeholder="Tuliskan jawaban Anda..."
                                                                    autoFocus
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        )}

                                    {/* RADIO */}
                                    {field.type === "radio" &&
                                        field.options && (
                                            <Controller
                                                control={control}
                                                name={field.id}
                                                render={({
                                                    field: { onChange, value },
                                                }) => (
                                                    <div className="mt-2 flex flex-col gap-3">
                                                        <RadioGroup
                                                            onValueChange={
                                                                onChange
                                                            }
                                                            value={value}
                                                            className="flex flex-col gap-3"
                                                        >
                                                            {field.options!.map(
                                                                (opt) => (
                                                                    <div
                                                                        key={
                                                                            opt
                                                                        }
                                                                        className="flex items-center space-y-0 space-x-3 rounded-lg border bg-gray-50/30 p-3 transition-colors hover:bg-gray-50"
                                                                    >
                                                                        <RadioGroupItem
                                                                            value={
                                                                                opt
                                                                            }
                                                                            id={`${field.id}-${opt}`}
                                                                        />
                                                                        <Label
                                                                            htmlFor={`${field.id}-${opt}`}
                                                                            className="flex-1 cursor-pointer font-normal"
                                                                        >
                                                                            {
                                                                                opt
                                                                            }
                                                                        </Label>
                                                                    </div>
                                                                ),
                                                            )}
                                                            {field.allowOtherOption && (
                                                                <div className="flex items-center space-y-0 space-x-3 rounded-lg border bg-gray-50/30 p-3 transition-colors hover:bg-gray-50">
                                                                    <RadioGroupItem
                                                                        value="__other__"
                                                                        id={`${field.id}-other`}
                                                                    />
                                                                    <Label
                                                                        htmlFor={`${field.id}-other`}
                                                                        className="flex-1 cursor-pointer font-normal"
                                                                    >
                                                                        Lainnya
                                                                        (Other)
                                                                    </Label>
                                                                </div>
                                                            )}
                                                        </RadioGroup>
                                                        {value ===
                                                            "__other__" && (
                                                            <motion.div
                                                                initial={{
                                                                    opacity: 0,
                                                                    height: 0,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    height: "auto",
                                                                }}
                                                            >
                                                                <Input
                                                                    {...register(
                                                                        `${field.id}_other`,
                                                                    )}
                                                                    className="rounded-xl bg-white px-4 py-6 focus-visible:ring-[#6849E1]"
                                                                    placeholder="Tuliskan jawaban Anda..."
                                                                    autoFocus
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        )}

                                    {/* CHECKBOX (MULTI-SELECT) */}
                                    {field.type === "checkbox" &&
                                        field.options && (
                                            <Controller
                                                control={control}
                                                name={field.id}
                                                render={({
                                                    field: { onChange, value },
                                                }) => {
                                                    const currentVals =
                                                        (value as string[]) ||
                                                        [];
                                                    return (
                                                        <div className="mt-2 flex flex-col gap-3">
                                                            {field.options!.map(
                                                                (opt) => (
                                                                    <div
                                                                        key={
                                                                            opt
                                                                        }
                                                                        className="flex items-center space-y-0 space-x-3 rounded-lg border bg-gray-50/30 p-3 transition-colors hover:bg-gray-50"
                                                                    >
                                                                        <Checkbox
                                                                            id={`${field.id}-${opt}`}
                                                                            checked={currentVals.includes(
                                                                                opt,
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked,
                                                                            ) => {
                                                                                const updated =
                                                                                    checked
                                                                                        ? [
                                                                                              ...currentVals,
                                                                                              opt,
                                                                                          ]
                                                                                        : currentVals.filter(
                                                                                              (
                                                                                                  v,
                                                                                              ) =>
                                                                                                  v !==
                                                                                                  opt,
                                                                                          );
                                                                                onChange(
                                                                                    updated,
                                                                                );
                                                                            }}
                                                                        />
                                                                        <Label
                                                                            htmlFor={`${field.id}-${opt}`}
                                                                            className="flex-1 cursor-pointer font-normal"
                                                                        >
                                                                            {
                                                                                opt
                                                                            }
                                                                        </Label>
                                                                    </div>
                                                                ),
                                                            )}
                                                            {field.allowOtherOption && (
                                                                <div className="flex items-center space-y-0 space-x-3 rounded-lg border bg-gray-50/30 p-3 transition-colors hover:bg-gray-50">
                                                                    <Checkbox
                                                                        id={`${field.id}-other`}
                                                                        checked={currentVals.includes(
                                                                            "__other__",
                                                                        )}
                                                                        onCheckedChange={(
                                                                            checked,
                                                                        ) => {
                                                                            const updated =
                                                                                checked
                                                                                    ? [
                                                                                          ...currentVals,
                                                                                          "__other__",
                                                                                      ]
                                                                                    : currentVals.filter(
                                                                                          (
                                                                                              v,
                                                                                          ) =>
                                                                                              v !==
                                                                                              "__other__",
                                                                                      );
                                                                            onChange(
                                                                                updated,
                                                                            );
                                                                        }}
                                                                    />
                                                                    <Label
                                                                        htmlFor={`${field.id}-other`}
                                                                        className="flex-1 cursor-pointer font-normal"
                                                                    >
                                                                        Lainnya
                                                                        (Other)
                                                                    </Label>
                                                                </div>
                                                            )}
                                                            {currentVals.includes(
                                                                "__other__",
                                                            ) && (
                                                                <motion.div
                                                                    initial={{
                                                                        opacity: 0,
                                                                        height: 0,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                        height: "auto",
                                                                    }}
                                                                >
                                                                    <Input
                                                                        {...register(
                                                                            `${field.id}_other`,
                                                                        )}
                                                                        className="rounded-xl bg-white px-4 py-6 focus-visible:ring-[#6849E1]"
                                                                        placeholder="Tuliskan jawaban Anda..."
                                                                        autoFocus
                                                                    />
                                                                </motion.div>
                                                            )}
                                                        </div>
                                                    );
                                                }}
                                            />
                                        )}

                                    {errors[field.id] && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-1 block text-xs font-medium text-red-500"
                                        >
                                            {
                                                errors[field.id]
                                                    ?.message as string
                                            }
                                        </motion.span>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Fixed Navigation Buttons at the bottom */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-6">
                    {currentStep > 1 ? (
                        <Button
                            type="button"
                            onClick={prevStep}
                            variant="outline"
                            className="flex h-12 items-center gap-2 rounded-full px-6 font-medium hover:bg-gray-50"
                        >
                            <ChevronLeft className="h-4 w-4" /> Kembali
                        </Button>
                    ) : (
                        <div></div>
                    )}

                    {currentStep < totalSteps ? (
                        <Button
                            type="button"
                            onClick={nextStep}
                            className="flex h-12 items-center gap-2 rounded-full px-8 font-medium shadow-md transition-all hover:opacity-90 hover:shadow-lg"
                            style={{
                                backgroundColor: "#6849E1",
                                color: "white",
                            }}
                        >
                            Selanjutnya <ChevronRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={status === "submitting"}
                            className="flex h-12 min-w-[160px] items-center justify-center gap-2 rounded-full px-8 font-medium shadow-md transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-50"
                            style={{
                                backgroundColor: "#6849E1",
                                color: "white",
                            }}
                        >
                            {status === "submitting" ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    Memproses...
                                </div>
                            ) : (
                                <>
                                    Submit Form{" "}
                                    <CheckCircle2 className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
