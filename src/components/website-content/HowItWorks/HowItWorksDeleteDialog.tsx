// Example for HowItWorksDeleteDialog.jsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export function HowItWorksDeleteDialog({ open, item, onClose, onSubmit }) {
  const handleDelete = async () => {
    try {
      if (!item) {
        toast.error("No item selected for deletion");
        return;
      }
      
      // Pass the entire item to onSubmit
      await onSubmit(item);
      onClose();
    } catch (error) {
      toast.error("Failed to delete step");
      console.error(error);
    }
  };

  if (!item) return null;

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Step</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the step "{item.title}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}