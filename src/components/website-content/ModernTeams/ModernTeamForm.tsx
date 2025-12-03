import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ModernTeamForm({ formData, setFormData }) {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Title *</Label>
        <Input
          value={formData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          required
          placeholder="e.g., AI-Powered Automation"
        />
      </div>

      <div>
        <Label>Description *</Label>
        <Textarea
          rows={3}
          value={formData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          required
          placeholder="Describe this modern team feature..."
        />
      </div>

      <div>
        <Label>Icon Name *</Label>
        <Input
          value={formData.icon || ""}
          onChange={(e) => handleChange("icon", e.target.value)}
          required
          placeholder="e.g., Brain, Zap, Shield, Cloud"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Use Lucide React icon names (Brain, Zap, Shield, Cloud, etc.)
        </p>
      </div>

      <div>
        <Label>Image URL</Label>
        <Input
          value={formData.image || ""}
          onChange={(e) => handleChange("image", e.target.value)}
          placeholder="https://images.unsplash.com/photo-..."
        />
        {formData.image && (
          <div className="mt-2">
            <img 
              src={formData.image} 
              alt="Preview" 
              className="h-20 w-full object-cover rounded border"
            />
          </div>
        )}
      </div>

      {/* Hidden field for _id */}
      {formData._id && (
        <input type="hidden" value={formData._id} />
      )}
    </div>
  );
}