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
import { Pencil, Trash2, Link, Star } from "lucide-react";

export function IntegrationTable({ items, onEdit, onDelete }) {
  return (
    <div className="rounded-lg border dark:border-gray-800 overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-16">Image</TableHead>
            <TableHead>Integration</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item) => {
            // Use _id for key
            const integrationId = item._id || item.id || `integration-${item.order}`;
            
            return (
              <TableRow key={integrationId} className="group hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="relative group">
                    <Avatar className="h-12 w-12 border-2 border-background shadow-sm bg-gradient-to-br from-primary/20 to-primary/5">
                      <AvatarImage src={item.image || item.logo} alt={item.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {item.name?.charAt(0) || "I"}
                      </AvatarFallback>
                    </Avatar>
                    {item.image && (
                      <div className="absolute hidden group-hover:block bottom-full left-0 mb-2 z-10">
                        <div className="bg-background border rounded-lg shadow-lg p-1">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="h-16 w-16 object-contain rounded"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="space-y-1.5">
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1 border-primary/30">
                        <Link className="h-3 w-3" />
                        Connected
                      </Badge>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {item.order}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Priority {item.order}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(item)}
                      className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item)}
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