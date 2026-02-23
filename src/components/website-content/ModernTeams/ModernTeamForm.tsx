import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  X,
  Brain,
  Zap,
  Shield,
  Cloud,
  Clock,
  Mail,
  Layout,
  Cpu,
  Globe,
  Sparkles,
  Users,
  ChevronDown,
  Check,
  AlertCircle,
} from "lucide-react";

// Available icons for Modern Teams
const ICON_OPTIONS = [
  { value: "brain", label: "Brain", icon: Brain, color: "text-purple-600" },
  { value: "zap", label: "Zap", icon: Zap, color: "text-amber-600" },
  { value: "shield", label: "Shield", icon: Shield, color: "text-blue-600" },
  { value: "cloud", label: "Cloud", icon: Cloud, color: "text-cyan-600" },
  { value: "clock", label: "Clock", icon: Clock, color: "text-green-600" },
  { value: "mail", label: "Mail", icon: Mail, color: "text-red-600" },
  { value: "layout", label: "Layout", icon: Layout, color: "text-teal-600" },
  { value: "cpu", label: "CPU", icon: Cpu, color: "text-indigo-600" },
  { value: "globe", label: "Globe", icon: Globe, color: "text-sky-600" },
  { value: "sparkles", label: "Sparkles", icon: Sparkles, color: "text-yellow-600" },
  { value: "users", label: "Users", icon: Users, color: "text-pink-600" },
];

// Exported validation helper
export function validateModernTeamForm(data: { title?: string; description?: string; icon?: string }) {
  const errors: Record<string, string> = {};
  if (!data.title?.trim()) errors.title = "Title is required";
  if (!data.description?.trim()) errors.description = "Description is required";
  if (!data.icon?.trim()) errors.icon = "Please select an icon";
  return errors;
}

interface ModernTeamFormProps {
  formData: any;
  setFormData: (fn: any) => void;
  errors?: Record<string, string>;
}

export function ModernTeamForm({ formData, setFormData, errors = {} }: ModernTeamFormProps) {
  const [preview, setPreview] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formData.image) {
      setPreview(formData.image);
    }
  }, [formData]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (file: File | undefined) => {
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setFormData((prev: any) => ({
      ...prev,
      imageFile: file,
      image: "",
    }));
  };

  const removeImage = () => {
    setPreview("");
    setFormData((prev: any) => ({
      ...prev,
      imageFile: null,
      image: "",
    }));
  };

  const selectedIcon = ICON_OPTIONS.find((opt) => opt.value === formData.icon?.toLowerCase());

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          value={formData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g., AI-Powered Automation"
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
          rows={3}
          value={formData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe this modern team feature..."
          className={cn(errors.description && "border-red-500 focus-visible:ring-red-500")}
        />
        {errors.description && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" />
            {errors.description}
          </p>
        )}
      </div>

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
            <ChevronDown className={cn("h-4 w-4 shrink-0 opacity-50 transition-transform", dropdownOpen && "rotate-180")} />
          </Button>

          {dropdownOpen && (
            <div className="absolute z-50 mt-1 w-full rounded-lg border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
              <div className="p-2 grid grid-cols-4 gap-1.5 max-h-[240px] overflow-y-auto">
                {ICON_OPTIONS.map((opt) => {
                  const IconComp = opt.icon;
                  const isSelected = formData.icon?.toLowerCase() === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        handleChange("icon", opt.value);
                        setDropdownOpen(false);
                      }}
                      className={cn(
                        "flex flex-col items-center gap-1 p-2.5 rounded-lg text-xs transition-all duration-150",
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

      {/* IMAGE UPLOAD */}
      <div>
        <Label>Upload Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files?.[0])}
        />

        {preview && (
          <div className="relative mt-2">
            <img
              src={preview}
              alt="Preview"
              className="h-24 w-full object-cover rounded border"
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={removeImage}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* hidden id */}
      {formData._id && <input type="hidden" value={formData._id} />}
    </div>
  );
}
