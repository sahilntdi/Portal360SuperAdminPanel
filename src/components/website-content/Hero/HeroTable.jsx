// components/website-content/Hero/HeroTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Trash2,
  Globe,
  Type,
  Image as ImageIcon,
  Link2,
  Users,
  Sparkles
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function HeroTable({ items, onEdit, onDelete, onToggleStatus }) {
  // Ensure items is always an array
  const heroes = Array.isArray(items) ? items : [];
  
  return (
    <div className="rounded-lg border dark:border-gray-800 overflow-hidden bg-card">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="w-[300px]">Hero Details</TableHead>
            <TableHead>Dynamic Words</TableHead>
            <TableHead className="w-24">Status</TableHead>
            <TableHead className="text-right w-32">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {heroes.length > 0 ? (
            heroes.map((hero) => (
              <TableRow key={hero._id || hero.id} className="group hover:bg-muted/20">
                <TableCell>
                  <div className="space-y-3">
                    {/* Badge */}
                    {hero.badgeText && (
                      <Badge variant="secondary" className="text-xs">
                        {hero.badgeText}
                      </Badge>
                    )}
                    
                    {/* Title */}
                    <div>
                      <div className="font-medium text-foreground flex items-center gap-2">
                        <Type className="h-4 w-4 text-muted-foreground" />
                        {hero.heroTitle || "Untitled"}
                      </div>
                      {hero.dynamicPrefix && (
                        <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                          <Sparkles className="h-3.5 w-3.5" />
                          {hero.dynamicPrefix} [rotating words]
                        </div>
                      )}
                    </div>
                    
                    {/* Description */}
                    {hero.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {hero.description}
                      </p>
                    )}
                    
                    {/* Metadata */}
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {hero.backgroundImage && (
                        <span className="flex items-center gap-1">
                          <ImageIcon className="h-3.5 w-3.5" />
                          Has Image
                        </span>
                      )}
                      {hero.ctaPrimary?.text && (
                        <span className="flex items-center gap-1">
                          <Link2 className="h-3.5 w-3.5" />
                          {hero.ctaPrimary.text}
                        </span>
                      )}
                      {hero.socialProofText && (
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          Social Proof
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex flex-wrap gap-1.5 max-w-[250px]">
                    {hero.dynamicWords?.map((wordObj, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {wordObj.word || wordObj}
                      </Badge>
                    ))}
                    {(!hero.dynamicWords || hero.dynamicWords.length === 0) && (
                      <span className="text-xs text-muted-foreground">No dynamic words</span>
                    )}
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={hero.isActive || false}
                      onCheckedChange={() => onToggleStatus(hero)}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <Badge 
                      variant={hero.isActive ? "default" : "secondary"}
                      className="ml-2"
                    >
                      {hero.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(hero)}
                      className="h-8 w-8 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                <div className="flex flex-col items-center justify-center">
                  <Globe className="h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium text-foreground mb-1">No Hero Sections</h3>
                  <p className="text-sm text-muted-foreground">Add your first hero section to get started.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}