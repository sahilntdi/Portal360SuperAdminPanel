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
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export interface CardFilter {
  id: string;
  filterBy: string;
  filterValue: string;
}

export interface CustomCardAdvanced {
  id: string;
  title: string;
  viewType: "table" | "chart" | "summary";
  filters: CardFilter[];
}

interface CustomCardBuilderAdvancedProps {
  onAddCard: (card: CustomCardAdvanced) => void;
}

export function CustomCardBuilderAdvanced({ onAddCard }: CustomCardBuilderAdvancedProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [viewType, setViewType] = useState<"table" | "chart" | "summary">("table");
  const [filters, setFilters] = useState<CardFilter[]>([
    { id: "1", filterBy: "", filterValue: "" },
  ]);

  const addFilter = () => {
    setFilters([...filters, { id: Date.now().toString(), filterBy: "", filterValue: "" }]);
  };

  const removeFilter = (id: string) => {
    if (filters.length > 1) {
      setFilters(filters.filter((f) => f.id !== id));
    }
  };

  const updateFilter = (id: string, field: "filterBy" | "filterValue", value: string) => {
    setFilters(filters.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validFilters = filters.filter((f) => f.filterBy && f.filterValue);
    if (validFilters.length === 0) {
      toast.error("Please add at least one complete filter");
      return;
    }

    const newCard: CustomCardAdvanced = {
      id: Date.now().toString(),
      title,
      viewType,
      filters: validFilters,
    };
    onAddCard(newCard);
    toast.success("Custom card added to dashboard!");
    setOpen(false);
    setTitle("");
    setViewType("table");
    setFilters([{ id: "1", filterBy: "", filterValue: "" }]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Custom Card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Revenue by Region"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="viewType">View Type</Label>
              <Select
                value={viewType}
                onValueChange={(value: "table" | "chart" | "summary") => setViewType(value)}
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

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Filters</Label>
                <Button type="button" size="sm" variant="outline" onClick={addFilter}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Filter
                </Button>
              </div>

              {filters.map((filter, index) => (
                <div key={filter.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
                  <div className="grid gap-2">
                    <Label htmlFor={`filterBy-${filter.id}`}>Filter By</Label>
                    <Select
                      value={filter.filterBy}
                      onValueChange={(value) => updateFilter(filter.id, "filterBy", value)}
                      required
                    >
                      <SelectTrigger id={`filterBy-${filter.id}`}>
                        <SelectValue placeholder="Select filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="person">Person</SelectItem>
                        <SelectItem value="organization">Organization</SelectItem>
                        <SelectItem value="plan">Plan</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                        <SelectItem value="date">Date Range</SelectItem>
                        <SelectItem value="region">Region</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`filterValue-${filter.id}`}>Value</Label>
                    <Input
                      id={`filterValue-${filter.id}`}
                      value={filter.filterValue}
                      onChange={(e) => updateFilter(filter.id, "filterValue", e.target.value)}
                      placeholder="Enter value"
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFilter(filter.id)}
                    disabled={filters.length === 1}
                    className="h-10 w-10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
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
