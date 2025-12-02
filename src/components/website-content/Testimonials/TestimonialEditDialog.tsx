import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TestimonialForm } from "./TestimonialForm";

export function TestimonialEditDialog({ open, onClose, item, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
    rating: 5,
    order: 1,
    _id: null
  });

  // Reset form when item changes
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        role: item.role || "",
        message: item.message || "",
        rating: item.rating || 5,
        order: item.order || 1,
        // Preserve MongoDB _id
        _id: item._id
      });
    }
  }, [item]);

  const handleSave = () => {
    if (!formData._id) {
      console.error("No _id found in testimonial data");
      return;
    }
    
    onSubmit(formData);
    onClose();
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Testimonial</DialogTitle>
        </DialogHeader>

        <TestimonialForm formData={formData} setFormData={setFormData} />

        <Button className="mt-4 w-full" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}