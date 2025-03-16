
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Github, Linkedin, ArrowUp, Mail } from 'lucide-react';
import AnimatedButton from '../ui/AnimatedButton';

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-space-50 dark:bg-space-900 pt-16 sm:pt-20 pb-10 relative overflow-hidden">
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      
      <div className="container px-4 sm:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-16">
          {/* About Us Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rocket-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">RF</span>
              </div>
              <span className="font-medium text-lg">Rocketry For Schools</span>
            </div>
            <p className="text-space-600 dark:text-space-400 text-sm max-w-xs">
              We're dedicated to inspiring the next generation of scientists and engineers through educational 
              rocketry. Our mission is to make STEM learning exciting and accessible for all students.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-space-600 hover:text-rocket-600 dark:text-space-400 dark:hover:text-rocket-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-space-600 hover:text-rocket-600 dark:text-space-400 dark:hover:text-rocket-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-space-600 hover:text-rocket-600 dark:text-space-400 dark:hover:text-rocket-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="#" 
                className="text-space-600 hover:text-rocket-600 dark:text-space-400 dark:hover:text-rocket-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-medium text-lg mb-4 sm:mb-6">Navigation</h4>
            <ul className="space-y-3">
              {['Products', 'Features', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-space-600 hover:text-rocket-600 dark:text-space-400 dark:hover:text-rocket-400 transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium text-lg mb-4 sm:mb-6">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Returns Policy'].map((item) => (
                <li key={item}>
                  <a 
                    href="#"
                    className="text-space-600 hover:text-rocket-600 dark:text-space-400 dark:hover:text-rocket-400 transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-medium text-lg mb-4 sm:mb-6">Contact Us</h4>
            <p className="text-space-600 dark:text-space-400 text-sm mb-4">
              Have questions or need support? Get in touch with our team.
            </p>
            <div className="flex items-center space-x-2 text-space-600 dark:text-space-400 mb-4">
              <Mail size={16} />
              <a href="mailto:admin@rocketryforschools.co.uk" className="text-sm hover:text-rocket-600 dark:hover:text-rocket-400 transition-colors">
                admin@rocketryforschools.co.uk
              </a>
            </div>
            <form className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 rounded-lg border-space-200 dark:border-space-700 bg-white dark:bg-space-800 focus:ring-1 focus:ring-rocket-500 focus:border-rocket-500"
                />
              </div>
              <AnimatedButton 
                variant="primary" 
                fullWidth 
                className="mt-2"
              >
                Subscribe
              </AnimatedButton>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-space-200 dark:bg-space-800 my-6 sm:my-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-space-500 dark:text-space-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Rocketry For Schools. All rights reserved.
          </p>
          <button 
            onClick={handleScrollToTop}
            className="flex items-center gap-2 text-rocket-600 dark:text-rocket-400 hover:text-rocket-700 dark:hover:text-rocket-300 transition-colors text-sm"
          >
            Back to top
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
