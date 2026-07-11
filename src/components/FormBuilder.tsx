"use client";

import React, { useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash, ChevronDown, ChevronUp, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export type FormFieldType = "text" | "email" | "textarea" | "select" | "radio" | "checkbox" | "number" | "phone" | "date" | "file";

export interface FormFieldDef {
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

interface FormBuilderProps {
    fields: FormFieldDef[];
    setFields: (fields: FormFieldDef[]) => void;
}

const FIELD_TYPES: { value: FormFieldType; label: string }[] = [
    { value: "text", label: "Short Text" },
    { value: "email", label: "Email" },
    { value: "textarea", label: "Long Text" },
    { value: "select", label: "Dropdown (Select)" },
    { value: "radio", label: "Single Choice (Radio)" },
    { value: "checkbox", label: "Multiple Choice (Checkbox)" },
    { value: "number", label: "Number" },
    { value: "phone", label: "Phone Number" },
    { value: "date", label: "Date Picker" },
    { value: "file", label: "File Upload" },
];

function SortableField({
    field,
    index,
    updateField,
    removeField,
    duplicateField,
    allFields,
}: {
    field: FormFieldDef;
    index: number;
    updateField: (id: string, key: keyof FormFieldDef, value: any) => void;
    removeField: (id: string) => void;
    duplicateField: (id: string) => void;
    allFields: FormFieldDef[];
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: field.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.8 : 1,
    };

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative rounded-xl border bg-card text-card-foreground shadow-sm transition-all ${isDragging ? "ring-2 ring-[#6849E1] border-[#6849E1]" : "border-border"
                }`}
        >
            {/* Header (Always Visible) */}
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-t-xl">
                <div className="flex items-center gap-3">
                    <div
                        {...attributes}
                        {...listeners}
                        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-1 rounded-md"
                    >
                        <GripVertical className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="font-mono text-xs w-8 justify-center">
                        {index + 1}
                    </Badge>
                    <div className="font-medium text-sm w-40 truncate">
                        {field.label || "Untitled Field"}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                        {FIELD_TYPES.find((t) => t.value === field.type)?.label || field.type}
                    </Badge>
                    {field.required && (
                        <Badge variant="destructive" className="text-xs bg-red-100 text-red-700 hover:bg-red-100 border-red-200">
                            Required
                        </Badge>
                    )}
                    {field.step > 1 && (
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            Step {field.step}
                        </Badge>
                    )}
                    {field.dependsOn && (
                        <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                            Conditional
                        </Badge>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="h-8 w-8 p-0"
                    >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => duplicateField(field.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-[#6849E1]"
                        title="Duplicate"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeField(field.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        title="Delete"
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="p-5 border-t space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground">Field Label</Label>
                            <Input
                                value={field.label}
                                onChange={(e) => updateField(field.id, "label", e.target.value)}
                                placeholder="e.g. Full Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground">Field Type</Label>
                            <Select
                                value={field.type}
                                onValueChange={(val: any) => updateField(field.id, "type", val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {FIELD_TYPES.map((t) => (
                                        <SelectItem key={t.value} value={t.value}>
                                            {t.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground">Placeholder (Optional)</Label>
                            <Input
                                value={field.placeholder || ""}
                                onChange={(e) => updateField(field.id, "placeholder", e.target.value)}
                                placeholder="e.g. Enter your name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground">Description (Optional)</Label>
                            <Input
                                value={field.description || ""}
                                onChange={(e) => updateField(field.id, "description", e.target.value)}
                                placeholder="e.g. Please use your full legal name"
                            />
                        </div>
                    </div>

                    {/* Options for Select/Radio/Checkbox */}
                    {["select", "radio", "checkbox"].includes(field.type) && (
                        <div className="space-y-3 bg-muted/30 p-4 rounded-lg border border-dashed">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground">Options</Label>
                            <div className="space-y-2">
                                {(field.options || []).map((opt, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <Input
                                            value={opt}
                                            onChange={(e) => {
                                                const newOpts = [...(field.options || [])];
                                                newOpts[i] = e.target.value;
                                                updateField(field.id, "options", newOpts);
                                            }}
                                            placeholder={`Option ${i + 1}`}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive"
                                            onClick={() => {
                                                const newOpts = [...(field.options || [])];
                                                newOpts.splice(i, 1);
                                                updateField(field.id, "options", newOpts);
                                            }}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const newOpts = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
                                        updateField(field.id, "options", newOpts);
                                    }}
                                    className="mt-2"
                                >
                                    <Plus className="mr-1 h-3.5 w-3.5" /> Add Option
                                </Button>
                                <div className="flex items-center gap-2 mt-2">
                                    <Switch
                                        checked={field.allowOtherOption || false}
                                        onCheckedChange={(val) => updateField(field.id, "allowOtherOption", val)}
                                        id={`other_${field.id}`}
                                    />
                                    <Label htmlFor={`other_${field.id}`} className="text-xs text-muted-foreground cursor-pointer">
                                        Allow "Other" Option
                                    </Label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Advanced Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t">
                        <div className="space-y-4">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground">Basic Settings</Label>
                            <div className="flex items-center justify-between p-3 border rounded-lg bg-card">
                                <div className="space-y-0.5">
                                    <Label className="text-sm">Required Field</Label>
                                    <p className="text-[11px] text-muted-foreground">Must be filled before submitting.</p>
                                </div>
                                <Switch
                                    checked={field.required}
                                    onCheckedChange={(checked) => updateField(field.id, "required", checked)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm">Form Step / Page</Label>
                                <Select
                                    value={field.step.toString()}
                                    onValueChange={(val) => updateField(field.id, "step", parseInt(val as string))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Step" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <SelectItem key={s} value={s.toString()}>
                                                Step {s}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground">Conditional Logic</Label>
                            <div className="space-y-3 p-4 border rounded-lg bg-card">
                                <p className="text-[11px] text-muted-foreground mb-2">
                                    Show this field only if another field has a specific value.
                                </p>
                                <div className="space-y-2">
                                    <Label className="text-xs">Depends On Field</Label>
                                    <Select
                                        value={field.dependsOn || "none"}
                                        onValueChange={(val) => updateField(field.id, "dependsOn", val === "none" ? undefined : val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a field" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">None (Always Show)</SelectItem>
                                            {allFields
                                                .filter(f => f.id !== field.id && f.step <= field.step)
                                                .map((f) => (
                                                    <SelectItem key={f.id} value={f.id}>
                                                        {f.label} (Step {f.step})
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {field.dependsOn && (
                                    <div className="space-y-2">
                                        <Label className="text-xs">Equals Value</Label>
                                        <Input
                                            value={field.dependsOnValue || ""}
                                            onChange={(e) => updateField(field.id, "dependsOnValue", e.target.value)}
                                            placeholder="e.g. Yes"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export function FormBuilder({ fields, setFields }: FormBuilderProps) {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((f) => f.id === active.id);
            const newIndex = fields.findIndex((f) => f.id === over.id);

            setFields(arrayMove(fields, oldIndex, newIndex));
        }
    };

    const addField = () => {
        const newField: FormFieldDef = {
            id: `field_${Date.now()}`,
            step: 1,
            type: "text",
            label: "New Field",
            required: false,
        };
        setFields([...fields, newField]);
    };

    const removeField = (id: string) => {
        setFields(fields.filter((f) => f.id !== id));
    };

    const duplicateField = (id: string) => {
        const fieldToCopy = fields.find((f) => f.id === id);
        if (fieldToCopy) {
            const newField = {
                ...fieldToCopy,
                id: `field_${Date.now()}`,
            };
            const index = fields.findIndex((f) => f.id === id);
            const newFields = [...fields];
            newFields.splice(index + 1, 0, newField);
            setFields(newFields);
        }
    };

    const updateField = (id: string, key: keyof FormFieldDef, value: any) => {
        setFields(
            fields.map((f) => {
                if (f.id === id) {
                    return { ...f, [key]: value };
                }
                return f;
            })
        );
    };

    return (
        <div className="space-y-4">

            {fields.length === 0 ? (
                <div className="p-8 border-2 border-dashed rounded-xl text-center flex flex-col items-center justify-center bg-muted/10">
                    <div className="h-12 w-12 rounded-full bg-[#6849E1]/10 flex items-center justify-center mb-4">
                        <Plus className="h-6 w-6 text-[#6849E1]" />
                    </div>
                    <h3 className="text-lg font-medium">No fields yet</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                        Start building your registration form by adding fields.
                    </p>
                    <Button type="button" onClick={addField} variant="outline">
                        Add First Field
                    </Button>
                </div>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={fields.map((f) => f.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <SortableField
                                    key={field.id}
                                    field={field}
                                    index={index}
                                    updateField={updateField}
                                    removeField={removeField}
                                    duplicateField={duplicateField}
                                    allFields={fields}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </div>
    );
}
