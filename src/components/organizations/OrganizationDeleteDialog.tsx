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
import { Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import type { Organization } from "@/ApiService/apiOrganizations";

interface OrganizationDeleteDialogProps {
  organization: Organization | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function OrganizationDeleteDialog({
  organization,
  open,
  onOpenChange,
  onSuccess,
}: OrganizationDeleteDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!organization) return;

    try {
      setLoading(true);
      // API call will be handled by parent component
      console.log("Delete organization:", organization._id);
      toast.success("Organization deleted successfully");
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast.error("Failed to delete organization");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Delete Organization
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p className="font-semibold text-foreground">
              {organization?.businessName}
            </p>
            <p>
              This action cannot be undone. This will permanently delete the organization
              and all associated data including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>All user accounts in this organization</li>
              <li>All client data and records</li>
              <li>Billing and subscription information</li>
              <li>Activity logs and audit trails</li>
            </ul>
            <p className="pt-2 text-red-500 font-medium">
              Are you absolutely sure you want to proceed?
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Organization
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}