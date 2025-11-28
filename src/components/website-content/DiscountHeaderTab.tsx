import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye } from "lucide-react";
import { WebsiteContentProps } from "./types";

export function DiscountHeaderTab({ content, onUpdateContent }: WebsiteContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Discount Header Alert</CardTitle>
        <CardDescription>
          Manage the promotional banner that appears at the top of your website
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="discount-enabled"
            checked={content.discountHeader.enabled}
            onCheckedChange={(checked) =>
              onUpdateContent("discountHeader", "enabled", checked)
            }
          />
          <Label htmlFor="discount-enabled">Enable discount header</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="discount-message">Alert Message</Label>
          <Input
            id="discount-message"
            value={content.discountHeader.message}
            onChange={(e) => onUpdateContent("discountHeader", "message", e.target.value)}
            placeholder="Enter your promotional message"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="discount-link">Link URL</Label>
            <Input
              id="discount-link"
              value={content.discountHeader.link}
              onChange={(e) => onUpdateContent("discountHeader", "link", e.target.value)}
              placeholder="/pricing"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount-link-text">Link Text</Label>
            <Input
              id="discount-link-text"
              value={content.discountHeader.linkText}
              onChange={(e) => onUpdateContent("discountHeader", "linkText", e.target.value)}
              placeholder="View Plans"
            />
          </div>
        </div>

        {content.discountHeader.enabled && (
          <Alert>
            <Eye className="h-4 w-4" />
            <AlertDescription>
              Preview: {content.discountHeader.message} -{" "}
              <span className="underline">{content.discountHeader.linkText}</span>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}