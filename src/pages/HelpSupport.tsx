import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/PageHeader";
import {
  Upload,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  HelpCircle,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  getSupportFaqs,
  createSupportFaq,
  updateSupportFaq,
  deleteSupportFaq,
} from "@/ApiService/helpandSupportFaq";

import { SupportFaqDialog } from "@/components/helpSupport/SupportFaqDialog";

export default function HelpSupport() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editFaq, setEditFaq] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const loadFaqs = async () => {
    setLoading(true);
    const res = await getSupportFaqs();
    setFaqs(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleSave = async (data: any) => {
    if (editFaq) {
      await updateSupportFaq(editFaq._id, data);
    } else {
      await createSupportFaq(data);
    }
    setOpen(false);
    setEditFaq(null);
    loadFaqs();
  };

  const handleDelete = async (id: string) => {
    await deleteSupportFaq(id);
    loadFaqs();
  };

  const filteredFaqs = faqs.filter((f) =>
    f.question?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Help & Support"
        description="Manage FAQs for support page"
      />

      {/* Actions */}
      <div className="flex items-center justify-between gap-4">
        <Button onClick={() => setOpen(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Add FAQ
        </Button>

        <div className="relative w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search FAQs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!loading && filteredFaqs.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="text-center py-10">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <HelpCircle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium">No FAQs found</p>
                    <p className="text-sm text-muted-foreground">
                      Create your first FAQ to get started
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {filteredFaqs.map((faq) => (
              <TableRow key={faq._id}>
                {/* QUESTION */}
                <TableCell className="max-w-md">
                  <div className="font-medium truncate">
                    {faq.question}
                  </div>
                </TableCell>

                {/* CATEGORY */}
                <TableCell>
                  <Badge variant="outline">
                    {faq.category || "—"}
                  </Badge>
                </TableCell>

                {/* STATUS */}
                <TableCell>
                  <Badge
                    variant={faq.isActive ? "default" : "secondary"}
                  >
                    {faq.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>

                {/* ACTIONS */}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setEditFaq(faq);
                          setOpen(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit FAQ
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(faq._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete FAQ
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* DIALOG */}
      <SupportFaqDialog
        open={open}
        onClose={() => {
          setOpen(false);
          setEditFaq(null);
        }}
        onSubmit={handleSave}
        initialData={editFaq}
      />
    </div>
  );
}
