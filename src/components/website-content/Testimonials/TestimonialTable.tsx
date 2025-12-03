import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Star, MessageSquare, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function TestimonialTable({ items, onEdit, onDelete }) {
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
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
    <div className="rounded-lg border dark:border-gray-800 overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-16">Avatar</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Rating & Message</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((t) => {
            // Use _id for key
            const testimonialId = t._id || t.id || `testimonial-${t.order}`;
            
            return (
              <TableRow key={testimonialId} className="group hover:bg-muted/30 transition-colors">
                <TableCell>
                  <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                    <AvatarImage src={t.image || t.avatar} alt={t.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5">
                      <User className="h-6 w-6 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-semibold text-foreground">
                      {t.name}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {t.designation || t.role}
                    </Badge>
                    {t.company && (
                      <div className="text-xs text-muted-foreground">
                        {t.company}
                      </div>
                    )}
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {renderStars(t.rating || 5)}
                      <span className="text-sm font-medium text-foreground">
                        {t.rating || 5}.0
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {t.message}
                      </div>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mx-auto">
                      {t.order}
                    </div>
                    <Progress value={(t.order / items.length) * 100} className="h-1.5 w-16" />
                  </div>
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(t)}
                      className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(t)}
                      className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}