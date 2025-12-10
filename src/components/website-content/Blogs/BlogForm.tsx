import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function BlogForm({ formData, setFormData, preview, setPreview }) {
  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleImageUpload = (file) => {
    if (!file) return;
    const localURL = URL.createObjectURL(file);

    setPreview(localURL);

    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      image: "",
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

      <div>
        <Label>Title *</Label>
        <Input
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div>
        <Label>Excerpt *</Label>
        <Textarea
          rows={2}
          value={formData.excerpt}
          onChange={(e) => handleChange("excerpt", e.target.value)}
        />
      </div>

      <div>
        <Label>Content *</Label>
        <Textarea
          rows={6}
          value={formData.content}
          onChange={(e) => handleChange("content", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>

        <div>
          <Label>Read Time</Label>
          <Input
            value={formData.readTime}
            onChange={(e) => handleChange("readTime", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Category</Label>
          <Input
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />
        </div>

        <div>
          <Label>Slug</Label>
          <Input
            value={formData.slug}
            onChange={(e) =>
              handleChange("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))
            }
          />
        </div>
      </div>

      {/* IMAGE UPLOAD ONLY */}
      <div>
        <Label>Upload Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0])}
        />
      </div>

      {preview && (
        <div className="relative mt-3 inline-block">
          <img src={preview} className="h-28 rounded border object-cover" />

          <Button
            size="icon"
            variant="destructive"
            className="absolute -top-2 -right-2 h-7 w-7 rounded-full"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
