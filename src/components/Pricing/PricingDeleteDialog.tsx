import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deletePricing } from "@/ApiService/PricingServices";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle } from "lucide-react";

interface PricingDeleteDialogProps {
  open: boolean;
  item: any;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function PricingDeleteDialog({ open, item, onClose, onSuccess }: PricingDeleteDialogProps) {
  const { toast } = useToast();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!item?._id) return;
    
    setDeleting(true);
    try {
      await deletePricing(item._id);
      toast({
        title: "Success",
        description: "Pricing plan deleted successfully",
      });
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete pricing plan",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <DialogTitle className="text-center">Delete Pricing Plan</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete this plan? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        {item && (
          <div className="text-center p-4 bg-muted rounded-lg">
            <h4 className="font-semibold">{item.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              ${item.price} / {item.period}
            </p>
            {item.description && (
              <p className="text-sm text-muted-foreground mt-2">
                "{item.description}"
              </p>
            )}
          </div>
        )}
        
        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="flex-1"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete Plan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}