import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IntegrationForm } from "./IntegrationForm";

export function IntegrationEditDialog({ open, onClose, item, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    order: "",
    image: null,
    imageUrl: "",
    _id: ""
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        order: item.order || "",
        image: item.image || null,
        // For edit, we might have an existing image URL
        imageUrl: item.image || "",
        // Preserve MongoDB _id
        _id: item._id
      });
    }
  }, [item]);

  if (!item) return null;

  const handleSave = () => {
    if (!formData._id) {
      console.error("No _id found in integration data");
      return;
    }
    
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Integration</DialogTitle>
        </DialogHeader>

        <IntegrationForm formData={formData} setFormData={setFormData} />

        <Button className="mt-4 w-full" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}