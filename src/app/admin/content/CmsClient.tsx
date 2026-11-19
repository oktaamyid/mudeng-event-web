"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Plus,
    Trash2,
    ArrowUp,
    ArrowDown,
    Save,
    RotateCcw,
    Loader2,
    CheckCircle2,
    X,
    ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { UploadButton } from "@/lib/uploadthing";
import { deleteUploadThingFile } from "@/lib/actions/upload";
import { updateHomeCmsSection, type CmsSectionKey } from "@/lib/actions/cms";
import {
    DEFAULT_ABOUT_CONTENT,
    DEFAULT_BENEFIT_CARDS,
    DEFAULT_HOME_FAQS,
    DEFAULT_TESTIMONIALS,
    DEFAULT_TESTIMONIALS_CONFIG,
    type AboutStatItem,
    type BenefitCardItem,
    type HomeCmsContent,
    type HomeFaqItem,
    type TestimonialItem,
    type TestimonialsCmsConfig,
} from "@/lib/cms-defaults";

type TabKey = "benefits" | "testimonials" | "faqs" | "about";

const BG_COLOR_OPTIONS = [
    { value: "#FFFFFF", label: "White" },
    { value: "#E0F0FF", label: "Soft Blue" },
    { value: "#EDE5FF", label: "Soft Lavender" },
];

