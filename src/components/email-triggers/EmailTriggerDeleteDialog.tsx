import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteEmailTrigger } from "@/ApiService";

const EmailTriggerDeleteDialog = ({ open, onClose, id, onSuccess }) => {
  const handleDelete = async () => {
    await deleteEmailTrigger(id);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Email Trigger</DialogTitle>
        </DialogHeader>

        <p>Are you sure you want to delete this trigger?</p>

        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EmailTriggerDeleteDialog;
