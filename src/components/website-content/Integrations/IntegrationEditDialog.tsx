// IntegrationEditDialog.jsx
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IntegrationForm } from "./IntegrationForm";

export function IntegrationEditDialog({ open, onClose, item, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    order: 1,
    logo: null,
    logoUrl: "",
    _id: ""
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        order: item.order || 1,
        logoUrl: item.logo || "", // Backend returns logo in 'logo' field
        logo: null, // Reset file upload
        _id: item._id
      });
    }
  }, [item]);

  if (!item) return null;

  const handleSave = () => {
    if (!formData._id) {
      console.error("No _id found in integration data");
      toast.error("Integration ID is required");
      return;
    }
    
    // Validate required fields
    if (!formData.name.trim()) {
      toast.error("Integration name is required");
      return;
    }
    
    if (!formData.order || formData.order < 1) {
      toast.error("Valid order number is required");
      return;
    }

    // Prepare final data
    const submitData = {
      name: formData.name.trim(),
      order: formData.order,
      _id: formData._id
    };

    // Add logo based on selection
    if (formData.logo instanceof File) {
      submitData.logo = formData.logo;
    } else if (formData.logoUrl.trim()) {
      submitData.logoUrl = formData.logoUrl.trim();
    }

    console.log("Updating integration with:", submitData);
    onSubmit(submitData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Integration</DialogTitle>
          <DialogDescription>
            Update integration details
          </DialogDescription>
        </DialogHeader>

        <IntegrationForm formData={formData} setFormData={setFormData} isEdit={true} />

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}