import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FAQForm } from "./FAQForm";

export function FAQEditDialog({ open, onClose, item, onSubmit }) {
  if (!item) return null;

  const [formData, setFormData] = useState({ ...item });

  const handleSave = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit FAQ</DialogTitle></DialogHeader>

        <FAQForm formData={formData} setFormData={setFormData} />
        <Button className="mt-4 w-full" onClick={handleSave}>Save Changes</Button>
      </DialogContent>
    </Dialog>
  );
}
