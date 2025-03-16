import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RevealAnimation from '@/components/ui/RevealAnimation';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCcw, 
  HelpCircle 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, getCartTotal } = useCart();
  const cartTotal = getCartTotal();
  const shippingCost = cartTotal >= 150 ? 0 : 8.99;
  const [couponCode, setCouponCode] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-space-950 text-space-900 dark:text-white">
        <Navbar />
        
        <main className="mx-auto max-w-[80%] pt-28 pb-16">
          <RevealAnimation>
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart size={32} className="text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
              <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet</p>
              <Link to="/">
                <AnimatedButton 
                  variant="primary" 
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  Continue Shopping
                </AnimatedButton>
              </Link>
            </div>
          </RevealAnimation>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-space-950 text-space-900 dark:text-white">
      <Navbar />
      
      <main className="mx-auto w-full md:w-[90%] pt-28 pb-16 px-4">
        <RevealAnimation>
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        </RevealAnimation>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - 2/3 width on desktop */}
          <div className="lg:col-span-2">
            <RevealAnimation>
              <div className="bg-white dark:bg-space-900 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                  <h2 className="font-medium">Cart Items ({items.length})</h2>
                  <button 
                    onClick={clearCart}
                    className="text-sm text-gray-500 hover:text-red-500 flex items-center"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Clear Cart
                  </button>
                </div>
                
                {items.map((item) => (
                  <div key={item.id} className="p-6 border-b border-gray-200 dark:border-gray-800 last:border-0">
                    <div className="flex">
                      <Link to={`/product/${item.id}`} className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="ml-4 flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <Link to={`/product/${item.id}`} className="font-medium hover:text-rocket-600 transition-colors">
                            {item.name}
                          </Link>
                          <span className="font-mono font-medium text-rocket-600 dark:text-rocket-400">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="mx-3">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex items-center">
                            <span className="font-mono font-medium mr-3">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealAnimation>
          </div>
          
          {/* Order Summary - 1/3 width on desktop */}
          <div className="lg:col-span-1">
            <RevealAnimation delay={0.1}>
              <div className="bg-white dark:bg-space-900 rounded-xl shadow-sm overflow-hidden sticky top-28">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="font-medium">Order Summary</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span>{cartTotal >= 150 ? "Free" : formatPrice(shippingCost)}</span>
                    </div>
                    
                    <div className="pt-2">
                      <div className="relative">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Discount code"
                          className="w-full p-2 pr-20 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
                        />
                        <button className="absolute right-1 top-1 bottom-1 px-3 bg-gray-100 dark:bg-gray-800 text-sm rounded">
                          Apply
                        </button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-lg">{formatPrice(cartTotal + shippingCost)}</span>
                    </div>
                    
                    {cartTotal < 150 && (
                      <div className="text-xs text-green-600 dark:text-green-400">
                        Add {formatPrice(150 - cartTotal)} more to get free shipping!
                      </div>
                    )}
                    
                    <Link to="/checkout" className="block w-full">
                      <AnimatedButton 
                        variant="primary" 
                        fullWidth
                        icon={<ArrowRight size={18} />}
                        iconPosition="right"
                        className="mt-2"
                      >
                        Proceed to Checkout
                      </AnimatedButton>
                    </Link>
                    
                    <div className="flex flex-col space-y-2 mt-6">
                      <div className="flex items-center text-xs text-gray-500">
                        <ShieldCheck size={14} className="mr-2 text-green-500" />
                        Secure checkout with Stripe
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <RefreshCcw size={14} className="mr-2" />
                        Free returns within 30 days
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <HelpCircle size={14} className="mr-2" />
                        Need help? Contact us
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
