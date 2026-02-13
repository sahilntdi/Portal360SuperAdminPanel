import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WebsiteContentProps } from "./types";

export function FAQTab({ content, onUpdateContent }: WebsiteContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Manage your FAQ content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Question 1</h4>
          <div className="space-y-2">
            <Label htmlFor="q1">Question</Label>
            <Input
              id="q1"
              value={content.faq.question1}
              onChange={(e) => onUpdateContent("faq", "question1", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="a1">Answer</Label>
            <Textarea
              id="a1"
              value={content.faq.answer1}
              onChange={(e) => onUpdateContent("faq", "answer1", e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">Question 2</h4>
          <div className="space-y-2">
            <Label htmlFor="q2">Question</Label>
            <Input
              id="q2"
              value={content.faq.question2}
              onChange={(e) => onUpdateContent("faq", "question2", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="a2">Answer</Label>
            <Textarea
              id="a2"
              value={content.faq.answer2}
              onChange={(e) => onUpdateContent("faq", "answer2", e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">Question 3</h4>
          <div className="space-y-2">
            <Label htmlFor="q3">Question</Label>
            <Input
              id="q3"
              value={content.faq.question3}
              onChange={(e) => onUpdateContent("faq", "question3", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="a3">Answer</Label>
            <Textarea
              id="a3"
              value={content.faq.answer3}
              onChange={(e) => onUpdateContent("faq", "answer3", e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}