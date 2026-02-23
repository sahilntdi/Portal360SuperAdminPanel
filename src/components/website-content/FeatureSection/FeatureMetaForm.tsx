import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Plus, Trash2, AlertCircle } from "lucide-react";

// Validation helper
export function validateFeatureMetaForm(data: any) {
    const errors: Record<string, string> = {};
    if (!data.badgeText?.trim()) errors.badgeText = "Badge text is required";
    if (!data.heading?.trim()) errors.heading = "Heading is required";
    if (!data.highlightText?.trim()) errors.highlightText = "Highlight text is required";
    if (!data.description?.trim()) errors.description = "Description is required";
    if (!data.stats || data.stats.length === 0) errors.stats = "At least one stat is required";
    return errors;
}

interface FeatureMetaFormProps {
    formData: any;
    setFormData: (fn: any) => void;
    errors?: Record<string, string>;
}

export function FeatureMetaForm({ formData, setFormData, errors = {} }: FeatureMetaFormProps) {
    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleStatChange = (index: number, field: string, value: string) => {
        setFormData((prev: any) => {
            const newStats = [...(prev.stats || [])];
            newStats[index] = { ...newStats[index], [field]: value };
            return { ...prev, stats: newStats };
        });
    };

    const addStat = () => {
        setFormData((prev: any) => ({
            ...prev,
            stats: [...(prev.stats || []), { value: "", label: "" }],
        }));
    };

    const removeStat = (index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            stats: (prev.stats || []).filter((_: any, i: number) => i !== index),
        }));
    };

    return (
        <div className="space-y-4">
            {/* Badge Text */}
            <div className="space-y-1.5">
                <Label className="text-sm font-medium">
                    Badge Text <span className="text-red-500">*</span>
                </Label>
                <Input
                    value={formData.badgeText || ""}
                    onChange={(e) => handleChange("badgeText", e.target.value)}
                    placeholder="e.g., The Portal360 Platform"
                    className={cn(errors.badgeText && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.badgeText && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.badgeText}
                    </p>
                )}
            </div>

            {/* Heading */}
            <div className="space-y-1.5">
                <Label className="text-sm font-medium">
                    Heading <span className="text-red-500">*</span>
                </Label>
                <Input
                    value={formData.heading || ""}
                    onChange={(e) => handleChange("heading", e.target.value)}
                    placeholder="e.g., One platform to"
                    className={cn(errors.heading && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.heading && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.heading}
                    </p>
                )}
            </div>

            {/* Highlight Text */}
            <div className="space-y-1.5">
                <Label className="text-sm font-medium">
                    Highlight Text <span className="text-red-500">*</span>
                </Label>
                <Input
                    value={formData.highlightText || ""}
                    onChange={(e) => handleChange("highlightText", e.target.value)}
                    placeholder="e.g., scale your entire business"
                    className={cn(errors.highlightText && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.highlightText && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.highlightText}
                    </p>
                )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
                <Label className="text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                    rows={3}
                    value={formData.description || ""}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Describe the features section..."
                    className={cn(errors.description && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.description && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.description}
                    </p>
                )}
            </div>

            {/* Stats Repeater */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">
                        Stats <span className="text-red-500">*</span>
                    </Label>
                    <Button type="button" variant="outline" size="sm" onClick={addStat} className="gap-1 h-7 text-xs">
                        <Plus className="h-3 w-3" /> Add Stat
                    </Button>
                </div>
                {errors.stats && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.stats}
                    </p>
                )}
                {(formData.stats || []).map((stat: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                        <Input
                            value={stat.value || ""}
                            onChange={(e) => handleStatChange(index, "value", e.target.value)}
                            placeholder="e.g., 4.9★"
                            className="flex-1"
                        />
                        <Input
                            value={stat.label || ""}
                            onChange={(e) => handleStatChange(index, "label", e.target.value)}
                            placeholder="e.g., Customer Rating"
                            className="flex-1"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeStat(index)}
                            className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300 shrink-0"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>

            {/* Is Active */}
            <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                    <Label className="text-sm font-medium">Active</Label>
                    <p className="text-xs text-muted-foreground">Show this section on the website</p>
                </div>
                <Switch
                    checked={formData.isActive ?? true}
                    onCheckedChange={(checked) => handleChange("isActive", checked)}
                />
            </div>

            {formData._id && <input type="hidden" value={formData._id} />}
        </div>
    );
}
