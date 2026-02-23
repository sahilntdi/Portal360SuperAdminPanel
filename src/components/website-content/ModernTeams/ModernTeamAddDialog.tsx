import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ModernTeamForm, validateModernTeamForm } from "./ModernTeamForm";

export function ModernTeamAddDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    image: "",
    imageFile: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Reset form and errors when dialog opens/closes
  useEffect(() => {
    if (open) {
      setFormData({ title: "", description: "", icon: "", image: "", imageFile: null });
      setErrors({});
    }
  }, [open]);

  // Clear errors when dialog closes
  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleSubmit = async () => {
    const validationErrors = validateModernTeamForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      // error handled by parent
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Modern Team Feature</DialogTitle>
        </DialogHeader>

        <ModernTeamForm formData={formData} setFormData={setFormData} errors={errors} />

        <Button className="mt-4 w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Feature"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
