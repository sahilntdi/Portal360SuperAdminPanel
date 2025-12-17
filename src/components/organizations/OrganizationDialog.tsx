"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit2 } from "lucide-react";
import { OrganizationForm } from "./OrganizationForm";
import type { Organization, CreateOrganizationData, UpdateOrganizationData } from "@/types/organizations";

interface OrganizationDialogProps {
  organization?: Organization | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateOrganizationData | UpdateOrganizationData) => Promise<void>;
  loading?: boolean;
  mode: "add" | "edit";
  children?: React.ReactNode;
}

export function OrganizationDialog({
  organization,
  open,
  onOpenChange,
  onSubmit,
  loading = false,
  mode,
  children,
}: OrganizationDialogProps) {
  const isEditMode = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!isEditMode && children && (
        <DialogTrigger asChild>{children}</DialogTrigger>
      )}
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Organization" : "Create New Organization"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? "Update organization details and settings"
              : "Add a new organization to the platform"
            }
          </DialogDescription>
        </DialogHeader>

        <OrganizationForm
          initialData={organization}
          onSubmit={onSubmit}
          loading={loading}
          mode={mode}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}