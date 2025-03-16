
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealAnimation from "@/components/ui/RevealAnimation";

const AboutUs = () => {
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
                  About Rocketry For Schools
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  Inspiring the Next Generation of <span className="text-rocket-600 dark:text-rocket-400">Space Explorers</span>
                </h1>
                <p className="text-space-600 dark:text-space-400">
                  Providing high-quality educational model rocketry products and resources for schools, clubs, and young scientists across the UK.
                </p>
              </div>
            </RevealAnimation>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <RevealAnimation delay={0.2}>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-space-600 dark:text-space-400 mb-6">
                    At Rocketry For Schools, our mission is to make model rocketry accessible, educational, and engaging for schools and young enthusiasts. We believe that hands-on learning through model rocketry provides an unparalleled opportunity to inspire interest in STEM subjects.
                  </p>
                  <p className="text-space-600 dark:text-space-400 mb-6">
                    Founded by educators and rocketry enthusiasts, we understand the unique needs of educational institutions and provide specialized resources, kits, and support for classroom use.
                  </p>
                </div>
              </RevealAnimation>
              
              <RevealAnimation delay={0.3}>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80" 
                    alt="Students working on model rockets" 
                    className="w-full h-auto"
                  />
                </div>
              </RevealAnimation>
            </div>
            
            <div className="mt-16">
              <RevealAnimation>
                <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Rocketry For Schools?</h2>
              </RevealAnimation>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <RevealAnimation delay={0.2}>
                  <div className="bg-space-50 dark:bg-space-900 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Educational Focus</h3>
                    <p className="text-space-600 dark:text-space-400">
                      All our products are designed with educational outcomes in mind, supporting curriculum objectives in physics, engineering, and mathematics.
                    </p>
                  </div>
                </RevealAnimation>
                
                <RevealAnimation delay={0.3}>
                  <div className="bg-space-50 dark:bg-space-900 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Quality & Safety</h3>
                    <p className="text-space-600 dark:text-space-400">
                      We prioritize safety and quality in all our products, ensuring that they meet the highest standards for classroom use.
                    </p>
                  </div>
                </RevealAnimation>
                
                <RevealAnimation delay={0.4}>
                  <div className="bg-space-50 dark:bg-space-900 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Expert Support</h3>
                    <p className="text-space-600 dark:text-space-400">
                      Our team of educators and rocketry experts provides ongoing support to schools implementing rocketry programs.
                    </p>
                  </div>
                </RevealAnimation>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
