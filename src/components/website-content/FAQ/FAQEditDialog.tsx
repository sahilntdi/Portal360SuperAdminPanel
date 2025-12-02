import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FAQForm } from "./FAQForm";

export function FAQEditDialog({ open, onClose, item, onSubmit }) {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general",
    order: 1,
    _id: null
  });

  // Reset form when item changes
  useEffect(() => {
    if (item) {
      setFormData({
        question: item.question || "",
        answer: item.answer || "",
        category: item.category || "general",
        order: item.order || 1,
        _id: item._id
      });
    }
  }, [item]);

  const handleSave = () => {
    if (!formData._id) {
      console.error("No _id found in FAQ form data");
      return;
    }
    
    onSubmit(formData);
    onClose();
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit FAQ</DialogTitle>
        </DialogHeader>

        <FAQForm formData={formData} setFormData={setFormData} />
        <Button className="mt-4 w-full" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}