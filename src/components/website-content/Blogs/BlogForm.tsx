import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function BlogForm({ formData, setFormData }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
      </div>

      <div>
        <Label>Excerpt</Label>
        <Textarea
          rows={2}
          value={formData.excerpt}
          onChange={(e) =>
            setFormData({ ...formData, excerpt: e.target.value })
          }
        />
      </div>

      <div>
        <Label>Content</Label>
        <Textarea
          rows={6}
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
      </div>

      <div>
        <Label>Date</Label>
        <Input
          type="date"
          value={formData.date?.slice(0, 10)}
          onChange={(e) =>
            setFormData({
              ...formData,
              date: new Date(e.target.value).toISOString(),
            })
          }
        />
      </div>

      <div>
        <Label>Read Time</Label>
        <Input
          value={formData.readTime}
          onChange={(e) =>
            setFormData({ ...formData, readTime: e.target.value })
          }
        />
      </div>

      <div>
        <Label>Category</Label>
        <Input
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
      </div>

      <div>
        <Label>Image URL</Label>
        <Input
          value={formData.image}
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.value })
          }
        />
      </div>

      <div>
        <Label>Slug</Label>
        <Input
          value={formData.slug}
          onChange={(e) =>
            setFormData({ ...formData, slug: e.target.value })
          }
        />
      </div>
    </div>
  );
}
