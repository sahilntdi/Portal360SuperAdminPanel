import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DiscountHeaderTab } from "./DiscountHeaderTab";
import { HomePageTab } from "./HomePageTab";
import { FeaturesTab } from "./FeaturesTab";
import { PricingTab } from "./PricingTab";
import { HowItWorksTab } from "./HowItWorksTab";
import { BlogTab } from "./BlogTab";
import { FAQTab } from "./FAQTab";
import { WebsiteContentProps } from "./types";

export function WebsiteContent({ content, onUpdateContent }: WebsiteContentProps) {
  return (
    <Tabs defaultValue="discount" className="space-y-4">
      <TabsList className="grid w-full grid-cols-7">
        <TabsTrigger value="discount">Alert</TabsTrigger>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
        <TabsTrigger value="howitworks">How It Works</TabsTrigger>
        <TabsTrigger value="blog">Blog</TabsTrigger>
        <TabsTrigger value="faq">FAQ</TabsTrigger>
      </TabsList>

      <TabsContent value="discount">
        <DiscountHeaderTab content={content} onUpdateContent={onUpdateContent} />
      </TabsContent>

      <TabsContent value="home">
        <HomePageTab content={content} onUpdateContent={onUpdateContent} />
      </TabsContent>

      <TabsContent value="features">
        <FeaturesTab content={content} onUpdateContent={onUpdateContent} />
      </TabsContent>

      <TabsContent value="pricing">
        <PricingTab content={content} onUpdateContent={onUpdateContent} />
      </TabsContent>

      <TabsContent value="howitworks">
        <HowItWorksTab content={content} onUpdateContent={onUpdateContent} />
      </TabsContent>

      <TabsContent value="blog">
        <BlogTab content={content} onUpdateContent={onUpdateContent} />
      </TabsContent>

      <TabsContent value="faq">
        <FAQTab content={content} onUpdateContent={onUpdateContent} />
      </TabsContent>
    </Tabs>
  );
}