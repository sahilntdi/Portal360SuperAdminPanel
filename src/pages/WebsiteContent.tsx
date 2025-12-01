import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

import { WebsiteContentService } from "@/ApiService";

/* HOW IT WORKS */
import { HowItWorksTable } from "@/components/website-content/HowItWorks/HowItWorksTable";
import { HowItWorksAddDialog } from "@/components/website-content/HowItWorks/HowItWorksAddDialog";
import { HowItWorksEditDialog } from "@/components/website-content/HowItWorks/HowItWorksEditDialog";
import { HowItWorksDeleteDialog } from "@/components/website-content/HowItWorks/HowItWorksDeleteDialog";

/* FAQ */
import { FAQTable } from "@/components/website-content/FAQ/FAQTable";
import { FAQAddDialog } from "@/components/website-content/FAQ/FAQAddDialog";
import { FAQEditDialog } from "@/components/website-content/FAQ/FAQEditDialog";
import { FAQDeleteDialog } from "@/components/website-content/FAQ/FAQDeleteDialog";

/* TESTIMONIALS */
import { TestimonialTable } from "@/components/website-content/Testimonials/TestimonialTable";
import { TestimonialAddDialog } from "@/components/website-content/Testimonials/TestimonialAddDialog";
import { TestimonialEditDialog } from "@/components/website-content/Testimonials/TestimonialEditDialog";
import { TestimonialDeleteDialog } from "@/components/website-content/Testimonials/TestimonialDeleteDialog";

/* BLOGS */
import { BlogTable } from "@/components/website-content/Blogs/BlogTable";
import { BlogAddDialog } from "@/components/website-content/Blogs/BlogAddDialog";
import { BlogEditDialog } from "@/components/website-content/Blogs/BlogEditDialog";
import { BlogDeleteDialog } from "@/components/website-content/Blogs/BlogDeleteDialog";

/* MODERN TEAMS */
import { ModernTeamTable } from "@/components/website-content/ModernTeams/ModernTeamTable";
import { ModernTeamAddDialog } from "@/components/website-content/ModernTeams/ModernTeamAddDialog";
import { ModernTeamEditDialog } from "@/components/website-content/ModernTeams/ModernTeamEditDialog";
import { ModernTeamDeleteDialog } from "@/components/website-content/ModernTeams/ModernTeamDeleteDialog";

/* SUPERADMIN CONTROLS */
import { SuperadminTable } from "@/components/website-content/SuperadminControls/SuperadminTable";
import { SuperadminAddDialog } from "@/components/website-content/SuperadminControls/SuperadminAddDialog";
import { SuperadminEditDialog } from "@/components/website-content/SuperadminControls/SuperadminEditDialog";
import { SuperadminDeleteDialog } from "@/components/website-content/SuperadminControls/SuperadminDeleteDialog";

/* INTEGRATIONS */
import { IntegrationTable } from "@/components/website-content/Integrations/IntegrationTable";
import { IntegrationAddDialog } from "@/components/website-content/Integrations/IntegrationAddDialog";
import { IntegrationEditDialog } from "@/components/website-content/Integrations/IntegrationEditDialog";
import { IntegrationDeleteDialog } from "@/components/website-content/Integrations/IntegrationDeleteDialog";

