import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WebsiteContentProps } from "./types";

export function HowItWorksTab({ content, onUpdateContent }: WebsiteContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How It Works Section</CardTitle>
        <CardDescription>Edit the step-by-step guide</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="howitworks-title">Section Title</Label>
          <Input
            id="howitworks-title"
            value={content.howItWorks.title}
            onChange={(e) => onUpdateContent("howItWorks", "title", e.target.value)}
          />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">Step 1</h4>
          <div className="space-y-2">
            <Label htmlFor="step1-title">Title</Label>
            <Input
              id="step1-title"
              value={content.howItWorks.step1Title}
              onChange={(e) => onUpdateContent("howItWorks", "step1Title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="step1-desc">Description</Label>
            <Textarea
              id="step1-desc"
              value={content.howItWorks.step1Description}
              onChange={(e) =>
                onUpdateContent("howItWorks", "step1Description", e.target.value)
              }
              rows={2}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">Step 2</h4>
          <div className="space-y-2">
            <Label htmlFor="step2-title">Title</Label>
            <Input
              id="step2-title"
              value={content.howItWorks.step2Title}
              onChange={(e) => onUpdateContent("howItWorks", "step2Title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="step2-desc">Description</Label>
            <Textarea
              id="step2-desc"
              value={content.howItWorks.step2Description}
              onChange={(e) =>
                onUpdateContent("howItWorks", "step2Description", e.target.value)
              }
              rows={2}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">Step 3</h4>
          <div className="space-y-2">
            <Label htmlFor="step3-title">Title</Label>
            <Input
              id="step3-title"
              value={content.howItWorks.step3Title}
              onChange={(e) => onUpdateContent("howItWorks", "step3Title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="step3-desc">Description</Label>
            <Textarea
              id="step3-desc"
              value={content.howItWorks.step3Description}
              onChange={(e) =>
                onUpdateContent("howItWorks", "step3Description", e.target.value)
              }
              rows={2}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}