import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export interface CustomCard {
  id: string;
  title: string;
  viewType: "table" | "chart" | "summary";
  filterBy: string;
  filterValue: string;
}

interface CustomCardBuilderProps {
  onAddCard: (card: CustomCard) => void;
}

export function CustomCardBuilder({ onAddCard }: CustomCardBuilderProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    viewType: "table" | "chart" | "summary";
    filterBy: string;
    filterValue: string;
  }>({
    title: "",
    viewType: "table",
    filterBy: "",
    filterValue: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: CustomCard = {
      id: Date.now().toString(),
      ...formData,
    };
    onAddCard(newCard);
    toast.success("Custom card added to dashboard!");
    setOpen(false);
    setFormData({ title: "", viewType: "table", filterBy: "", filterValue: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Custom Card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Custom Dashboard Card</DialogTitle>
          <DialogDescription>
            Configure filters and view type for your custom card.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Card Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Revenue by Region"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="viewType">View Type</Label>
              <Select
                value={formData.viewType}
                onValueChange={(value: "table" | "chart" | "summary") =>
                  setFormData({ ...formData, viewType: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select view type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="table">Table View</SelectItem>
                  <SelectItem value="chart">Chart View</SelectItem>
                  <SelectItem value="summary">Summary View</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="filterBy">Filter By</Label>
              <Select
                value={formData.filterBy}
                onValueChange={(value) => setFormData({ ...formData, filterBy: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select filter criteria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="person">Person</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                  <SelectItem value="plan">Plan</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="date">Date Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="filterValue">Filter Value</Label>
              <Input
                id="filterValue"
                value={formData.filterValue}
                onChange={(e) => setFormData({ ...formData, filterValue: e.target.value })}
                placeholder="Enter filter value"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Card</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
