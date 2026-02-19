import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FAQForm } from "./FAQForm";
import { toast } from "sonner";

export function FAQAddDialog({ open, onClose, onSubmit, items }) {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general",
    order: 1,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData({
        question: "",
        answer: "",
        category: "general",
        order: 1,
      });
      setError("");
      setIsSubmitting(false);
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!formData.question || !formData.answer) {
      toast.error("Question and Answer are required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onSubmit(formData);
      // Only close if successful
      onClose();
    } catch (err) {
      console.log("Error in AddDialog:", err);
      
      // Extract error message from the error object
      const errorMessage = err.response?.data?.message || err.message || "Failed to add FAQ";
      
      if (errorMessage.includes("Order number already exists")) {
        setError("This order number is already taken");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add FAQ</DialogTitle>
        </DialogHeader>

        <FAQForm 
          formData={formData} 
          setFormData={setFormData}
          error={error}
          setError={setError}
        />
        <Button 
          className="mt-4 w-full" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add FAQ"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}