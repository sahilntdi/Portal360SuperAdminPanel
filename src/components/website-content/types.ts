export interface WebsiteContentData {
  discountHeader: {
    enabled: boolean;
    message: string;
    link: string;
    linkText: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    ctaText: string;
  };
  features: {
    title: string;
    subtitle: string;
    feature1Title: string;
    feature1Description: string;
    feature2Title: string;
    feature2Description: string;
    feature3Title: string;
    feature3Description: string;
  };
  pricing: {
    title: string;
    subtitle: string;
  };
  howItWorks: {
    title: string;
    step1Title: string;
    step1Description: string;
    step2Title: string;
    step2Description: string;
    step3Title: string;
    step3Description: string;
  };
  blog: {
    post1Title: string;
    post1Excerpt: string;
    post2Title: string;
    post2Excerpt: string;
  };
  faq: {
    question1: string;
    answer1: string;
    question2: string;
    answer2: string;
    question3: string;
    answer3: string;
  };
}

export interface WebsiteContentProps {
  content: WebsiteContentData;
  onUpdateContent: (section: keyof WebsiteContentData, field: string, value: any) => void;
}