import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SupportFaqDialog({
  open,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "support",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit FAQ" : "Add FAQ"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Question</Label>
            <Input
              name="question"
              value={form.question}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Answer</Label>
            <Input
              name="answer"
              value={form.answer}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Category</Label>
            <Input
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
