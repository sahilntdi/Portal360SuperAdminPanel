import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Sparkles, Layers } from "lucide-react";

interface MobileFeatureSectionCardProps {
    type: "meta" | "card";
    item: any;
    onEdit: () => void;
    onDelete: () => void;
}

export function MobileFeatureSectionCard({ type, item, onEdit, onDelete }: MobileFeatureSectionCardProps) {
    if (type === "meta") {
        return (
            <Card className="overflow-hidden">
                <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                                <Layers className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="secondary" className="text-[10px]">Meta</Badge>
                                    <Badge variant={item.isActive ? "default" : "outline"} className="text-[10px]">
                                        {item.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                                <h3 className="font-semibold text-sm text-foreground truncate">{item.heading}</h3>
                                {item.badgeText && (
                                    <p className="text-xs text-muted-foreground mt-0.5">{item.badgeText}</p>
                                )}
                                <p className="text-xs text-primary font-medium mt-0.5">{item.highlightText}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {item.stats?.length || 0} stats
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                            <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8">
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={onDelete} className="h-8 w-8 text-red-500">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Badge variant="secondary" className="text-[10px]">Card #{item.order}</Badge>
                                {item.badge && (
                                    <Badge variant="outline" className="text-[10px]">{item.badge}</Badge>
                                )}
                                <Badge variant={item.isActive ? "default" : "outline"} className="text-[10px]">
                                    {item.isActive ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                            <h3 className="font-semibold text-sm text-foreground truncate">{item.title}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{item.description}</p>
                            {item.stats && (
                                <p className="text-xs text-primary font-medium mt-1">{item.stats}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                        <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onDelete} className="h-8 w-8 text-red-500">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
