
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealAnimation from "@/components/ui/RevealAnimation";
import ProductCard from "@/components/ui/ProductCard";

// Sample building kits data
const buildingKits = [
  {
    id: '1',
    name: 'Beginner Rocket Kit',
    description: 'Perfect starter kit for students new to model rocketry. Includes easy-to-follow instructions and basic components.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1614315517650-3771cf72d18a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    id: '2',
    name: 'Classroom Group Kit (10 Rockets)',
    description: 'Ideal for classroom projects. Contains materials for 10 basic model rockets. Great for group learning activities.',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1051&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    id: '3',
    name: 'Physics Learning Rocket Kit',
    description: 'Designed to teach principles of physics and aerodynamics. Includes lesson materials and experiment guides.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1532968969795-a229a86f92af?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    id: '4',
    name: 'Advanced Design Rocket Kit',
    description: 'For students ready to tackle more complex designs. Features adjustable fins, payload compartment, and recovery system.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1569033083669-a267a7c56d94?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    id: '5',
    name: 'Water Rocket Educational Kit',
    description: 'No motors needed! Uses water and air pressure for propulsion. Safe for younger students and indoor demonstrations.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1614726365952-510103b9eda5?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    id: '6',
    name: 'Competition Rocket Kit',
    description: 'Designed for school rocketry competitions. Features lightweight materials and optimized design for maximum altitude.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1609429019995-8c40f49535a5?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
];

const BuildingKits = () => {
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
                  Building Kits
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  Model Rocket <span className="text-rocket-600 dark:text-rocket-400">Building Kits</span>
                </h1>
                <p className="text-space-600 dark:text-space-400">
                  Discover our range of educational rocket building kits designed specifically for schools. All kits include comprehensive instructions and educational materials.
                </p>
              </div>
            </RevealAnimation>

            {/* Educational Benefits */}
            <RevealAnimation delay={0.2}>
              <div className="bg-space-50 dark:bg-space-900 p-6 rounded-lg mb-12">
                <h3 className="text-xl font-semibold mb-2">Educational Benefits</h3>
                <ul className="list-disc pl-5 space-y-2 text-space-600 dark:text-space-400">
                  <li>Practical application of science, technology, engineering, and mathematics (STEM)</li>
                  <li>Development of fine motor skills and patience through assembly</li>
                  <li>Understanding of aerodynamics, stability, and propulsion</li>
                  <li>Promotes teamwork and problem-solving in group settings</li>
                  <li>Excitement and engagement through hands-on learning</li>
                </ul>
              </div>
            </RevealAnimation>

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {buildingKits.map((kit, index) => (
                <RevealAnimation key={kit.id} delay={0.1 * (index % 3)}>
                  <ProductCard 
                    id={kit.id}
                    name={kit.name}
                    description={kit.description}
                    price={kit.price}
                    image={kit.image}
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

export default BuildingKits;
