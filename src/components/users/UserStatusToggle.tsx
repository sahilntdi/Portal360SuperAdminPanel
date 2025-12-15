import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import type { User } from "@/ApiService/apiUsers";

interface UserStatusToggleProps {
  user: User;
  onToggle: (id: string, status: boolean) => Promise<void>;
}

export function UserStatusToggle({ user, onToggle }: UserStatusToggleProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await onToggle(user._id, user.isActive);
      toast({
        title: "Success",
        description: `User ${user.isActive ? 'deactivated' : 'activated'} successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  return (
    <Switch
      checked={user.isActive}
      onCheckedChange={handleToggle}
      disabled={loading}
    />
  );
}