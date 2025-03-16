
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealAnimation from "@/components/ui/RevealAnimation";
import ProductCard from "@/components/ui/ProductCard";

// Sample building equipment data
const buildingEquipment = [
  {
    id: '1',
    name: 'Model Rocket Tubing Set',
    description: 'High-quality cardboard body tubes in various sizes, perfect for model rocket construction. Includes 5 different diameters.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1518365050014-70fe7232897f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    name: 'Fin Cutting Template Kit',
    description: 'Precision templates for cutting rocket fins. Includes various fin shapes and sizes for different rocket designs.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1572981304936-5c3f7e92c5d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    name: 'Model Rocket Nosecone Set',
    description: 'Set of 10 plastic nosecones in various shapes and sizes. Compatible with standard body tube diameters.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1593878596127-8e85d91b22d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    name: 'Recovery System Kit',
    description: 'Complete recovery system materials including parachutes, shock cords, and wadding. Enough for 5 model rockets.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '5',
    name: 'Rocket Building Tools Set',
    description: 'Essential tools for model rocket construction including fin alignment guide, hobby knife, sandpaper, and specialized glue.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1621600411688-4be93c2c1208?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '6',
    name: 'Launch Lug and Rail Button Set',
    description: 'Various sizes of launch lugs and rail buttons for different model rocket designs. Includes installation guide.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1518219868071-9a9a4ceda3bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
];

const BuildingEquipment = () => {
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

    return () => {
      // Cleanup
      document.querySelectorAll('.section-animate').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-space-950 text-space-900 dark:text-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="max-w-[80%] mx-auto pt-28 pb-16">
        <section className="py-12 bg-white dark:bg-space-950 relative overflow-hidden">
          {/* Noise texture overlay */}
          <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
          
          <div className="container px-6 mx-auto">
            {/* Section header */}
            <RevealAnimation>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="px-3 py-1 text-xs font-medium bg-space-100 dark:bg-space-800 text-space-800 dark:text-space-200 rounded-full mb-4 inline-block">
                  Construction Materials
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  Model Rocket <span className="text-rocket-600 dark:text-rocket-400">Building Equipment</span>
                </h1>
                <p className="text-space-600 dark:text-space-400">
                  Essential components and tools for building custom model rockets, including body tubes, nosecones, fins, and specialized construction materials.
                </p>
              </div>
            </RevealAnimation>

            {/* Educational Benefits */}
            <RevealAnimation delay={0.2}>
              <div className="bg-space-50 dark:bg-space-900 p-6 rounded-lg mb-12">
                <h3 className="text-xl font-semibold mb-2">Quality Construction Materials</h3>
                <ul className="list-disc pl-5 space-y-2 text-space-600 dark:text-space-400">
                  <li>All materials meet educational safety standards</li>
                  <li>Precision-cut components for accurate builds</li>
                  <li>Durable materials designed for repeated classroom use</li>
                  <li>Compatible with standard model rocket dimensions</li>
                  <li>Suitable for various skill levels from beginner to advanced</li>
                </ul>
              </div>
            </RevealAnimation>

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {buildingEquipment.map((item, index) => (
                <RevealAnimation key={item.id} delay={0.1 * (index % 3)}>
                  <ProductCard 
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                  />
                </RevealAnimation>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BuildingEquipment;