export function CmsClient({ initialContent }: { initialContent: HomeCmsContent }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabKey>("benefits");

    const [benefits, setBenefits] = useState<BenefitCardItem[]>(
        initialContent.benefits,
    );
    const [testimonialMode, setTestimonialMode] = useState<"instagram" | "cards">(
        initialContent.testimonials.mode,
    );
    const [instagramUrl, setInstagramUrl] = useState<string>(
        initialContent.testimonials.instagramUrl,
    );
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>(
        initialContent.testimonials.items,
    );
    const [faqs, setFaqs] = useState<HomeFaqItem[]>(initialContent.faqs);
    const [stats, setStats] = useState<AboutStatItem[]>(
        initialContent.about.stats,
    );

    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const saveSection = async (key: CmsSectionKey, data: unknown) => {
        setIsSaving(true);
        setFeedback(null);
        const res = await updateHomeCmsSection(key, data);
        setIsSaving(false);

        if (res.success) {
            setFeedback({
                type: "success",
                message: "Konten berhasil disimpan dan dipublikasikan ke Home.",
            });
            router.refresh();
        } else {
            setFeedback({
                type: "error",
                message: res.error || "Gagal menyimpan perubahan.",
            });
        }
    };

    const moveItem = <T,>(list: T[], idx: number, dir: -1 | 1): T[] => {
        const target = idx + dir;
        if (target < 0 || target >= list.length) return list;
        const copy = [...list];
        [copy[idx], copy[target]] = [copy[target], copy[idx]];
        return copy;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Home CMS
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Kelola konten dinamis halaman utama (Course Cards,
                        Testimonials, FAQ, dan Statistik).
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    render={<Link href="/" target="_blank" />}
                >
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Lihat Halaman Home
                </Button>
            </div>

            {/* Feedback Banner */}
            {feedback && (
                <div
                    className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm ${
                        feedback.type === "success"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-destructive/30 bg-destructive/10 text-destructive"
                    }`}
                >
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{feedback.message}</span>
                </div>
            )}

            {/* Tabs */}
            <div className="bg-muted/60 inline-flex flex-wrap items-center gap-1 rounded-xl p-1 text-sm font-medium">
                {(
                    [
                        { key: "benefits", label: `Course Cards (${benefits.length})` },
                        { key: "testimonials", label: "Testimonials / IG" },
                        { key: "faqs", label: `FAQ Home (${faqs.length})` },
                        { key: "about", label: `About Stats (${stats.length})` },
                    ] as const
                ).map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        onClick={() => {
                            setFeedback(null);
                            setActiveTab(tab.key);
                        }}
                        className={`rounded-lg px-3.5 py-1.5 text-xs sm:text-sm transition-colors cursor-pointer ${
                            activeTab === tab.key
                                ? "bg-background text-foreground shadow-xs"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* TAB 1: COURSE CARDS */}
            {activeTab === "benefits" && (
                <Card className="border-border/60 shadow-xs">
                    <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="text-base font-semibold">
                                Course / Program Cards
                            </CardTitle>
                            <CardDescription>
                                Kartu yang tampil pada section &quot;You&apos;ll love
                                this course&quot; di halaman Home.
                            </CardDescription>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setBenefits(DEFAULT_BENEFIT_CARDS)}
                            >
                                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                                Reset Default
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setBenefits([
                                        ...benefits,
                                        {
                                            slug: "",
                                            image: "",
                                            tag: "",
                                            title: "",
                                            desc: "",
                                        },
                                    ])
                                }
                            >
                                <Plus className="mr-1.5 h-3.5 w-3.5" />
                                Tambah Card
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                disabled={isSaving}
                                onClick={() =>
                                    saveSection("home_benefits", benefits)
                                }
                                className="bg-[#6849E1] text-white hover:bg-[#5738CC]"
                            >
                                {isSaving ? (
                                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    <Save className="mr-1.5 h-3.5 w-3.5" />
                                )}
                                Simpan
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {benefits.map((card, idx) => (
                            <div
                                key={idx}
                                className="bg-muted/20 rounded-xl border p-4 space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground text-xs font-semibold uppercase">
                                        Card #{idx + 1}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            disabled={idx === 0}
                                            onClick={() =>
                                                setBenefits(moveItem(benefits, idx, -1))
                                            }
                                        >
                                            <ArrowUp className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            disabled={idx === benefits.length - 1}
                                            onClick={() =>
                                                setBenefits(moveItem(benefits, idx, 1))
                                            }
                                        >
                                            <ArrowDown className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            onClick={() => {
                                                const copy = [...benefits];
                                                copy.splice(idx, 1);
                                                setBenefits(copy);
                                            }}
                                            className="text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                                    {/* Image Preview & Upload */}
                                    <div className="space-y-2 md:col-span-4">
                                        <Label className="text-xs">Gambar Kartu</Label>
                                        {card.image && (
                                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border bg-white">
                                                <img
                                                    src={card.image}
                                                    alt={card.title || "Preview"}
                                                    className="h-full w-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={async () => {
                                                        const url = card.image;
                                                        const copy = [...benefits];
                                                        copy[idx] = {
                                                            ...copy[idx],
                                                            image: "",
                                                        };
                                                        setBenefits(copy);
                                                        if (
                                                            url.includes("utfs.io") ||
                                                            url.includes("ufs.sh")
                                                        ) {
                                                            await deleteUploadThingFile(url);
                                                        }
                                                    }}
                                                    className="absolute top-2 right-2 rounded-md bg-black/60 p-1 text-white hover:bg-black/80"
                                                    title="Hapus Gambar"
                                                >
                                                    <X className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        )}
                                        <div className="rounded-lg border border-dashed bg-white p-2.5 text-center">
                                            <UploadButton
                                                endpoint="imageUploader"
                                                onClientUploadComplete={async (res) => {
                                                    if (res && res.length > 0) {
                                                        const oldUrl = card.image;
                                                        const copy = [...benefits];
                                                        copy[idx] = {
                                                            ...copy[idx],
                                                            image: res[0].url,
                                                        };
                                                        setBenefits(copy);
                                                        if (
                                                            oldUrl &&
                                                            (oldUrl.includes("utfs.io") ||
                                                                oldUrl.includes("ufs.sh"))
                                                        ) {
                                                            await deleteUploadThingFile(oldUrl);
                                                        }
                                                    }
                                                }}
                                                onUploadError={(err: Error) => {
                                                    alert(`Error: ${err.message}`);
                                                }}
                                            />
                                        </div>
                                        <Input
                                            placeholder="Atau URL gambar (/event/assets/...)"
                                            value={card.image}
                                            onChange={(e) => {
                                                const copy = [...benefits];
                                                copy[idx] = {
                                                    ...copy[idx],
                                                    image: e.target.value,
                                                };
                                                setBenefits(copy);
                                            }}
                                            className="h-8 bg-white text-xs"
                                        />
                                    </div>

                                    {/* Fields */}
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:col-span-8">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs">Judul</Label>
                                            <Input
                                                placeholder="e.g. UI Craft"
                                                value={card.title}
                                                onChange={(e) => {
                                                    const copy = [...benefits];
                                                    copy[idx] = {
                                                        ...copy[idx],
                                                        title: e.target.value,
                                                    };
                                                    setBenefits(copy);
                                                }}
                                                className="bg-white"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs">Tag Kecil</Label>
                                            <Input
                                                placeholder="e.g. Real momentum"
                                                value={card.tag}
                                                onChange={(e) => {
                                                    const copy = [...benefits];
                                                    copy[idx] = {
                                                        ...copy[idx],
                                                        tag: e.target.value,
                                                    };
                                                    setBenefits(copy);
                                                }}
                                                className="bg-white"
                                            />
                                        </div>
                                        <div className="space-y-1.5 sm:col-span-2">
                                            <Label className="text-xs">
                                                Slug Tujuan (Link Event)
                                            </Label>
                                            <Input
                                                placeholder="e.g. ui-craft"
                                                value={card.slug}
                                                onChange={(e) => {
                                                    const copy = [...benefits];
                                                    copy[idx] = {
                                                        ...copy[idx],
                                                        slug: e.target.value,
                                                    };
                                                    setBenefits(copy);
                                                }}
                                                className="bg-white font-mono text-xs"
                                            />
                                        </div>
                                        <div className="space-y-1.5 sm:col-span-2">
                                            <Label className="text-xs">Deskripsi</Label>
                                            <Textarea
                                                rows={2}
                                                placeholder="Deskripsi singkat program..."
                                                value={card.desc}
                                                onChange={(e) => {
                                                    const copy = [...benefits];
                                                    copy[idx] = {
                                                        ...copy[idx],
                                                        desc: e.target.value,
                                                    };
                                                    setBenefits(copy);
                                                }}
                                                className="bg-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* TAB 2: TESTIMONIALS */}
            {activeTab === "testimonials" && (
                <Card className="border-border/60 shadow-xs">
                    <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="text-base font-semibold">
                                Testimonials / Instagram Feed
                            </CardTitle>
                            <CardDescription>
                                Pilih antara Embed Profil Instagram (auto-latest
                                tanpa perlu update manual) atau Kartu Testimoni
                                kustom.
                            </CardDescription>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setTestimonialMode(DEFAULT_TESTIMONIALS_CONFIG.mode);
                                    setInstagramUrl(DEFAULT_TESTIMONIALS_CONFIG.instagramUrl);
                                    setTestimonials(DEFAULT_TESTIMONIALS);
                                }}
                            >
                                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                                Reset Default
                            </Button>
                            {testimonialMode === "cards" && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setTestimonials([
                                            ...testimonials,
                                            {
                                                name: "",
                                                text: "",
                                                avatar: "https://ui-avatars.com/api/?background=6849E1&color=fff&name=User",
                                                bgColor: "#FFFFFF",
                                            },
                                        ])
                                    }
                                >
                                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                                    Tambah Testimoni
                                </Button>
                            )}
                            <Button
                                type="button"
                                size="sm"
                                disabled={isSaving}
                                onClick={() => {
                                    const payload: TestimonialsCmsConfig = {
                                        mode: testimonialMode,
                                        instagramUrl,
                                        items: testimonials,
                                    };
                                    saveSection("home_testimonials", payload);
                                }}
                                className="bg-[#6849E1] text-white hover:bg-[#5738CC]"
                            >
                                {isSaving ? (
                                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    <Save className="mr-1.5 h-3.5 w-3.5" />
                                )}
                                Simpan
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Mode Selector */}
                        <div className="grid grid-cols-1 gap-4 rounded-xl border bg-muted/20 p-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">
                                    Mode Tampilan
                                </Label>
                                <Select
                                    value={testimonialMode}
                                    onValueChange={(val) => {
                                        if (val === "instagram" || val === "cards") {
                                            setTestimonialMode(val);
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-full bg-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="instagram">
                                            Instagram Profile Embed (Auto-Latest)
                                        </SelectItem>
                                        <SelectItem value="cards">
                                            Kartu Testimoni Kustom
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {testimonialMode === "instagram" && (
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold">
                                        URL Profil Instagram
                                    </Label>
                                    <Input
                                        placeholder="https://www.instagram.com/mudengsttnf/"
                                        value={instagramUrl}
                                        onChange={(e) => setInstagramUrl(e.target.value)}
                                        className="bg-white"
                                    />
                                </div>
                            )}
                        </div>

                        {testimonialMode === "instagram" ? (
                            <div className="rounded-xl border border-dashed bg-muted/10 p-5 text-sm text-muted-foreground">
                                Mode <strong>Instagram Profile Embed</strong> aktif.
                                Halaman Home akan menampilkan widget resmi profil{" "}
                                <span className="font-mono text-foreground">
                                    {instagramUrl || "https://www.instagram.com/mudengsttnf/"}
                                </span>{" "}
                                yang otomatis menampilkan postingan terbaru dari Instagram
                                tanpa perlu update manual.
                            </div>
                        ) : (
                        testimonials.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-muted/20 rounded-xl border p-4 space-y-3"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground text-xs font-semibold uppercase">
                                        Testimoni #{idx + 1}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            disabled={idx === 0}
                                            onClick={() =>
                                                setTestimonials(
                                                    moveItem(testimonials, idx, -1),
                                                )
                                            }
                                        >
                                            <ArrowUp className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            disabled={idx === testimonials.length - 1}
                                            onClick={() =>
                                                setTestimonials(
                                                    moveItem(testimonials, idx, 1),
                                                )
                                            }
                                        >
                                            <ArrowDown className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            onClick={() => {
                                                const copy = [...testimonials];
                                                copy.splice(idx, 1);
                                                setTestimonials(copy);
                                            }}
                                            className="text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">Nama Peserta</Label>
                                        <Input
                                            value={item.name}
                                            onChange={(e) => {
                                                const copy = [...testimonials];
                                                copy[idx] = {
                                                    ...copy[idx],
                                                    name: e.target.value,
                                                };
                                                setTestimonials(copy);
                                            }}
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">Warna Kartu</Label>
                                        <Select
                                            value={item.bgColor}
                                            onValueChange={(val) => {
                                                if (!val) return;
                                                const copy = [...testimonials];
                                                copy[idx] = {
                                                    ...copy[idx],
                                                    bgColor: val,
                                                };
                                                setTestimonials(copy);
                                            }}
                                        >
                                            <SelectTrigger className="w-full bg-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {BG_COLOR_OPTIONS.map((opt) => (
                                                    <SelectItem
                                                        key={opt.value}
                                                        value={opt.value}
                                                    >
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5 sm:col-span-3">
                                        <Label className="text-xs">Avatar Peserta</Label>
                                        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                                            {item.avatar && (
                                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border bg-white">
                                                    <img
                                                        src={item.avatar}
                                                        alt={item.name || "Avatar"}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                                                <div className="shrink-0">
                                                    <UploadButton
                                                        endpoint="imageUploader"
                                                        onClientUploadComplete={async (res) => {
                                                            if (res && res.length > 0) {
                                                                const oldUrl = item.avatar;
                                                                const copy = [...testimonials];
                                                                copy[idx] = {
                                                                    ...copy[idx],
                                                                    avatar: res[0].url,
                                                                };
                                                                setTestimonials(copy);
                                                                if (
                                                                    oldUrl &&
                                                                    (oldUrl.includes("utfs.io") ||
                                                                        oldUrl.includes("ufs.sh"))
                                                                ) {
                                                                    await deleteUploadThingFile(oldUrl);
                                                                }
                                                            }
                                                        }}
                                                        onUploadError={(err: Error) => {
                                                            alert(`Error: ${err.message}`);
                                                        }}
                                                    />
                                                </div>
                                                <Input
                                                    placeholder="Atau URL avatar..."
                                                    value={item.avatar}
                                                    onChange={(e) => {
                                                        const copy = [...testimonials];
                                                        copy[idx] = {
                                                            ...copy[idx],
                                                            avatar: e.target.value,
                                                        };
                                                        setTestimonials(copy);
                                                    }}
                                                    className="bg-white text-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 sm:col-span-3">
                                        <Label className="text-xs">Kutipan</Label>
                                        <Textarea
                                            rows={2}
                                            value={item.text}
                                            onChange={(e) => {
                                                const copy = [...testimonials];
                                                copy[idx] = {
                                                    ...copy[idx],
                                                    text: e.target.value,
                                                };
                                                setTestimonials(copy);
                                            }}
                                            className="bg-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                        )}
                    </CardContent>
                </Card>
            )}

            {/* TAB 3: FAQ HOME */}
            {activeTab === "faqs" && (
                <Card className="border-border/60 shadow-xs">
                    <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="text-base font-semibold">
                                FAQ Halaman Home
                            </CardTitle>
                            <CardDescription>
                                Pertanyaan umum yang tampil pada bagian bawah
                                halaman Home.
                            </CardDescription>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setFaqs(DEFAULT_HOME_FAQS)}
                            >
                                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                                Reset Default
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setFaqs([...faqs, { question: "", answer: "" }])
                                }
                            >
                                <Plus className="mr-1.5 h-3.5 w-3.5" />
                                Tambah FAQ
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                disabled={isSaving}
                                onClick={() => saveSection("home_faqs", faqs)}
                                className="bg-[#6849E1] text-white hover:bg-[#5738CC]"
                            >
                                {isSaving ? (
                                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    <Save className="mr-1.5 h-3.5 w-3.5" />
                                )}
                                Simpan
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="bg-muted/20 rounded-xl border p-4 space-y-3"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground text-xs font-semibold uppercase">
                                        FAQ #{idx + 1}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            disabled={idx === 0}
                                            onClick={() =>
                                                setFaqs(moveItem(faqs, idx, -1))
                                            }
                                        >
                                            <ArrowUp className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            disabled={idx === faqs.length - 1}
                                            onClick={() =>
                                                setFaqs(moveItem(faqs, idx, 1))
                                            }
                                        >
                                            <ArrowDown className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            onClick={() => {
                                                const copy = [...faqs];
                                                copy.splice(idx, 1);
                                                setFaqs(copy);
                                            }}
                                            className="text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Input
                                        placeholder="Pertanyaan"
                                        value={faq.question}
                                        onChange={(e) => {
                                            const copy = [...faqs];
                                            copy[idx] = {
                                                ...copy[idx],
                                                question: e.target.value,
                                            };
                                            setFaqs(copy);
                                        }}
                                        className="bg-white"
                                    />
                                    <Textarea
                                        rows={2}
                                        placeholder="Jawaban"
                                        value={faq.answer}
                                        onChange={(e) => {
                                            const copy = [...faqs];
                                            copy[idx] = {
                                                ...copy[idx],
                                                answer: e.target.value,
                                            };
                                            setFaqs(copy);
                                        }}
                                        className="bg-white"
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* TAB 4: ABOUT STATS */}
            {activeTab === "about" && (
                <Card className="border-border/60 shadow-xs">
                    <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="text-base font-semibold">
                                Statistik Section About
                            </CardTitle>
                            <CardDescription>
                                Angka pencapaian yang tampil pada bagian About di
                                halaman Home.
                            </CardDescription>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setStats(DEFAULT_ABOUT_CONTENT.stats)}
                            >
                                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                                Reset Default
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                disabled={isSaving}
                                onClick={() => saveSection("home_about", { stats })}
                                className="bg-[#6849E1] text-white hover:bg-[#5738CC]"
                            >
                                {isSaving ? (
                                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    <Save className="mr-1.5 h-3.5 w-3.5" />
                                )}
                                Simpan
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="bg-muted/20 space-y-3 rounded-xl border p-4"
                            >
                                <span className="text-muted-foreground text-xs font-semibold uppercase">
                                    Stat #{idx + 1}
                                </span>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="col-span-2 space-y-1">
                                        <Label className="text-xs">Angka</Label>
                                        <Input
                                            value={stat.number}
                                            onChange={(e) => {
                                                const copy = [...stats];
                                                copy[idx] = {
                                                    ...copy[idx],
                                                    number: e.target.value,
                                                };
                                                setStats(copy);
                                            }}
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Simbol</Label>
                                        <Input
                                            placeholder="+ / %"
                                            value={stat.suffix}
                                            onChange={(e) => {
                                                const copy = [...stats];
                                                copy[idx] = {
                                                    ...copy[idx],
                                                    suffix: e.target.value,
                                                };
                                                setStats(copy);
                                            }}
                                            className="bg-white"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Label</Label>
                                    <Input
                                        value={stat.label}
                                        onChange={(e) => {
                                            const copy = [...stats];
                                            copy[idx] = {
                                                ...copy[idx],
                                                label: e.target.value,
                                            };
                                            setStats(copy);
                                        }}
                                        className="bg-white"
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
