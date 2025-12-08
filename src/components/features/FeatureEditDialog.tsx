import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FeatureForm } from "./FeatureForm";
import { updateFeature } from "@/ApiService/feature.service";
import { useToast } from "@/hooks/use-toast";

export function FeatureEditDialog({ open, onClose, feature, onSuccess }) {
  const { toast } = useToast();
  const [payload, setPayload] = useState(feature);

  const handleUpdate = async () => {
    try {
      await updateFeature(feature._id, payload);
      toast({ title: "Feature Updated" });
      onSuccess();
      onClose();
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err?.message });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Feature</DialogTitle>
        </DialogHeader>

        <FeatureForm
          defaultValues={feature}
          onChange={(data) => setPayload(data)}
        />

        <Button className="w-full mt-4" onClick={handleUpdate}>
          Update Feature
        </Button>
      </DialogContent>
    </Dialog>
  );
}
