import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PricingForm from "./PricingForm";
import { updatePricing } from "@/ApiService/PricingServices";
import { useToast } from "@/components/ui/use-toast";

interface PricingEditDialogProps {
  open: boolean;
  item: any;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function PricingEditDialog({ open, item, onClose, onSuccess }: PricingEditDialogProps) {
  const { toast } = useToast();

  const handleSubmit = async (data: any) => {
    try {
      await updatePricing(item._id, data);
      toast({
        title: "Success",
        description: "Pricing plan updated successfully",
      });
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update pricing plan",
        variant: "destructive",
      });
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Pricing Plan: {item.name}</DialogTitle>
        </DialogHeader>
        <PricingForm
          defaultValue={item}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}