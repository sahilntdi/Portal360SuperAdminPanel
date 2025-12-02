import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function HowItWorksForm({ formData, setFormData }) {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Step Number</Label>
        <Input
          type="number"
          value={formData.stepNumber || 1}
          onChange={(e) => handleChange("stepNumber", Number(e.target.value))}
          min="1"
        />
      </div>

      <div>
        <Label>Title *</Label>
        <Input
          value={formData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Description *</Label>
        <Textarea
          rows={3}
          value={formData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Icon</Label>
        <Input
          value={formData.icon || ""}
          onChange={(e) => handleChange("icon", e.target.value)}
          placeholder="e.g., UserCheck, Brain, etc."
        />
        <p className="text-xs text-muted-foreground mt-1">
          Icon name from Lucide React (UserCheck, Brain, Zap, etc.)
        </p>
      </div>
      
      {/* Hidden field for _id */}
      {formData._id && (
        <input type="hidden" value={formData._id} />
      )}
    </div>
  );
}