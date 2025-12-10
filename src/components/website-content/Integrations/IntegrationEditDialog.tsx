// IntegrationEditDialog.jsx
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IntegrationForm } from "./IntegrationForm";

export function IntegrationEditDialog({ open, onClose, item, onSubmit }) {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    order: 1,
    logoFile: null,
    logoUrl: ""
  });

  useEffect(() => {
    if (open && item) {
      setFormData({
        _id: item._id,
        name: item.name,
        order: item.order,
        logoFile: null,
        logoUrl: item.logo || ""
      });
    }
  }, [open, item]);

  const handleSave = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Integration</DialogTitle>
        </DialogHeader>

        <IntegrationForm formData={formData} setFormData={setFormData} isEdit />

        <Button className="mt-4 w-full" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}
