// MobileHowItWorksCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, ArrowRight, Sparkles } from "lucide-react";

export function MobileHowItWorksCard({ item, onEdit, onDelete }) {
  const getStepColor = (stepNumber) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-amber-500",
      "bg-pink-500",
      "bg-indigo-500"
    ];
    return colors[(stepNumber - 1) % colors.length] || "bg-gray-500";
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className={`${getStepColor(item.stepNumber)} w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
              {item.stepNumber}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-foreground">{item.title}</h4>
                <Badge variant="outline" className="text-xs">
                  Step {item.stepNumber}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">{item.icon}</span>
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