import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, TrendingUp, Shield, Zap, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PricingAddDialog from "@/components/Pricing/PricingAddDialog";
import PricingEditDialog from "@/components/Pricing/PricingEditDialog";
import PricingDeleteDialog from "@/components/Pricing/PricingDeleteDialog";
import PricingDetailDialog from "@/components/Pricing/PricingDetailDialog";
import { PricingTable } from "@/components/Pricing/PricingTable";
import { getPricing } from "@/ApiService/PricingServices";

export default function Pricing() {
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalPlans: 0,
    activePlans: 0,
    featuredPlans: 0,
    data: [],
  });
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getPricing();
      const plans = res.data || [];
      console.log("Pricing Plans1:", plans);
      setStats({
        totalPlans: plans.length,
        activePlans: plans.filter(p => p.isActive).length,
        featuredPlans: plans.filter(p => p.highlighted).length,
        data: plans,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load pricing data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
   
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
    toast({
      title: "Refreshed",
      description: "Pricing data updated",
    });
  };
console.log("Pricing Stats:", stats);
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pricing Plans</h1>
          <p className="text-muted-foreground">
            Manage subscription plans and pricing tiers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Plan
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Plans</p>
                <p className="text-2xl font-bold">{stats.totalPlans}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Plans</p>
                <p className="text-2xl font-bold">{stats.activePlans}</p>
              </div>
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Featured Plans</p>
                <p className="text-2xl font-bold">{stats.featuredPlans}</p>
              </div>
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <CardTitle>All Pricing Plans</CardTitle>
              <CardDescription>
                View and manage all subscription plans
              </CardDescription>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4 md:mt-0">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <PricingTable
            onEdit={(item) => setEditItem(item)}
            onDelete={(item) => setDeleteItem(item)}
            onView={(item) => setDetailItem(item)}
            loading={loading}
            data={stats.data}
          />
        </CardContent>
      </Card>

      {/* Dialogs */}
      <PricingAddDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={fetchData}
      />
      
      <PricingEditDialog
        open={!!editItem}
        item={editItem}
        onClose={() => setEditItem(null)}
        onSuccess={fetchData}
      />
      
      <PricingDeleteDialog
        open={!!deleteItem}
        item={deleteItem}
        onClose={() => setDeleteItem(null)}
        onSuccess={fetchData}
      />
      
      <PricingDetailDialog
        open={!!detailItem}
        item={detailItem}
        onClose={() => setDetailItem(null)}
      />
    </div>
  );
}