export default function WebsiteContentPage() {
  /* -------------------- HOW IT WORKS -------------------- */
  const [steps, setSteps] = useState([]);
  const [addStepOpen, setAddStepOpen] = useState(false);
  const [editStepOpen, setEditStepOpen] = useState(false);
  const [deleteStepOpen, setDeleteStepOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);

  const loadSteps = async () => {
    try {
      const res = await WebsiteContentService.getHowItWorks();
      setSteps(res.data?.data?.steps || res.data?.data || []);
    } catch {
      toast.error("Failed to load How It Works");
    }
  };

  const handleAddStep = async (data) => {
    await WebsiteContentService.addStep(data);
    toast.success("Step added");
    loadSteps();
  };

  const handleEditStep = async (data) => {
    await WebsiteContentService.updateStep(data.id, data);
    toast.success("Step updated");
    loadSteps();
  };

  const handleDeleteStep = async (id) => {
    await WebsiteContentService.deleteStep(id);
    toast.success("Step deleted");
    loadSteps();
  };

  /* -------------------- FAQ -------------------- */
  const [faqs, setFaqs] = useState([]);
  const [addFAQOpen, setAddFAQOpen] = useState(false);
  const [editFAQOpen, setEditFAQOpen] = useState(false);
  const [deleteFAQOpen, setDeleteFAQOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  const loadFAQs = async () => {
    try {
      const res = await WebsiteContentService.getFAQ();
      setFaqs(res.data?.data?.faqs || res.data?.data || []);
    } catch {
      toast.error("Failed to load FAQs");
    }
  };

  const handleAddFAQ = async (data) => {
    await WebsiteContentService.addFAQ(data);
    toast.success("FAQ added");
    loadFAQs();
  };

  const handleEditFAQ = async (data) => {
    await WebsiteContentService.updateFAQ(data.id, data);
    toast.success("FAQ updated");
    loadFAQs();
  };

  const handleDeleteFAQ = async (id) => {
    await WebsiteContentService.deleteFAQ(id);
    toast.success("FAQ deleted");
    loadFAQs();
  };

  /* -------------------- TESTIMONIALS -------------------- */
  const [testimonials, setTestimonials] = useState([]);
  const [addTestimonialOpen, setAddTestimonialOpen] = useState(false);
  const [editTestimonialOpen, setEditTestimonialOpen] = useState(false);
  const [deleteTestimonialOpen, setDeleteTestimonialOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const loadTestimonials = async () => {
    try {
      const res = await WebsiteContentService.getTestimonials();
      setTestimonials(res.data?.data?.testimonials || res.data?.data || []);
    } catch {
      toast.error("Failed to load Testimonials");
    }
  };

  const handleAddTestimonial = async (data) => {
    await WebsiteContentService.addTestimonial(data);
    toast.success("Testimonial added");
    loadTestimonials();
  };

  const handleEditTestimonial = async (data) => {
    await WebsiteContentService.updateTestimonial(data.id, data);
    toast.success("Testimonial updated");
    loadTestimonials();
  };

  const handleDeleteTestimonial = async (id) => {
    await WebsiteContentService.deleteTestimonial(id);
    toast.success("Testimonial deleted");
    loadTestimonials();
  };

  /* -------------------- BLOGS -------------------- */
  const [blogs, setBlogs] = useState([]);
  const [addBlogOpen, setAddBlogOpen] = useState(false);
  const [editBlogOpen, setEditBlogOpen] = useState(false);
  const [deleteBlogOpen, setDeleteBlogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const loadBlogs = async () => {
    try {
      const res = await WebsiteContentService.getBlogs();
      setBlogs(res.data?.data?.blogs || res.data?.data || []);
    } catch {
      toast.error("Failed to load Blogs");
    }
  };

  const handleAddBlog = async (data) => {
    await WebsiteContentService.addBlog(data);
    toast.success("Blog added");
    loadBlogs();
  };

  const handleEditBlog = async (data) => {
    await WebsiteContentService.updateBlog(data.id, data);
    toast.success("Blog updated");
    loadBlogs();
  };

  const handleDeleteBlog = async (id) => {
    await WebsiteContentService.deleteBlog(id);
    toast.success("Blog deleted");
    loadBlogs();
  };

  /* -------------------- MODERN TEAMS -------------------- */
  const [modernTeams, setModernTeams] = useState([]);
  const [addModernOpen, setAddModernOpen] = useState(false);
  const [editModernOpen, setEditModernOpen] = useState(false);
  const [deleteModernOpen, setDeleteModernOpen] = useState(false);
  const [selectedModern, setSelectedModern] = useState(null);

  const loadModernTeams = async () => {
    try {
      const res = await WebsiteContentService.getModernTeams();
      setModernTeams(res.data?.data?.modernTeams || res.data?.data || []);
    } catch {
      toast.error("Failed to load Modern Teams");
    }
  };

  const handleAddModern = async (data) => {
    await WebsiteContentService.addModernTeam(data);
    toast.success("Modern Team item added");
    loadModernTeams();
  };

  const handleEditModern = async (data) => {
    await WebsiteContentService.updateModernTeam(data.id, data);
    toast.success("Modern Team item updated");
    loadModernTeams();
  };

  const handleDeleteModern = async (id) => {
    await WebsiteContentService.deleteModernTeam(id);
    toast.success("Modern Team item deleted");
    loadModernTeams();
  };

  /* -------------------- SUPERADMIN CONTROLS -------------------- */
  const [superadmin, setSuperadmin] = useState([]);
  const [addSuperOpen, setAddSuperOpen] = useState(false);
  const [editSuperOpen, setEditSuperOpen] = useState(false);
  const [deleteSuperOpen, setDeleteSuperOpen] = useState(false);
  const [selectedSuper, setSelectedSuper] = useState(null);

  const loadSuperadmin = async () => {
    try {
      const res = await WebsiteContentService.getSuperadminControls();
      setSuperadmin(res.data?.data?.controls || res.data?.data || []);
    } catch {
      toast.error("Failed to load Superadmin Controls");
    }
  };

  const handleAddSuper = async (data) => {
    await WebsiteContentService.addSuperadminControl(data);
    toast.success("Superadmin control added");
    loadSuperadmin();
  };

  const handleEditSuper = async (data) => {
    await WebsiteContentService.updateSuperadminControl(data.id, data);
    toast.success("Superadmin control updated");
    loadSuperadmin();
  };

  const handleDeleteSuper = async (id) => {
    await WebsiteContentService.deleteSuperadminControl(id);
    toast.success("Superadmin control deleted");
    loadSuperadmin();
  };

  /* -------------------- INTEGRATIONS -------------------- */
  const [integrations, setIntegrations] = useState([]);
  const [addIntegrationOpen, setAddIntegrationOpen] = useState(false);
  const [editIntegrationOpen, setEditIntegrationOpen] = useState(false);
  const [deleteIntegrationOpen, setDeleteIntegrationOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const loadIntegrations = async () => {
    try {
      const res = await WebsiteContentService.getIntegrations();
      setIntegrations(res.data?.data?.integrations || res.data?.data || []);
    } catch {
      toast.error("Failed to load Integrations");
    }
  };

  const handleAddIntegration = async (data) => {
    await WebsiteContentService.addIntegration(data);
    toast.success("Integration added");
    loadIntegrations();
  };

  const handleEditIntegration = async (data) => {
    await WebsiteContentService.updateIntegration(data.id, data);
    toast.success("Integration updated");
    loadIntegrations();
  };

  const handleDeleteIntegration = async (id) => {
    await WebsiteContentService.deleteIntegration(id);
    toast.success("Integration deleted");
    loadIntegrations();
  };

  /* -------------------- LOAD ALL -------------------- */
  useEffect(() => {
    loadSteps();
    loadFAQs();
    loadTestimonials();
    loadBlogs();
    loadModernTeams();
    loadSuperadmin();
    loadIntegrations();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Website Content Manager"
        description="Manage all website content sections"
      />

      <Tabs defaultValue="steps" className="space-y-6">
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="steps">How It Works</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="modernTeams">Modern Teams</TabsTrigger>
          <TabsTrigger value="superadmin">Superadmin Controls</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* ============ HOW IT WORKS ============ */}
        <TabsContent value="steps">
          <div className="flex justify-end mb-3">
            <Button onClick={() => setAddStepOpen(true)}>Add Step</Button>
          </div>

          <HowItWorksTable
            steps={steps}
            onEdit={(item) => { setSelectedStep(item); setEditStepOpen(true); }}
            onDelete={(item) => { setSelectedStep(item); setDeleteStepOpen(true); }}
          />

          <HowItWorksAddDialog open={addStepOpen} onClose={() => setAddStepOpen(false)} onSubmit={handleAddStep} />
          <HowItWorksEditDialog open={editStepOpen} item={selectedStep} onClose={() => setEditStepOpen(false)} onSubmit={handleEditStep} />
          <HowItWorksDeleteDialog open={deleteStepOpen} item={selectedStep} onClose={() => setDeleteStepOpen(false)} onSubmit={handleDeleteStep} />
        </TabsContent>

        {/* ============ FAQ ============ */}
        <TabsContent value="faq">
          <div className="flex justify-end mb-3">
            <Button onClick={() => setAddFAQOpen(true)}>Add FAQ</Button>
          </div>

          <FAQTable
            items={faqs}
            onEdit={(item) => { setSelectedFAQ(item); setEditFAQOpen(true); }}
            onDelete={(item) => { setSelectedFAQ(item); setDeleteFAQOpen(true); }}
          />

          <FAQAddDialog open={addFAQOpen} onClose={() => setAddFAQOpen(false)} onSubmit={handleAddFAQ} />
          <FAQEditDialog open={editFAQOpen} item={selectedFAQ} onClose={() => setEditFAQOpen(false)} onSubmit={handleEditFAQ} />
          <FAQDeleteDialog open={deleteFAQOpen} item={selectedFAQ} onClose={() => setDeleteFAQOpen(false)} onSubmit={handleDeleteFAQ} />
        </TabsContent>

        {/* ============ TESTIMONIALS ============ */}
        <TabsContent value="testimonials">
          <div className="flex justify-end mb-3">
            <Button onClick={() => setAddTestimonialOpen(true)}>Add Testimonial</Button>
          </div>

          <TestimonialTable
            items={testimonials}
            onEdit={(item) => { setSelectedTestimonial(item); setEditTestimonialOpen(true); }}
            onDelete={(item) => { setSelectedTestimonial(item); setDeleteTestimonialOpen(true); }}
          />

          <TestimonialAddDialog open={addTestimonialOpen} onClose={() => setAddTestimonialOpen(false)} onSubmit={handleAddTestimonial} />
          <TestimonialEditDialog open={editTestimonialOpen} item={selectedTestimonial} onClose={() => setEditTestimonialOpen(false)} onSubmit={handleEditTestimonial} />
          <TestimonialDeleteDialog open={deleteTestimonialOpen} item={selectedTestimonial} onClose={() => setDeleteTestimonialOpen(false)} onSubmit={handleDeleteTestimonial} />
        </TabsContent>

        {/* ============ BLOGS ============ */}
        <TabsContent value="blogs">
          <div className="flex justify-end mb-3">
            <Button onClick={() => setAddBlogOpen(true)}>Add Blog</Button>
          </div>

          <BlogTable
            items={blogs}
            onEdit={(item) => { setSelectedBlog(item); setEditBlogOpen(true); }}
            onDelete={(item) => { setSelectedBlog(item); setDeleteBlogOpen(true); }}
          />

          <BlogAddDialog open={addBlogOpen} onClose={() => setAddBlogOpen(false)} onSubmit={handleAddBlog} />
          <BlogEditDialog open={editBlogOpen} item={selectedBlog} onClose={() => setEditBlogOpen(false)} onSubmit={handleEditBlog} />
          <BlogDeleteDialog open={deleteBlogOpen} item={selectedBlog} onClose={() => setDeleteBlogOpen(false)} onSubmit={handleDeleteBlog} />
        </TabsContent>

        {/* ============ MODERN TEAMS ============ */}
        <TabsContent value="modernTeams">
          <div className="flex justify-end mb-3">
            <Button onClick={() => setAddModernOpen(true)}>Add Modern Teams Item</Button>
          </div>

          <ModernTeamTable
            items={modernTeams}
            onEdit={(item) => { setSelectedModern(item); setEditModernOpen(true); }}
            onDelete={(item) => { setSelectedModern(item); setDeleteModernOpen(true); }}
          />

          <ModernTeamAddDialog open={addModernOpen} onClose={() => setAddModernOpen(false)} onSubmit={handleAddModern} />
          <ModernTeamEditDialog open={editModernOpen} item={selectedModern} onClose={() => setEditModernOpen(false)} onSubmit={handleEditModern} />
          <ModernTeamDeleteDialog open={deleteModernOpen} item={selectedModern} onClose={() => setDeleteModernOpen(false)} onSubmit={handleDeleteModern} />
        </TabsContent>

        {/* ============ SUPERADMIN CONTROLS ============ */}
        <TabsContent value="superadmin">
          <div className="flex justify-end mb-3">
            <Button onClick={() => setAddSuperOpen(true)}>Add Superadmin Control</Button>
          </div>

          <SuperadminTable
            items={superadmin}
            onEdit={(item) => { setSelectedSuper(item); setEditSuperOpen(true); }}
            onDelete={(item) => { setSelectedSuper(item); setDeleteSuperOpen(true); }}
          />

          <SuperadminAddDialog open={addSuperOpen} onClose={() => setAddSuperOpen(false)} onSubmit={handleAddSuper} />
          <SuperadminEditDialog open={editSuperOpen} item={selectedSuper} onClose={() => setEditSuperOpen(false)} onSubmit={handleEditSuper} />
          <SuperadminDeleteDialog open={deleteSuperOpen} item={selectedSuper} onClose={() => setDeleteSuperOpen(false)} onSubmit={handleDeleteSuper} />
        </TabsContent>

        {/* ============ INTEGRATIONS ============ */}
        <TabsContent value="integrations">
          <div className="flex justify-end mb-3">
            <Button onClick={() => setAddIntegrationOpen(true)}>Add Integration</Button>
          </div>

          <IntegrationTable
            items={integrations}
            onEdit={(item) => { setSelectedIntegration(item); setEditIntegrationOpen(true); }}
            onDelete={(item) => { setSelectedIntegration(item); setDeleteIntegrationOpen(true); }}
          />

          <IntegrationAddDialog open={addIntegrationOpen} onClose={() => setAddIntegrationOpen(false)} onSubmit={handleAddIntegration} />
          <IntegrationEditDialog open={editIntegrationOpen} onClose={() => setEditIntegrationOpen(false)} item={selectedIntegration} onSubmit={handleEditIntegration} />
          <IntegrationDeleteDialog open={deleteIntegrationOpen} onClose={() => setDeleteIntegrationOpen(false)} item={selectedIntegration} onSubmit={handleDeleteIntegration} />

        </TabsContent>

      </Tabs>
    </div>
  );
}
