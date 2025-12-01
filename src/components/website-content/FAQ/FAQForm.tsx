import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function FAQForm({ formData, setFormData }) {
  return (
    <div className="space-y-4">

      <div>
        <Label>Question</Label>
        <Input
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
        />
      </div>

      <div>
        <Label>Answer</Label>
        <Textarea
          rows={3}
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
        />
      </div>

      <div>
        <Label>Category</Label>
        <Input
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
      </div>

      <div>
        <Label>Order</Label>
        <Input
          type="number"
          value={formData.order}
          onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
        />
      </div>

    </div>
  );
}
