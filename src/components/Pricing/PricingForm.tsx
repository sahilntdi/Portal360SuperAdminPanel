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

// Type Definitions
interface Feature {
  _id?: string;
  name: string;
  value: string;
}

interface PlanFeature {
  featureId: string | null;
  name: string;
  value: string;
}

interface PlanFormData {
  name: string;
  price: string;
  discountAmount: string;
  discountPeriod: string;
  period: "month" | "year" | "quarter";
  description: string;
  features: PlanFeature[];
  highlighted: boolean;
  order: string;
  trial_period_days: string;
  isActive: boolean;
}

interface ApiPlan {
  _id: string;
  name: string;
  price: number;
  discountAmount: string;
  discountPeriod: string;
  period: "month" | "year" | "quarter";
  description: string;
  features: Array<{
    name: string;
    value: string;
    featureId?: string;
  }>;
  highlighted: boolean;
  planId: string;
  stripePriceId: string;
  isActive: boolean;
  order: number;
  trial_period_days: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PricingFormProps {
  defaultValue?: Partial<ApiPlan>;
  onSubmit: (payload: {
    name: string;
    price: number;
    period: "month" | "year" | "quarter";
    description: string;
    highlighted: boolean;
    order: number;
    trial_period_days: number;
    isActive: boolean;
    features: Array<{
      featureId: string | null;
      name: string;
      value: string;
    }>;
  }) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function PricingForm({ defaultValue = {}, onSubmit, onCancel, loading = false }: PricingFormProps) {
  const [form, setForm] = useState<PlanFormData>({
    name: "",
    price: "",
    discountAmount: "",
    discountPeriod: "",
    period: "month",
    description: "",
    features: [],
    highlighted: false,
    order: "1",
    trial_period_days: "",
    isActive: true,
  });

  const [featureList, setFeatureList] = useState<Feature[]>([]);
  const [filteredFeatures, setFilteredFeatures] = useState<Feature[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    const mapped: PlanFeature[] = defaultValue.features.map((f) => {
      const match = featureList.find((x) => x.name === f.name);

      return {
        featureId: match?._id || f.featureId || null,
        name: f.name,
        value: f.value,
      };
    });

    const defaultValueWithTrialPeriod = {
      ...defaultValue,
      trial_period_days: defaultValue.trial_period_days?.toString() || "",
      price: defaultValue.price?.toString() || "",
      discountAmount: defaultValue.discountAmount?.toString() || "",
      discountPeriod: defaultValue.discountPeriod || "",
      order: defaultValue.order?.toString() || "1",
      features: mapped,
    };

    setForm((prev) => ({ ...prev, ...defaultValueWithTrialPeriod }));
  }, [defaultValue, featureList]);

  const updateField = (key: keyof PlanFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

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

    // Discount amount
    if (form.discountAmount) {
      if (!/^\d+$/.test(form.discountAmount)) {
        newErrors.discountAmount = "Discount must be a valid number";
      } else if (Number(form.discountAmount) >= Number(form.price)) {
        newErrors.discountAmount = "Discount cannot be greater than or equal to price";
      }
    }

    // Discount period
    if (form.discountAmount && !form.discountPeriod) {
      newErrors.discountPeriod = "Discount period is required";
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

    // Trial period validation
    if (form.trial_period_days && form.trial_period_days.trim() !== "") {
      if (!/^\d+$/.test(form.trial_period_days)) {
        newErrors.trial_period_days = "Trial period must be a valid number";
      } else {
        const numTrial = Number(form.trial_period_days);
        if (numTrial < 0) {
          newErrors.trial_period_days = "Trial period cannot be negative";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddFeature = (feature: Feature) => {
    if (form.features.some((f) => f.featureId === feature._id)) return;

    setForm((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        {
          featureId: feature._id || null,
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

  const removeFeature = (i: number) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== i),
    }));
  };

  const handleFeatureValueChange = (i: number, v: string) => {
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
      discountAmount: form.discountAmount
        ? Number(form.discountAmount)
        : 0,
      discountPeriod: form.discountPeriod || null,
      period: form.period,
      description: form.description.trim(),
      highlighted: form.highlighted,
      order: Number(form.order),
      trial_period_days: form.trial_period_days ? Number(form.trial_period_days) : 0,
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

            <div data-field="trial_period_days">
              <Label>Trial Period (Days)</Label>
              <Input
                type="number"
                min="0"
                value={form.trial_period_days}
                onChange={(e) => updateField("trial_period_days", e.target.value)}
                placeholder="e.g., 14 (for 14 days free trial)"
                className={errors.trial_period_days ? "border-red-500" : ""}
              />
              {errors.trial_period_days && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.trial_period_days}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Enter 0 for no trial period. Leave empty to use default value.
              </p>
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

            <div data-field="discountAmount">
              <Label>Discount Price *</Label>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Enter price"
                value={form.discountAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.includes("-") || value.includes("–") || value.toLowerCase().includes("to")) {
                    return;
                  }
                  if (!/^\d*$/.test(value)) {
                    return;
                  }
                  updateField("discountAmount", value);
                }}
                className={errors.discountAmount ? "border-red-500" : ""}
              />
              {errors.discountAmount && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.discountAmount}
                </p>
              )}
            </div>

            <div data-field="period">
              <Label>Billing Period *</Label>
              <Select
                value={form.period}
                onValueChange={(v: "month" | "year" | "quarter") => updateField("period", v)}
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

            <div data-field="discountPeriod">
              <Label>Discount Period *</Label>
              <Select
                value={form.discountPeriod}
                onValueChange={(val) => updateField("discountPeriod", val)}
              >
                <SelectTrigger className={errors.discountPeriod ? "border-red-500" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1_month">1 Month</SelectItem>
                  <SelectItem value="3_months">3 Months</SelectItem>
                  <SelectItem value="6_months">6 Months</SelectItem>
                  <SelectItem value="lifetime">Lifetime</SelectItem>
                </SelectContent>
              </Select>
              {errors.discountPeriod && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.discountPeriod}
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


    </div>
  );
}