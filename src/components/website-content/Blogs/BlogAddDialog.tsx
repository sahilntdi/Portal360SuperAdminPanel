import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BlogForm } from "./BlogForm";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
export function BlogAddDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    readTime: "",
    category: "",
    slug: "",
    image: "",
    imageFile: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  useEffect(() => {
    if (open) {
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        date: new Date().toISOString().split("T")[0],
        readTime: "",
        category: "",
        slug: "",
        image: "",
        imageFile: null,
      });
      setPreview("");
      setLoading(false);
    }
  }, [open]);

const handleSubmit = async () => {
  // ✅ REQUIRED FIELD CHECK
  const requiredFields = [
    "title",
    "excerpt",
    "content",
    "date",
    "readTime",
    "category",
    "slug",
  ];

  for (const field of requiredFields) {
    if (!formData[field]?.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
  }

  if (!formData.imageFile) {
    toast.error("Please upload blog image");
    return;
  }

  try {
    setLoading(true);

    const payload = {
      ...formData,
      date: new Date(formData.date).toISOString(),
    };

    await onSubmit(payload);
    onClose();
  } finally {
    setLoading(false);
  }
};

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Blog Post</DialogTitle>
        </DialogHeader>

        <BlogForm
          formData={formData}
          setFormData={setFormData}
          preview={preview}
          setPreview={setPreview}
        />

        <Button
          className="mt-4 w-full"
          onClick={handleSubmit}
          disabled={loading} // ✅ disable while loading
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding Blog...
            </span>
          ) : (
            "Add Blog"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
