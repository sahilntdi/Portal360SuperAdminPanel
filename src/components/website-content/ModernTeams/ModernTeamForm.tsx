import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function ModernTeamForm({ formData, setFormData }) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (formData.image) {
      setPreview(formData.image); // Show existing URL preview
    }
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (file) => {
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    setFormData((prev) => ({
      ...prev,
      imageFile: file, // File to upload
      image: "",       // Remove URL
    }));
  };

  const removeImage = () => {
    setPreview("");
    setFormData((prev) => ({
      ...prev,
      imageFile: null,
      image: "",
    }));
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <Label>Title *</Label>
        <Input
          value={formData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          required
          placeholder="e.g., AI-Powered Automation"
        />
      </div>

      {/* Description */}
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

      {/* Icon */}
      <div>
        <Label>Icon Name *</Label>
        <Input
          value={formData.icon || ""}
          onChange={(e) => handleChange("icon", e.target.value)}
          required
          placeholder="e.g. Brain, Zap, Shield"
        />
      </div>

      {/* IMAGE UPLOAD */}
      <div>
        <Label>Upload Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0])}
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
