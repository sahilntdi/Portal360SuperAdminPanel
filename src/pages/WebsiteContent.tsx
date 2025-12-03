// WebsiteContentPage.jsx - Fully Responsive Version
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  PlusCircle,
  Search,
  Filter,
  Download,
  Menu,
  ChevronLeft,
  ChevronRight,
  Grid,
  List
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

import { WebsiteContentService } from "@/ApiService";

// Tables
import { HowItWorksTable } from "@/components/website-content/HowItWorks/HowItWorksTable";
import { FAQTable } from "@/components/website-content/FAQ/FAQTable";
import { TestimonialTable } from "@/components/website-content/Testimonials/TestimonialTable";
import { BlogTable } from "@/components/website-content/Blogs/BlogTable";
import { ModernTeamTable } from "@/components/website-content/ModernTeams/ModernTeamTable";
import { SuperadminTable } from "@/components/website-content/SuperadminControls/SuperadminTable";
import { IntegrationTable } from "@/components/website-content/Integrations/IntegrationTable";

// Dialogs
import { HowItWorksAddDialog } from "@/components/website-content/HowItWorks/HowItWorksAddDialog";
import { HowItWorksEditDialog } from "@/components/website-content/HowItWorks/HowItWorksEditDialog";
import { HowItWorksDeleteDialog } from "@/components/website-content/HowItWorks/HowItWorksDeleteDialog";

import { FAQAddDialog } from "@/components/website-content/FAQ/FAQAddDialog";
import { FAQEditDialog } from "@/components/website-content/FAQ/FAQEditDialog";
import { FAQDeleteDialog } from "@/components/website-content/FAQ/FAQDeleteDialog";

import { TestimonialAddDialog } from "@/components/website-content/Testimonials/TestimonialAddDialog";
import { TestimonialEditDialog } from "@/components/website-content/Testimonials/TestimonialEditDialog";
import { TestimonialDeleteDialog } from "@/components/website-content/Testimonials/TestimonialDeleteDialog";

import { BlogAddDialog } from "@/components/website-content/Blogs/BlogAddDialog";
import { BlogEditDialog } from "@/components/website-content/Blogs/BlogEditDialog";
import { BlogDeleteDialog } from "@/components/website-content/Blogs/BlogDeleteDialog";

import { ModernTeamAddDialog } from "@/components/website-content/ModernTeams/ModernTeamAddDialog";
import { ModernTeamEditDialog } from "@/components/website-content/ModernTeams/ModernTeamEditDialog";
import { ModernTeamDeleteDialog } from "@/components/website-content/ModernTeams/ModernTeamDeleteDialog";

import { SuperadminAddDialog } from "@/components/website-content/SuperadminControls/SuperadminAddDialog";
import { SuperadminEditDialog } from "@/components/website-content/SuperadminControls/SuperadminEditDialog";
import { SuperadminDeleteDialog } from "@/components/website-content/SuperadminControls/SuperadminDeleteDialog";

import { IntegrationAddDialog } from "@/components/website-content/Integrations/IntegrationAddDialog";
import { IntegrationEditDialog } from "@/components/website-content/Integrations/IntegrationEditDialog";
import { IntegrationDeleteDialog } from "@/components/website-content/Integrations/IntegrationDeleteDialog";

// Mobile Components
import { MobileModernTeamCard } from "@/components/website-content/ModernTeams/MobileModernTeamCard";
import { MobileSuperadminCard } from "@/components/website-content/SuperadminControls/MobileSuperadminCard";
import { MobileBlogCard } from "@/components/website-content/Blogs/MobileBlogCard";
import { MobileFAQCard } from "@/components/website-content/FAQ/MobileFAQCard";
import { MobileTestimonialCard } from "@/components/website-content/Testimonials/MobileTestimonialCard";
import { MobileHowItWorksCard } from "@/components/website-content/HowItWorks/MobileHowItWorksCard";
import { MobileIntegrationCard } from "@/components/website-content/Integrations/MobileIntegrationCard";

