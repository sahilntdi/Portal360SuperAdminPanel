import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WebsiteContentProps } from "./types";

export function PricingTab({ content, onUpdateContent }: WebsiteContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing Page Content</CardTitle>
        <CardDescription>Edit your pricing page header</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pricing-title">Section Title</Label>
          <Input
            id="pricing-title"
            value={content.pricing.title}
            onChange={(e) => onUpdateContent("pricing", "title", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pricing-subtitle">Section Subtitle</Label>
          <Input
            id="pricing-subtitle"
            value={content.pricing.subtitle}
            onChange={(e) => onUpdateContent("pricing", "subtitle", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}