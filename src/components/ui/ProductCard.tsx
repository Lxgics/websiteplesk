
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import AnimatedButton from './AnimatedButton';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  className?: string;
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
  className,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, description, price, image });
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <div 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-space-900 shadow-subtle transition-all duration-500 hover:shadow-premium",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Link wrapper */}
      <Link to={`/product/${id}`}>
        {/* Image container with aspect ratio */}
        <div className="relative overflow-hidden aspect-[4/3] w-full bg-space-50 dark:bg-space-800">
          <img
            src={image}
            alt={name}
            className={cn(
              "object-cover w-full h-full transition-transform duration-700",
              isHovered ? "scale-[1.03]" : "scale-100"
            )}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6 space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-medium line-clamp-1">{name}</h3>
            <span className="font-mono text-lg font-semibold text-rocket-600 dark:text-rocket-400">${price}</span>
          </div>
          
          <p className="text-space-600 dark:text-space-400 text-sm line-clamp-2 flex-grow">{description}</p>
          
          <div className="pt-4 flex gap-2 justify-between items-center">
            <AnimatedButton 
              variant="outline" 
              size="sm" 
              className="flex-1"
              icon={<ShoppingCart size={14} />}
              iconPosition="left"
              onClick={handleAddToCart}
            >
              Add to Cart
            </AnimatedButton>
            
            <AnimatedButton 
              variant="ghost" 
              size="sm"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              Details
            </AnimatedButton>
          </div>
        </div>
      </Link>
      
      {/* Bottom border animation */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 h-[2px] bg-rocket-500 dark:bg-rocket-600 transition-all duration-500 ease-out",
          isHovered ? "w-full" : "w-0"
        )}
      />
    </div>
  );
};

export default ProductCard;
