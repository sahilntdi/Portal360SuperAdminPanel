import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Shield, Search, Plus, Edit, Trash2 } from "lucide-react";
import { SecurityFeature } from "./types";
import SecurityAddEditDialog from "./SecurityAddEditDialog";
import SecurityDeleteDialog from "./SecurityDeleteDialog";

type Props = {
  data: SecurityFeature[];
  refresh: () => void;
};

export default function SecurityTable({ data, refresh }: Props) {
  // Ensure data is always an array
  const normalizedData = Array.isArray(data) ? data : [data].filter(Boolean);
  
  const [editItem, setEditItem] = useState<SecurityFeature | null>(null);
  const [deleteItem, setDeleteItem] = useState<SecurityFeature | null>(null);
  const [search, setSearch] = useState("");

  const filteredData = normalizedData.filter(item =>
    item?.name?.toLowerCase().includes(search.toLowerCase()) ||
    item?.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Security Features</CardTitle>
                <CardDescription>
                  Manage and configure system security features
                </CardDescription>
              </div>
            </div>
            <Button onClick={() => setEditItem({} as SecurityFeature)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Feature
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search features..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearch("")}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredData.length} of {normalizedData.length} security features
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Active: {normalizedData.filter(f => f.isActive).length}
            </span>
            <span className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-gray-400" />
              Inactive: {normalizedData.filter(f => !f.isActive).length}
            </span>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item._id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="font-medium">{item.name}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground max-w-md truncate">
                    {item.description}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={item.isActive ? "success" : "secondary"}
                    className={item.isActive 
                      ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
                    }
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setEditItem(item)}
                      className="h-8"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteItem(item)}
                      className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  <div className="flex flex-col items-center justify-center">
                    <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No security features found</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {search ? "Try adjusting your search" : "Add your first security feature"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <SecurityAddEditDialog
        open={!!editItem}
        editItem={editItem?._id ? editItem : null}
        onClose={() => setEditItem(null)}
        onSuccess={refresh}
      />

      <SecurityDeleteDialog
        open={!!deleteItem}
        item={deleteItem}
        onClose={() => setDeleteItem(null)}
        onSuccess={refresh}
      />
    </Card>
  );
}