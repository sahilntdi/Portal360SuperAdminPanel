import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PricingForm from "./PricingForm";
import { createPricing } from "@/ApiService/PricingServices";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface PricingAddDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function PricingAddDialog({ open, onClose, onSuccess }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false); // ✅ add

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await createPricing(data);
      toast({
        title: "Success",
        description: "Pricing plan created successfully",
      });
      onClose();
      onSuccess?.();
    } catch {
      toast({
        title: "Error",
        description: "Failed to create pricing plan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Pricing Plan</DialogTitle>
        </DialogHeader>

        <PricingForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={loading}   
        />
      </DialogContent>
    </Dialog>
  );
}
