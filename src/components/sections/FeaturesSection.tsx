
import { Rocket, Shield, Truck, Award, Clock, Sparkles } from 'lucide-react';
import RevealAnimation from '../ui/RevealAnimation';

const features = [
  {
    icon: <Rocket size={24} />,
    title: 'Space Grade Quality',
    description: 'All products are made with the highest quality materials and techniques used in actual space programs.',
    color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
  {
    icon: <Shield size={24} />,
    title: 'Secure Checkout',
    description: 'Your transactions are protected with end-to-end encryption and secure payment processing.',
    color: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  },
  {
    icon: <Truck size={24} />,
    title: 'Fast Delivery',
    description: 'Worldwide shipping with package tracking and express delivery options available.',
    color: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  },
  {
    icon: <Award size={24} />,
    title: 'Official Merchandise',
    description: 'Authentic products officially licensed by space agencies and aerospace companies.',
    color: 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  },
  {
    icon: <Clock size={24} />,
    title: '24/7 Support',
    description: 'Our expert team is always available to help with any questions or issues you may have.',
    color: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  },
  {
    icon: <Sparkles size={24} />,
    title: 'Members Program',
    description: 'Join our membership for exclusive early access, special pricing, and member-only products.',
    color: 'bg-rocket-50 dark:bg-rocket-900/30 text-rocket-600 dark:text-rocket-400',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-space-50 dark:bg-space-900 relative overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-rocket-200/30 dark:bg-rocket-900/20 blur-[80px]" />
        <div className="absolute bottom-[0%] -left-[5%] w-[400px] h-[400px] rounded-full bg-blue-200/20 dark:bg-blue-900/20 blur-[70px]" />
      </div>
      
      <div className="container px-6 mx-auto relative z-10">
        {/* Section header */}
        <RevealAnimation>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3 py-1 text-xs font-medium bg-rocket-100 dark:bg-rocket-900/50 text-rocket-800 dark:text-rocket-300 rounded-full mb-4 inline-block">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Features That Make Us <span className="text-rocket-600 dark:text-rocket-400">Stand Out</span>
            </h2>
            <p className="text-space-600 dark:text-space-400">
              We're committed to providing the best experience for space enthusiasts with premium products, exceptional service, and authentic merchandise.
            </p>
          </div>
        </RevealAnimation>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <RevealAnimation key={feature.title} delay={0.1 * (index % 3)} direction="up">
              <div className="bg-white dark:bg-space-800 p-8 rounded-2xl shadow-subtle hover:shadow-premium transition-shadow duration-300 group">
                <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-space-600 dark:text-space-400">{feature.description}</p>
              </div>
            </RevealAnimation>
          ))}
        </div>

        {/* Stats section */}
        <RevealAnimation delay={0.3}>
          <div className="mt-24 bg-white dark:bg-space-800 shadow-subtle rounded-2xl p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-rocket-600 dark:text-rocket-400 mb-2">800+</div>
                <p className="text-space-600 dark:text-space-400">Happy Customers</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-rocket-600 dark:text-rocket-400 mb-2">50+</div>
                <p className="text-space-600 dark:text-space-400">Products</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-rocket-600 dark:text-rocket-400 mb-2">15+</div>
                <p className="text-space-600 dark:text-space-400">Space Partners</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-rocket-600 dark:text-rocket-400 mb-2">24/7</div>
                <p className="text-space-600 dark:text-space-400">Customer Support</p>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default FeaturesSection;
