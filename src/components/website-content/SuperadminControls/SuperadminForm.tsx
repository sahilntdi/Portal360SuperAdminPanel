import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Shield,
  Activity,
  Settings,
  Mail,
  Lock,
  Eye,
  Bell,
  Database,
  Users,
  Key,
  Server,
  AlertCircle,
  Zap,
  ChevronDown,
  Check,
} from "lucide-react";

// Available icons for Superadmin Controls
const ICON_OPTIONS = [
  { value: "mail", label: "Mail", icon: Mail, color: "text-blue-600" },
  { value: "shield", label: "Shield", icon: Shield, color: "text-red-600" },
  { value: "activity", label: "Activity", icon: Activity, color: "text-green-600" },
  { value: "settings", label: "Settings", icon: Settings, color: "text-gray-600" },
  { value: "lock", label: "Lock", icon: Lock, color: "text-orange-600" },
  { value: "eye", label: "Eye", icon: Eye, color: "text-indigo-600" },
  { value: "bell", label: "Bell", icon: Bell, color: "text-amber-600" },
  { value: "database", label: "Database", icon: Database, color: "text-purple-600" },
  { value: "users", label: "Users", icon: Users, color: "text-cyan-600" },
  { value: "key", label: "Key", icon: Key, color: "text-yellow-600" },
  { value: "server", label: "Server", icon: Server, color: "text-slate-600" },
  { value: "alert-circle", label: "Alert", icon: AlertCircle, color: "text-rose-600" },
  { value: "zap", label: "Zap", icon: Zap, color: "text-emerald-600" },
];

interface SuperadminFormProps {
  formData: {
    icon: string;
    title: string;
    description: string;
  };
  setFormData: (data: any) => void;
  errors?: Record<string, string>;
}

export function SuperadminForm({ formData, setFormData, errors = {} }: SuperadminFormProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const selectedIcon = ICON_OPTIONS.find((opt) => opt.value === formData.icon);

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
            <ChevronDown className={cn("h-4 w-4 shrink-0 opacity-50 transition-transform", dropdownOpen && "rotate-180")} />
          </Button>

          {dropdownOpen && (
            <div className="absolute z-50 mt-1 w-full rounded-lg border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
              <div className="p-2 grid grid-cols-4 gap-1.5 max-h-[240px] overflow-y-auto">
                {ICON_OPTIONS.map((opt) => {
                  const IconComp = opt.icon;
                  const isSelected = formData.icon === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, icon: opt.value });
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
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
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
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          placeholder="e.g. Email Configuration"
          className={cn(errors.title && "border-red-500 focus-visible:ring-red-500")}
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
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
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Describe what this control does..."
          className={cn(errors.description && "border-red-500 focus-visible:ring-red-500")}
        />
        {errors.description && (
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.description}
          </p>
        )}
      </div>
    </div>
  );
}

// Export validation helper for use in Add/Edit dialogs
export function validateSuperadminForm(data: { icon: string; title: string; description: string }) {
  const errors: Record<string, string> = {};
  if (!data.icon?.trim()) errors.icon = "Please select an icon";
  if (!data.title?.trim()) errors.title = "Title is required";
  if (!data.description?.trim()) errors.description = "Description is required";
  return errors;
}
