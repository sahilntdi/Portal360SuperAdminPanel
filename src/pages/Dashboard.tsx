import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricsGrid } from "@/components/MetricsGrid";
import { PageHeader } from "@/components/PageHeader";
import { CustomCardBuilderAdvanced, CustomCardAdvanced } from "@/components/CustomCardBuilderAdvanced";
import { CustomDashboardCardAdvanced } from "@/components/CustomDashboardCardAdvanced";
import { Users, Building2, CreditCard, DollarSign, Save, RotateCcw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { dashboardMetrics, organizationsGrowthData, userActivityData } from "@/data/data";
import { useState, useRef, useEffect } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { toast } from "sonner";

const DEFAULT_LAYOUT: Layout[] = [];
const STORAGE_KEY = "dashboard-layout";
const CARDS_STORAGE_KEY = "dashboard-cards";

const Dashboard = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState(1200);

  const [customCards, setCustomCards] = useState<CustomCardAdvanced[]>(() => {
    const saved = localStorage.getItem(CARDS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [layout, setLayout] = useState<Layout[]>(() => {
    const savedLayout = localStorage.getItem(STORAGE_KEY);
    if (savedLayout) {
      return JSON.parse(savedLayout);
    }
    return DEFAULT_LAYOUT;
  });

  useEffect(() => {
    const updateWidth = () => {
      if (gridRef.current) {
        setGridWidth(gridRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const metrics = [
    {
      title: "Total Organizations",
      value: dashboardMetrics.totalOrganizations,
      icon: Building2,
      trend: dashboardMetrics.trends.organizations,
    },
    {
      title: "Total Users",
      value: dashboardMetrics.totalUsers,
      icon: Users,
      trend: dashboardMetrics.trends.users,
    },
    {
      title: "Active Subscriptions",
      value: dashboardMetrics.activeSubscriptions,
      icon: CreditCard,
      trend: dashboardMetrics.trends.subscriptions,
    },
    {
      title: "Monthly Revenue",
      value: dashboardMetrics.monthlyRevenue,
      icon: DollarSign,
      trend: dashboardMetrics.trends.revenue,
    },
  ];

  const handleAddCard = (card: CustomCardAdvanced) => {
    const newCards = [...customCards, card];
    setCustomCards(newCards);
    localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(newCards));

    // Add to layout
    const newLayout: Layout = {
      i: card.id,
      x: (layout.length * 2) % 12,
      y: Infinity,
      w: 6,
      h: 4,
      minW: 3,
      minH: 3,
    };
    const updatedLayout = [...layout, newLayout];
    setLayout(updatedLayout);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLayout));
  };

  const handleRemoveCard = (id: string) => {
    const newCards = customCards.filter((card) => card.id !== id);
    setCustomCards(newCards);
    localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(newCards));

    const newLayout = layout.filter((item) => item.i !== id);
    setLayout(newLayout);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLayout));
  };

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
  };

  const handleSaveLayout = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
    toast.success("Layout saved successfully!");
  };

  const handleResetLayout = () => {
    setLayout(DEFAULT_LAYOUT);
    setCustomCards([]);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CARDS_STORAGE_KEY);
    toast.success("Layout reset to default!");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your platform"
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleResetLayout}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Layout
            </Button>
            <Button variant="outline" size="sm" onClick={handleSaveLayout}>
              <Save className="mr-2 h-4 w-4" />
              Save Layout
            </Button>
            <CustomCardBuilderAdvanced onAddCard={handleAddCard} />
          </div>
        }
      />

      <MetricsGrid metrics={metrics} columns={4} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Organizations Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={organizationsGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="organizations" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Activity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line type="monotone" dataKey="active" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="inactive" stroke="hsl(var(--muted-foreground))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {customCards.length > 0 && (
        <div ref={gridRef}>
          <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={80}
            width={gridWidth}
            onLayoutChange={handleLayoutChange}
            draggableHandle=".drag-handle"
            isResizable={true}
            isDraggable={true}
            compactType="vertical"
          >
            {customCards.map((card) => (
              <div key={card.id} className="bg-background">
                <CustomDashboardCardAdvanced card={card} onRemove={handleRemoveCard} />
              </div>
            ))}
          </GridLayout>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { org: "Acme Corp", action: "Upgraded to Premium plan", time: "2 hours ago" },
              { org: "TechStart Inc", action: "New organization created", time: "5 hours ago" },
              { org: "Global Solutions", action: "Added 5 new users", time: "1 day ago" },
              { org: "Innovation Labs", action: "Payment received", time: "1 day ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-foreground">{activity.org}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
