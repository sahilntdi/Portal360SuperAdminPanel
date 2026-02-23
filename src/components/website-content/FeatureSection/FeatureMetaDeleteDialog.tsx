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

export function FeatureMetaDeleteDialog({ open, item, onClose, onSubmit }) {
    const handleDelete = async () => {
        try {
            if (!item) {
                toast.error("No item selected for deletion");
                return;
            }
            await onSubmit(item);
            onClose();
        } catch (error) {
            toast.error("Failed to delete meta");
            console.error(error);
        }
    };

    if (!item) return null;

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Feature Meta</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the meta "{item.heading}"? This action cannot be undone.
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
