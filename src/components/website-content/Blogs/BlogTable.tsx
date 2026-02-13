// BlogTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye, Calendar, Clock, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function BlogTable({ items, onEdit, onDelete }) {
  const getCategoryColor = (category) => {
    const colors = {
      technology: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      design: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      marketing: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      business: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    };
    return colors[category?.toLowerCase()] || colors.default;
  };

  return (
    <div className="rounded-lg border dark:border-gray-800 overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-16">Image</TableHead>
            <TableHead>Title & Category</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((blog) => (
            <TableRow key={blog._id || blog.id || `blog-${blog.slug}`} className="group hover:bg-muted/30 transition-colors">
              <TableCell>
                <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                  <AvatarImage src={blog.image} alt={blog.title} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {blog.title?.charAt(0) || "B"}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1.5">
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {blog.title}
                  </div>
                  <Badge className={`${getCategoryColor(blog.category)} border-0 font-medium`}>
                    {blog.category || "Uncategorized"}
                  </Badge>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {blog.date ? new Date(blog.date).toLocaleDateString() : "--"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {blog.readTime || "5 min"} read
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono bg-muted px-2 py-1 rounded truncate max-w-[180px]">
                    /{blog.slug}
                  </span>
                  <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
              
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(blog)}
                    className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(blog)}
                    className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  
                 
                </div>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}