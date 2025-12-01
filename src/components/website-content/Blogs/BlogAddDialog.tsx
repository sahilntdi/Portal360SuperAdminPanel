import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BlogForm } from "./BlogForm";

export function BlogAddDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString(),
    readTime: "",
    category: "",
    image: "",
    slug: "",
  });

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Blog</DialogTitle></DialogHeader>

        <BlogForm formData={formData} setFormData={setFormData} />

        <Button className="mt-4 w-full" onClick={handleSubmit}>
          Add Blog
        </Button>
      </DialogContent>
    </Dialog>
  );
}
