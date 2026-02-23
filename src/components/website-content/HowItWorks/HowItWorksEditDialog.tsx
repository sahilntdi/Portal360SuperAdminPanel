import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HowItWorksForm, validateHowItWorksForm } from "./HowItWorksForm";
import { useState, useEffect } from "react";

export function HowItWorksEditDialog({ open, onClose, item, onSubmit }) {
  const [formData, setFormData] = useState({
    stepNumber: 1,
    title: "",
    description: "",
    icon: "",
    _id: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when item changes
  useEffect(() => {
    if (item) {
      setFormData({
        stepNumber: item.stepNumber || 1,
        title: item.title || "",
        description: item.description || "",
        icon: item.icon || "",
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

  const handleSubmit = () => {
    if (!formData._id) {
      console.error("No _id found in form data");
      return;
    }

    const validationErrors = validateHowItWorksForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onSubmit(formData);
    onClose();
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Step</DialogTitle>
        </DialogHeader>

        <HowItWorksForm formData={formData} setFormData={setFormData} errors={errors} />

        <Button className="mt-4 w-full" onClick={handleSubmit}>
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}