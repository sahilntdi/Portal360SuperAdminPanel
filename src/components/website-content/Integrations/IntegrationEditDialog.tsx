// IntegrationEditDialog.jsx
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { IntegrationForm, validateIntegrationForm } from "./IntegrationForm";

export function IntegrationEditDialog({ open, onClose, item, onSubmit }) {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    order: 1,
    logoFile: null,
    logoUrl: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && item) {
      setFormData({
        _id: item._id,
        name: item.name,
        order: item.order,
        logoFile: null,
        logoUrl: item.logo || ""
      });
      setErrors({});
    }
  }, [open, item]);

  const handleSave = async () => {
    const validationErrors = validateIntegrationForm(formData, true);
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Integration</DialogTitle>
        </DialogHeader>

        <IntegrationForm
          formData={formData}
          setFormData={setFormData}
          isEdit
          externalErrors={errors}
        />

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
