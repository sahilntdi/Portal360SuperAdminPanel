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
import { Pencil, Trash2, ExternalLink, Calendar, Hash } from "lucide-react";
import { format } from "date-fns";

export function IntegrationTable({ items, onEdit, onDelete }) {
  return (
    <div className="rounded-lg border dark:border-gray-800 overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-16">Logo</TableHead>
            <TableHead>Integration</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item) => {
            const integrationId = item._id;
            
            return (
              <TableRow key={integrationId} className="hover:bg-muted/30">
                <TableCell>
                  <Avatar className="h-12 w-12 border-2 border-background bg-white">
                    {item.logo ? (
                      <AvatarImage src={item.logo} alt={item.name} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-bold">
                        {item.name?.charAt(0) || "I"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </TableCell>
                
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-bold text-foreground">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      ID: {integrationId?.substring(0, 8)}...
                    </div>
                    {item.logo && (
                      <div className="text-xs">
                        <a 
                          href={item.logo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View Logo
                        </a>
                      </div>
                    )}
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">
                      <Hash className="h-3 w-3 mr-1" />
                      {item.order}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Priority
                    </span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {item.createdAt ? format(new Date(item.createdAt), 'dd MMM yyyy') : 'N/A'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.updatedAt && `Updated: ${format(new Date(item.updatedAt), 'dd MMM')}`}
                    </div>
                  </div>
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(item)}
                      className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
                      title="Edit Integration"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item)}
                      className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300"
                      title="Delete Integration"
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