import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HowItWorksForm } from "./HowItWorksForm";
import { useState, useEffect } from "react";

export function HowItWorksEditDialog({ open, onClose, item, onSubmit }) {
  const [formData, setFormData] = useState({ 
    stepNumber: 1,
    title: "",
    description: "",
    icon: "",
    _id: null
  });

  // Reset form when item changes
  useEffect(() => {
    if (item) {
      setFormData({
        stepNumber: item.stepNumber || 1,
        title: item.title || "",
        description: item.description || "",
        icon: item.icon || "",
        // Preserve the _id for update
        _id: item._id
      });
    }
  }, [item]);

  const handleSubmit = () => {
    if (!formData._id) {
      console.error("No _id found in form data");
      return;
    }
    
    // Pass the form data with _id
    onSubmit(formData);
    onClose();
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Step</DialogTitle>
        </DialogHeader>

        <HowItWorksForm formData={formData} setFormData={setFormData} />

        <Button className="mt-4 w-full" onClick={handleSubmit}>
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}