import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function FeatureForm({ defaultValues, onChange }) {
  const [form, setForm] = useState({
    name: defaultValues?.name || "",
    isActive: defaultValues?.isActive ?? true,
  });

  const update = (key, value) => {
    const newData = { ...form, [key]: value };
    setForm(newData);
    onChange(newData);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Feature Name</Label>
        <Input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Enter feature name"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label>Active</Label>
        <Switch
          checked={form.isActive}
          onCheckedChange={(v) => update("isActive", v)}
        />
      </div>
    </div>
  );
}
