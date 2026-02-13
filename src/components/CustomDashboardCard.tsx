import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Table as TableIcon, BarChart3, FileText } from "lucide-react";
import { CustomCard } from "./CustomCardBuilder";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CustomDashboardCardProps {
  card: CustomCard;
  onRemove: (id: string) => void;
}

// Mock data for different views
const mockTableData = [
  { name: "Item 1", value: "Value 1", status: "Active" },
  { name: "Item 2", value: "Value 2", status: "Inactive" },
  { name: "Item 3", value: "Value 3", status: "Active" },
];

const mockChartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
];

export function CustomDashboardCard({ card, onRemove }: CustomDashboardCardProps) {
  const renderContent = () => {
    switch (card.viewType) {
      case "table":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTableData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case "chart":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "summary":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">124</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-success">98</p>
              </div>
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Filter: <span className="font-medium text-foreground">{card.filterBy}</span> = {card.filterValue}
              </p>
            </div>
          </div>
        );
    }
  };

  const getIcon = () => {
    switch (card.viewType) {
      case "table":
        return <TableIcon className="h-4 w-4" />;
      case "chart":
        return <BarChart3 className="h-4 w-4" />;
      case "summary":
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          {getIcon()}
          <CardTitle className="text-lg">{card.title}</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onRemove(card.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}
