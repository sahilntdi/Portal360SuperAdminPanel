// HowItWorksTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Sparkles, ArrowRight } from "lucide-react";

export function HowItWorksTable({ steps, onEdit, onDelete }) {
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
    <div className="rounded-lg border dark:border-gray-800 overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-20">Step</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {steps?.map((item) => (
            <TableRow key={item._id || item.id || `step-${item.stepNumber}`} className="group hover:bg-muted/30 transition-colors">
              <TableCell>
                <div className={`${getStepColor(item.stepNumber)} w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                  {item.stepNumber}
                </div>
              </TableCell>

              <TableCell>
                <div className="space-y-2">
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ArrowRight className="h-3 w-3" />
                    Step {item.stepNumber} of {steps.length}
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{item.icon}</span>
                </div>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(item)} // Pass the full item
                    className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(item)} // Pass the full item
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