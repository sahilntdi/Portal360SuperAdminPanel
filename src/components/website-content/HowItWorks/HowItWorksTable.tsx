import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

export function HowItWorksTable({ steps, onEdit, onDelete }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Step</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Icon</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {steps?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.stepNumber}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.icon}</TableCell>


            <TableCell className="text-right">
              <div className="flex justify-end gap-2">

                {/* EDIT */}
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                  title="Edit"
                >
                  <Pencil className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </button>

                {/* DELETE */}
                <button
                  onClick={() => onDelete(item)}
                  className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900 transition"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                </button>

              </div>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
