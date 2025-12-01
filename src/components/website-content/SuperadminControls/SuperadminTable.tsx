import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

export function SuperadminTable({ items, onEdit, onDelete }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Icon</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.icon}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.description}</TableCell>


            <TableCell className="text-right">
              <div className="flex justify-end items-center gap-2">

                {/* Edit Icon */}
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                  title="Edit"
                >
                  <Pencil className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </button>

                {/* Delete Icon */}
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
