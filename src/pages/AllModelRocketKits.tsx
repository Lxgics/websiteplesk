
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealAnimation from "@/components/ui/RevealAnimation";
import ProductCard from "@/components/ui/ProductCard";
import { Info, Check } from "lucide-react";

// Sample all model rocket kits data (combining building kits and school kits)
const allModelRocketKits = [
  // Regular building kits
  {
    id: '1',
    name: 'Beginner Rocket Kit',
    description: 'Perfect starter kit for students new to model rocketry. Includes easy-to-follow instructions and basic components.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1614315517650-3771cf72d18a?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
    category: 'Individual'
  },
  {
    id: '2',
    name: 'Physics Learning Rocket Kit',
    description: 'Designed to teach principles of physics and aerodynamics. Includes lesson materials and experiment guides.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1532968969795-a229a86f92af?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
    category: 'Individual'
  },
  {
    id: '3',
    name: 'Advanced Design Rocket Kit',
    description: 'For students ready to tackle more complex designs. Features adjustable fins, payload compartment, and recovery system.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1569033083669-a267a7c56d94?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
    category: 'Individual'
  },
  // School and club kits
  {
    id: '4',
    name: 'UKROC Competition Team Kit',
    description: 'Complete kit for school teams participating in the UK Rocketry Challenge. Includes all necessary components and comprehensive instruction manual.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'School'
  },
  {
    id: '5',
    name: 'Classroom Group Kit (30 Students)',
    description: 'Comprehensive kit for classroom activities. Contains materials for 10 model rockets, allowing 30 students to work in groups of 3.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1567416661576-659cd640d568?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'School'
  },
  {
    id: '6',
    name: 'Water Rocket Educational Kit',
    description: 'No motors needed! Uses water and air pressure for propulsion. Safe for younger students and indoor demonstrations.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1614726365952-510103b9eda5?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
    category: 'Individual'
  },
  {
    id: '7',
    name: 'Competition Rocket Kit',
    description: 'Designed for school rocketry competitions. Features lightweight materials and optimized design for maximum altitude.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1609429019995-8c40f49535a5?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
    category: 'Individual'
  },
  {
    id: '8',
    name: 'STEM Club Starter Kit',
    description: 'Perfect for school STEM clubs starting with rocketry. Includes 5 different model rocket designs and educational materials.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1457364559154-aa2644600ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'School'
  },
];

const AllModelRocketKits = () => {
  const [filter, setFilter] = useState('All');
  
  // Filtered products based on category selection
  const filteredProducts = filter === 'All' 
    ? allModelRocketKits 
    : allModelRocketKits.filter(product => product.category === filter);

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
                  Complete Collection
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  All Model <span className="text-rocket-600 dark:text-rocket-400">Rocket Kits</span>
                </h1>
                <p className="text-space-600 dark:text-space-400">
                  Browse our complete collection of educational model rocket kits, from beginner sets to advanced designs and classroom group kits.
                </p>
              </div>
            </RevealAnimation>

            {/* Category filters */}
            <RevealAnimation delay={0.2}>
              <div className="flex justify-center mb-10">
                <div className="inline-flex rounded-md shadow-sm">
                  {['All', 'Individual', 'School'].map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setFilter(category)}
                      className={`px-4 py-2 text-sm font-medium border ${
                        filter === category
                          ? 'bg-rocket-600 text-white border-rocket-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-space-800 dark:text-gray-200 dark:border-space-700 dark:hover:bg-space-700'
                      } ${
                        category === 'All' ? 'rounded-l-lg' : category === 'School' ? 'rounded-r-lg' : ''
                      }`}
                    >
                      {category} Kits
                    </button>
                  ))}
                </div>
              </div>
            </RevealAnimation>

            {/* Step-by-step guide */}
            <RevealAnimation delay={0.3}>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-space-900 dark:to-indigo-950 rounded-xl p-6 mb-12 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">Model Rocket Building Guide</h2>
                <p className="mb-6 text-center text-space-600 dark:text-space-400">
                  Follow this comprehensive guide to build your model rocket safely and effectively for the best flight performance.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <span className="bg-rocket-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">1</span>
                      Understanding Key Concepts
                    </h3>
                    <ul className="space-y-2 text-space-700 dark:text-space-300 pl-8">
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span><strong>Centre of Pressure (CP):</strong> The point where aerodynamic forces act on the rocket. Should be located behind the Centre of Mass for stability.</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span><strong>Centre of Mass (CM):</strong> The balance point of your rocket. Must be forward of the CP (toward the nose) for a stable flight.</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span><strong>Calibre Stability:</strong> The distance between CP and CM should be at least one body tube diameter (one calibre) for stable flight.</span>
                      </li>
                    </ul>

                    <h3 className="text-xl font-semibold my-4 flex items-center">
                      <span className="bg-rocket-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">2</span>
                      Materials & Tools Preparation
                    </h3>
                    <ul className="space-y-2 text-space-700 dark:text-space-300 pl-8">
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Lay out all components and check against the parts list</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Prepare your work surface with newspaper or a build mat</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Gather tools: scissors, hobby knife, sandpaper, ruler, pencil</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <span className="bg-rocket-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">3</span>
                      Assembly Steps
                    </h3>
                    <ul className="space-y-2 text-space-700 dark:text-space-300 pl-8">
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Build the motor mount assembly and insert into the body tube</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Attach fins according to the alignment guide, ensuring they're perpendicular to the body</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Install the recovery system (parachute or streamer)</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Attach the nose cone, ensuring a snug but not overly tight fit</span>
                      </li>
                    </ul>

                    <h3 className="text-xl font-semibold my-4 flex items-center">
                      <span className="bg-rocket-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">4</span>
                      Testing & Optimization
                    </h3>
                    <ul className="space-y-2 text-space-700 dark:text-space-300 pl-8">
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Use rocket simulation software like OpenRocket or RockSim to test your design</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Perform a swing test to check stability - tie a string to rocket's CM and swing in circles</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Add weight to nose cone if necessary to achieve proper CP/CM relationship</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-amber-950 rounded-lg border border-yellow-200 dark:border-amber-900">
                  <div className="flex items-start">
                    <Info size={20} className="text-amber-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-800 dark:text-amber-400">Important Safety Note</h4>
                      <p className="text-amber-700 dark:text-amber-300 text-sm">
                        Always check local regulations before launching. In the UK, model rocketry is governed by specific laws regarding motors, launch sites, and notification requirements. See our "Model Rocketry Law in the UK" page for comprehensive guidance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealAnimation>

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map((kit, index) => (
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

export default AllModelRocketKits;
