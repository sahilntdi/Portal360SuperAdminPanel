import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SuperadminForm } from "./SuperadminForm";

export function SuperadminAddDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    icon: "",
    title: "",
    description: "",
  });

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Superadmin Control</DialogTitle></DialogHeader>

        <SuperadminForm formData={formData} setFormData={setFormData} />

        <Button className="mt-4 w-full" onClick={handleSubmit}>Add Control</Button>
      </DialogContent>
    </Dialog>
  );
}
