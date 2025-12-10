import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModernTeamForm } from "./ModernTeamForm";

export function ModernTeamAddDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    image: "",
    imageFile: null,
  });

  useEffect(() => {
    if (open) {
      setFormData({
        title: "",
        description: "",
        icon: "",
        image: "",
        imageFile: null,
      });
    }
  }, [open]);

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Modern Team Feature</DialogTitle>
        </DialogHeader>

        <ModernTeamForm formData={formData} setFormData={setFormData} />

        <Button className="mt-4 w-full" onClick={handleSubmit}>
          Add Feature
        </Button>
      </DialogContent>
    </Dialog>
  );
}
