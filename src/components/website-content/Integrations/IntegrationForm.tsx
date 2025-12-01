import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function IntegrationForm({ formData, setFormData }) {
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
        <Label>Order</Label>
        <Input
          type="number"
          value={formData.order}
          onChange={(e) => setFormData({ ...formData, order: e.target.value })}
        />
      </div>

      <div>
        <Label>Image (optional)</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />
      </div>

    </div>
  );
}
