import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function BlogForm({ formData, setFormData }) {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Format date for input field
  const formatDateForInput = (dateString) => {
    if (!dateString) return new Date().toISOString().split('T')[0];
    
    try {
      if (dateString.includes('T')) {
        // Already in ISO format
        return dateString.split('T')[0];
      } else {
        // Assume it's already in YYYY-MM-DD format
        return dateString;
      }
    } catch (error) {
      return new Date().toISOString().split('T')[0];
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Title *</Label>
        <Input
          value={formData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          required
          placeholder="Blog post title"
        />
      </div>

      <div>
        <Label>Excerpt *</Label>
        <Textarea
          rows={2}
          value={formData.excerpt || ""}
          onChange={(e) => handleChange("excerpt", e.target.value)}
          required
          placeholder="Short description of the blog post"
        />
      </div>

      <div>
        <Label>Content *</Label>
        <Textarea
          rows={6}
          value={formData.content || ""}
          onChange={(e) => handleChange("content", e.target.value)}
          required
          placeholder="Blog content in markdown or plain text"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            value={formatDateForInput(formData.date)}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>

        <div>
          <Label>Read Time</Label>
          <Input
            value={formData.readTime || ""}
            onChange={(e) => handleChange("readTime", e.target.value)}
            placeholder="e.g., 5 min read"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Category</Label>
          <Input
            value={formData.category || ""}
            onChange={(e) => handleChange("category", e.target.value)}
            placeholder="e.g., Technology, Business"
          />
        </div>

        <div>
          <Label>Slug *</Label>
          <Input
            value={formData.slug || ""}
            onChange={(e) => handleChange("slug", e.target.value)}
            required
            placeholder="URL-friendly slug"
          />
        </div>
      </div>

      <div>
        <Label>Image URL</Label>
        <Input
          value={formData.image || ""}
          onChange={(e) => handleChange("image", e.target.value)}
          placeholder="https://example.com/image.jpg"
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