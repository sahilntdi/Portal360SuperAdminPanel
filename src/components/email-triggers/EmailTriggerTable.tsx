import React, { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
    Mail,
    Edit2,
    Trash2,
    MoreVertical,
    CheckCircle,
    XCircle,
    Bell,
    MessageSquare
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EmailTriggerTableProps {
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
    loading?: boolean;
    data?: any[];
}

function EmailTriggerTableComponent({ onEdit, onDelete, loading = false, data = [] }: EmailTriggerTableProps) {

    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="p-4">
                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-9 w-16" />
                                <Skeleton className="h-9 w-16" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Mail className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No email triggers found</h3>
                <p className="text-muted-foreground">
                    Create your first email trigger to get started
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Desktop Table */}
            <div className="hidden lg:block">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Trigger Name</TableHead>
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
                                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                                {item.message}
                                            </p>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <span className="capitalize">{item.event}</span>
                                    </TableCell>
                                    <TableCell>
                                        {item.timing}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={item.status === "active" ? "default" : "secondary"}>
                                            {item.status === "active" ? (
                                                <>
                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                    Active
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="h-3 w-3 mr-1" />
                                                    Inactive
                                                </>
                                            )}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => onEdit(item)}>
                                                    <Edit2 className="h-4 w-4 mr-2" />
                                                    Edit Trigger
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => onDelete(item)}
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete Trigger
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
                {data.map((item) => (
                    <Card key={item._id} className="overflow-hidden">
                        <div className="p-4 space-y-3">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <Bell className="h-4 w-4 text-muted-foreground" />
                                    <h3 className="font-semibold">{item.triggerName}</h3>
                                </div>
                                <Badge variant={item.status === "active" ? "default" : "secondary"}>
                                    {item.status}
                                </Badge>
                            </div>

                            {/* Event & Timing */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-muted-foreground">Event</p>
                                    <p className="text-sm font-medium capitalize">{item.event}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Timing</p>
                                    <p className="text-sm font-medium">{item.timing}</p>
                                </div>
                            </div>

                            {/* Message Preview */}
                            {item.message && (
                                <div className="pt-2 border-t">
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                                        <MessageSquare className="h-3 w-3" />
                                        Message
                                    </div>
                                    <p className="text-sm line-clamp-2">{item.message}</p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2 pt-3 border-t">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(item)}
                                    className="flex-1"
                                >
                                    <Edit2 className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onDelete(item)}
                                    className="flex-1 text-red-600 hover:text-red-700 hover:border-red-200"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export const EmailTriggerTable = memo(EmailTriggerTableComponent);