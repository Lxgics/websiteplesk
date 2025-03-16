
import { useEffect } from "react";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AboutSection from "@/components/sections/AboutSection";
import CustomerVideosSection from "@/components/sections/CustomerVideosSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Add intersection observer for animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    }, { threshold: 0.1 });

    // Observe all elements with section-animate class
    document.querySelectorAll('.section-animate').forEach((el) => {
      observer.observe(el);
    });

    // Welcome toast
    setTimeout(() => {
      toast({
        title: "Welcome to Rocketry For Schools",
        description: "Explore our collection of educational model rocketry products",
        duration: 5000,
      });
    }, 1000);

    return () => {
      // Cleanup
      document.querySelectorAll('.section-animate').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [toast]);

  // Structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rocketry For Schools",
    "url": "https://rocketryforschools.com",
    "logo": "/lovable-uploads/40790227-cb2b-4178-a45a-8aaea0151acc.png",
    "description": "Rocketry For Schools provides high-quality educational model rocketry products for UK schools and students. We offer model rocket motors, building kits, and UKROC competition resources.",
    "email": "admin@rocketryforschools.co.uk",
    "sameAs": [
      "https://facebook.com/rocketryforschools",
      "https://twitter.com/rocketryschools",
      "https://instagram.com/rocketryforschools"
    ],
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "GBP",
      "lowPrice": "9.99",
      "highPrice": "399.99",
      "offerCount": "30",
      "offers": {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Educational Model Rocket Kits",
          "description": "High-quality model rocket kits for educational use in schools and clubs"
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-space-950 text-space-900 dark:text-white">
      <Helmet>
        <title>Rocketry For Schools - Educational Model Rocket Kits & Motors</title>
        <meta name="description" content="Rocketry For Schools provides high-quality educational model rocketry products for UK schools and students. We offer model rocket motors, building kits, UKROC competition resources, and educational materials." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Helmet>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="w-full md:w-[90%] mx-auto">
        <HeroSection />
        <ProductsSection />
        <FeaturesSection />
        <CustomerVideosSection />
        <AboutSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
