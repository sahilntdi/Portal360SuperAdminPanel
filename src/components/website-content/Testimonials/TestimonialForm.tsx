import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TestimonialForm({ formData, setFormData }) {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Name *</Label>
        <Input
          value={formData.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          placeholder="Customer name"
        />
      </div>

      <div>
        <Label>Role/Designation *</Label>
        <Input
          value={formData.role || ""}
          onChange={(e) => handleChange("role", e.target.value)}
          required
          placeholder="e.g., CEO at Company"
        />
      </div>

      <div>
        <Label>Message *</Label>
        <Textarea
          rows={3}
          value={formData.message || ""}
          onChange={(e) => handleChange("message", e.target.value)}
          required
          placeholder="What the customer said..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Rating (1–5)</Label>
          <Input
            type="number"
            min={1}
            max={5}
            value={formData.rating || 5}
            onChange={(e) => handleChange("rating", Number(e.target.value))}
          />
        </div>

        <div>
          <Label>Order</Label>
          <Input
            type="number"
            min={1}
            value={formData.order || 1}
            onChange={(e) => handleChange("order", Number(e.target.value))}
          />
        </div>
      </div>

      {/* Hidden field for _id */}
      {formData._id && (
        <input type="hidden" value={formData._id} />
      )}
    </div>
  );
}