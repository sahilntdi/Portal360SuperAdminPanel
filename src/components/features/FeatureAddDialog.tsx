import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FeatureForm } from "./FeatureForm";
import { createFeature } from "@/ApiService/feature.service";
import { useToast } from "@/hooks/use-toast";

export function FeatureAddDialog({ open, onClose, onSuccess }) {
  const { toast } = useToast();
  const [payload, setPayload] = useState({});

  const handleSave = async () => {
    try {
      await createFeature(payload);
      toast({ title: "Feature Added", description: "New feature created successfully." });
      onSuccess();
      onClose();
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err?.message || "Failed" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Feature</DialogTitle>
        </DialogHeader>

        <FeatureForm onChange={(data) => setPayload(data)} />

        <Button className="w-full mt-4" onClick={handleSave}>
          Save Feature
        </Button>
      </DialogContent>
    </Dialog>
  );
}
