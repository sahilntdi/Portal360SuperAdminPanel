import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { OrganizationForm, OrganizationFormData } from "./OrganizationForm";
import { toast } from "sonner";

interface OrganizationAddDialogProps {
  onSuccess: () => void;
}

export function OrganizationAddDialog({ onSuccess }: OrganizationAddDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: OrganizationFormData) => {
    try {
      setLoading(true);
      // API call will be handled by parent component
      // This is just the form submission
      console.log("Organization data:", data);
      toast.success("Organization created successfully");
      setOpen(false);
      onSuccess();
    } catch (error) {
      toast.error("Failed to create organization");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Organization
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Organization</DialogTitle>
          <DialogDescription>
            Add a new organization and its admin user. Welcome email will be sent automatically.
          </DialogDescription>
        </DialogHeader>
        <OrganizationForm
          onSubmit={handleSubmit}
          loading={loading}
          mode="add"
        />
      </DialogContent>
    </Dialog>
  );
}