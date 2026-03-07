// components/website-content/Hero/HeroEditDialog.jsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HeroForm } from "./HeroForm";
import { toast } from "sonner";

export function HeroEditDialog({ open, onClose, item, onSubmit }) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
        backgroundImagePreview: item.backgroundImage,
        backgroundImageFile: null
      });
    }
  }, [item]);

  if (!formData) return null;

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.heroTitle) {
      toast.error("Hero title is required");
      return;
    }

    // Prepare payload
    let payload;
    if (formData.backgroundImageFile) {
      payload = new FormData();
      payload.append("badgeText", formData.badgeText || "");
      payload.append("heroTitle", formData.heroTitle);
      payload.append("dynamicPrefix", formData.dynamicPrefix || "");
      payload.append("dynamicWords", JSON.stringify(formData.dynamicWords));
      payload.append("description", formData.description || "");
      payload.append("backgroundImage", formData.backgroundImageFile);
      payload.append("ctaPrimary", JSON.stringify(formData.ctaPrimary));
      payload.append("ctaSecondary", JSON.stringify(formData.ctaSecondary));
      payload.append("socialProofText", formData.socialProofText || "");
      payload.append("isActive", formData.isActive);
    } else {
      // Only send changed fields (partial update)
      payload = {
        badgeText: formData.badgeText,
        heroTitle: formData.heroTitle,
        dynamicPrefix: formData.dynamicPrefix,
        dynamicWords: formData.dynamicWords,
        description: formData.description,
        backgroundImage: formData.backgroundImage,
        ctaPrimary: formData.ctaPrimary,
        ctaSecondary: formData.ctaSecondary,
        socialProofText: formData.socialProofText,
        isActive: formData.isActive
      };
    }

    onSubmit(payload);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] sm:w-full max-h-[90vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-4 py-3 sm:px-6 sm:pb-2">
          <DialogTitle className="text-base sm:text-xl font-bold">Edit Hero Section</DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 sm:px-6">
          <HeroForm formData={formData} setFormData={setFormData} isEditing={true} />
        </div>

        <DialogFooter className="px-4 py-3 sm:p-6 sm:pt-2 border-t bg-muted/20">
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 w-full">
            <Button variant="ghost" onClick={onClose} className="w-full sm:w-auto">Cancel</Button>
            <Button onClick={handleSubmit} className="w-full sm:w-auto sm:px-8">Save Changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}