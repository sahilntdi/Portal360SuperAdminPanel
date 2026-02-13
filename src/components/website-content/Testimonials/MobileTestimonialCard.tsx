import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Trash2, Star, User, MessageSquare } from "lucide-react";

export function MobileTestimonialCard({ item, onEdit, onDelete }) {
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i < (rating || 5)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-300 dark:fill-gray-700 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12 border-2 border-background">
              <AvatarImage src={item.image || item.avatar} alt={item.name} />
              <AvatarFallback className="bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.designation || item.role}
                    {item.company && ` • ${item.company}`}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  #{item.order}
                </Badge>
              </div>
              
              <div className="mt-2">
                {renderStars(item.rating || 5)}
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-2 pt-2 border-t">
            <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground flex-1 line-clamp-3">
              {item.message}
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-muted-foreground">
              Rating: {item.rating || 5}/5
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