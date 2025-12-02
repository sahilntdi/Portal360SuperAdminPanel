import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Calendar, Clock, ExternalLink } from "lucide-react";

export function MobileBlogCard({ item, onEdit, onDelete }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-foreground">{item.title}</h4>
              <Badge variant="secondary" className="mt-2">
                {item.category || "Uncategorized"}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {item.date ? new Date(item.date).toLocaleDateString() : "--"}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {item.readTime || "5 min"}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-sm text-muted-foreground truncate max-w-[60%]">
              /{item.slug}
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(item)} // Pass full item
                className="h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(item)} // Pass full item
                className="h-8 w-8 text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}