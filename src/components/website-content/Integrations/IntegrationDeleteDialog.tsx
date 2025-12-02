import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function IntegrationDeleteDialog({ open, onClose, item, onSubmit }) {
  if (!item) return null;

  const handleDelete = () => {
    // Pass the full item object, not just item.id
    onSubmit(item);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Integration</DialogTitle>
        </DialogHeader>

        <p>Are you sure you want to delete <b>{item.name}</b>?</p>
        <p className="text-sm text-muted-foreground mt-2">
          Order: #{item.order}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}