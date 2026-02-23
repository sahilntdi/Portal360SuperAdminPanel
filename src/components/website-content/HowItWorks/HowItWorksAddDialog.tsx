import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HowItWorksForm, validateHowItWorksForm } from "./HowItWorksForm";

export function HowItWorksAddDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    stepNumber: 1,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form and errors when dialog opens/closes
  useEffect(() => {
    if (open) {
      setFormData({ title: "", description: "", icon: "", stepNumber: 1 });
      setErrors({});
    }
  }, [open]);

  // Clear errors when dialog closes
  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleSubmit = () => {
    const validationErrors = validateHowItWorksForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Step</DialogTitle>
        </DialogHeader>

        <HowItWorksForm formData={formData} setFormData={setFormData} errors={errors} />

        <Button className="mt-4 w-full" onClick={handleSubmit}>
          Add Step
        </Button>
      </DialogContent>
    </Dialog>
  );
}
