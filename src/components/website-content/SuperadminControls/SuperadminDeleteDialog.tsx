import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function SuperadminDeleteDialog({ open, onClose, item, onSubmit }) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>Delete Control?</DialogTitle></DialogHeader>

        <p>Are you sure you want to delete <b>{item.title}</b>?</p>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={() => { onSubmit(item.id); onClose(); }}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
