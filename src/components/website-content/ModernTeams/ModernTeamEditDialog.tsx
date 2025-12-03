import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModernTeamForm } from "./ModernTeamForm";

export function ModernTeamEditDialog({ open, onClose, item, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    image: "",
    _id: null
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        description: item.description || "",
        icon: item.icon || "",
        image: item.image || "",
        // Preserve MongoDB _id
        _id: item._id
      });
    }
  }, [item]);

  if (!item) return null;

  const handleSave = () => {
    if (!formData._id) {
      console.error("No _id found in Modern Team data");
      return;
    }
    
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Modern Team Item</DialogTitle>
        </DialogHeader>

        <ModernTeamForm formData={formData} setFormData={setFormData} />

        <Button className="mt-4 w-full" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}