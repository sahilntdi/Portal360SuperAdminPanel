import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { SuperadminForm, validateSuperadminForm } from "./SuperadminForm";

export function SuperadminAddDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    icon: "",
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const validationErrors = validateSuperadminForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({ icon: "", title: "", description: "" });
      setErrors({});
      onClose();
    } catch (error) {
      // error handled by parent
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Superadmin Control</DialogTitle>
        </DialogHeader>

        <SuperadminForm formData={formData} setFormData={setFormData} errors={errors} />

        <Button className="mt-4 w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Control"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
