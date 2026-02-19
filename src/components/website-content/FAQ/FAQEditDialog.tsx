import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FAQForm } from "./FAQForm";
import { toast } from "sonner";

export function FAQEditDialog({ open, onClose, item, onSubmit, items }) {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general",
    order: 1,
    _id: null,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        question: item.question || "",
        answer: item.answer || "",
        category: item.category || "general",
        order: item.order || 1,
        _id: item._id,
      });
      setError("");
      setIsSubmitting(false);
    }
  }, [item]);

  const handleSave = async () => {
    if (!formData._id) {
      toast.error("Invalid FAQ");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.log("Error in EditDialog:", err);
      
      // Extract error message from the error object
      const errorMessage = err.response?.data?.message || err.message || "Failed to update FAQ";
      
      if (errorMessage.includes("Order number already exists")) {
        setError("This order number is already taken");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit FAQ</DialogTitle>
        </DialogHeader>

        <FAQForm 
          formData={formData} 
          setFormData={setFormData}
          error={error}
          setError={setError}
        />
        <Button 
          className="mt-4 w-full" 
          onClick={handleSave}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}