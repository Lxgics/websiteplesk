
import { useEffect, useState, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import AnimatedButton from '../ui/AnimatedButton';
import RevealAnimation from '../ui/RevealAnimation';
import { scrollToElement } from '@/utils/animation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [logoPosition, setLogoPosition] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Animation for the floating logo
    const animateLogo = () => {
      // Use sine wave for smooth up and down animation
      const time = Date.now() * 0.001; // convert to seconds for smoother animation
      const newPosition = Math.sin(time) * 10; // 10px max movement
      setLogoPosition(newPosition);
      requestAnimationFrame(animateLogo);
    };
    
    const animationId = requestAnimationFrame(animateLogo);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToProducts = () => {
    scrollToElement('products');
  };

  const parallaxOffset = scrollY * 0.4;
  const opacityValue = 1 - Math.min(scrollY / 700, 1);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-space-50 dark:bg-gradient-space pt-20 pb-10"
    >
      {/* Background elements with parallax effect */}
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-70"
        style={{ 
          transform: `translateY(${parallaxOffset * 0.3}px)`,
          opacity: opacityValue * 0.3,
        }}
      >
        <div className="absolute top-[10%] left-[15%] w-[300px] h-[300px] rounded-full bg-rocket-200/30 dark:bg-rocket-900/20 blur-[60px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-purple-300/20 dark:bg-purple-900/20 blur-[50px]" />
        <div className="absolute top-[40%] right-[30%] w-[200px] h-[200px] rounded-full bg-blue-200/30 dark:bg-blue-900/30 blur-[50px]" />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      <div className="container px-4 sm:px-6 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
          {/* Left column with text */}
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left lg:flex-1">
            <RevealAnimation direction="up" delay={0.2}>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-rocket-100 dark:bg-rocket-900/50 text-rocket-800 dark:text-rocket-300 rounded-full mb-4">
                Educational Rocketry
              </span>
            </RevealAnimation>
            
            <RevealAnimation direction="up" delay={0.3}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
                Inspire Learning Through <span className="text-rocket-600 dark:text-rocket-400">Rocketry</span>
              </h1>
            </RevealAnimation>
            
            <RevealAnimation direction="up" delay={0.4}>
              <p className="text-base sm:text-lg md:text-xl text-space-600 dark:text-space-300 mb-6 sm:mb-8 leading-relaxed">
                Educational model rocketry products designed for schools and young scientists. Discover our collection of safe, engaging rocketry resources for the classroom.
              </p>
            </RevealAnimation>
            
            <RevealAnimation direction="up" delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <AnimatedButton 
                  variant="primary" 
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  onClick={scrollToProducts}
                >
                  Explore Products
                </AnimatedButton>
              </div>
            </RevealAnimation>
            
            <RevealAnimation direction="up" delay={0.6}>
              <div className="flex items-center gap-6 mt-8 sm:mt-12 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-space-900" />
                  ))}
                </div>
                <div className="text-sm text-space-600 dark:text-space-400">
                  <strong>500+</strong> schools nationwide<br />
                  <span className="flex items-center gap-1">
                    <span className="text-yellow-500">★★★★★</span> 
                    <span>4.9/5</span>
                  </span>
                </div>
              </div>
            </RevealAnimation>
          </div>
          
          {/* Right column with animated logo */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <RevealAnimation delay={0.4} direction="fade">
              <div className="relative">
                {/* Animated logo */}
                <div 
                  className="relative z-10 bg-white dark:bg-space-900 p-4 sm:p-6 rounded-2xl shadow-premium transition-transform duration-300 ease-in-out"
                  style={{ 
                    transform: `translateY(${logoPosition}px)` 
                  }}
                >
                  <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 relative flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/40790227-cb2b-4178-a45a-8aaea0151acc.png" 
                      alt="Rocketry For Schools Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-rocket-200 dark:bg-rocket-800/40 rounded-full blur-xl opacity-70" />
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-200 dark:bg-purple-800/40 rounded-full blur-xl opacity-70" />
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-90">
          <span className="text-sm text-space-600 dark:text-space-400">Scroll to explore</span>
          <ChevronDown size={20} className="animate-bounce text-space-600 dark:text-space-400" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
