import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X, Link, AlertCircle } from "lucide-react";

export function IntegrationForm({ formData, setFormData, isEdit = false }) {
  const [logoPreview, setLogoPreview] = useState("");
  const [useUrl, setUseUrl] = useState(false);
  const [errors, setErrors] = useState({});

  // 🟣 Prefill logic when editing
  useEffect(() => {
    if (!formData) return;
    if (formData.logoUrl) {
      setUseUrl(true);
      setLogoPreview(formData.logoUrl);
    } else if (formData.logoFile) {
      setUseUrl(false);
    } else if (formData.logo) {
      setUseUrl(true);
      setLogoPreview(formData.logo);
    }
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // 🟣 Handle Logo File
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (file.size > 2 * 1024 * 1024) {
      return setErrors({ logo: "Max file size allowed is 2MB" });
    }

    const allowed = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];
    if (!allowed.includes(file.type)) {
      return setErrors({ logo: "Only PNG, JPG, SVG, WEBP are allowed" });
    }

    // Set file
    handleChange("logoFile", file);
    handleChange("logoUrl", "");

    setUseUrl(false);
    setLogoPreview(URL.createObjectURL(file));
  };

  // 🟣 Handle Logo URL
  const handleUrlChange = (val) => {
    handleChange("logoUrl", val);
    handleChange("logoFile", null);
    setUseUrl(true);
    setLogoPreview(val);
  };

  // 🟣 Remove Logo
  const removeLogo = () => {
    handleChange("logoFile", null);
    handleChange("logoUrl", "");
    setLogoPreview("");
  };

  return (
    <div className="space-y-6">
      
      {/* Name */}
      <div>
        <Label>Name *</Label>
        <Input
          value={formData.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          className={errors.name && "border-red-500"}
        />
        {errors.name && (
          <p className="text-xs text-red-500 flex gap-1 mt-1">
            <AlertCircle className="h-3 w-3" /> {errors.name}
          </p>
        )}
      </div>

      {/* Order */}
      <div>
        <Label>Order *</Label>
        <Input
          type="number"
          min={1}
          value={formData.order || ""}
          onChange={(e) => handleChange("order", Number(e.target.value))}
          className={errors.order && "border-red-500"}
        />
        {errors.order && (
          <p className="text-xs text-red-500 flex gap-1 mt-1">
            <AlertCircle className="h-3 w-3" /> {errors.order}
          </p>
        )}
      </div>

      {/* File or URL Switch */}
      <div className="flex gap-2">
        <Button
          variant={!useUrl ? "default" : "outline"}
          size="sm"
          onClick={() => setUseUrl(false)}
        >
          Upload File
        </Button>

        <Button
          variant={useUrl ? "default" : "outline"}
          size="sm"
          onClick={() => setUseUrl(true)}
        >
          <Link className="h-4 w-4 mr-1" /> Use URL
        </Button>
      </div>

      {/* Upload */}
      {!useUrl && (
        <div>
          <Label>Upload Logo</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
          />
          {errors.logo && (
            <p className="text-xs text-red-500 flex gap-1 mt-1">
              <AlertCircle className="h-3 w-3" /> {errors.logo}
            </p>
          )}
        </div>
      )}

      {/* URL */}
      {useUrl && (
        <div>
          <Label>Logo URL</Label>
          <Input
            value={formData.logoUrl || ""}
            onChange={(e) => handleUrlChange(e.target.value)}
          />
        </div>
      )}

      {/* Preview */}
      {logoPreview && (
        <div className="mt-3 relative">
          <img
            src={logoPreview}
            className="h-20 w-20 object-contain border rounded bg-white"
          />
          <Button
            size="icon"
            variant="destructive"
            className="absolute -top-2 -right-2 h-6 w-6"
            onClick={removeLogo}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* hidden id */}
      {formData._id && <input type="hidden" value={formData._id} />}
    </div>
  );
}
