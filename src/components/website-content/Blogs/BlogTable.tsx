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

export function BlogTable({ items, onEdit, onDelete }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Read Time</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Image</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items?.map((blog) => (
          <TableRow key={blog._id}>
            <TableCell className="font-medium">{blog.title}</TableCell>

            <TableCell>{blog.category}</TableCell>

            <TableCell>
              {blog.date ? blog.date.slice(0, 10) : "--"}
            </TableCell>

            <TableCell>{blog.readTime}</TableCell>

            <TableCell className="max-w-[200px] truncate">
              {blog.slug}
            </TableCell>

            {/* Optional image preview */}
            <TableCell>
              {blog.image ? (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-12 h-12 rounded object-cover border"
                />
              ) : (
                "No Image"
              )}
            </TableCell>


            <TableCell className="text-right">
              <div className="flex justify-end gap-2">

                {/* EDIT */}
                <button
                  onClick={() => onEdit(blog)}
                  className="p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                  title="Edit"
                >
                  <Pencil className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </button>

                {/* DELETE */}
                <button
                  onClick={() => onDelete(blog)}
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
