import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X, Link, AlertCircle } from "lucide-react";

export function IntegrationForm({ formData, setFormData, isEdit = false }) {
  const [logoPreview, setLogoPreview] = useState(formData.logoUrl || "");
  const [useUrl, setUseUrl] = useState(!!formData.logoUrl && !formData.logo);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setValidationErrors(prev => ({
          ...prev,
          logo: "Logo size should be less than 2MB"
        }));
        return;
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setValidationErrors(prev => ({
          ...prev,
          logo: "Only JPG, PNG, SVG, GIF images are allowed"
        }));
        return;
      }

      handleChange("logo", file);
      setUseUrl(false);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
      setValidationErrors(prev => ({ ...prev, logo: "" }));
    }
  };

const handleUrlChange = (url) => {
  handleChange("logoUrl", url);
  handleChange("logo", null); // Clear file if URL is used
  setLogoPreview(url);
  setUseUrl(true);
};

  const removeLogo = () => {
    setFormData(prev => ({ ...prev, logo: null, logoUrl: "" }));
    setLogoPreview("");
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name?.trim()) errors.name = "Integration name is required";
    if (!formData.order || formData.order < 1) errors.order = "Valid order number is required";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Integration Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g., Xero, QuickBooks, Stripe"
            className={validationErrors.name ? "border-red-500" : ""}
          />
          {validationErrors.name && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {validationErrors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="order">
            Display Order <span className="text-red-500">*</span>
          </Label>
          <Input
            id="order"
            type="number"
            min="1"
            max="100"
            value={formData.order || ""}
            onChange={(e) => handleChange("order", Number(e.target.value))}
            placeholder="Priority order (1-100)"
            className={validationErrors.order ? "border-red-500" : ""}
          />
          {validationErrors.order && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {validationErrors.order}
            </p>
          )}
        </div>
      </div>

      {/* Logo Upload/URL */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Integration Logo</Label>
        
        <div className="flex gap-2 mb-4">
          <Button
            type="button"
            variant={!useUrl ? "default" : "outline"}
            size="sm"
            onClick={() => setUseUrl(false)}
          >
            Upload File
          </Button>
          <Button
            type="button"
            variant={useUrl ? "default" : "outline"}
            size="sm"
            onClick={() => setUseUrl(true)}
          >
            <Link className="h-4 w-4 mr-2" />
            Use URL
          </Button>
        </div>

        {/* File Upload */}
        {!useUrl && (
          <div className="space-y-2">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <Label htmlFor="logo-upload" className="cursor-pointer">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Click to upload logo
                </div>
                <Button variant="outline" size="sm" type="button">
                  Choose File
                </Button>
              </Label>
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground mt-2">
                SVG, PNG, JPG (Max 2MB)
              </p>
            </div>
          </div>
        )}

        {/* URL Input */}
        {useUrl && (
          <div className="space-y-2">
            <Input
              value={formData.logoUrl || ""}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://example.com/logo.png"
              type="url"
            />
            <p className="text-xs text-muted-foreground">
              Enter the direct URL of the logo image
            </p>
          </div>
        )}

        {/* Logo Preview */}
        {(logoPreview || formData.logoUrl) && (
          <div className="mt-4">
            <Label>Logo Preview:</Label>
            <div className="flex items-center gap-4 mt-2">
              <div className="relative">
                <div className="h-20 w-20 rounded-lg border-2 border-primary/20 bg-white dark:bg-gray-900 flex items-center justify-center p-2">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="text-primary font-bold">
                      {formData.name?.charAt(0) || "L"}
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                  onClick={removeLogo}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Logo will be displayed as:</p>
                <p className="text-xs mt-1">Recommended: 200x200px, transparent background</p>
              </div>
            </div>
          </div>
        )}

        {validationErrors.logo && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> {validationErrors.logo}
          </p>
        )}
      </div>

      {/* Hidden field for _id */}
      {formData._id && (
        <input type="hidden" value={formData._id} />
      )}
    </div>
  );
}