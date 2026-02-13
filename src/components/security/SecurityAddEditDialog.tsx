import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createSecurityFeature, updateSecurityFeature } from "@/ApiService";
import { SecurityFeature } from "./types";
import { Shield, Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editItem?: SecurityFeature | null;
};

export default function SecurityAddEditDialog({
  open,
  onClose,
  onSuccess,
  editItem,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setDescription(editItem.description);
      setIsActive(editItem.isActive);
    } else {
      setName("");
      setDescription("");
      setIsActive(true);
    }
  }, [editItem]);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    
    setLoading(true);
    const payload = { 
      name: name.trim(), 
      description: description.trim(), 
      isActive 
    };

    try {
      if (editItem) {
        await updateSecurityFeature(editItem._id, payload);
      } else {
        await createSecurityFeature(payload);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save security feature:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = name.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <DialogTitle>
              {editItem ? "Edit Security Feature" : "Add Security Feature"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {editItem 
              ? "Update security feature details" 
              : "Add a new security feature to the system"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Feature Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Two-Factor Authentication"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the security feature..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="status">Status</Label>
              <p className="text-sm text-muted-foreground">
                {isActive ? "Feature will be active" : "Feature will be inactive"}
              </p>
            </div>
            <Switch
              id="status"
              checked={isActive}
              onCheckedChange={setIsActive}
              disabled={loading}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading || !isFormValid}
              className="min-w-24"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : editItem ? "Update" : "Add Feature"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}