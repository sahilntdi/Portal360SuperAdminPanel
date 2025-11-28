import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WebsiteContentProps } from "./types";

export function HomePageTab({ content, onUpdateContent }: WebsiteContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Home Page Content</CardTitle>
        <CardDescription>Edit your homepage hero section</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="hero-title">Hero Title</Label>
          <Input
            id="hero-title"
            value={content.home.heroTitle}
            onChange={(e) => onUpdateContent("home", "heroTitle", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
          <Textarea
            id="hero-subtitle"
            value={content.home.heroSubtitle}
            onChange={(e) => onUpdateContent("home", "heroSubtitle", e.target.value)}
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cta-text">Call to Action Button Text</Label>
          <Input
            id="cta-text"
            value={content.home.ctaText}
            onChange={(e) => onUpdateContent("home", "ctaText", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}