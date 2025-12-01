import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TestimonialForm } from "./TestimonialForm";

export function TestimonialAddDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
    rating: 5,
    order: 1,
  });

  const handleAdd = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Testimonial</DialogTitle>
        </DialogHeader>

        <TestimonialForm formData={formData} setFormData={setFormData} />

        <Button className="mt-4 w-full" onClick={handleAdd}>
          Add Testimonial
        </Button>
      </DialogContent>
    </Dialog>
  );
}
