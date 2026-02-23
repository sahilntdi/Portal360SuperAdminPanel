import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
    Zap, Shield, Brain, Settings, FileText, Search, Send, Clock,
    CheckCircle, Sparkles, UserCheck, BarChart3, Layers, Globe,
    Lock, Bell, Database, Cloud, Cpu, Workflow, ChevronDown,
    Check, AlertCircle, ChevronsUpDown,
} from "lucide-react";

const ICON_OPTIONS = [
    { value: "Zap", label: "Zap", icon: Zap, color: "text-amber-600" },
    { value: "Shield", label: "Shield", icon: Shield, color: "text-rose-600" },
    { value: "Brain", label: "Brain", icon: Brain, color: "text-purple-600" },
    { value: "Settings", label: "Settings", icon: Settings, color: "text-slate-600" },
    { value: "FileText", label: "FileText", icon: FileText, color: "text-blue-600" },
    { value: "Search", label: "Search", icon: Search, color: "text-indigo-600" },
    { value: "Send", label: "Send", icon: Send, color: "text-cyan-600" },
    { value: "Clock", label: "Clock", icon: Clock, color: "text-green-600" },
    { value: "CheckCircle", label: "CheckCircle", icon: CheckCircle, color: "text-teal-600" },
    { value: "Sparkles", label: "Sparkles", icon: Sparkles, color: "text-yellow-600" },
    { value: "UserCheck", label: "UserCheck", icon: UserCheck, color: "text-emerald-600" },
    { value: "BarChart3", label: "BarChart3", icon: BarChart3, color: "text-sky-600" },
    { value: "Layers", label: "Layers", icon: Layers, color: "text-orange-600" },
    { value: "Globe", label: "Globe", icon: Globe, color: "text-blue-500" },
    { value: "Lock", label: "Lock", icon: Lock, color: "text-red-600" },
    { value: "Bell", label: "Bell", icon: Bell, color: "text-pink-600" },
    { value: "Database", label: "Database", icon: Database, color: "text-violet-600" },
    { value: "Cloud", label: "Cloud", icon: Cloud, color: "text-sky-500" },
    { value: "Cpu", label: "Cpu", icon: Cpu, color: "text-gray-600" },
    { value: "Workflow", label: "Workflow", icon: Workflow, color: "text-lime-600" },
];

export function validateFeatureCardForm(data: any) {
    const errors: Record<string, string> = {};
    if (!data.icon?.trim()) errors.icon = "Please select an icon";
    if (!data.title?.trim()) errors.title = "Title is required";
    if (!data.description?.trim()) errors.description = "Description is required";
    return errors;
}

interface FeatureCardFormProps {
    formData: any;
    setFormData: (fn: any) => void;
    errors?: Record<string, string>;
}

