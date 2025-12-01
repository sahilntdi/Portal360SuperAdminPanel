import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

export function IntegrationTable({ items, onEdit, onDelete }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Order</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              {item.image ? (
                <img
                  src={item.image}
                  alt=""
                  className="w-12 h-12 rounded object-cover"
                />
              ) : (
                <span>No image</span>
              )}
            </TableCell>

            <TableCell>{item.name}</TableCell>
            <TableCell>{item.order}</TableCell>


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
