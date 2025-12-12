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
          value={formData.designation || ""}
          onChange={(e) => handleChange("designation", e.target.value)}
          required
          placeholder="e.g. CEO at Company"
        />
      </div>

      <div>
        <Label>Company *</Label>
        <Input
          value={formData.company || ""}
          onChange={(e) => handleChange("company", e.target.value)}
          required
          placeholder="Company name"
        />
      </div>

      <div>
        <Label>Message *</Label>
        <Textarea
          rows={3}
          value={formData.message || ""}
          onChange={(e) => handleChange("message", e.target.value)}
          required
          placeholder="What customer said..."
        />
      </div>

      {/* <div>
        <Label>Image ID / URL (Optional)</Label>
        <Input
          value={formData.image || ""}
          onChange={(e) => handleChange("image", e.target.value)}
          placeholder="Paste image ID or URL"
        />
      </div> */}

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

      {formData._id && <input type="hidden" value={formData._id} />}
    </div>
  );
}
