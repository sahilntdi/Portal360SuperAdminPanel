import React, { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
    Check,
    Crown,
    Star,
    Edit2,
    Trash2,
    Users,
    Calendar,
    Eye,
    MoreVertical,
    Circle,
    CheckCircle,
    XCircle
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface PricingTableProps {
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
    onView: (item: any) => void;
    loading?: boolean;
    data?: any[];
}

function PricingTableComponent({ onEdit, onDelete, onView, loading = false, data = [] }: PricingTableProps) {


    console.log("PricingTable data:", data);
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'MMM dd, yyyy');
        } catch {
            return dateString;
        }
    };

    const renderFeatureValue = (feature: any) => {
        if (!feature || !feature.name) return "N/A";
        if (!feature.value) return "N/A";
        return feature.value;
    };

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
                    <Crown className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No pricing plans found</h3>
                <p className="text-muted-foreground">
                    Create your first pricing plan to get started
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
                                <TableHead>Plan Details</TableHead>
                                <TableHead>Pricing</TableHead>
                                <TableHead>Features</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2">
                                                {item.highlighted && (
                                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                )}
                                                <span className="font-medium">{item.name}</span>
                                                <Badge variant="outline" className="text-xs">
                                                    #{item.order}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {item.description || "No description"}
                                            </p>
                                            {item.recommendedFor && (
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Users className="h-3 w-3" />
                                                    <span>For {item.recommendedFor} users</span>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl font-bold">${item.price}</span>
                                                <span className="text-sm text-muted-foreground">
                                                    /{item.period}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                <span className="capitalize">{item.period}ly</span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="space-y-1">
                                            {item.features?.slice(0, 2).map((feature, idx) => {
                                                const isEmpty = !feature?.name && !feature?.value && !feature?.featureId;

                                                return (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        <Check className="h-3 w-3 text-green-500" />

                                                        {isEmpty ? (
                                                            <span className="text-sm text-muted-foreground italic">
                                                                No feature assigned
                                                            </span>
                                                        ) : (
                                                            <span className="text-sm">
                                                                {feature.name}: {renderFeatureValue(feature)}
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}

                                            {item.features?.length > 2 && (
                                                <div className="text-xs text-muted-foreground">
                                                    +{item.features.length - 2} more features
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>


                                    <TableCell>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                {item.isActive ? (
                                                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary">
                                                        <XCircle className="h-3 w-3 mr-1" />
                                                        Inactive
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                Created {formatDate(item.createdAt)}
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => onView(item)}>
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => onEdit(item)}>
                                                    <Edit2 className="h-4 w-4 mr-2" />
                                                    Edit Plan
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => onDelete(item)}
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete Plan
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
                        <div className="p-4 space-y-4">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        {item.highlighted && (
                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                        )}
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <Badge variant="outline" className="text-xs">
                                            #{item.order}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {item.description || "No description"}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-bold">${item.price}</div>
                                    <div className="text-sm text-muted-foreground capitalize">
                                        /{item.period}
                                    </div>
                                </div>
                            </div>

                            {/* Status & Info */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {item.isActive ? (
                                        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary">
                                            <XCircle className="h-3 w-3 mr-1" />
                                            Inactive
                                        </Badge>
                                    )}
                                    {item.recommendedFor && (
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Users className="h-3 w-3" />
                                            <span>{item.recommendedFor} users</span>
                                        </div>
                                    )}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {formatDate(item.createdAt)}
                                </div>
                            </div>

                            {/* Features */}
                            {item.features && item.features.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium">Features</h4>
                                    <div className="space-y-1">
                                        {item.features.slice(0, 3).map((feature, idx) => (
                                            <div key={idx} className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Circle className="h-2 w-2 fill-current" />
                                                    <span>{feature.name}</span>
                                                </div>
                                                <span className="text-muted-foreground">
                                                    {renderFeatureValue(feature)}
                                                </span>
                                            </div>
                                        ))}
                                        {item.features.length > 3 && (
                                            <div className="text-xs text-muted-foreground text-center">
                                                +{item.features.length - 3} more features
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2 pt-4 border-t">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onView(item)}
                                    className="flex-1"
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                </Button>
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

export const PricingTable = memo(PricingTableComponent);