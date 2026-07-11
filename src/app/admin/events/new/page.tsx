"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/lib/actions/events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash, Plus, Save, ArrowLeft, GripVertical, AlertCircle, X } from "lucide-react";
import Link from "next/link";
import { UploadButton } from "@/lib/uploadthing";

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
  });

  const [formFields, setFormFields] = useState<any[]>([
    { id: "email", step: 1, type: "email", label: "Alamat Email", required: true },
    { id: "fullName", step: 1, type: "text", label: "Nama Lengkap", required: true },
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

  const removeField = (index: number) => {
    setFormFields(formFields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, key: string, value: any) => {
    const newFields = [...formFields];
    newFields[index][key] = value;
    setFormFields(newFields);
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
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <Button variant="ghost" size="sm" className="-ml-2" render={<Link href="/admin/events" />}>
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create New Event</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Define the event details and customize the registration form.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Event Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>Basic information about your event.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  required
                  placeholder="e.g. UI Craft Workshop 2025"
                  value={eventData.title}
                  onChange={(e: any) => handleTitleChange(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">
                  URL Slug
                  <span className="text-xs text-muted-foreground ml-2 font-normal">
                    /events/{eventData.slug || "..."}
                  </span>
                </Label>
                <Input
                  id="slug"
                  required
                  placeholder="ui-craft-workshop-2025"
                  value={eventData.slug}
                  onChange={(e: any) =>
                    setEventData({ ...eventData, slug: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2 col-span-1 sm:col-span-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <textarea
                  id="subtitle"
                  rows={2}
                  placeholder="A content-driven website structured to improve messaging..."
                  value={eventData.subtitle}
                  onChange={(e: any) =>
                    setEventData({ ...eventData, subtitle: e.target.value })
                  }
                  className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category / Badge</Label>
                <Input
                  id="category"
                  placeholder="e.g. 01 UI/UX Design"
                  value={eventData.category}
                  onChange={(e: any) =>
                    setEventData({ ...eventData, category: e.target.value })
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
                    setEventData({ ...eventData, instructor: e.target.value })
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
                    setEventData({ ...eventData, duration: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kickoffDate">Kickoff Date / Start Date</Label>
                <Input
                  id="kickoffDate"
                  required
                  placeholder="e.g. Juli 2025"
                  value={eventData.kickoffDate}
                  onChange={(e: any) =>
                    setEventData({ ...eventData, kickoffDate: e.target.value })
                  }
                />
              </div>
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  placeholder="Describe your event..."
                  value={eventData.description}
                  onChange={(e: any) =>
                    setEventData({ ...eventData, description: e.target.value })
                  }
                  className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-2 col-span-1 sm:col-span-2">
                <div className="flex items-center gap-2 p-4 border rounded-md bg-muted/20">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={eventData.isFeatured}
                    onChange={(e: any) => setEventData({ ...eventData, isFeatured: e.target.checked })}
                    className="h-4 w-4 rounded border border-input accent-primary cursor-pointer"
                  />
                  <div className="space-y-0.5">
                    <Label htmlFor="isFeatured" className="text-base cursor-pointer">Highlight as Ongoing / Active Event</Label>
                    <p className="text-sm text-muted-foreground">If checked, this event will be placed at the very top of the public events list, and the 'Daftar Sekarang' button on the homepage will redirect here.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 col-span-1 sm:col-span-2">
                <Label>Main Image URL</Label>
                <div className="flex flex-col gap-3">
                  <Input
                    placeholder="https://..."
                    value={eventData.imageUrl}
                    onChange={(e: any) =>
                      setEventData({ ...eventData, imageUrl: e.target.value })
                    }
                  />
                  <div className="bg-muted/50 border rounded-md p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">Or upload an image</p>
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res && res.length > 0) {
                          setEventData({ ...eventData, imageUrl: res[0].url });
                        }
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                  {eventData.imageUrl && (
                    <img src={eventData.imageUrl} alt="Main" className="w-full max-w-sm rounded-md border object-cover" />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Content Details</CardTitle>
            <CardDescription>Detailed information for the public page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Overview Section</Label>
              <Input 
                placeholder="Section Title (e.g. Program overview)" 
                value={eventData.overview.title} 
                onChange={e => setEventData({ ...eventData, overview: { ...eventData.overview, title: e.target.value }})}
              />
              <textarea
                rows={4}
                placeholder="Overview description..."
                value={eventData.overview.description}
                onChange={e => setEventData({ ...eventData, overview: { ...eventData.overview, description: e.target.value }})}
                className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <Separator />
            <div className="space-y-3">
              <Label>Learning Process Section</Label>
              <Input 
                placeholder="Section Title (e.g. Learning process)" 
                value={eventData.process.title} 
                onChange={e => setEventData({ ...eventData, process: { ...eventData.process, title: e.target.value }})}
              />
              <textarea
                rows={4}
                placeholder="Process description..."
                value={eventData.process.description}
                onChange={e => setEventData({ ...eventData, process: { ...eventData.process, description: e.target.value }})}
                className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <Separator />
            <div className="space-y-3">
              <Label>Final Result Section</Label>
              <Input 
                placeholder="Section Title (e.g. Final result)" 
                value={eventData.result.title} 
                onChange={e => setEventData({ ...eventData, result: { ...eventData.result, title: e.target.value }})}
              />
              <textarea
                rows={4}
                placeholder="Result description..."
                value={eventData.result.description}
                onChange={e => setEventData({ ...eventData, result: { ...eventData.result, description: e.target.value }})}
                className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </CardContent>
        </Card>

        {/* Gallery Card */}
        <Card>
          <CardHeader>
            <CardTitle>Image Gallery</CardTitle>
            <CardDescription>Add images for the grid gallery.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {eventData.gallery.map((url, idx) => (
                <div key={idx} className="relative group rounded-md border overflow-hidden aspect-[4/3]">
                  <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      const newGallery = [...eventData.gallery];
                      newGallery.splice(idx, 1);
                      setEventData({ ...eventData, gallery: newGallery });
                    }}
                    className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-muted/50 border rounded-md p-4 text-center">
              <p className="text-sm font-medium mb-2">Upload more images</p>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res.length > 0) {
                    const newUrls = res.map(r => r.url);
                    setEventData({ ...eventData, gallery: [...eventData.gallery, ...newUrls] });
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
              <div className="mt-4 flex gap-2 max-w-sm mx-auto">
                <Input
                  id="newGalleryUrl"
                  placeholder="Or paste an image URL..."
                />
                <Button 
                  type="button" 
                  variant="secondary"
                  onClick={() => {
                    const input = document.getElementById('newGalleryUrl') as HTMLInputElement;
                    if (input && input.value) {
                      setEventData({ ...eventData, gallery: [...eventData.gallery, input.value] });
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
                <CardDescription>Common questions and answers.</CardDescription>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => setEventData({ ...eventData, faqs: [...eventData.faqs, { question: "", answer: "" }] })}
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add FAQ
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {eventData.faqs.map((faq, idx) => (
              <div key={idx} className="relative group rounded-lg border bg-card p-4 space-y-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newFaqs = [...eventData.faqs];
                    newFaqs.splice(idx, 1);
                    setEventData({ ...eventData, faqs: newFaqs });
                  }}
                  className="absolute top-2 right-2 h-7 w-7 p-0 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100"
                >
                  <Trash className="w-4 h-4" />
                </Button>
                <div className="space-y-1.5 pr-8">
                  <Label className="text-xs text-muted-foreground">Question</Label>
                  <Input
                    value={faq.question}
                    onChange={(e: any) => {
                      const newFaqs = [...eventData.faqs];
                      newFaqs[idx].question = e.target.value;
                      setEventData({ ...eventData, faqs: newFaqs });
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Answer</Label>
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e: any) => {
                      const newFaqs = [...eventData.faqs];
                      newFaqs[idx].answer = e.target.value;
                      setEventData({ ...eventData, faqs: newFaqs });
                    }}
                    className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>
            ))}
            {eventData.faqs.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No FAQs added yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Form Builder Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Registration Form</CardTitle>
                <CardDescription className="mt-1">
                  Customize the fields participants need to fill in.
                </CardDescription>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addField}>
                <Plus className="w-4 h-4 mr-1.5" />
                Add Field
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {formFields.map((field: any, index: number) => (
              <div
                key={index}
                className="group relative rounded-lg border bg-card p-4 space-y-4"
              >
                {/* Field Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="outline" className="text-xs font-mono">
                      {field.id}
                    </Badge>
                    {field.required && (
                      <Badge variant="secondary" className="text-xs">Required</Badge>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeField(index)}
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <Separator />

                {/* Field Config */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 sm:col-span-4 space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Field ID</Label>
                    <Input
                      value={field.id}
                      onChange={(e: any) => updateField(index, "id", e.target.value)}
                      className="h-8 text-sm font-mono"
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-5 space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Label / Question</Label>
                    <Input
                      value={field.label}
                      onChange={(e: any) => updateField(index, "label", e.target.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2 space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Type</Label>
                    <select
                      value={field.type}
                      onChange={(e: any) => updateField(index, "type", e.target.value)}
                      className="w-full h-8 rounded-md border border-input bg-transparent px-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {FIELD_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-1 space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Step</Label>
                    <Input
                      type="number"
                      min={1}
                      value={field.step}
                      onChange={(e: any) =>
                        updateField(index, "step", parseInt(e.target.value))
                      }
                      className="h-8 text-sm"
                    />
                  </div>

                  {(field.type === "select" || field.type === "radio") && (
                    <div className="col-span-12 space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Options <span className="font-normal">(comma separated)</span>
                      </Label>
                      <Input
                        value={field.options?.join(", ") || ""}
                        onChange={(e: any) =>
                          updateField(
                            index,
                            "options",
                            e.target.value.split(",").map((s: string) => s.trim())
                          )
                        }
                        className="h-8 text-sm"
                        placeholder="Option A, Option B, Option C"
                      />
                    </div>
                  )}

                  <div className="col-span-12 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e: any) =>
                        updateField(index, "required", e.target.checked)
                      }
                      id={`req_${index}`}
                      className="h-4 w-4 rounded border border-input accent-primary cursor-pointer"
                    />
                    <label
                      htmlFor={`req_${index}`}
                      className="text-sm text-muted-foreground cursor-pointer select-none"
                    >
                      Required field
                    </label>
                  </div>
                </div>
              </div>
            ))}

            {formFields.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center rounded-lg border border-dashed">
                <p className="text-sm text-muted-foreground">No fields yet.</p>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="mt-1"
                  onClick={addField}
                >
                  Add your first field
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" render={<Link href="/admin/events" />}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Creating..." : "Create Event"}
          </Button>
        </div>
      </form>
    </div>
  );
}
