"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/lib/actions/events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FormBuilder } from "@/components/FormBuilder";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Trash,
    Plus,
    Save,
    ArrowLeft,
    GripVertical,
    AlertCircle,
    X,
} from "lucide-react";
import Link from "next/link";
import { UploadButton } from "@/lib/uploadthing";
import { deleteUploadThingFile } from "@/lib/actions/upload";

const FIELD_TYPES = [
    { value: "text", label: "Short Text" },
    { value: "email", label: "Email" },
    { value: "textarea", label: "Long Text" },
    { value: "select", label: "Dropdown" },
    { value: "radio", label: "Radio Buttons" },
    { value: "number", label: "Number" },
    { value: "phone", label: "Phone Number" },
];

export default function NewEventPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [eventData, setEventData] = useState({
        title: "",
        slug: "",
        kickoffDate: "",
        imageUrl: "",
        description: "",
        subtitle: "",
        category: "",
        instructor: "",
        duration: "",
        overview: { title: "Program overview", description: "" },
        process: { title: "Learning process", description: "" },
        result: { title: "Final result", description: "" },
        gallery: [] as string[],
        faqs: [] as { question: string; answer: string }[],
        isFeatured: false,
        confirmationMessage: "",
    });

    const [formFields, setFormFields] = useState<any[]>([
        {
            id: "email",
            step: 1,
            type: "email",
            label: "Alamat Email",
            required: true,
        },
        {
            id: "fullName",
            step: 1,
            type: "text",
            label: "Nama Lengkap",
            required: true,
        },
    ]);

    const handleTitleChange = (value: string) => {
        setEventData({
            ...eventData,
            title: value,
            slug: value
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-"),
        });
    };

    const addField = () => {
        setFormFields([
            ...formFields,
            {
                id: `field_${Date.now()}`,
                step: 1,
                type: "text",
                label: "New Question",
                required: false,
            },
        ]);
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const res = await createEvent({ ...eventData, formFields });

        if (res.success) {
            router.push("/admin/events");
        } else {
            setError(res.error || "Failed to create event");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6 pb-12">
            {/* Header */}
            <div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-2"
                    render={<Link href="/admin/events" />}
                >
                    <ArrowLeft className="mr-1.5 h-4 w-4" />
                    Back
                </Button>
            </div>

            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Create New Event
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    Define the event details and customize the registration
                    form.
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                {/* Error Alert */}
                {error && (
                    <div className="border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-3 rounded-lg border p-4 text-sm">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {error}
                    </div>
                )}

                {/* Event Details Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Event Details</CardTitle>
                        <CardDescription>
                            Basic information about your event.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="title">Event Title</Label>
                                <Input
                                    id="title"
                                    required
                                    placeholder="e.g. UI Craft Workshop 2025"
                                    value={eventData.title}
                                    onChange={(e: any) =>
                                        handleTitleChange(e.target.value)
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">
                                    URL Slug
                                    <span className="text-muted-foreground ml-2 text-xs font-normal">
                                        /events/{eventData.slug || "..."}
                                    </span>
                                </Label>
                                <Input
                                    id="slug"
                                    required
                                    placeholder="ui-craft-workshop-2025"
                                    value={eventData.slug}
                                    onChange={(e: any) =>
                                        setEventData({
                                            ...eventData,
                                            slug: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col-span-1 space-y-2 sm:col-span-2">
                                <Label htmlFor="subtitle">Subtitle</Label>
                                <textarea
                                    id="subtitle"
                                    rows={2}
                                    placeholder="A content-driven website structured to improve messaging..."
                                    value={eventData.subtitle}
                                    onChange={(e: any) =>
                                        setEventData({
                                            ...eventData,
                                            subtitle: e.target.value,
                                        })
                                    }
                                    className="border-input placeholder:text-muted-foreground focus-visible:ring-ring w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">
                                    Category / Badge
                                </Label>
                                <Input
                                    id="category"
                                    placeholder="e.g. 01 UI/UX Design"
                                    value={eventData.category}
                                    onChange={(e: any) =>
                                        setEventData({
                                            ...eventData,
                                            category: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="instructor">Instructor</Label>
                                <Input
                                    id="instructor"
                                    placeholder="e.g. Budi Santoso"
                                    value={eventData.instructor}
                                    onChange={(e: any) =>
                                        setEventData({
                                            ...eventData,
                                            instructor: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    placeholder="e.g. 4 Minggu"
                                    value={eventData.duration}
                                    onChange={(e: any) =>
                                        setEventData({
                                            ...eventData,
                                            duration: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="kickoffDate">
                                    Kickoff Date / Start Date
                                </Label>
                                <Input
                                    id="kickoffDate"
                                    required
                                    placeholder="e.g. Juli 2025"
                                    value={eventData.kickoffDate}
                                    onChange={(e: any) =>
                                        setEventData({
                                            ...eventData,
                                            kickoffDate: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col-span-1 space-y-2 sm:col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    required
                                    rows={4}
                                    placeholder="Describe your event..."
                                    value={eventData.description}
                                    onChange={(e: any) =>
                                        setEventData({
                                            ...eventData,
                                            description: e.target.value,
                                        })
                                    }
                                    className="border-input placeholder:text-muted-foreground focus-visible:ring-ring w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
                                />
                            </div>
                            <div className="col-span-1 space-y-2 sm:col-span-2">
                                <div className="bg-muted/20 flex items-center gap-2 rounded-md border p-4">
                                    <input
                                        type="checkbox"
                                        id="isFeatured"
                                        checked={eventData.isFeatured}
                                        onChange={(e: any) =>
                                            setEventData({
                                                ...eventData,
                                                isFeatured: e.target.checked,
                                            })
                                        }
                                        className="border-input accent-primary h-4 w-4 cursor-pointer rounded border"
                                    />
                                    <div className="space-y-0.5">
                                        <Label
                                            htmlFor="isFeatured"
                                            className="cursor-pointer text-base"
                                        >
                                            Highlight as Ongoing / Active Event
                                        </Label>
                                        <p className="text-muted-foreground text-sm">
                                            If checked, this event will be
                                            placed at the very top of the public
                                            events list, and the 'Daftar
                                            Sekarang' button on the homepage
                                            will redirect here.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 space-y-2 sm:col-span-2">
                                <Label>Main Image URL</Label>
                                <div className="flex flex-col gap-3">
                                    <Input
                                        placeholder="https://..."
                                        value={eventData.imageUrl}
                                        onChange={(e: any) =>
                                            setEventData({
                                                ...eventData,
                                                imageUrl: e.target.value,
                                            })
                                        }
                                    />
                                    <div className="bg-muted/50 rounded-md border p-4 text-center">
                                        <p className="text-muted-foreground mb-2 text-xs">
                                            Or upload an image
                                        </p>
                                        <UploadButton
                                            endpoint="imageUploader"
                                            onClientUploadComplete={(res) => {
                                                if (res && res.length > 0) {
                                                    setEventData({
                                                        ...eventData,
                                                        imageUrl: res[0].url,
                                                    });
                                                }
                                            }}
                                            onUploadError={(error: Error) => {
                                                alert(
                                                    `ERROR! ${error.message}`,
                                                );
                                            }}
                                        />
                                    </div>
                                    {eventData.imageUrl && (
                                        <div className="relative inline-block w-full max-w-sm">
                                            <img
                                                src={eventData.imageUrl}
                                                alt="Main"
                                                className="w-full rounded-md border object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={async () => {
                                                    const url = eventData.imageUrl;
                                                    setEventData({
                                                        ...eventData,
                                                        imageUrl: "",
                                                    });
                                                    if (url.includes("utfs.io") || url.includes("ufs.sh")) {
                                                        await deleteUploadThingFile(url);
                                                    }
                                                }}
                                                className="absolute top-2 right-2 rounded-md bg-black/50 p-1.5 text-white hover:bg-black/70 h-8"
                                            >
                                                <X className="h-4 w-4 mr-1" /> Hapus
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Content Details Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Registration Form</CardTitle>
                                <CardDescription className="mt-1">
                                    Customize the fields participants need to
                                    fill in. Use drag-and-drop to reorder them.
                                </CardDescription>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setFormFields([
                                        ...formFields,
                                        {
                                            id: `field_${Date.now()}`,
                                            step: 1,
                                            type: "text",
                                            label: "New Field",
                                            required: false,
                                        }
                                    ]);
                                }}
                                className="bg-[#6849E1] hover:bg-[#5b3fd1] hover:text-black/85 border-0 text-white"
                            >
                                <Plus className="mr-1.5 h-4 w-4" />
                                Add Field
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormBuilder fields={formFields} setFields={setFormFields} />
                        
                        <div className="pt-6 border-t space-y-3">
                            <div className="space-y-1">
                                <Label className="text-base font-semibold">Custom Confirmation Message</Label>
                                <CardDescription>
                                    This message will be shown to users after they successfully submit this form.
                                </CardDescription>
                            </div>
                            <textarea
                                rows={3}
                                placeholder="e.g. Pendaftaran Berhasil! Terima kasih telah mendaftar. Kami akan menghubungi Anda segera."
                                value={eventData.confirmationMessage}
                                onChange={(e) =>
                                    setEventData({
                                        ...eventData,
                                        confirmationMessage: e.target.value,
                                    })
                                }
                                className="border-input placeholder:text-muted-foreground focus-visible:ring-ring w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label>Overview Section</Label>
                            <Input
                                placeholder="Section Title (e.g. Program overview)"
                                value={eventData.overview.title}
                                onChange={(e) =>
                                    setEventData({
                                        ...eventData,
                                        overview: {
                                            ...eventData.overview,
                                            title: e.target.value,
                                        },
                                    })
                                }
                            />
                            <textarea
                                rows={4}
                                placeholder="Overview description..."
                                value={eventData.overview.description}
                                onChange={(e) =>
                                    setEventData({
                                        ...eventData,
                                        overview: {
                                            ...eventData.overview,
                                            description: e.target.value,
                                        },
                                    })
                                }
                                className="border-input placeholder:text-muted-foreground focus-visible:ring-ring w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
                            />
                        </div>
                        <Separator />
                        <div className="space-y-3">
                            <Label>Learning Process Section</Label>
                            <Input
                                placeholder="Section Title (e.g. Learning process)"
                                value={eventData.process.title}
                                onChange={(e) =>
                                    setEventData({
                                        ...eventData,
                                        process: {
                                            ...eventData.process,
                                            title: e.target.value,
                                        },
                                    })
                                }
                            />
                            <textarea
                                rows={4}
                                placeholder="Process description..."
                                value={eventData.process.description}
                                onChange={(e) =>
                                    setEventData({
                                        ...eventData,
                                        process: {
                                            ...eventData.process,
                                            description: e.target.value,
                                        },
                                    })
                                }
                                className="border-input placeholder:text-muted-foreground focus-visible:ring-ring w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
                            />
                        </div>
                        <Separator />
                        <div className="space-y-3">
                            <Label>Final Result Section</Label>
                            <Input
                                placeholder="Section Title (e.g. Final result)"
                                value={eventData.result.title}
                                onChange={(e) =>
                                    setEventData({
                                        ...eventData,
                                        result: {
                                            ...eventData.result,
                                            title: e.target.value,
                                        },
                                    })
                                }
                            />
                            <textarea
                                rows={4}
                                placeholder="Result description..."
                                value={eventData.result.description}
                                onChange={(e) =>
                                    setEventData({
                                        ...eventData,
                                        result: {
                                            ...eventData.result,
                                            description: e.target.value,
                                        },
                                    })
                                }
                                className="border-input placeholder:text-muted-foreground focus-visible:ring-ring w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Gallery Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Image Gallery</CardTitle>
                        <CardDescription>
                            Add images for the grid gallery.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {eventData.gallery.map((url, idx) => (
                                <div
                                    key={idx}
                                    className="group relative aspect-4/3 overflow-hidden rounded-md border"
                                >
                                    <img
                                        src={url}
                                        alt={`Gallery ${idx}`}
                                        className="h-full w-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            const url = eventData.gallery[idx];
                                            const newGallery = [
                                                ...eventData.gallery,
                                            ];
                                            newGallery.splice(idx, 1);
                                            setEventData({
                                                ...eventData,
                                                gallery: newGallery,
                                            });
                                            if (url.includes("utfs.io") || url.includes("ufs.sh")) {
                                                await deleteUploadThingFile(url);
                                            }
                                        }}
                                        className="absolute top-2 right-2 rounded-md bg-black/50 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="bg-muted/50 rounded-md border p-4 text-center">
                            <p className="mb-2 text-sm font-medium">
                                Upload more images
                            </p>
                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    if (res && res.length > 0) {
                                        const newUrls = res.map((r) => r.url);
                                        setEventData({
                                            ...eventData,
                                            gallery: [
                                                ...eventData.gallery,
                                                ...newUrls,
                                            ],
                                        });
                                    }
                                }}
                                onUploadError={(error: Error) => {
                                    alert(`ERROR! ${error.message}`);
                                }}
                            />
                            <div className="mx-auto mt-4 flex max-w-sm gap-2">
                                <Input
                                    id="newGalleryUrl"
                                    placeholder="Or paste an image URL..."
                                />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => {
                                        const input = document.getElementById(
                                            "newGalleryUrl",
                                        ) as HTMLInputElement;
                                        if (input && input.value) {
                                            setEventData({
                                                ...eventData,
                                                gallery: [
                                                    ...eventData.gallery,
                                                    input.value,
                                                ],
                                            });
                                            input.value = "";
                                        }
                                    }}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* FAQs Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>FAQs</CardTitle>
                                <CardDescription>
                                    Common questions and answers.
                                </CardDescription>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setEventData({
                                        ...eventData,
                                        faqs: [
                                            ...eventData.faqs,
                                            { question: "", answer: "" },
                                        ],
                                    })
                                }
                            >
                                <Plus className="mr-1.5 h-4 w-4" />
                                Add FAQ
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {eventData.faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="group bg-card relative space-y-3 rounded-lg border p-4"
                            >
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        const newFaqs = [...eventData.faqs];
                                        newFaqs.splice(idx, 1);
                                        setEventData({
                                            ...eventData,
                                            faqs: newFaqs,
                                        });
                                    }}
                                    className="text-muted-foreground hover:text-destructive absolute top-2 right-2 h-7 w-7 p-0 opacity-0 group-hover:opacity-100"
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                                <div className="space-y-1.5 pr-8">
                                    <Label className="text-muted-foreground text-xs">
                                        Question
                                    </Label>
                                    <Input
                                        value={faq.question}
                                        onChange={(e: any) => {
                                            const newFaqs = [...eventData.faqs];
                                            newFaqs[idx].question =
                                                e.target.value;
                                            setEventData({
                                                ...eventData,
                                                faqs: newFaqs,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-muted-foreground text-xs">
                                        Answer
                                    </Label>
                                    <textarea
                                        rows={2}
                                        value={faq.answer}
                                        onChange={(e: any) => {
                                            const newFaqs = [...eventData.faqs];
                                            newFaqs[idx].answer =
                                                e.target.value;
                                            setEventData({
                                                ...eventData,
                                                faqs: newFaqs,
                                            });
                                        }}
                                        className="border-input placeholder:text-muted-foreground focus-visible:ring-ring w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
                                    />
                                </div>
                            </div>
                        ))}
                        {eventData.faqs.length === 0 && (
                            <p className="text-muted-foreground py-4 text-center text-sm">
                                No FAQs added yet.
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Submit */}
                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        render={<Link href="/admin/events" />}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        <Save className="mr-2 h-4 w-4" />
                        {isSubmitting ? "Creating..." : "Create Event"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
