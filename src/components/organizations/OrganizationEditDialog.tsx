"use client";

import React, { useState } from "react";
import { OrganizationDialog } from "./OrganizationDialog";
import { useOrganizations } from "@/ApiService/apiOrganizations";
import { toast } from "sonner";
import type { Organization, UpdateOrganizationData } from "@/types/organizations";

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
  const { updateOrganization } = useOrganizations();

  const handleSubmit = async (data: UpdateOrganizationData) => {
    if (!organization) return;
    
    try {
      setLoading(true);
      await updateOrganization(organization._id, data);
      toast.success("Organization updated successfully!");
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Failed to update organization");
    } finally {
      setLoading(false);
    }
  };

  if (!organization) return null;

  return (
    <OrganizationDialog
      organization={organization}
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
      loading={loading}
      mode="edit"
    />
  );
}