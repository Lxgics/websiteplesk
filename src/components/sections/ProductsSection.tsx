
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import RevealAnimation from '../ui/RevealAnimation';
import ProductCard from '../ui/ProductCard';
import { featuredProducts } from '@/data/products';

const ProductsSection = () => {
  const isMobile = useIsMobile();
  const [displayCount, setDisplayCount] = useState(3);

  useEffect(() => {
    // Adjust displayed products count based on screen size
    setDisplayCount(isMobile ? 2 : 3);
  }, [isMobile]);

  return (
    <section id="products" className="py-20 bg-white dark:bg-space-950 relative overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      
      <div className="container px-4 sm:px-6 mx-auto">
        <RevealAnimation>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="px-3 py-1 text-xs font-medium bg-space-100 dark:bg-space-800 text-space-800 dark:text-space-200 rounded-full mb-4 inline-block">
              Browse Products
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Featured <span className="text-rocket-600 dark:text-rocket-400">Products</span>
            </h2>
            <p className="text-space-600 dark:text-space-400 text-sm sm:text-base">
              Explore our most popular educational model rocketry products, designed for schools and students of all ages.
            </p>
          </div>
        </RevealAnimation>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {featuredProducts.slice(0, displayCount).map((product, index) => (
            <RevealAnimation key={product.id} delay={0.1 * index}>
              <ProductCard 
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
