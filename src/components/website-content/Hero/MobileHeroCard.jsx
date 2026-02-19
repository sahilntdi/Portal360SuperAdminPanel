// components/website-content/Hero/MobileHeroCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Globe, Sparkles, Users, Link2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function MobileHeroCard({ item, onEdit, onDelete, onToggleStatus }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header with status */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                {item.badgeText && (
                  <Badge variant="secondary" className="text-xs mb-1">
                    {item.badgeText}
                  </Badge>
                )}
                <h4 className="font-semibold text-foreground line-clamp-1">
                  {item.heroTitle}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={item.isActive}
                onCheckedChange={() => onToggleStatus(item)}
                className="scale-75"
              />
              <Badge variant={item.isActive ? "default" : "secondary"} className="text-xs">
                {item.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>

          {/* Dynamic Words Preview */}
          {item.dynamicWords && item.dynamicWords.length > 0 && (
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-1">
                {item.dynamicWords.slice(0, 3).map((w, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {w.word}
                  </Badge>
                ))}
                {item.dynamicWords.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{item.dynamicWords.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            {item.socialProofText && (
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                Has social proof
              </span>
            )}
            {item.ctaPrimary?.text && (
              <span className="flex items-center gap-1">
                <Link2 className="h-3.5 w-3.5" />
                {item.ctaPrimary.text}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(item)}
              className="h-8 px-3"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(item)}
              className="h-8 px-3 text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}