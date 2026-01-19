import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricsGrid } from "@/components/MetricsGrid";
import { PageHeader } from "@/components/PageHeader";
import { CustomCardBuilderAdvanced, CustomCardAdvanced } from "@/components/CustomCardBuilderAdvanced";
import { CustomDashboardCardAdvanced } from "@/components/CustomDashboardCardAdvanced";
import { Users, Building2, CreditCard, DollarSign, Save, RotateCcw, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { dashboardMetrics, organizationsGrowthData, userActivityData } from "@/data/data";
import { useState, useRef, useEffect } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { toast } from "sonner";
import { getDashboardData } from "@/ApiService/dashboard";
import { Skeleton } from "@/components/ui/skeleton";

const DEFAULT_LAYOUT: Layout[] = [];
const STORAGE_KEY = "dashboard-layout";
const CARDS_STORAGE_KEY = "dashboard-cards";

interface DashboardData {
  overview: {
    totalOrganizations: {
      value: number;
      change: string;
      trend: "up" | "down";
      description: string;
    };
    totalUsers: {
      value: number;
      change: string;
      trend: "up" | "down";
      description: string;
    };
    activeSubscriptions: {
      value: number;
      change: string;
      trend: "up" | "down";
      description: string;
    };
    monthlyRevenue: {
      value: number;
      formatted: string;
      change: string;
      trend: "up" | "down";
      description: string;
    };
  };
  charts: {
    organizationGrowth: Array<{
      month: string;
      year: number;
      count: number;
    }>;
    userActivityTrends: Array<{
      month: string;
      year: number;
      activeUsers: number;
      totalUsers: number;
    }>;
  };
  recentActivity: Array<{
    name: string;
    action: string;
    plan: string;
    timeAgo: string;
  }>;
  distributions: {
    status: Array<{
      _id: string;
      count: number;
    }>;
    plans: Array<{
      _id: string;
      count: number;
      revenue: number;
    }>;
  };
}

const Dashboard = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState(1200);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    fetchDashboardData();
  }, []);

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

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await getDashboardData();
      
      if (response.success && response.data) {
        setDashboardData(response.data);
      } else {
        throw new Error("Failed to fetch dashboard data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const formatChartData = () => {
    if (!dashboardData) return { orgGrowth: [], userActivity: [] };

    // Transform organization growth data for chart
    const orgGrowth = dashboardData.charts.organizationGrowth.map(item => ({
      month: `${item.month} ${item.year.toString().slice(-2)}`,
      organizations: item.count
    }));

    // Transform user activity data for chart
    const userActivity = dashboardData.charts.userActivityTrends.map(item => ({
      month: `${item.month} ${item.year.toString().slice(-2)}`,
      active: item.activeUsers,
      inactive: item.totalUsers - item.activeUsers,
      total: item.totalUsers
    }));

    return { orgGrowth, userActivity };
  };

  const getTrendIcon = (trend: "up" | "down") => {
    return trend === "up" ? TrendingUp : TrendingDown;
  };

  const metrics = dashboardData ? [
    {
      title: "Total Organizations",
      value: dashboardData.overview.totalOrganizations.value.toString(),
      icon: Building2,
      trend: {
        value: dashboardData.overview.totalOrganizations.change,
        isPositive: dashboardData.overview.totalOrganizations.trend === "up",
        description: dashboardData.overview.totalOrganizations.description,
        icon: getTrendIcon(dashboardData.overview.totalOrganizations.trend)
      },
    },
    {
      title: "Total Users",
      value: dashboardData.overview.totalUsers.value.toString(),
      icon: Users,
      trend: {
        value: dashboardData.overview.totalUsers.change,
        isPositive: dashboardData.overview.totalUsers.trend === "up",
        description: dashboardData.overview.totalUsers.description,
        icon: getTrendIcon(dashboardData.overview.totalUsers.trend)
      },
    },
    {
      title: "Active Subscriptions",
      value: dashboardData.overview.activeSubscriptions.value.toString(),
      icon: CreditCard,
      trend: {
        value: dashboardData.overview.activeSubscriptions.change,
        isPositive: dashboardData.overview.activeSubscriptions.trend === "up",
        description: dashboardData.overview.activeSubscriptions.description,
        icon: getTrendIcon(dashboardData.overview.activeSubscriptions.trend)
      },
    },
    {
      title: "Monthly Revenue",
      value: dashboardData.overview.monthlyRevenue.formatted,
      icon: DollarSign,
      trend: {
        value: dashboardData.overview.monthlyRevenue.change,
        isPositive: dashboardData.overview.monthlyRevenue.trend === "up",
        description: dashboardData.overview.monthlyRevenue.description,
        icon: getTrendIcon(dashboardData.overview.monthlyRevenue.trend)
      },
    },
  ] : [];

  const chartData = formatChartData();

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

  const handleRefreshData = () => {
    fetchDashboardData();
    toast.success("Dashboard data refreshed!");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Overview of your platform"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-8 w-24 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Overview of your platform"
          action={
            <Button onClick={fetchDashboardData}>
              Retry
            </Button>
          }
        />
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-destructive mb-4">Error: {error}</p>
            <Button onClick={fetchDashboardData}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* <PageHeader
        title="Dashboard"
        description="Overview of your platform"
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRefreshData}>
              Refresh Data
            </Button>
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
      /> */}

      {dashboardData && <MetricsGrid metrics={metrics} columns={4} />}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Organizations Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.orgGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    fontSize: "12px"
                  }}
                  formatter={(value) => [`${value} organizations`, "Count"]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar 
                  dataKey="organizations" 
                  fill="hsl(var(--primary))" 
                  radius={[8, 8, 0, 0]}
                  name="Organizations"
                />
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
              <LineChart data={chartData.userActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    fontSize: "12px"
                  }}
                  formatter={(value, name) => {
                    if (name === "active") return [`${value} users`, "Active Users"];
                    if (name === "inactive") return [`${value} users`, "Inactive Users"];
                    return [`${value} users`, "Total Users"];
                  }}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="active" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Active Users"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="inactive" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  name="Inactive Users"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {dashboardData && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.distributions.plans.map((plan, index) => (
                  <div key={plan._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{
                        backgroundColor: `hsl(var(--primary) / ${0.8 - index * 0.2})`
                      }} />
                      <span className="font-medium">{plan._id}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{plan.count} subscriptions</div>
                      <div className="text-sm text-muted-foreground">${plan.revenue} revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organization Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.distributions.status.map((status) => (
                  <div key={status._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        status._id === 'active' ? 'bg-green-500' : 
                        status._id === 'inactive' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`} />
                      <span className="font-medium capitalize">{status._id}</span>
                    </div>
                    <div className="text-lg font-bold">{status.count}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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

      {dashboardData && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-foreground">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.plan}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.timeAgo}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;