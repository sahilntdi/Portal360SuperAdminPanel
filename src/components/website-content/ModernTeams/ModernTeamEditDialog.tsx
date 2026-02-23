import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ModernTeamForm, validateModernTeamForm } from "./ModernTeamForm";

export function ModernTeamEditDialog({ open, onClose, item, onSubmit }) {
  const [formData, setFormData] = useState({
    _id: null as string | null,
    title: "",
    description: "",
    icon: "",
    image: "",
    imageFile: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && item) {
      setFormData({
        _id: item._id,
        title: item.title || "",
        description: item.description || "",
        icon: item.icon || "",
        image: item.image || "",
        imageFile: null,
      });
      setErrors({});
    }
  }, [open, item]);

  // Clear errors when dialog closes
  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleSave = async () => {
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
          <DialogTitle>Edit Modern Team Item</DialogTitle>
        </DialogHeader>

        <ModernTeamForm formData={formData} setFormData={setFormData} errors={errors} />

        <Button className="mt-4 w-full" onClick={handleSave} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
