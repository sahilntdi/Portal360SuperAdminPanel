import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HowItWorksForm } from "./HowItWorksForm";
import { useState } from "react";

export function HowItWorksEditDialog({ open, onClose, item, onSubmit }) {
  if (!item) return null;

  const [formData, setFormData] = useState({ ...item });

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

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
