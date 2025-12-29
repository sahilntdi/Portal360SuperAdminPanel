import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteFeature } from "@/ApiService/feature.service";
import { useToast } from "@/hooks/use-toast";

export function FeatureDeleteDialog({ open, onClose, featureId, onSuccess }) {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteFeature(featureId);
      toast({ title: "Feature Deleted" });
      onSuccess();
      onClose();
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err?.message });
      console.log("Error deleting feature:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Feature?</DialogTitle>
        </DialogHeader>

        <p className="text-muted-foreground">
          Are you sure you want to delete this feature?
        </p>

        <Button variant="destructive" className="w-full mt-4" onClick={handleDelete}>
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}
