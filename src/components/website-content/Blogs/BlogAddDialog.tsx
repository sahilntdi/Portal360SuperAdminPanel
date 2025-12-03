import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BlogForm } from "./BlogForm";

export function BlogAddDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    readTime: "",
    category: "",
    image: "",
    slug: "",
  });

  const handleSubmit = () => {
    // Convert date to ISO string
    const dataToSubmit = {
      ...formData,
      date: new Date(formData.date).toISOString()
    };
    
    onSubmit(dataToSubmit);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Blog Post</DialogTitle>
        </DialogHeader>

        <BlogForm formData={formData} setFormData={setFormData} />

        <Button className="mt-4 w-full" onClick={handleSubmit}>
          Add Blog Post
        </Button>
      </DialogContent>
    </Dialog>
  );
}