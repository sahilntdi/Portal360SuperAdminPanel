import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Organization } from "@/ApiService/apiOrganizations";

interface OrganizationStatusToggleProps {
  organization: Organization;
  onToggle: (id: string, status: string) => Promise<void>;
}

export function OrganizationStatusToggle({ 
  organization, 
  onToggle 
}: OrganizationStatusToggleProps) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setLoading(true);
      const newStatus = organization.status === "active" ? "suspended" : "active";
      await onToggle(organization._id, newStatus);
      toast.success(`Organization ${newStatus === "active" ? "activated" : "suspended"}`);
    } catch (error) {
      toast.error("Failed to change status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Switch
          checked={organization.status === "active"}
          onCheckedChange={handleToggle}
          disabled={loading}
        />
      )}
    </div>
  );
}