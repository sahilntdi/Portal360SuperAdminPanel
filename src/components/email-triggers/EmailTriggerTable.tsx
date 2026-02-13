import React, { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Mail,
  Edit2,
  Trash2,
  MoreVertical,
  CheckCircle,
  XCircle,
  Bell,
  MessageSquare,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  data?: any[];
  loading?: boolean;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

function EmailTriggerTableComponent({
  data = [],
  loading = false,
  onEdit,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center py-10">
        <Mail className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
        <p>No email triggers found</p>
      </div>
    );
  }
  function formatTiming(timing: any) {
    if (!timing) return "-";

    if (timing.type === "immediate") {
      return "Immediate";
    }

    const prefix = timing.type === "after" ? "After" : "Before";
    const unit =
      timing.unit === "day"
        ? timing.value > 1 ? "Days" : "Day"
        : timing.value > 1 ? "Hours" : "Hour";

    return `${prefix} ${timing.value} ${unit}`;
  }

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trigger</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Timing</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{item.triggerName}</span>
                </div>
                {item.message && (
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {item.message}
                  </p>
                )}
              </TableCell>

              {/* ✅ FIXED: event.name */}
              <TableCell>
                {item.event?.name || "-"}
              </TableCell>

              <TableCell>
                {formatTiming(item.timing)}
              </TableCell>

              <TableCell>
                <Badge variant={item.status === "active" ? "default" : "secondary"}>
                  {item.status === "active" ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" /> Active
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 mr-1" /> Inactive
                    </>
                  )}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(item)}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(item)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export const EmailTriggerTable = memo(EmailTriggerTableComponent);
