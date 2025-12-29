import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Lock, AlertTriangle, CheckCircle } from "lucide-react";
import { SecurityFeature } from "./types";

type Props = {
  data: SecurityFeature[];
};

export default function SecurityStats({ data }: Props) {
  // Ensure data is always an array
  const normalizedData = Array.isArray(data) ? data : [data].filter(Boolean);
  
  const activeFeatures = normalizedData.filter(f => f.isActive).length;
  const inactiveFeatures = normalizedData.filter(f => !f.isActive).length;
  const totalFeatures = normalizedData.length;

  const stats = [
    {
      title: "Total Features",
      value: totalFeatures.toString(),
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Security features configured",
      trend: null,
    },
    {
      title: "Active Features",
      value: activeFeatures.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Currently enabled",
      trend: totalFeatures > 0 
        ? { 
            value: `${Math.round((activeFeatures / totalFeatures) * 100)}%`, 
            isPositive: true 
          } 
        : null,
    },
    {
      title: "Inactive Features",
      value: inactiveFeatures.toString(),
      icon: AlertTriangle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      description: "Currently disabled",
      trend: totalFeatures > 0
        ? { 
            value: `${Math.round((inactiveFeatures / totalFeatures) * 100)}%`, 
            isPositive: false 
          }
        : null,
    },
    {
      title: "Security Score",
      value: totalFeatures > 0 
        ? `${Math.round((activeFeatures / totalFeatures) * 100)}%`
        : "0%",
      icon: Lock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Overall security coverage",
      trend: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              {stat.trend && (
                <span className={`text-xs font-medium ${
                  stat.trend.isPositive ? 'text-green-600' : 'text-amber-600'
                }`}>
                  {stat.trend.value}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}