// MobileFAQCard.jsx - Update for _id
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

export function MobileFAQCard({ item, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2 flex-1">
              <HelpCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{item.question}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    #{item.order}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {item.category || "General"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="w-full justify-between"
          >
            <span className="text-sm">
              {expanded ? 'Hide answer' : 'Show answer'}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </Button>
          
          {expanded && (
            <div className="pt-3 border-t">
              <p className="text-sm text-muted-foreground">{item.answer}</p>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="text-xs text-muted-foreground">
              Order: {item.order}
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