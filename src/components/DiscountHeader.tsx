import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface DiscountHeaderData {
  enabled: boolean;
  message: string;
  link: string;
  linkText: string;
}

export function DiscountHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [headerData, setHeaderData] = useState<DiscountHeaderData | null>(null);

  useEffect(() => {
    const content = localStorage.getItem("website-content");
    if (content) {
      const parsed = JSON.parse(content);
      if (parsed.discountHeader?.enabled) {
        setHeaderData(parsed.discountHeader);
        
        // Check if user has dismissed this message
        const dismissed = sessionStorage.getItem("discount-header-dismissed");
        if (!dismissed) {
          setIsVisible(true);
        }
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("discount-header-dismissed", "true");
  };

  if (!isVisible || !headerData) {
    return null;
  }

  return (
    <div className="relative bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center text-sm font-medium">
            <span>{headerData.message}</span>
            {headerData.link && (
              <a
                href={headerData.link}
                className="ml-2 underline underline-offset-4 hover:no-underline"
              >
                {headerData.linkText}
              </a>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
