// IntegrationAddDialog.jsx
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IntegrationForm } from "./IntegrationForm";

export function IntegrationAddDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    order: 1,
    logo: null,
    logoUrl: ""
  });

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.name.trim()) {
      toast.error("Integration name is required");
      return;
    }
    
    if (!formData.order || formData.order < 1) {
      toast.error("Valid order number is required");
      return;
    }

    // Validate either logo file or URL
    if (!formData.logo && !formData.logoUrl.trim()) {
      toast.error("Please provide either a logo file or URL");
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

    console.log("Submitting integration data:", submitData);
    onSubmit(submitData);
    onClose();
    
    // Reset form
    setFormData({
      name: "",
      order: 1,
      logo: null,
      logoUrl: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Integration</DialogTitle>
          <DialogDescription>
            Add a new integration to your platform
          </DialogDescription>
        </DialogHeader>

        <IntegrationForm formData={formData} setFormData={setFormData} />

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add Integration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
