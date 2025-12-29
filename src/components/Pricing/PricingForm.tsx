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
import { X, Tag, DollarSign, Star, Hash, Search, Plus, AlertCircle } from "lucide-react";
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
    order: "1",
    recommendedFor: "",
    isActive: true,
  });

  const [featureList, setFeatureList] = useState([]);
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [addFeatureOpen, setAddFeatureOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});

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
        featureId: match?._id || f.featureId || null,
        name: f.name,
        value: f.value,
      };
    });

    setForm((prev) => ({ ...prev, ...defaultValue, features: mapped }));
  }, [defaultValue, featureList]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!form.name || form.name.trim() === "") {
      newErrors.name = "Plan name is required";
    } else if (form.name.length < 2) {
      newErrors.name = "Plan name must be at least 2 characters";
    }
    
    // Price validation
    if (!form.price || form.price.trim() === "") {
      newErrors.price = "Price is required";
    } else if (form.price.includes("-") || form.price.includes("–") || form.price.toLowerCase().includes("to")) {
      newErrors.price = "Please enter a single price value";
    } else if (!/^\d+$/.test(form.price)) {
      newErrors.price = "Price must be a valid number";
    } else {
      const numPrice = Number(form.price);
      if (numPrice < 0) {
        newErrors.price = "Price cannot be negative";
      }
    }
    
    // Period validation
    if (!form.period) {
      newErrors.period = "Billing period is required";
    } else if (!['month', 'year', 'quarter'].includes(form.period)) {
      newErrors.period = "Invalid billing period";
    }
    
    // Description validation
    if (!form.description || form.description.trim() === "") {
      newErrors.description = "Description is required";
    } else if (form.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    
    // Features validation
    if (!form.features || form.features.length === 0) {
      newErrors.features = "At least one feature is required";
    }
    
    // Order validation
    if (!form.order || form.order.trim() === "") {
      newErrors.order = "Order is required";
    } else if (!/^\d+$/.test(form.order)) {
      newErrors.order = "Order must be a valid number";
    } else {
      const numOrder = Number(form.order);
      if (numOrder < 1) {
        newErrors.order = "Order must be at least 1";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
        },
      ],
    }));
    
    // Clear feature error when a feature is added
    if (errors.features) {
      setErrors(prev => ({ ...prev, features: "" }));
    }
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
    
    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const element = document.querySelector(`[data-field="${firstErrorKey}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    const validFeatures = form.features.map((f) => ({
      featureId: f.featureId,
      name: f.name,
      value: f.value,
    }));

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      period: form.period,
      description: form.description.trim(),
      highlighted: form.highlighted,
      order: Number(form.order),
      recommendedFor: form.recommendedFor.trim(),
      isActive: form.isActive,
      features: validFeatures,
    };

    onSubmit(payload);
  };

  // Filter features based on search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFeatures(featureList);
    } else {
      const filtered = featureList.filter((f) => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFeatures(filtered);
    }
  }, [searchTerm, featureList]);

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

            <div data-field="name">
              <Label>Plan Name *</Label>
              <Input 
                value={form.name} 
                onChange={(e) => updateField("name", e.target.value)}
                className={errors.name ? "border-red-500" : ""}
                placeholder="e.g., Professional Plan"
              />
              {errors.name && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.name}
                </p>
              )}
            </div>

            <div data-field="description">
              <Label>Description *</Label>
              <Textarea 
                value={form.description} 
                onChange={(e) => updateField("description", e.target.value)}
                className={errors.description ? "border-red-500" : ""}
                placeholder="Describe what this plan includes"
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.description}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Minimum 10 characters
              </p>
            </div>

            <div>
              <Label>Recommended For</Label>
              <Input
                value={form.recommendedFor}
                onChange={(e) => updateField("recommendedFor", e.target.value)}
                placeholder="e.g., Small businesses, Startups"
              />
            </div>
          </CardContent>
        </Card>

        {/* RIGHT */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Pricing & Settings
            </h3>

            <div data-field="price">
              <Label>Price *</Label>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Enter price"
                value={form.price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.includes("-") || value.includes("–") || value.toLowerCase().includes("to")) {
                    return;
                  }
                  if (!/^\d*$/.test(value)) {
                    return;
                  }
                  updateField("price", value);
                }}
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.price}
                </p>
              )}
            </div>

            <div data-field="period">
              <Label>Billing Period *</Label>
              <Select 
                value={form.period} 
                onValueChange={(v) => updateField("period", v)}
              >
                <SelectTrigger className={errors.period ? "border-red-500" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="year">Yearly</SelectItem>
                  <SelectItem value="quarter">Quarterly</SelectItem>
                </SelectContent>
              </Select>
              {errors.period && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.period}
                </p>
              )}
            </div>

            <div data-field="order">
              <Label>Order *</Label>
              <Input 
                type="number" 
                value={form.order} 
                onChange={(e) => updateField("order", e.target.value)}
                className={errors.order ? "border-red-500" : ""}
                min="1"
              />
              {errors.order && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.order}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Lower numbers appear first
              </p>
            </div>

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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Plan Features *</h3>
              <p className="text-sm text-gray-500">
                Add at least one feature to this plan
              </p>
            </div>
            <Button size="sm" onClick={() => setAddFeatureOpen(true)}>
              <Plus className="h-4 w-4 mr-1" /> Add New Feature
            </Button>
          </div>

          {/* Feature Count & Validation */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge>
                {form.features.length} feature{form.features.length !== 1 ? 's' : ''}
              </Badge>
              {errors.features && (
                <span className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.features}
                </span>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 my-3">
            <Search className="h-4 w-4" />
            <Input
              placeholder="Search feature"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Available Feature Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border p-2 rounded-md max-h-40 overflow-y-auto mb-4">
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
              <div className="col-span-full text-center text-sm text-gray-500 py-4">
                No feature available
              </div>
            )}
          </div>

          {/* Selected Features */}
          <div data-field="features">
            {form.features.length === 0 ? (
              <div className={`border-2 ${errors.features ? "border-red-500" : "border-dashed"} border-gray-300 rounded-lg p-8 text-center`}>
                <Tag className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <h4 className="font-medium">No features added yet</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Click "Add New Feature" or select from the list above
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {form.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 border p-3 rounded-md">
                    <Badge variant={f.featureId ? "secondary" : "destructive"}>
                      {f.name}
                    </Badge>
                    <Input
                      value={f.value}
                      placeholder="Feature value"
                      onChange={(e) => handleFeatureValueChange(i, e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFeature(i)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Error Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-600 font-medium mb-2">
            <AlertCircle className="h-4 w-4" />
            Please fix the following errors:
          </div>
          <ul className="text-sm text-red-600 space-y-1">
            {Object.entries(errors).map(([field, message]) => (
              message && (
                <li key={field} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span className="font-medium">{field}:</span> {message}
                </li>
              )
            ))}
          </ul>
        </div>
      )}

      {/* Bottom Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save Plan"}
        </Button>
      </div>

      {/* ADD FEATURE DIALOG */}
      <FeatureAddDialog
        open={addFeatureOpen}
        onClose={() => setAddFeatureOpen(false)}
        onSuccess={async () => {
          await fetchFeatures();
          setAddFeatureOpen(false);
        }}
      />
    </div>
  );
}