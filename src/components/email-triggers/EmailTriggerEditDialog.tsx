import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import EmailTriggerForm from "./EmailTriggerForm";
import { updateEmailTrigger } from "@/ApiService";

const EmailTriggerEditDialog = ({ open, onClose, data, onSuccess }) => {
  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm(data);
  }, [data]);

  const handleUpdate = async () => {
    await updateEmailTrigger(data._id, form);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Email Trigger</DialogTitle>
        </DialogHeader>

        <EmailTriggerForm form={form} setForm={setForm} />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>
            Update Trigger
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailTriggerEditDialog;