import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X, Tag, DollarSign, Star, Hash, Search, Plus } from "lucide-react";
import FeatureAddDialog from "../features/FeatureAddDialog";
import { getFeatures } from "@/ApiService/feature.service";

export default function PricingForm({ defaultValue = {}, onSubmit, onCancel, loading = false }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    period: "month",
    description: "",
    features: [],
    highlighted: false,
    order: 1,
    recommendedFor: "",
    isActive: true,
  });

  const [featureList, setFeatureList] = useState([]);
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [addFeatureOpen, setAddFeatureOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Load All Features
  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    const res = await getFeatures();
    const list = res?.data || [];
    setFeatureList(list);
    setFilteredFeatures(list);
  };

  // Map features when editing
  useEffect(() => {
    if (!defaultValue?.features) return;

    const mapped = defaultValue.features.map((f) => {
      const match = featureList.find((x) => x.name === f.name);

      return {
        featureId: match?._id || f.featureId || null, // ✅ fallback
        name: f.name,
        value: f.value,
      };
    });

    setForm((prev) => ({ ...prev, ...defaultValue, features: mapped }));
  }, [defaultValue, featureList]);

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleAddFeature = (feature) => {
    if (form.features.some((f) => f.featureId === feature._id)) return;

    setForm((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        {
          featureId: feature._id,
          name: feature.name,
          value: "",
          isValid: true,
        },
      ],
    }));
  };

  const removeFeature = (i) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== i),
    }));
  };

  const handleFeatureValueChange = (i, v) => {
    const updated = [...form.features];
    updated[i].value = v;
    setForm((prev) => ({ ...prev, features: updated }));
  };

  const handleSubmit = () => {
    if (loading) return;
    const validFeatures = form.features.map((f) => ({
      featureId: f.featureId,
      name: f.name,
      value: f.value,
    }));


    const payload = {
      name: form.name,
      price: Number(form.price),
      period: form.period,
      description: form.description,
      highlighted: form.highlighted,
      order: Number(form.order),
      recommendedFor: form.recommendedFor,
      isActive: form.isActive,
      features: validFeatures,
    };

    console.log("FINAL PAYLOAD:", payload);
    onSubmit(payload);
  };

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Tag className="h-4 w-4" /> Plan Information
            </h3>

            <Label>Plan Name *</Label>
            <Input value={form.name} onChange={(e) => updateField("name", e.target.value)} />

            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} />

            <Label>Recommended For</Label>
            <Input
              value={form.recommendedFor}
              onChange={(e) => updateField("recommendedFor", e.target.value)}
            />
          </CardContent>
        </Card>

        {/* RIGHT */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Pricing & Settings
            </h3>

            <Label>Price *</Label>
            <Input type="number" value={form.price} onChange={(e) => updateField("price", e.target.value)} />

            <Label>Billing Period *</Label>
            <Select value={form.period} onValueChange={(v) => updateField("period", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="year">Yearly</SelectItem>
                <SelectItem value="quarter">Quarterly</SelectItem>
              </SelectContent>
            </Select>

            <Label>Order *</Label>
            <Input type="number" value={form.order} onChange={(e) => updateField("order", e.target.value)} />

            <div className="flex items-center justify-between border p-3 rounded-md">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" /> Featured
              </div>
              <Switch checked={form.highlighted} onCheckedChange={(v) => updateField("highlighted", v)} />
            </div>

            <div className="flex items-center justify-between border p-3 rounded-md">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-green-500" /> Active
              </div>
              <Switch checked={form.isActive} onCheckedChange={(v) => updateField("isActive", v)} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FEATURES */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Plan Features</h3>
            <Button size="sm" onClick={() => setAddFeatureOpen(true)}>
              <Plus className="h-4 w-4 mr-1" /> Add New Feature
            </Button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 my-3">
            <Search className="h-4 w-4" />
            <Input
              placeholder="Search feature"
              value={searchTerm}
              onChange={(e) => {
                const text = e.target.value.toLowerCase();
                setSearchTerm(text);
                setFilteredFeatures(featureList.filter((f) => f.name.toLowerCase().includes(text)));
              }}
            />
          </div>

          {/* Available Feature Buttons */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border p-2 rounded-md max-h-40 overflow-y-auto">
            {filteredFeatures.map((f) => (
              <Button
                key={f._id}
                size="sm"
                variant="outline"
                disabled={form.features.some((x) => x.featureId === f._id)}
                onClick={() => handleAddFeature(f)}
              >
                {f.name}
              </Button>
            ))}
          </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border p-2 rounded-md max-h-40 overflow-y-auto">
            {filteredFeatures.length > 0 ? (
              filteredFeatures.map((f) => (
                <Button
                  key={f._id}
                  size="sm"
                  variant="outline"
                  disabled={form.features.some((x) => x.featureId === f._id)}
                  onClick={() => handleAddFeature(f)}
                >
                  {f.name}
                </Button>
              ))
            ) : (
              <div className="col-span-full text-center text-sm text-muted-foreground py-4">
                No feature available
              </div>
            )}
          </div>


          {/* Selected Features */}
          {form.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 border p-2 rounded-md mt-3">
              <Badge variant={f.featureId ? "secondary" : "destructive"}>{f.name}</Badge>

              <Input
                value={f.value}
                placeholder="Feature value"
                onChange={(e) => handleFeatureValueChange(i, e.target.value)}
              />

              <Button variant="ghost" size="sm" onClick={() => removeFeature(i)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bottom Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Plan"}
        </Button>

      </div>

      {/* ADD FEATURE DIALOG */}
      <FeatureAddDialog
        open={addFeatureOpen}
        onClose={() => setAddFeatureOpen(false)}
        onSuccess={async () => {
          await fetchFeatures(); // refresh feature list
          setAddFeatureOpen(false);
        }}
      />
    </div>
  );
}
