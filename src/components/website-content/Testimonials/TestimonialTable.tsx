import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

export function TestimonialTable({ items, onEdit, onDelete }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Message</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items?.map((t) => (
          <TableRow key={t.id}>
            <TableCell>{t.order}</TableCell>
            <TableCell>{t.name}</TableCell>
            <TableCell>{t.role}</TableCell>
            <TableCell>{t.rating}</TableCell>
            <TableCell className="max-w-[300px] truncate">{t.message}</TableCell>


            <TableCell className="text-right">
              <div className="flex justify-end gap-2">

                {/* Edit */}
                <button
                  onClick={() => onEdit(t)}
                  className="p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                  title="Edit"
                >
                  <Pencil className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => onDelete(t)}
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
