import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";

export function FAQForm({ formData, setFormData, error, setError }) {
  const handleChange = (field, value) => {
    // Clear error when user starts typing in order field
    if (field === "order" && setError) {
      setError("");
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Question *</Label>
        <Input
          value={formData.question || ""}
          onChange={(e) => handleChange("question", e.target.value)}
          required
          placeholder="Enter the question"
        />
      </div>

      <div>
        <Label>Answer *</Label>
        <Textarea
          rows={3}
          value={formData.answer || ""}
          onChange={(e) => handleChange("answer", e.target.value)}
          required
          placeholder="Enter the answer"
        />
      </div>

      <div>
        <Label>Category</Label>
        <Input
          value={formData.category || "general"}
          onChange={(e) => handleChange("category", e.target.value)}
          placeholder="general, technical, billing, etc."
        />
      </div>

      <div>
        <Label>Order *</Label>
        <Input
          type="number"
          min="1"
          value={formData.order || 1}
          onChange={(e) => handleChange("order", Number(e.target.value))}
          className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {error && (
          <div className="flex items-center gap-1 mt-1 text-sm text-red-500">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Hidden field for _id */}
      {formData._id && (
        <input type="hidden" value={formData._id} />
      )}
    </div>
  );
}