export default function WebsiteContentPage() {
  const [activeTab, setActiveTab] = useState("steps");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // "table" or "grid"

  // Data states
  const [steps, setSteps] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [modernTeams, setModernTeams] = useState([]);
  const [superadmin, setSuperadmin] = useState([]);
  const [integrations, setIntegrations] = useState([]);

  // Dialog states
  const [addStepOpen, setAddStepOpen] = useState(false);
  const [editStepOpen, setEditStepOpen] = useState(false);
  const [deleteStepOpen, setDeleteStepOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);

  const [addFAQOpen, setAddFAQOpen] = useState(false);
  const [editFAQOpen, setEditFAQOpen] = useState(false);
  const [deleteFAQOpen, setDeleteFAQOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  const [addTestimonialOpen, setAddTestimonialOpen] = useState(false);
  const [editTestimonialOpen, setEditTestimonialOpen] = useState(false);
  const [deleteTestimonialOpen, setDeleteTestimonialOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const [addBlogOpen, setAddBlogOpen] = useState(false);
  const [editBlogOpen, setEditBlogOpen] = useState(false);
  const [deleteBlogOpen, setDeleteBlogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [addModernOpen, setAddModernOpen] = useState(false);
  const [editModernOpen, setEditModernOpen] = useState(false);
  const [deleteModernOpen, setDeleteModernOpen] = useState(false);
  const [selectedModern, setSelectedModern] = useState(null);

  const [addSuperOpen, setAddSuperOpen] = useState(false);
  const [editSuperOpen, setEditSuperOpen] = useState(false);
  const [deleteSuperOpen, setDeleteSuperOpen] = useState(false);
  const [selectedSuper, setSelectedSuper] = useState(null);

  const [addIntegrationOpen, setAddIntegrationOpen] = useState(false);
  const [editIntegrationOpen, setEditIntegrationOpen] = useState(false);
  const [deleteIntegrationOpen, setDeleteIntegrationOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  // Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load data functions
  const loadSteps = async () => {
    try {
      const res = await WebsiteContentService.getHowItWorks();
      setSteps(res.data?.data?.steps || res.data?.data || []);
    } catch {
      toast.error("Failed to load How It Works");
    }
  };

  const loadFAQs = async () => {
    try {
      const res = await WebsiteContentService.getFAQ();
      setFaqs(res.data?.data?.faqs || res.data?.data || []);
    } catch {
      toast.error("Failed to load FAQs");
    }
  };

  const loadTestimonials = async () => {
    try {
      const res = await WebsiteContentService.getTestimonials();
      setTestimonials(res.data?.data?.testimonials || res.data?.data || []);
    } catch {
      toast.error("Failed to load Testimonials");
    }
  };

  const loadBlogs = async () => {
    try {
      const res = await WebsiteContentService.getBlogs();
      setBlogs(res.data?.data?.blogs || res.data?.data || []);
    } catch {
      toast.error("Failed to load Blogs");
    }
  };

  const loadModernTeams = async () => {
    try {
      const res = await WebsiteContentService.getModernTeams();
      setModernTeams(res.data?.data?.modernTeams || res.data?.data || []);
    } catch {
      toast.error("Failed to load Modern Teams");
    }
  };

  const loadSuperadmin = async () => {
    try {
      const res = await WebsiteContentService.getSuperadminControls();
      setSuperadmin(res.data?.data?.controls || res.data?.data || []);
    } catch {
      toast.error("Failed to load Superadmin Controls");
    }
  };

  const loadIntegrations = async () => {
    try {
      const res = await WebsiteContentService.getIntegrations();
      setIntegrations(res.data?.data?.integrations || res.data?.data || []);
    } catch {
      toast.error("Failed to load Integrations");
    }
  };

  // Handlers
  const handleAddStep = async (data) => {
    try {
      await WebsiteContentService.addStep(data);
      toast.success("Step added successfully");
      loadSteps();
    } catch (error) {
      toast.error("Failed to add step");
      console.error(error);
    }
  };

  const handleEditStep = async (data) => {
    try {
      // The data should already contain _id from the form
      const stepId = data._id;
      if (!stepId) {
        toast.error("Step ID is required");
        return;
      }
      await WebsiteContentService.updateStep(stepId, data);
      toast.success("Step updated successfully");
      loadSteps();
    } catch (error) {
      toast.error("Failed to update step");
      console.error(error);
    }
  };

  const handleDeleteStep = async (item) => {
    try {
      const stepId = item._id;
      if (!stepId) {
        toast.error("Step ID is required");
        return;
      }
      await WebsiteContentService.deleteStep(stepId);
      toast.success("Step deleted successfully");
      loadSteps();
    } catch (error) {
      toast.error("Failed to delete step");
      console.error(error);
    }
  };

  // FAQ Handlers
  const handleAddFAQ = async (data) => {
    try {
      await WebsiteContentService.addFAQ(data);
      toast.success("FAQ added successfully");
      loadFAQs();
    } catch (error) {
      toast.error("Failed to add FAQ");
      console.error(error);
    }
  };

  const handleEditFAQ = async (data) => {
    try {
      const faqId = data._id;
      if (!faqId) {
        toast.error("FAQ ID is required");
        return;
      }
      await WebsiteContentService.updateFAQ(faqId, data);
      toast.success("FAQ updated successfully");
      loadFAQs();
    } catch (error) {
      toast.error("Failed to update FAQ");
      console.error(error);
    }
  };

  const handleDeleteFAQ = async (item) => {
    try {
      const faqId = item._id;
      if (!faqId) {
        toast.error("FAQ ID is required");
        return;
      }
      await WebsiteContentService.deleteFAQ(faqId);
      toast.success("FAQ deleted successfully");
      loadFAQs();
    } catch (error) {
      toast.error("Failed to delete FAQ");
      console.error(error);
    }
  };

  // Testimonial Handlers
  // Testimonial Handlers - Add this console logging for debugging
  const handleAddTestimonial = async (data) => {
    try {
      console.log("Adding testimonial:", data);
      const response = await WebsiteContentService.addTestimonial(data);
      console.log("Add testimonial response:", response);
      toast.success("Testimonial added successfully");
      loadTestimonials();
    } catch (error) {
      console.error("Failed to add testimonial:", error);
      toast.error("Failed to add testimonial");
    }
  };

  const handleEditTestimonial = async (data) => {
    try {
      console.log("Editing testimonial:", data);
      const testimonialId = data._id;
      if (!testimonialId) {
        console.error("No _id in testimonial data:", data);
        toast.error("Testimonial ID is required");
        return;
      }
      const response = await WebsiteContentService.updateTestimonial(testimonialId, data);
      console.log("Edit testimonial response:", response);
      toast.success("Testimonial updated successfully");
      loadTestimonials();
    } catch (error) {
      console.error("Failed to update testimonial:", error);
      toast.error("Failed to update testimonial");
    }
  };

  const handleDeleteTestimonial = async (item) => {
    try {
      console.log("Deleting testimonial:", item);
      const testimonialId = item._id;
      if (!testimonialId) {
        console.error("No _id in testimonial item:", item);
        toast.error("Testimonial ID is required");
        return;
      }
      const response = await WebsiteContentService.deleteTestimonial(testimonialId);
      console.log("Delete testimonial response:", response);
      toast.success("Testimonial deleted successfully");
      loadTestimonials();
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
      toast.error("Failed to delete testimonial");
    }
  };

  // Blog Handlers
  // Blog Handlers - Add console logging for debugging
  const handleAddBlog = async (data) => {
    try {
      console.log("Adding blog:", data);
      const response = await WebsiteContentService.addBlog(data);
      console.log("Add blog response:", response);
      toast.success("Blog added successfully");
      loadBlogs();
    } catch (error) {
      console.error("Failed to add blog:", error);
      toast.error("Failed to add blog");
    }
  };

  const handleEditBlog = async (data) => {
    try {
      console.log("Editing blog:", data);
      const blogId = data._id;
      if (!blogId) {
        console.error("No _id in blog data:", data);
        toast.error("Blog ID is required");
        return;
      }
      const response = await WebsiteContentService.updateBlog(blogId, data);
      console.log("Edit blog response:", response);
      toast.success("Blog updated successfully");
      loadBlogs();
    } catch (error) {
      console.error("Failed to update blog:", error);
      toast.error("Failed to update blog");
    }
  };

  const handleDeleteBlog = async (item) => {
    try {
      console.log("Deleting blog:", item);
      const blogId = item._id;
      if (!blogId) {
        console.error("No _id in blog item:", item);
        toast.error("Blog ID is required");
        return;
      }
      const response = await WebsiteContentService.deleteBlog(blogId);
      console.log("Delete blog response:", response);
      toast.success("Blog deleted successfully");
      loadBlogs();
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  // Modern Teams Handlers
  // Modern Teams Handlers - Add console logging for debugging
  const handleAddModern = async (data) => {
    try {
      console.log("Adding modern team:", data);
      const response = await WebsiteContentService.addModernTeam(data);
      console.log("Add modern team response:", response);
      toast.success("Modern Team item added successfully");
      loadModernTeams();
    } catch (error) {
      console.error("Failed to add modern team item:", error);
      toast.error("Failed to add modern team item");
    }
  };

  const handleEditModern = async (data) => {
    try {
      console.log("Editing modern team:", data);
      const modernId = data._id;
      if (!modernId) {
        console.error("No _id in modern team data:", data);
        toast.error("Modern Team ID is required");
        return;
      }
      const response = await WebsiteContentService.updateModernTeam(modernId, data);
      console.log("Edit modern team response:", response);
      toast.success("Modern Team item updated successfully");
      loadModernTeams();
    } catch (error) {
      console.error("Failed to update modern team item:", error);
      toast.error("Failed to update modern team item");
    }
  };

  const handleDeleteModern = async (item) => {
    try {
      console.log("Deleting modern team:", item);
      const modernId = item._id;
      if (!modernId) {
        console.error("No _id in modern team item:", item);
        toast.error("Modern Team ID is required");
        return;
      }
      const response = await WebsiteContentService.deleteModernTeam(modernId);
      console.log("Delete modern team response:", response);
      toast.success("Modern Team item deleted successfully");
      loadModernTeams();
    } catch (error) {
      console.error("Failed to delete modern team item:", error);
      toast.error("Failed to delete modern team item");
    }
  };

  // Superadmin Handlers
  const handleAddSuper = async (data) => {
    try {
      await WebsiteContentService.addSuperadminControl(data);
      toast.success("Superadmin control added successfully");
      loadSuperadmin();
    } catch (error) {
      toast.error("Failed to add superadmin control");
      console.error(error);
    }
  };

  const handleEditSuper = async (data) => {
    try {
      const superId = data._id;
      if (!superId) {
        toast.error("Superadmin Control ID is required");
        return;
      }
      await WebsiteContentService.updateSuperadminControl(superId, data);
      toast.success("Superadmin control updated successfully");
      loadSuperadmin();
    } catch (error) {
      toast.error("Failed to update superadmin control");
      console.error(error);
    }
  };

  const handleDeleteSuper = async (item) => {
    try {
      const superId = item._id;
      if (!superId) {
        toast.error("Superadmin Control ID is required");
        return;
      }
      await WebsiteContentService.deleteSuperadminControl(superId);
      toast.success("Superadmin control deleted successfully");
      loadSuperadmin();
    } catch (error) {
      toast.error("Failed to delete superadmin control");
      console.error(error);
    }
  };

  // Integration Handlers
  // Integration Handlers - Special handling for file uploads
  const handleAddIntegration = async (data) => {
    try {
      console.log("Adding integration:", data);

      // Check if image is a File object
      if (data.image instanceof File) {
        // File upload - handle via FormData
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("order", data.order);
        formData.append("image", data.image);

        const response = await WebsiteContentService.addIntegration(formData);
        console.log("Add integration response:", response);
      } else {
        // URL or no image
        const response = await WebsiteContentService.addIntegration(data);
        console.log("Add integration response:", response);
      }

      toast.success("Integration added successfully");
      loadIntegrations();
    } catch (error) {
      console.error("Failed to add integration:", error);
      toast.error("Failed to add integration");
    }
  };

  const handleEditIntegration = async (data) => {
    try {
      console.log("Editing integration:", data);
      const integrationId = data._id;
      if (!integrationId) {
        console.error("No _id in integration data:", data);
        toast.error("Integration ID is required");
        return;
      }

      // Check if image is a File object
      if (data.image instanceof File) {
        // File upload - handle via FormData
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("order", data.order);
        formData.append("image", data.image);

        const response = await WebsiteContentService.updateIntegration(integrationId, formData);
        console.log("Edit integration response:", response);
      } else if (data.imageUrl) {
        // Existing image URL
        const response = await WebsiteContentService.updateIntegration(integrationId, {
          ...data,
          image: data.imageUrl
        });
        console.log("Edit integration response:", response);
      } else {
        // No image changes
        const response = await WebsiteContentService.updateIntegration(integrationId, data);
        console.log("Edit integration response:", response);
      }

      toast.success("Integration updated successfully");
      loadIntegrations();
    } catch (error) {
      console.error("Failed to update integration:", error);
      toast.error("Failed to update integration");
    }
  };

  const handleDeleteIntegration = async (item) => {
    try {
      console.log("Deleting integration:", item);
      const integrationId = item._id;
      if (!integrationId) {
        console.error("No _id in integration item:", item);
        toast.error("Integration ID is required");
        return;
      }
      const response = await WebsiteContentService.deleteIntegration(integrationId);
      console.log("Delete integration response:", response);
      toast.success("Integration deleted successfully");
      loadIntegrations();
    } catch (error) {
      console.error("Failed to delete integration:", error);
      toast.error("Failed to delete integration");
    }
  };


  // Load all data on mount
  useEffect(() => {
    loadSteps();
    loadFAQs();
    loadTestimonials();
    loadBlogs();
    loadModernTeams();
    loadSuperadmin();
    loadIntegrations();
  }, []);

  // Get stats for the active tab
  const getTabStats = () => {
    const stats = {
      steps: { count: steps.length, color: "bg-blue-500", label: "Steps", singular: "Step" },
      faq: { count: faqs.length, color: "bg-green-500", label: "FAQs", singular: "FAQ" },
      testimonials: { count: testimonials.length, color: "bg-purple-500", label: "Testimonials", singular: "Testimonial" },
      blogs: { count: blogs.length, color: "bg-amber-500", label: "Blogs", singular: "Blog" },
      modernTeams: { count: modernTeams.length, color: "bg-pink-500", label: "Features", singular: "Feature" },
      superadmin: { count: superadmin.length, color: "bg-red-500", label: "Controls", singular: "Control" },
      integrations: { count: integrations.length, color: "bg-indigo-500", label: "Integrations", singular: "Integration" }
    };
    return stats[activeTab] || { count: 0, color: "bg-gray-500", label: "Items", singular: "Item" };
  };


  const tabStats = getTabStats();

  // Render mobile card view
  const renderMobileView = () => {
    switch (activeTab) {
      case "steps":
        return (
          <div className="space-y-4">
            {steps.map((item) => (
              <MobileHowItWorksCard
                key={item._id || item.id}
                item={item}
                onEdit={() => { setSelectedStep(item); setEditStepOpen(true); }}
                onDelete={() => { setSelectedStep(item); setDeleteStepOpen(true); }}
              />
            ))}
          </div>
        );
      case "faq":
        return (
          <div className="space-y-4">
            {faqs.map((item) => (
              <MobileFAQCard
                key={item._id || item.id}
                item={item}
                onEdit={() => { setSelectedFAQ(item); setEditFAQOpen(true); }}
                onDelete={() => { setSelectedFAQ(item); setDeleteFAQOpen(true); }}
              />
            ))}
          </div>
        );
      case "testimonials":
        return (
          <div className="space-y-4">
            {testimonials.map((item) => (
              <MobileTestimonialCard
                key={item._id || item.id}
                item={item}
                onEdit={() => { setSelectedTestimonial(item); setEditTestimonialOpen(true); }}
                onDelete={() => { setSelectedTestimonial(item); setDeleteTestimonialOpen(true); }}
              />
            ))}
          </div>
        );
      case "blogs":
        return (
          <div className="space-y-4">
            {blogs.map((item) => (
              <MobileBlogCard
                key={item._id || item.id}
                item={item}
                onEdit={() => { setSelectedBlog(item); setEditBlogOpen(true); }}
                onDelete={() => { setSelectedBlog(item); setDeleteBlogOpen(true); }}
              />
            ))}
          </div>
        );
      case "modernTeams":
        return (
          <div className="space-y-4">
            {modernTeams.map((item) => (
              <MobileModernTeamCard
                key={item._id || item.id}
                item={item}
                onEdit={() => { setSelectedModern(item); setEditModernOpen(true); }}
                onDelete={() => { setSelectedModern(item); setDeleteModernOpen(true); }}
              />
            ))}
          </div>
        );
      case "superadmin":
        return (
          <div className="space-y-4">
            {superadmin.map((item) => (
              <MobileSuperadminCard
                key={item._id || item.id}
                item={item}
                onEdit={() => { setSelectedSuper(item); setEditSuperOpen(true); }}
                onDelete={() => { setSelectedSuper(item); setDeleteSuperOpen(true); }}
              />
            ))}
          </div>
        );
      case "integrations":
        return (
          <div className="space-y-4">
            {integrations.map((item) => (
              <MobileIntegrationCard
                key={item._id || item.id}
                item={item}
                onEdit={() => { setSelectedIntegration(item); setEditIntegrationOpen(true); }}
                onDelete={() => { setSelectedIntegration(item); setDeleteIntegrationOpen(true); }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  // Render desktop table view
  const renderDesktopView = () => {
    switch (activeTab) {
      case "steps":
        return (
          <HowItWorksTable
            steps={steps}
            onEdit={(item) => { setSelectedStep(item); setEditStepOpen(true); }}
            onDelete={(item) => { setSelectedStep(item); setDeleteStepOpen(true); }}
          />
        );
      case "faq":
        return (
          <FAQTable
            items={faqs}
            onEdit={(item) => { setSelectedFAQ(item); setEditFAQOpen(true); }}
            onDelete={(item) => { setSelectedFAQ(item); setDeleteFAQOpen(true); }}
          />
        );
      case "testimonials":
        return (
          <TestimonialTable
            items={testimonials}
            onEdit={(item) => { setSelectedTestimonial(item); setEditTestimonialOpen(true); }}
            onDelete={(item) => { setSelectedTestimonial(item); setDeleteTestimonialOpen(true); }}
          />
        );
      case "blogs":
        return (
          <BlogTable
            items={blogs}
            onEdit={(item) => { setSelectedBlog(item); setEditBlogOpen(true); }}
            onDelete={(item) => { setSelectedBlog(item); setDeleteBlogOpen(true); }}
          />
        );
      case "modernTeams":
        return (
          <ModernTeamTable
            items={modernTeams}
            onEdit={(item) => { setSelectedModern(item); setEditModernOpen(true); }}
            onDelete={(item) => { setSelectedModern(item); setDeleteModernOpen(true); }}
          />
        );
      case "superadmin":
        return (
          <SuperadminTable
            items={superadmin}
            onEdit={(item) => { setSelectedSuper(item); setEditSuperOpen(true); }}
            onDelete={(item) => { setSelectedSuper(item); setDeleteSuperOpen(true); }}
          />
        );
      case "integrations":
        return (
          <IntegrationTable
            items={integrations}
            onEdit={(item) => { setSelectedIntegration(item); setEditIntegrationOpen(true); }}
            onDelete={(item) => { setSelectedIntegration(item); setDeleteIntegrationOpen(true); }}
          />
        );
      default:
        return null;
    }
  };

  const getAddButtonLabel = () => {
    switch (activeTab) {
      case "steps": return "Add Step";
      case "faq": return "Add FAQ";
      case "testimonials": return "Add Testimonial";
      case "blogs": return "Add Blog";
      case "modernTeams": return "Add Feature";
      case "superadmin": return "Add Control";
      case "integrations": return "Add Integration";
      default: return "Add Item";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 space-y-4 sm:space-y-6 md:space-y-8">

        {/* Header - Responsive */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Website Content
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Manage all website content sections
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`${tabStats.color} text-white border-0 px-3 py-1 text-sm`}>
              {tabStats.count} {tabStats.label}
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <Card className="border shadow-sm dark:shadow-xl dark:shadow-gray-900/20">
          <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center justify-between">
              <div>
                <CardTitle className="text-lg sm:text-xl">Content Management</CardTitle>
                <CardDescription className="text-sm">
                  Select a section to manage content
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full sm:w-48 md:w-64 h-9 text-sm"
                  />
                </div>
                {!isMobile && (
                  <>

                  </>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-3 sm:px-6 pt-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
              {/* Tabs Navigation - Responsive */}
              <ScrollArea className="w-full">
                <TabsList className="inline-flex w-auto h-auto bg-muted/30 p-1 rounded-lg">
                  <div className="flex space-x-1 overflow-x-auto pb-1">
                    <TabsTrigger
                      value="steps"
                      className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-2 text-sm min-w-[auto]"
                    >
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="hidden sm:inline">How It Works</span>
                        <span className="sm:hidden">Steps</span>
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="faq"
                      className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-2 text-sm min-w-[auto]"
                    >
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>FAQ</span>
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="testimonials"
                      className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-2 text-sm min-w-[auto]"
                    >
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <span className="hidden sm:inline">Testimonials</span>
                        <span className="sm:hidden">Reviews</span>
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="blogs"
                      className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-2 text-sm min-w-[auto]"
                    >
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        <span>Blogs</span>
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="modernTeams"
                      className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-2 text-sm min-w-[auto]"
                    >
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                        <span className="hidden sm:inline">Modern Teams</span>
                        <span className="sm:hidden">Teams</span>
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="superadmin"
                      className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-2 text-sm min-w-[auto]"
                    >
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="hidden sm:inline">Superadmin</span>
                        <span className="sm:hidden">Admin</span>
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="integrations"
                      className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-2 text-sm min-w-[auto]"
                    >
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        <span className="hidden sm:inline">Integrations</span>
                        <span className="sm:hidden">Apps</span>
                      </span>
                    </TabsTrigger>
                  </div>
                </TabsList>
              </ScrollArea>

              {/* Tab Contents - Responsive */}
              <TabsContent value={activeTab} className="space-y-4 sm:space-y-6 mt-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {activeTab === "steps" && "How It Works Steps"}
                      {activeTab === "faq" && "Frequently Asked Questions"}
                      {activeTab === "testimonials" && "Customer Testimonials"}
                      {activeTab === "blogs" && "Blog Articles"}
                      {activeTab === "modernTeams" && "Modern Teams Features"}
                      {activeTab === "superadmin" && "Superadmin Controls"}
                      {activeTab === "integrations" && "Integrations"}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activeTab === "steps" && "Manage the step-by-step guide for your users"}
                      {activeTab === "faq" && "Manage questions and answers for your users"}
                      {activeTab === "testimonials" && "Showcase what your customers are saying"}
                      {activeTab === "blogs" && "Manage your blog posts and articles"}
                      {activeTab === "modernTeams" && "Manage team features and capabilities"}
                      {activeTab === "superadmin" && "Manage administrative features and settings"}
                      {activeTab === "integrations" && "Manage third-party integrations and connections"}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      switch (activeTab) {
                        case "steps": setAddStepOpen(true); break;
                        case "faq": setAddFAQOpen(true); break;
                        case "testimonials": setAddTestimonialOpen(true); break;
                        case "blogs": setAddBlogOpen(true); break;
                        case "modernTeams": setAddModernOpen(true); break;
                        case "superadmin": setAddSuperOpen(true); break;
                        case "integrations": setAddIntegrationOpen(true); break;
                      }
                    }}
                    className="gap-2 w-full sm:w-auto"
                    size={isMobile ? "default" : "default"}
                  >
                    <PlusCircle className="h-4 w-4" />
                    {getAddButtonLabel()}
                  </Button>
                </div>

                {/* Empty State */}
                {(activeTab === "steps" && steps.length === 0) ||
                  (activeTab === "faq" && faqs.length === 0) ||
                  (activeTab === "testimonials" && testimonials.length === 0) ||
                  (activeTab === "blogs" && blogs.length === 0) ||
                  (activeTab === "modernTeams" && modernTeams.length === 0) ||
                  (activeTab === "superadmin" && superadmin.length === 0) ||
                  (activeTab === "integrations" && integrations.length === 0) ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                      <PlusCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">No {tabStats.label} Found</h3>
                    <p className="text-muted-foreground mb-6">
                      Get started by adding your first {tabStats.label.toLowerCase()}
                    </p>
                    <Button
                      onClick={() => {
                        switch (activeTab) {
                          case "steps": setAddStepOpen(true); break;
                          case "faq": setAddFAQOpen(true); break;
                          case "testimonials": setAddTestimonialOpen(true); break;
                          case "blogs": setAddBlogOpen(true); break;
                          case "modernTeams": setAddModernOpen(true); break;
                          case "superadmin": setAddSuperOpen(true); break;
                          case "integrations": setAddIntegrationOpen(true); break;
                        }
                      }}
                      className="gap-2"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Add {tabStats.singular}
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Mobile View */}
                    {isMobile && (
                      <div className="space-y-3">
                        {renderMobileView()}
                      </div>
                    )}

                    {/* Desktop View */}
                    {!isMobile && (
                      <div className="overflow-x-auto">
                        {renderDesktopView()}
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <HowItWorksAddDialog open={addStepOpen} onClose={() => setAddStepOpen(false)} onSubmit={handleAddStep} />
      <HowItWorksEditDialog open={editStepOpen} item={selectedStep} onClose={() => setEditStepOpen(false)} onSubmit={handleEditStep} />
      <HowItWorksDeleteDialog
        open={deleteStepOpen}
        item={selectedStep}
        onClose={() => setDeleteStepOpen(false)}
        onSubmit={handleDeleteStep}
      />

      <FAQAddDialog open={addFAQOpen} onClose={() => setAddFAQOpen(false)} onSubmit={handleAddFAQ} />
      <FAQEditDialog open={editFAQOpen} item={selectedFAQ} onClose={() => setEditFAQOpen(false)} onSubmit={handleEditFAQ} />
      <FAQDeleteDialog open={deleteFAQOpen} item={selectedFAQ} onClose={() => setDeleteFAQOpen(false)} onSubmit={handleDeleteFAQ} />

      <TestimonialAddDialog open={addTestimonialOpen} onClose={() => setAddTestimonialOpen(false)} onSubmit={handleAddTestimonial} />
      <TestimonialEditDialog open={editTestimonialOpen} item={selectedTestimonial} onClose={() => setEditTestimonialOpen(false)} onSubmit={handleEditTestimonial} />
      <TestimonialDeleteDialog open={deleteTestimonialOpen} item={selectedTestimonial} onClose={() => setDeleteTestimonialOpen(false)} onSubmit={handleDeleteTestimonial} />

      <BlogAddDialog open={addBlogOpen} onClose={() => setAddBlogOpen(false)} onSubmit={handleAddBlog} />
      <BlogEditDialog open={editBlogOpen} item={selectedBlog} onClose={() => setEditBlogOpen(false)} onSubmit={handleEditBlog} />
      <BlogDeleteDialog open={deleteBlogOpen} item={selectedBlog} onClose={() => setDeleteBlogOpen(false)} onSubmit={handleDeleteBlog} />

      <ModernTeamAddDialog open={addModernOpen} onClose={() => setAddModernOpen(false)} onSubmit={handleAddModern} />
      <ModernTeamEditDialog open={editModernOpen} item={selectedModern} onClose={() => setEditModernOpen(false)} onSubmit={handleEditModern} />
      <ModernTeamDeleteDialog open={deleteModernOpen} item={selectedModern} onClose={() => setDeleteModernOpen(false)} onSubmit={handleDeleteModern} />

      <SuperadminAddDialog open={addSuperOpen} onClose={() => setAddSuperOpen(false)} onSubmit={handleAddSuper} />
      <SuperadminEditDialog open={editSuperOpen} item={selectedSuper} onClose={() => setEditSuperOpen(false)} onSubmit={handleEditSuper} />
      <SuperadminDeleteDialog open={deleteSuperOpen} item={selectedSuper} onClose={() => setDeleteSuperOpen(false)} onSubmit={handleDeleteSuper} />

      <IntegrationAddDialog open={addIntegrationOpen} onClose={() => setAddIntegrationOpen(false)} onSubmit={handleAddIntegration} />
      <IntegrationEditDialog open={editIntegrationOpen} onClose={() => setEditIntegrationOpen(false)} item={selectedIntegration} onSubmit={handleEditIntegration} />
      <IntegrationDeleteDialog open={deleteIntegrationOpen} onClose={() => setDeleteIntegrationOpen(false)} item={selectedIntegration} onSubmit={handleDeleteIntegration} />
    </div>
  );
}