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

export function TestimonialEditDialog({ open, onClose, item, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    message: "",
    rating: 5,
    order: 1,
    _id: null as string | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Reset form when item changes
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        designation: item.designation || "",
        company: item.company || "",
        message: item.message || "",
        rating: item.rating || 5,
        order: item.order || 1,
        _id: item._id,
      });
      setErrors({});
    }
  }, [item]);

  // Clear errors when dialog closes
  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleSave = async () => {
    if (!formData._id) {
      console.error("No _id found in testimonial data");
      return;
    }

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

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Testimonial</DialogTitle>
        </DialogHeader>

        <TestimonialForm formData={formData} setFormData={setFormData} errors={errors} />

        <Button className="mt-4 w-full" onClick={handleSave} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}