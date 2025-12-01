import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FAQForm } from "./FAQForm";

export function FAQAddDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general",
    order: 1,
  });

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>Add FAQ</DialogTitle></DialogHeader>

        <FAQForm formData={formData} setFormData={setFormData} />
        <Button className="mt-4 w-full" onClick={handleSubmit}>Add FAQ</Button>
      </DialogContent>
    </Dialog>
  );
}
