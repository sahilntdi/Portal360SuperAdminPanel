import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WebsiteContentProps } from "./types";

export function BlogTab({ content, onUpdateContent }: WebsiteContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Posts</CardTitle>
        <CardDescription>Manage your blog post previews</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Post 1</h4>
          <div className="space-y-2">
            <Label htmlFor="post1-title">Title</Label>
            <Input
              id="post1-title"
              value={content.blog.post1Title}
              onChange={(e) => onUpdateContent("blog", "post1Title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="post1-excerpt">Excerpt</Label>
            <Textarea
              id="post1-excerpt"
              value={content.blog.post1Excerpt}
              onChange={(e) => onUpdateContent("blog", "post1Excerpt", e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">Post 2</h4>
          <div className="space-y-2">
            <Label htmlFor="post2-title">Title</Label>
            <Input
              id="post2-title"
              value={content.blog.post2Title}
              onChange={(e) => onUpdateContent("blog", "post2Title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="post2-excerpt">Excerpt</Label>
            <Textarea
              id="post2-excerpt"
              value={content.blog.post2Excerpt}
              onChange={(e) => onUpdateContent("blog", "post2Excerpt", e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}