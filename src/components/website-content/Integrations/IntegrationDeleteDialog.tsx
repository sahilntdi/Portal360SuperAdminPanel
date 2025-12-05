// IntegrationDeleteDialog.jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function IntegrationDeleteDialog({ open, onClose, item, onSubmit }) {
  if (!item) return null;

  const handleDelete = () => {
    onSubmit(item);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Integration</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              {item.name?.charAt(0) || "I"}
            </div>
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                Order: #{item.order}
              </p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this integration? This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Delete Integration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}