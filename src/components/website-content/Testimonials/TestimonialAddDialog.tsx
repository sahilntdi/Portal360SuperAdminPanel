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
    designation: "",
    company: "",
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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