export function FeatureCardForm({ formData, setFormData, errors = {} }: FeatureCardFormProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [darkOpen, setDarkOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleDarkChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            dark: { ...(prev.dark || {}), [field]: value },
        }));
    };

    const selectedIcon = ICON_OPTIONS.find((opt) => opt.value === formData.icon);

    const themeFields = [
        { key: "gradient", label: "Gradient", placeholder: "from-[#e3f2fd] to-[#bbdefb]" },
        { key: "cardBg", label: "Card BG", placeholder: "bg-gradient-to-br from-[#f5faff] to-white" },
        { key: "textColor", label: "Text Color", placeholder: "text-[#1565c0]" },
        { key: "accentColor", label: "Accent Color", placeholder: "border-[#42a5f5]/40" },
        { key: "iconBg", label: "Icon BG", placeholder: "bg-gradient-to-br from-[#2196f3] to-[#1565c0]" },
        { key: "iconColor", label: "Icon Color", placeholder: "text-white" },
        { key: "progressBar", label: "Progress Bar", placeholder: "bg-gradient-to-r from-[#2196f3] to-[#1565c0]" },
        { key: "pattern", label: "Pattern", placeholder: "features-grid-pattern-blue" },
    ];

    return (
        <div className="space-y-4">
            {/* Icon Selector */}
            <div className="space-y-1.5">
                <Label className="text-sm font-medium">
                    Icon <span className="text-red-500">*</span>
                </Label>
                <div className="relative" ref={dropdownRef}>
                    <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={dropdownOpen}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className={cn(
                            "w-full justify-between h-10 font-normal",
                            !formData.icon && "text-muted-foreground",
                            errors.icon && "border-red-500 focus:ring-red-500"
                        )}
                    >
                        <span className="flex items-center gap-2.5">
                            {selectedIcon ? (
                                <>
                                    <span className={cn("flex items-center justify-center w-7 h-7 rounded-lg bg-muted/60", selectedIcon.color)}>
                                        <selectedIcon.icon className="h-4 w-4" />
                                    </span>
                                    <span className="text-foreground">{selectedIcon.label}</span>
                                </>
                            ) : (
                                <span>Select an icon...</span>
                            )}
                        </span>
                        <ChevronsUpDown className={cn("h-4 w-4 shrink-0 opacity-50")} />
                    </Button>

                    {dropdownOpen && (
                        <div className="absolute z-50 mt-1 w-full rounded-lg border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
                            <div className="p-2 grid grid-cols-5 gap-1.5 max-h-[240px] overflow-y-auto">
                                {ICON_OPTIONS.map((opt) => {
                                    const IconComp = opt.icon;
                                    const isSelected = formData.icon === opt.value;
                                    return (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => {
                                                handleChange("icon", opt.value);
                                                setDropdownOpen(false);
                                            }}
                                            className={cn(
                                                "flex flex-col items-center gap-1 p-2 rounded-lg text-xs transition-all duration-150",
                                                "hover:bg-accent hover:text-accent-foreground",
                                                isSelected
                                                    ? "bg-primary/10 ring-2 ring-primary/40 text-primary font-medium"
                                                    : "text-muted-foreground"
                                            )}
                                            title={opt.label}
                                        >
                                            <span className={cn("relative", opt.color)}>
                                                <IconComp className="h-5 w-5" />
                                                {isSelected && (
                                                    <Check className="absolute -top-1.5 -right-1.5 h-3 w-3 text-primary bg-background rounded-full" />
                                                )}
                                            </span>
                                            <span className="truncate w-full text-center leading-tight">{opt.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
                {errors.icon && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.icon}
                    </p>
                )}
            </div>

            {/* Title */}
            <div className="space-y-1.5">
                <Label className="text-sm font-medium">
                    Title <span className="text-red-500">*</span>
                </Label>
                <Input
                    value={formData.title || ""}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="e.g., Automate Your Workflow"
                    className={cn(errors.title && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.title && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.title}
                    </p>
                )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
                <Label className="text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                    rows={2}
                    value={formData.description || ""}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Describe this feature card..."
                    className={cn(errors.description && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.description && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.description}
                    </p>
                )}
            </div>

            {/* Stats & Badge */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Stats</Label>
                    <Input
                        value={formData.stats || ""}
                        onChange={(e) => handleChange("stats", e.target.value)}
                        placeholder="e.g., 3x faster execution"
                    />
                </div>
                <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Badge</Label>
                    <Input
                        value={formData.badge || ""}
                        onChange={(e) => handleChange("badge", e.target.value)}
                        placeholder="e.g., Popular"
                    />
                </div>
            </div>

            {/* Order & Active */}
            <div className="grid grid-cols-2 gap-3 items-end">
                <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Order</Label>
                    <Input
                        type="number"
                        min={1}
                        value={formData.order || 1}
                        onChange={(e) => handleChange("order", Number(e.target.value))}
                    />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                    <Label className="text-sm font-medium">Active</Label>
                    <Switch
                        checked={formData.isActive ?? true}
                        onCheckedChange={(checked) => handleChange("isActive", checked)}
                    />
                </div>
            </div>

            {/* Light Theme Fields */}
            <div className="space-y-3 pt-3 border-t">
                <h4 className="text-sm font-semibold text-foreground">Light Theme</h4>
                <div className="grid grid-cols-2 gap-3">
                    {themeFields.map((f) => (
                        <div key={f.key} className="space-y-1">
                            <Label className="text-xs text-muted-foreground">{f.label}</Label>
                            <Input
                                value={formData[f.key] || ""}
                                onChange={(e) => handleChange(f.key, e.target.value)}
                                placeholder={f.placeholder}
                                className="h-8 text-xs"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Dark Theme Fields (Collapsible) */}
            <div className="space-y-3 pt-3 border-t">
                <button
                    type="button"
                    onClick={() => setDarkOpen(!darkOpen)}
                    className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors w-full"
                >
                    <ChevronDown className={cn("h-4 w-4 transition-transform", darkOpen && "rotate-180")} />
                    Dark Theme
                </button>
                {darkOpen && (
                    <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2">
                        {themeFields.map((f) => (
                            <div key={`dark-${f.key}`} className="space-y-1">
                                <Label className="text-xs text-muted-foreground">{f.label}</Label>
                                <Input
                                    value={formData.dark?.[f.key] || ""}
                                    onChange={(e) => handleDarkChange(f.key, e.target.value)}
                                    placeholder={f.placeholder}
                                    className="h-8 text-xs"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {formData._id && <input type="hidden" value={formData._id} />}
        </div>
    );
}
