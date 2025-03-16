import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RevealAnimation from '@/components/ui/RevealAnimation';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ShieldCheck, AlertCircle, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutForm = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    postcode: '',
    phone: ''
  });

  const cartTotal = getCartTotal();
  const shippingCost = cartTotal >= 150 ? 0 : 8.99;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setError("Card element not found");
      setLoading(false);
      return;
    }

    const { error: stripeError } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: formData.name,
        email: formData.email,
        address: {
          line1: formData.address,
          city: formData.city,
          postal_code: formData.postcode,
        }
      }
    });

    if (stripeError) {
      setError(stripeError.message || "Payment failed");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      toast({
        title: "Payment successful!",
        description: "Thank you for your order. A confirmation has been sent to your email.",
      });
      
      clearCart();
      navigate('/checkout/success');
      
      setLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
        <div className="space-y-3">
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
              <input
                id="city"
                name="city"
                type="text"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
              />
            </div>
            <div>
              <label htmlFor="postcode" className="block text-sm font-medium mb-1">Postcode</label>
              <input
                id="postcode"
                name="postcode"
                type="text"
                required
                value={formData.postcode}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Payment Information</h3>
        <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        {error && (
          <div className="mt-2 text-red-500 flex items-center text-sm">
            <AlertCircle size={14} className="mr-1" />
            {error}
          </div>
        )}
        <div className="mt-2 flex items-center text-xs text-gray-500">
          <ShieldCheck size={14} className="mr-1 text-green-500" />
          Your payment information is secure
        </div>
      </div>

      <div className="pt-4">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Subtotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-medium">Shipping</span>
          <span>{cartTotal >= 150 ? "Free" : formatPrice(shippingCost)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span className="text-lg">{formatPrice(cartTotal + shippingCost)}</span>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <AnimatedButton 
          type="submit"
          variant="primary" 
          fullWidth
          icon={<CreditCard size={18} />}
          iconPosition="left"
          disabled={!stripe || loading}
          className={loading ? "opacity-70 cursor-not-allowed" : ""}
        >
          {loading ? "Processing..." : `Pay ${formatPrice(cartTotal + shippingCost)}`}
        </AnimatedButton>
        
        <Link to="/cart">
          <AnimatedButton 
            variant="ghost" 
            fullWidth
            icon={<ArrowLeft size={18} />}
            iconPosition="left"
            type="button"
          >
            Return to Cart
          </AnimatedButton>
        </Link>
      </div>
    </form>
  );
};

const Checkout = () => {
  const { items, getCartTotal } = useCart();
  const cartTotal = getCartTotal();
  const shippingCost = cartTotal >= 150 ? 0 : 8.99;

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
              <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
              <p className="text-gray-500 mb-8">Add some items to your cart before checking out</p>
              <Link to="/">
                <AnimatedButton 
                  variant="primary" 
                  icon={<ArrowLeft size={18} />}
                  iconPosition="left"
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
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        </RevealAnimation>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RevealAnimation>
              <div className="bg-white dark:bg-space-900 rounded-xl shadow-sm overflow-hidden p-6">
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </div>
            </RevealAnimation>
          </div>
          
          <div className="lg:col-span-1">
            <RevealAnimation delay={0.1}>
              <div className="bg-white dark:bg-space-900 rounded-xl shadow-sm overflow-hidden sticky top-28">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="font-medium">Order Summary</h2>
                </div>
                
                <div className="max-h-80 overflow-auto p-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex py-3 border-b border-gray-200 dark:border-gray-800 last:border-0">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="ml-3 flex-grow">
                        <div className="flex justify-between">
                          <p className="font-medium text-sm">{item.name}</p>
                          <span className="font-mono text-sm">{formatPrice(item.price)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>Qty: {item.quantity}</span>
                          <span className="font-mono">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 bg-gray-50 dark:bg-gray-900">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span>{cartTotal >= 150 ? "Free" : formatPrice(shippingCost)}</span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between font-medium text-base">
                      <span>Total</span>
                      <span>{formatPrice(cartTotal + shippingCost)}</span>
                    </div>
                    
                    {cartTotal < 150 && (
                      <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                        Add {formatPrice(150 - cartTotal)} more to get free shipping!
                      </div>
                    )}
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

export default Checkout;
