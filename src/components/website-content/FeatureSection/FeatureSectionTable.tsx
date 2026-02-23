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
import { Pencil, Trash2, Sparkles, Layers } from "lucide-react";

interface FeatureSectionTableProps {
    meta: any[];
    cards: any[];
    onEditMeta: (item: any) => void;
    onDeleteMeta: (item: any) => void;
    onEditCard: (item: any) => void;
    onDeleteCard: (item: any) => void;
}

export function FeatureSectionTable({
    meta,
    cards,
    onEditMeta,
    onDeleteMeta,
    onEditCard,
    onDeleteCard,
}: FeatureSectionTableProps) {
    return (
        <div className="space-y-6">
            {/* Meta Section */}
            {meta.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                        <Layers className="h-4 w-4" /> Section Meta
                    </h4>
                    <div className="rounded-lg border dark:border-gray-800 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead>Badge</TableHead>
                                    <TableHead>Heading</TableHead>
                                    <TableHead>Highlight</TableHead>
                                    <TableHead>Stats</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {meta.map((item) => (
                                    <TableRow key={item._id} className="group hover:bg-muted/30 transition-colors">
                                        <TableCell>
                                            <Badge variant="secondary" className="text-xs">
                                                {item.badgeText}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-medium text-foreground">{item.heading}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-primary font-medium">{item.highlightText}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-muted-foreground">
                                                {item.stats?.length || 0} stats
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={item.isActive ? "default" : "outline"} className="text-xs">
                                                {item.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => onEditMeta(item)}
                                                    className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => onDeleteMeta(item)}
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
                </div>
            )}

            {/* Cards Section */}
            <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" /> Feature Cards
                </h4>
                <div className="rounded-lg border dark:border-gray-800 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-16">Order</TableHead>
                                <TableHead>Icon</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Badge</TableHead>
                                <TableHead>Stats</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cards.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                                        No feature cards yet
                                    </TableCell>
                                </TableRow>
                            ) : (
                                cards.map((item) => (
                                    <TableRow key={item._id} className="group hover:bg-muted/30 transition-colors">
                                        <TableCell>
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                                {item.order}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Sparkles className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium">{item.icon}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </div>
                                                <div className="text-xs text-muted-foreground line-clamp-1">
                                                    {item.description}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {item.badge && (
                                                <Badge variant="secondary" className="text-xs">
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs text-muted-foreground">{item.stats || "—"}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={item.isActive ? "default" : "outline"} className="text-xs">
                                                {item.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => onEditCard(item)}
                                                    className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => onDeleteCard(item)}
                                                    className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
