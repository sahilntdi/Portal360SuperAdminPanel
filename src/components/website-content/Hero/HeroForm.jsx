// components/website-content/Hero/HeroForm.jsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload, ExternalLink, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export function HeroForm({ formData, setFormData, isEditing = false }) {
  const [newWord, setNewWord] = useState("");
  const [imageError, setImageError] = useState(false);

  // Handle dynamic words
  const addDynamicWord = () => {
    if (newWord.trim()) {
      const currentWords = formData.dynamicWords || [];
      setFormData({
        ...formData,
        dynamicWords: [...currentWords, { word: newWord.trim() }]
      });
      setNewWord("");
    }
  };

  const removeDynamicWord = (index) => {
    const currentWords = formData.dynamicWords || [];
    setFormData({
      ...formData,
      dynamicWords: currentWords.filter((_, i) => i !== index)
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageError(false);
      setFormData({
        ...formData,
        backgroundImageFile: file,
        backgroundImagePreview: URL.createObjectURL(file)
      });
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-4 pt-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column: Basic Info */}
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Basic Information</h3>

            <div className="space-y-2">
              <Label htmlFor="heroTitle" className="text-sm font-medium">
                Hero Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="heroTitle"
                placeholder="e.g., Grow better with Portal360"
                value={formData.heroTitle || ""}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                className="focus-visible:ring-primary shadow-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="badgeText" className="text-sm font-medium">
                Badge Text <span className="text-xs text-muted-foreground font-normal ml-1">(Optional)</span>
              </Label>
              <Input
                id="badgeText"
                placeholder="e.g., Holiday Special: Save 20%"
                value={formData.badgeText || ""}
                onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                className="focus-visible:ring-primary shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your hero section..."
                rows={4}
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="resize-none focus-visible:ring-primary shadow-sm"
              />
            </div>
          </div>

          {/* Social Proof & Status */}
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="socialProofText" className="text-sm font-medium">Social Proof Text</Label>
              <Input
                id="socialProofText"
                placeholder="e.g., 278,000 customers in 135 countries"
                value={formData.socialProofText || ""}
                onChange={(e) => setFormData({ ...formData, socialProofText: e.target.value })}
                className="focus-visible:ring-primary shadow-sm"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
              <div className="space-y-0.5">
                <Label htmlFor="isActive" className="text-sm font-semibold cursor-pointer">Active Status</Label>
                <p className="text-xs text-muted-foreground leading-none">
                  Only one hero section can be active at a time
                </p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive || false}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Text & Visuals */}
        <div className="space-y-4 sm:space-y-6">
          {/* Dynamic Content Card */}
          <Card className="shadow-sm border-muted-foreground/10">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Dynamic Content</h3>

              <div className="space-y-2">
                <Label htmlFor="dynamicPrefix" className="text-sm font-medium">Prefix Text</Label>
                <Input
                  id="dynamicPrefix"
                  placeholder="e.g., Accountants to help you"
                  value={formData.dynamicPrefix || ""}
                  onChange={(e) => setFormData({ ...formData, dynamicPrefix: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Rotating Words</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add word..."
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDynamicWord())}
                    className="h-9"
                  />
                  <Button type="button" onClick={addDynamicWord} size="icon" className="h-9 w-9 shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1.5 min-h-[40px] p-2 rounded-md bg-muted/20 border border-dashed">
                  {(formData.dynamicWords || []).map((wordObj, index) => (
                    <Badge key={index} variant="secondary" className="px-2 py-1 gap-1 text-xs">
                      {wordObj.word}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                        onClick={() => removeDynamicWord(index)}
                      />
                    </Badge>
                  ))}
                  {(!formData.dynamicWords || formData.dynamicWords.length === 0) && (
                    <span className="text-[10px] text-muted-foreground italic self-center">No words added</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visuals & CTAs */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Visual & Actions</h3>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Background Image</Label>

              {/* Current image info bar (edit mode only) */}
              {isEditing && formData.backgroundImage && !formData.backgroundImageFile && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                  <ImageIcon className="h-4 w-4 text-blue-500 shrink-0" />
                  <span className="text-xs text-blue-700 dark:text-blue-300 flex-1 truncate" title={formData.backgroundImage}>
                    Current: {formData.backgroundImage}
                  </span>
                  <a
                    href={formData.backgroundImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                  >
                    Open <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}

              {/* Inputs: full width */}
              <div className="space-y-2">
                <Input
                  placeholder="Image URL (or upload below)"
                  value={formData.backgroundImage || ""}
                  onChange={(e) => {
                    setImageError(false);
                    setFormData({ ...formData, backgroundImage: e.target.value, backgroundImagePreview: "" });
                  }}
                  className="h-9 text-xs"
                />
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="h-9 pr-8 text-xs cursor-pointer file:cursor-pointer file:bg-primary file:text-primary-foreground file:border-0 file:text-[10px] file:px-2 file:h-full file:mr-2"
                  />
                  <Upload className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Preview block */}
              <div className="w-full h-40 rounded-md border-2 border-dashed flex items-center justify-center overflow-hidden bg-muted/50 group relative">
                {(formData.backgroundImagePreview || formData.backgroundImage) && !imageError ? (
                  <img
                    src={formData.backgroundImagePreview || formData.backgroundImage}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                ) : (formData.backgroundImagePreview || formData.backgroundImage) && imageError ? (
                  /* URL set but can't embed (e.g. Canva link) — show open link */
                  <div className="flex flex-col items-center gap-2 p-4 text-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Can't preview this URL directly</p>
                    <a
                      href={formData.backgroundImagePreview || formData.backgroundImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      Open image in new tab <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">No image selected</span>
                  </div>
                )}
              </div>
            </div>

            <Card className="shadow-none border-muted/50 bg-muted/5">
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Primary Action</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Input
                      placeholder="Label"
                      value={formData.ctaPrimary?.text || ""}
                      onChange={(e) => setFormData({
                        ...formData,
                        ctaPrimary: { ...formData.ctaPrimary, text: e.target.value }
                      })}
                      className="h-9 text-xs"
                    />
                    <Input
                      placeholder="URL/Link"
                      value={formData.ctaPrimary?.link || ""}
                      onChange={(e) => setFormData({
                        ...formData,
                        ctaPrimary: { ...formData.ctaPrimary, link: e.target.value }
                      })}
                      className="h-9 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Secondary Action</Label>
                  <Input
                    placeholder="Label (Optional)"
                    value={formData.ctaSecondary?.text || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      ctaSecondary: { text: e.target.value }
                    })}
                    className="h-9 text-xs"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}