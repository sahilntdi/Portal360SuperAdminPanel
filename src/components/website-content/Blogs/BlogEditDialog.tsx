import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BlogForm } from "./BlogForm";

export function BlogEditDialog({ open, onClose, item, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString(),
    readTime: "",
    category: "",
    image: "",
    slug: "",
    _id: null
  });

  // Reset form when item changes
  useEffect(() => {
    if (item) {
      // Format date for input field (YYYY-MM-DD)
      const dateValue = item.date 
        ? new Date(item.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      
      setFormData({
        title: item.title || "",
        excerpt: item.excerpt || "",
        content: item.content || "",
        date: dateValue,
        readTime: item.readTime || "",
        category: item.category || "",
        image: item.image || "",
        slug: item.slug || "",
        // Preserve MongoDB _id
        _id: item._id
      });
    }
  }, [item]);

  const handleSave = () => {
    if (!formData._id) {
      console.error("No _id found in blog data");
      return;
    }
    
    // Convert date string back to ISO format
    const dataToSubmit = {
      ...formData,
      date: new Date(formData.date).toISOString(),
      // Ensure _id is included
      _id: formData._id
    };
    
    onSubmit(dataToSubmit);
    onClose();
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>

        <BlogForm formData={formData} setFormData={setFormData} />

        <Button className="mt-4 w-full" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}