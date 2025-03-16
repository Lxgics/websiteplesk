
import React from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import AnimatedButton from '@/components/ui/AnimatedButton';

const CartDropdown = () => {
  const { items, removeItem, updateQuantity, getCartTotal, getItemCount } = useCart();
  const itemCount = getItemCount();
  const cartTotal = getCartTotal();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(price);
  };

  return (
    <HoverCard openDelay={100} closeDelay={300}>
      <HoverCardTrigger asChild>
        <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-rocket-600 dark:hover:text-rocket-400 relative">
          <ShoppingCart size={20} />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 bg-rocket-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </HoverCardTrigger>
      <HoverCardContent side="bottom" align="end" className="w-72 p-0 shadow-lg">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-medium">Shopping Cart ({itemCount})</h3>
        </div>
        
        {items.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="max-h-64 overflow-auto">
              {items.map((item) => (
                <div key={item.id} className="p-3 flex items-start border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-3 flex-grow">
                    <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-xs rounded-full w-5 h-5 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
                        >
                          -
                        </button>
                        <span className="mx-2 text-xs">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-xs rounded-full w-5 h-5 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs font-medium">{formatPrice(item.price * item.quantity)}</span>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="ml-2 text-gray-400 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900">
              <div className="flex justify-between mb-3">
                <span className="font-medium">Total:</span>
                <span className="font-bold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/cart">
                  <AnimatedButton 
                    variant="outline" 
                    fullWidth
                    size="sm"
                  >
                    View Cart
                  </AnimatedButton>
                </Link>
                <Link to="/checkout">
                  <AnimatedButton 
                    variant="primary" 
                    fullWidth
                    size="sm"
                    icon={<ChevronRight size={16} />}
                    iconPosition="right"
                  >
                    Checkout
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

export default CartDropdown;
