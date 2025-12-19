import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EmailTriggerForm from "./EmailTriggerForm";
import { createEmailTrigger } from "@/ApiService";

const EmailTriggerAddDialog = ({ open, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    triggerName: "",
    event: "",
    timing: "",
    message: "",
    status: "active",
  });

  const handleSave = async () => {
    await createEmailTrigger(form);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Email Trigger</DialogTitle>
        </DialogHeader>

        <EmailTriggerForm form={form} setForm={setForm} />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Trigger
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailTriggerAddDialog;