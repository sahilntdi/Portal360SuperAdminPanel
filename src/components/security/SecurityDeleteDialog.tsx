import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteSecurityFeature } from "@/ApiService";
import { SecurityFeature } from "./types";
import { AlertCircle, Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  item: SecurityFeature | null;
};

export default function SecurityDeleteDialog({
  open,
  onClose,
  onSuccess,
  item,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!item) return;
    
    setLoading(true);
    try {
      await deleteSecurityFeature(item._id);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to delete security feature:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <DialogTitle className="text-red-600">Delete Security Feature</DialogTitle>
          </div>
          <DialogDescription>
            This action cannot be undone. All associated data will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <p className="font-medium text-red-800">"{item.name}"</p>
            <p className="text-sm text-red-600 mt-1">{item.description}</p>
            <div className="flex items-center gap-2 mt-3">
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                item.isActive 
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-gray-100 text-gray-800 border border-gray-200"
              }`}>
                {item.isActive ? "Active" : "Inactive"}
              </div>
              <span className="text-xs text-red-600">
                Created: {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
              className="min-w-24"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}