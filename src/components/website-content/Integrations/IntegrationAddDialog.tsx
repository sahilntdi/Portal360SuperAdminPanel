// IntegrationAddDialog.jsx
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { IntegrationForm, validateIntegrationForm } from "./IntegrationForm";

export function IntegrationAddDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    order: 1,
    logoFile: null,
    logoUrl: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData({ name: "", order: 1, logoFile: null, logoUrl: "" });
      setErrors({});
    }
  }, [open]);

  const handleSubmit = async () => {
    const validationErrors = validateIntegrationForm(formData);
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
          <DialogTitle>Add Integration</DialogTitle>
        </DialogHeader>

        <IntegrationForm formData={formData} setFormData={setFormData} externalErrors={errors} />

        <Button className="mt-4 w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Integration"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
