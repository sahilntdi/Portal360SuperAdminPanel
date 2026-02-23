import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { TestimonialForm, validateTestimonialForm } from "./TestimonialForm";

export function TestimonialAddDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    message: "",
    rating: 5,
    order: 1,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Reset form and errors when dialog opens
  useEffect(() => {
    if (open) {
      setFormData({ name: "", designation: "", company: "", message: "", rating: 5, order: 1 });
      setErrors({});
    }
  }, [open]);

  // Clear errors when dialog closes
  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleAdd = async () => {
    const validationErrors = validateTestimonialForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      // error handled by parent
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Testimonial</DialogTitle>
        </DialogHeader>

        <TestimonialForm formData={formData} setFormData={setFormData} errors={errors} />

        <Button className="mt-4 w-full" onClick={handleAdd} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Testimonial"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}