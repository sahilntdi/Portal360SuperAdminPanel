import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IntegrationForm } from "./IntegrationForm";

export function IntegrationAddDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    order: "",
    image: null,
  });

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Integration</DialogTitle></DialogHeader>

        <IntegrationForm formData={formData} setFormData={setFormData} />

        <Button className="mt-4 w-full" onClick={handleSubmit}>
          Add Integration
        </Button>
      </DialogContent>
    </Dialog>
  );
}
