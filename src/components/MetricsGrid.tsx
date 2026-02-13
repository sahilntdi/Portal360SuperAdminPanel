import { MetricCard } from "@/components/MetricCard";
import { LucideIcon } from "lucide-react";

interface Metric {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  description?: string;
}

interface MetricsGridProps {
  metrics: Metric[];
  columns?: number;
}

export function MetricsGrid({ metrics, columns = 4 }: MetricsGridProps) {
  const gridClass = `grid gap-4 md:grid-cols-${columns}`;
  
  return (
    <div className={gridClass}>
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          trend={metric.trend}
          description={metric.description}
        />
      ))}
    </div>
  );
}
