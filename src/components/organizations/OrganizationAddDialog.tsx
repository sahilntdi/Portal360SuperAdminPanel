"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { OrganizationDialog } from "./OrganizationDialog";
import { useOrganizations } from "@/ApiService/apiOrganizations";
import { toast } from "sonner";
import type { CreateOrganizationData } from "@/types/organizations";

interface OrganizationAddDialogProps {
  onSuccess: () => void;
}

export function OrganizationAddDialog({ onSuccess }: OrganizationAddDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createOrganization } = useOrganizations();

  const handleSubmit = async (data: CreateOrganizationData) => {
    try {
      setLoading(true);
      await createOrganization(data);
      toast.success("Organization created successfully!");
      setOpen(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Failed to create organization");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrganizationDialog
      open={open}
      onOpenChange={setOpen}
      onSubmit={handleSubmit}
      loading={loading}
      mode="add"
    >
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Organization
      </Button>
    </OrganizationDialog>
  );
}