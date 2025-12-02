// FAQTable.jsx - Fix the expandedRows logic
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ChevronDown, HelpCircle, Tag } from "lucide-react";
import { useState } from "react";

export function FAQTable({ items, onEdit, onDelete }) {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleExpand = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getCategoryColor = (category) => {
    const colors = {
      general: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      technical: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      billing: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      account: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      default: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
    };
    return colors[category?.toLowerCase()] || colors.default;
  };

  return (
    <div className="rounded-lg border dark:border-gray-800 overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-16">#</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((faq) => {
            // Use _id for unique identification
            const faqId = faq._id || faq.id || `faq-${faq.order}`;
            
            return (
              <>
                <TableRow 
                  key={faqId} 
                  className="group hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => toggleExpand(faqId)}
                >
                  <TableCell>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                      {faq.order}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-start gap-2">
                        <HelpCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {faq.question}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <ChevronDown className={`h-3 w-3 transition-transform ${expandedRows[faqId] ? 'rotate-180' : ''}`} />
                        {expandedRows[faqId] ? 'Hide answer' : 'Show answer'}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={`${getCategoryColor(faq.category)} border-0 flex items-center gap-1 w-fit`}>
                      <Tag className="h-3 w-3" />
                      {faq.category || "General"}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => { e.stopPropagation(); onEdit(faq); }}
                        className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => { e.stopPropagation(); onDelete(faq); }}
                        className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                
                {expandedRows[faqId] && (
                  <TableRow className="bg-muted/20">
                    <TableCell colSpan={4} className="border-t-0">
                      <div className="p-4 pl-12">
                        <div className="text-sm text-muted-foreground mb-2">Answer:</div>
                        <div className="bg-background p-4 rounded-lg border dark:border-gray-700">
                          {faq.answer}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}