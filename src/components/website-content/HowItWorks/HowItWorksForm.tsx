import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function HowItWorksForm({ formData, setFormData }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Step Number</Label>
        <Input
          type="number"
          value={formData.stepNumber}
          onChange={(e) => setFormData({ ...formData, stepNumber: Number(e.target.value) })}
        />
      </div>

      <div>
        <Label>Title</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          rows={2}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <Label>Icon</Label>
        <Input
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
        />
      </div>
    </div>
  );
}
