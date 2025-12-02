import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function IntegrationForm({ formData, setFormData }) {
  const [imagePreview, setImagePreview] = useState(formData.imageUrl || "");

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("image", file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Name *</Label>
        <Input
          value={formData.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          placeholder="e.g., Xero, QuickBooks, Zapier"
        />
      </div>

      <div>
        <Label>Order *</Label>
        <Input
          type="number"
          min="1"
          value={formData.order || ""}
          onChange={(e) => handleChange("order", Number(e.target.value))}
          required
          placeholder="Priority order number"
        />
      </div>

      <div>
        <Label>Logo/Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Upload integration logo (PNG, JPG, SVG)
        </p>
      </div>

      {/* Image preview */}
      {(imagePreview || formData.imageUrl) && (
        <div className="mt-2">
          <Label>Preview:</Label>
          <div className="mt-1 p-2 border rounded">
            <img 
              src={imagePreview || formData.imageUrl} 
              alt="Preview" 
              className="h-16 w-16 object-contain mx-auto"
            />
            <p className="text-xs text-center text-muted-foreground mt-1">
              Current logo
            </p>
          </div>
        </div>
      )}

      {/* Current image URL (for editing) */}
      {formData.imageUrl && !imagePreview && (
        <div className="mt-2">
          <Label>Current Image URL:</Label>
          <Input
            value={formData.imageUrl || ""}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
            placeholder="Current image URL"
            readOnly
          />
        </div>
      )}

      {/* Hidden field for _id */}
      {formData._id && (
        <input type="hidden" value={formData._id} />
      )}
    </div>
  );
}