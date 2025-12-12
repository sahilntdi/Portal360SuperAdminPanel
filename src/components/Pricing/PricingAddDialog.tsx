import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PricingForm from "./PricingForm";
import { createPricing } from "@/ApiService/PricingServices";
import { useToast } from "@/components/ui/use-toast";

interface PricingAddDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function PricingAddDialog({ open, onClose, onSuccess }: PricingAddDialogProps) {
  const { toast } = useToast();

  const handleSubmit = async (data: any) => {
    try {
      await createPricing(data);
      toast({
        title: "Success",
        description: "Pricing plan created successfully",
      });
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create pricing plan",
        variant: "destructive",
      });
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
        />
      </DialogContent>
    </Dialog>
  );
}