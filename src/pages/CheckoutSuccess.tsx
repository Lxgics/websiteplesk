
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RevealAnimation from '@/components/ui/RevealAnimation';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { CheckCircle, ArrowRight } from 'lucide-react';

const CheckoutSuccess = () => {
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-space-950 text-space-900 dark:text-white">
      <Navbar />
      
      <main className="mx-auto max-w-[80%] pt-28 pb-16">
        <RevealAnimation>
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for your purchase. Your payment was processed successfully and your order is on its way.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              A confirmation email has been sent to your email address with all the details of your order.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/">
                <AnimatedButton 
                  variant="primary" 
                  fullWidth
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  Continue Shopping
                </AnimatedButton>
              </Link>
              <AnimatedButton 
                variant="outline" 
                fullWidth
              >
                View Order
              </AnimatedButton>
            </div>
          </div>
        </RevealAnimation>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
