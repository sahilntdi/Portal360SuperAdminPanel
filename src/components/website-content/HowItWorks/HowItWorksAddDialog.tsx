import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HowItWorksForm } from "./HowItWorksForm";

export function HowItWorksAddDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    stepNumber: 1,
  });

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Step</DialogTitle>
        </DialogHeader>

        <HowItWorksForm formData={formData} setFormData={setFormData} />

        <Button className="mt-4 w-full" onClick={handleSubmit}>
          Add Step
        </Button>
      </DialogContent>
    </Dialog>
  );
}
