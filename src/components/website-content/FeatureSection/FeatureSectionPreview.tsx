import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface FeatureSectionPreviewProps {
    meta: any;
    cards: any[];
}

export function FeatureSectionPreview({ meta, cards }: FeatureSectionPreviewProps) {
    const [darkMode, setDarkMode] = useState(false);

    const getIcon = (iconName: string) => {
        const IconComp = (LucideIcons as any)[iconName];
        return IconComp || LucideIcons.Sparkles;
    };

    if (!meta && cards.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-muted-foreground text-sm border rounded-lg bg-muted/20">
                Add meta or cards to see preview
            </div>
        );
    }

    return (
        <div
            className={cn(
                "rounded-xl border overflow-hidden transition-colors duration-300",
                darkMode ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
            )}
        >
            {/* Dark Mode Toggle */}
            <div className="flex justify-end p-3 border-b border-gray-200 dark:border-gray-800">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDarkMode(!darkMode)}
                    className={cn(
                        "gap-2 text-xs",
                        darkMode && "border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800"
                    )}
                >
                    {darkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                    {darkMode ? "Light" : "Dark"}
                </Button>
            </div>

            <div className="p-6 space-y-6">
                {/* Meta Preview */}
                {meta && (
                    <div className="text-center space-y-4">
                        {meta.badgeText && (
                            <Badge
                                variant="secondary"
                                className={cn(
                                    "text-xs px-3 py-1",
                                    darkMode && "bg-gray-800 text-gray-300"
                                )}
                            >
                                {meta.badgeText}
                            </Badge>
                        )}
                        <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                            {meta.heading}{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {meta.highlightText}
                            </span>
                        </h2>
                        {meta.description && (
                            <p className={cn("text-sm max-w-md mx-auto", darkMode ? "text-gray-400" : "text-gray-600")}>
                                {meta.description}
                            </p>
                        )}

                        {/* Stats */}
                        {meta.stats && meta.stats.length > 0 && (
                            <div className="flex items-center justify-center gap-6 pt-2">
                                {meta.stats.map((stat: any, i: number) => (
                                    <div key={i} className="text-center">
                                        <div className="text-lg font-bold text-primary">{stat.value || "—"}</div>
                                        <div className={cn("text-xs", darkMode ? "text-gray-500" : "text-gray-500")}>
                                            {stat.label || "Label"}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Cards Preview */}
                {cards.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                        {cards
                            .sort((a, b) => (a.order || 0) - (b.order || 0))
                            .map((card, i) => {
                                const IconComp = getIcon(card.icon);
                                const themeData = darkMode ? card.dark || {} : card;

                                return (
                                    <div
                                        key={card._id || i}
                                        className={cn(
                                            "relative rounded-xl border p-4 transition-all duration-300 hover:shadow-lg group overflow-hidden",
                                            darkMode
                                                ? "bg-gray-900 border-gray-800"
                                                : "bg-white border-gray-200 shadow-sm"
                                        )}
                                    >
                                        {/* Badge */}
                                        {card.badge && (
                                            <Badge className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5">
                                                {card.badge}
                                            </Badge>
                                        )}

                                        {/* Icon */}
                                        <div
                                            className={cn(
                                                "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                                                themeData.iconBg || "bg-blue-500"
                                            )}
                                        >
                                            <IconComp className={cn("h-5 w-5", themeData.iconColor || "text-white")} />
                                        </div>

                                        {/* Content */}
                                        <h3 className={cn("font-semibold text-sm mb-1", themeData.textColor)}>
                                            {card.title || "Card Title"}
                                        </h3>
                                        <p className={cn("text-xs line-clamp-2 mb-3", darkMode ? "text-gray-400" : "text-gray-500")}>
                                            {card.description || "Card description"}
                                        </p>

                                        {/* Stats */}
                                        {card.stats && (
                                            <p className={cn("text-xs font-medium", themeData.textColor)}>
                                                {card.stats}
                                            </p>
                                        )}

                                        {/* Progress Bar */}
                                        <div className="mt-3 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                            <div
                                                className={cn(
                                                    "h-full rounded-full w-3/4 transition-all duration-700",
                                                    themeData.progressBar || "bg-blue-500"
                                                )}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                )}
            </div>
        </div>
    );
}
