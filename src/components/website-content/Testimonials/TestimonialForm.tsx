import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

// Exported validation helper
export function validateTestimonialForm(data: {
  name?: string;
  designation?: string;
  company?: string;
  message?: string;
  rating?: number;
}) {
  const errors: Record<string, string> = {};
  if (!data.name?.trim()) errors.name = "Name is required";
  if (!data.designation?.trim()) errors.designation = "Designation is required";
  if (!data.company?.trim()) errors.company = "Company is required";
  if (!data.message?.trim()) errors.message = "Message is required";
  if (!data.rating || data.rating < 1 || data.rating > 5) errors.rating = "Rating must be 1–5";
  return errors;
}

interface TestimonialFormProps {
  formData: any;
  setFormData: (fn: any) => void;
  errors?: Record<string, string>;
}

export function TestimonialForm({ formData, setFormData, errors = {} }: TestimonialFormProps) {

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-4">

      <div className="space-y-1.5">
        <Label className="text-sm font-medium">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          value={formData.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Customer name"
          className={cn(errors.name && "border-red-500 focus-visible:ring-red-500")}
        />
        {errors.name && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" />
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium">
          Role/Designation <span className="text-red-500">*</span>
        </Label>
        <Input
          value={formData.designation || ""}
          onChange={(e) => handleChange("designation", e.target.value)}
          placeholder="e.g. CEO at Company"
          className={cn(errors.designation && "border-red-500 focus-visible:ring-red-500")}
        />
        {errors.designation && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" />
            {errors.designation}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium">
          Company <span className="text-red-500">*</span>
        </Label>
        <Input
          value={formData.company || ""}
          onChange={(e) => handleChange("company", e.target.value)}
          placeholder="Company name"
          className={cn(errors.company && "border-red-500 focus-visible:ring-red-500")}
        />
        {errors.company && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" />
            {errors.company}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          rows={3}
          value={formData.message || ""}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="What customer said..."
          className={cn(errors.message && "border-red-500 focus-visible:ring-red-500")}
        />
        {errors.message && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" />
            {errors.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Rating (1–5)</Label>
          <Input
            type="number"
            min={1}
            max={5}
            value={formData.rating || 5}
            onChange={(e) => handleChange("rating", Number(e.target.value))}
            className={cn(errors.rating && "border-red-500 focus-visible:ring-red-500")}
          />
          {errors.rating && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3" />
              {errors.rating}
            </p>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium">Order</Label>
          <Input
            type="number"
            min={1}
            value={formData.order || 1}
            onChange={(e) => handleChange("order", Number(e.target.value))}
          />
        </div>
      </div>

      {formData._id && <input type="hidden" value={formData._id} />}
    </div>
  );
}
