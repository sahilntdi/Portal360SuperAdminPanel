import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WebsiteContentProps } from "./types";

export function FeaturesTab({ content, onUpdateContent }: WebsiteContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Features Page Content</CardTitle>
        <CardDescription>Edit your features section</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="features-title">Section Title</Label>
            <Input
              id="features-title"
              value={content.features.title}
              onChange={(e) => onUpdateContent("features", "title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="features-subtitle">Section Subtitle</Label>
            <Input
              id="features-subtitle"
              value={content.features.subtitle}
              onChange={(e) => onUpdateContent("features", "subtitle", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">Feature 1</h4>
          <div className="space-y-2">
            <Label htmlFor="feature1-title">Title</Label>
            <Input
              id="feature1-title"
              value={content.features.feature1Title}
              onChange={(e) => onUpdateContent("features", "feature1Title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feature1-desc">Description</Label>
            <Textarea
              id="feature1-desc"
              value={content.features.feature1Description}
              onChange={(e) =>
                onUpdateContent("features", "feature1Description", e.target.value)
              }
              rows={2}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">Feature 2</h4>
          <div className="space-y-2">
            <Label htmlFor="feature2-title">Title</Label>
            <Input
              id="feature2-title"
              value={content.features.feature2Title}
              onChange={(e) => onUpdateContent("features", "feature2Title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feature2-desc">Description</Label>
            <Textarea
              id="feature2-desc"
              value={content.features.feature2Description}
              onChange={(e) =>
                onUpdateContent("features", "feature2Description", e.target.value)
              }
              rows={2}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">Feature 3</h4>
          <div className="space-y-2">
            <Label htmlFor="feature3-title">Title</Label>
            <Input
              id="feature3-title"
              value={content.features.feature3Title}
              onChange={(e) => onUpdateContent("features", "feature3Title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feature3-desc">Description</Label>
            <Textarea
              id="feature3-desc"
              value={content.features.feature3Description}
              onChange={(e) =>
                onUpdateContent("features", "feature3Description", e.target.value)
              }
              rows={2}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}