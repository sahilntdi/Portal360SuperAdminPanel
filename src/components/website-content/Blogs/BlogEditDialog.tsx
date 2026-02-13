import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BlogForm } from "./BlogForm";

export function BlogEditDialog({ open, onClose, data, onSubmit }) {
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    excerpt: "",
    content: "",
    date: "",
    readTime: "",
    category: "",
    image: "",       // old image URL
    imageFile: null, // new upload
    slug: "",
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (open && data) {
      setFormData({
        _id: data._id,
        title: data.title || "",
        excerpt: data.excerpt || "",
        content: data.content || "",
        date: data.date ? data.date.split("T")[0] : "",
        readTime: data.readTime || "",
        category: data.category || "",
        image: data.image || "",
        imageFile: null,
        slug: data.slug || "",
      });

      setPreview(data.image || "");
    }
  }, [open, data]);

  const handleSave = () => {
    const payload = {
      ...formData,
      date: new Date(formData.date).toISOString(),
    };
    onSubmit(payload);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog Post</DialogTitle>
        </DialogHeader>

        <BlogForm
          formData={formData}
          setFormData={setFormData}
          preview={preview}
          setPreview={setPreview}
        />

        <Button className="mt-4 w-full" onClick={handleSave}>
          Update Blog
        </Button>
      </DialogContent>
    </Dialog>
  );
}
