import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, Trash2, Building2 } from "lucide-react";
import { toast } from "sonner";
import type { Organization } from "@/types/organizations";

interface OrganizationDeleteDialogProps {
  organization: Organization | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => Promise<void>; // Changed from onSuccess to onDelete
}

export function OrganizationDeleteDialog({
  organization,
  open,
  onOpenChange,
  onDelete, // Changed prop name
}: OrganizationDeleteDialogProps) {
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleDelete = async () => {
    if (!organization) return;

    try {
      setLoading(true);
      // Now call the onDelete function which should contain the API call
      await onDelete();
      toast.success("Organization deleted successfully");
      onOpenChange(false);
      setConfirmText(""); // Reset confirmation text
    } catch (error: any) {
      toast.error(error.message || "Failed to delete organization");
    } finally {
      setLoading(false);
    }
  };

  const isConfirmed = confirmText === organization?.businessName;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Delete Organization
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {organization?.businessName}
                </p>
                <p className="text-sm text-muted-foreground">
                  ID: {organization?._id.slice(-8)}
                </p>
              </div>
            </div>

            <div className="text-sm space-y-2">
              <p className="font-medium text-red-600 dark:text-red-400">
                This action cannot be undone. This will permanently delete:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>All user accounts in this organization</li>
                <li>All client data and records</li>
                <li>Billing and subscription information</li>
                <li>Activity logs and audit trails</li>
                <li>Database instance ({organization?.dbName})</li>
              </ul>
            </div>

            <div className="pt-4 space-y-2">
              <p className="text-sm font-medium">
                Type <span className="font-mono text-red-600">"{organization?.businessName}"</span> to confirm
              </p>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Enter organization name"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={() => {
              setConfirmText("");
              onOpenChange(false);
            }}
            disabled={loading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={!isConfirmed || loading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Organization
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}