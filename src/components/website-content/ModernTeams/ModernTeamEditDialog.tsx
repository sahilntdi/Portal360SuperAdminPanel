import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModernTeamForm } from "./ModernTeamForm";

export function ModernTeamEditDialog({ open, onClose, item, onSubmit }) {
  const [formData, setFormData] = useState(item || {});

  useEffect(() => {
    setFormData(item || {});
  }, [item]);

  if (!item) return null;

  const handleSave = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit Modern Team Item</DialogTitle></DialogHeader>

        <ModernTeamForm formData={formData} setFormData={setFormData} />

        <Button className="mt-4 w-full" onClick={handleSave}>Save Changes</Button>
      </DialogContent>
    </Dialog>
  );
}
