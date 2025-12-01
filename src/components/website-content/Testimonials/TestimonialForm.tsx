import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TestimonialForm({ formData, setFormData }) {
  return (
    <div className="space-y-4">
      
      <div>
        <Label>Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <Label>Role</Label>
        <Input
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        />
      </div>

      <div>
        <Label>Message</Label>
        <Textarea
          rows={3}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
      </div>

      <div>
        <Label>Rating (1–5)</Label>
        <Input
          type="number"
          min={1}
          max={5}
          value={formData.rating}
          onChange={(e) =>
            setFormData({ ...formData, rating: Number(e.target.value) })
          }
        />
      </div>

      <div>
        <Label>Order</Label>
        <Input
          type="number"
          value={formData.order}
          onChange={(e) =>
            setFormData({ ...formData, order: Number(e.target.value) })
          }
        />
      </div>
    </div>
  );
}
