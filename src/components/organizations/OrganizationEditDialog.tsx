import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrganizationForm, OrganizationFormData } from "./OrganizationForm";
import { toast } from "sonner";
import type { Organization } from "@/ApiService/apiOrganizations";

interface OrganizationEditDialogProps {
  organization: Organization | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function OrganizationEditDialog({
  organization,
  open,
  onOpenChange,
  onSuccess,
}: OrganizationEditDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: OrganizationFormData) => {
    if (!organization) return;

    try {
      setLoading(true);
      // API call will be handled by parent component
      console.log("Update organization:", organization._id, data);
      toast.success("Organization updated successfully");
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast.error("Failed to update organization");
    } finally {
      setLoading(false);
    }
  };

  // Transform organization data to form data
  const getFormData = () => {
    if (!organization) return undefined;

    return {
      email: organization.email || "",
      firstName: organization.firstName || "",
      lastName: organization.lastName || "",
      businessName: organization.businessName || "",
      practiceName: organization.practiceName || "",
      phone: organization.phone || "",
      address: organization.address || "",
      planName: organization.planName || "starter",
      status: organization.status || "active",
      sendWelcomeEmail: false, // Don't send welcome email on edit
      customMessage: "",
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Organization</DialogTitle>
          <DialogDescription>
            Update organization details and settings.
          </DialogDescription>
        </DialogHeader>
        {organization && (
          <OrganizationForm
            initialData={getFormData()}
            onSubmit={handleSubmit}
            loading={loading}
            mode="edit"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}