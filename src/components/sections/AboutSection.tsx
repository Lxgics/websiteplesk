
import { CheckCircle } from 'lucide-react';
import RevealAnimation from '../ui/RevealAnimation';
import AnimatedButton from '../ui/AnimatedButton';

const AboutSection = () => {
  const goals = [
    'Provide authentic space merchandise and educational products',
    'Support space education and STEM initiatives',
    'Collaborate with space agencies and aerospace companies',
    'Inspire the next generation of space explorers and scientists',
    'Promote space sustainability and responsible exploration',
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-space-950 relative overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      
      <div className="container px-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left side with image */}
          <div className="lg:w-1/2">
            <RevealAnimation direction="left">
              <div className="relative">
                {/* Main image */}
                <div className="rounded-2xl overflow-hidden shadow-premium bg-space-100 dark:bg-space-800 p-3">
                  <img 
                    src="https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=2380&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Space mission control" 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-space-200 dark:bg-space-800 rounded-2xl" />
                <div className="absolute -z-20 -bottom-12 -right-12 w-full h-full bg-space-100 dark:bg-space-700 rounded-2xl" />
                
                {/* Floating badge */}
                <div className="absolute top-6 -right-5 bg-rocket-600 text-white px-4 py-2 rounded-lg shadow-lg">
                  <span className="text-sm font-medium">Since 2018</span>
                </div>
              </div>
            </RevealAnimation>
          </div>
          
          {/* Right side with content */}
          <div className="lg:w-1/2">
            <RevealAnimation direction="right">
              <span className="px-3 py-1 text-xs font-medium bg-space-100 dark:bg-space-800 text-space-800 dark:text-space-200 rounded-full mb-4 inline-block">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Mission Behind <span className="text-rocket-600 dark:text-rocket-400">RocketShop</span>
              </h2>
              <p className="text-space-600 dark:text-space-400 mb-6">
                Founded by a team of aerospace engineers and space enthusiasts, RocketShop was created to bring the wonder and excitement of space exploration to everyday life. We believe that space is for everyone, and our mission is to make it accessible through carefully crafted products.
              </p>
              <p className="text-space-600 dark:text-space-400 mb-8">
                We collaborate with space agencies, aerospace companies, and independent designers to create products that are not only beautiful but also educational and inspirational. Each product in our collection is designed to spark curiosity and foster a deeper appreciation for the cosmos.
              </p>
              
              {/* Goals list */}
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Our Goals</h3>
                <ul className="space-y-3">
                  {goals.map((goal, index) => (
                    <RevealAnimation key={index} direction="right" delay={0.1 * (index + 1)}>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-rocket-600 dark:text-rocket-400 mt-0.5 flex-shrink-0" />
                        <span className="text-space-700 dark:text-space-300">{goal}</span>
                      </li>
                    </RevealAnimation>
                  ))}
                </ul>
              </div>
              
              {/* CTA */}
              <AnimatedButton variant="primary" size="lg">
                Learn More About Us
              </AnimatedButton>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
