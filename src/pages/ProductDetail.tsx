
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RevealAnimation from '@/components/ui/RevealAnimation';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { ShoppingCart, Heart, Share2, ArrowLeft, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

// This would normally come from an API
import { featuredProducts } from '@/data/products';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // In a real app, you'd fetch this from an API
    // For this demo, we'll use the featuredProducts array
    const foundProduct = featuredProducts.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
    
    setLoading(false);
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rocket-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <AnimatedButton onClick={() => navigate(-1)} icon={<ArrowLeft />} iconPosition="left">
          Go Back
        </AnimatedButton>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({...product});
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(q => q + 1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-space-950 text-space-900 dark:text-white">
      <Navbar />
      
      <main className="mx-auto max-w-[80%] pt-28 pb-16">
        <RevealAnimation>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-sm text-gray-500 mb-6 hover:text-rocket-600 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to products
          </button>
        </RevealAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <RevealAnimation>
            <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </RevealAnimation>
          
          {/* Product Details */}
          <RevealAnimation delay={0.1}>
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star}
                        size={16} 
                        className={star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(32 reviews)</span>
                </div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-xl font-mono text-rocket-600 dark:text-rocket-400 mt-2">
                  {formatPrice(product.price)}
                </p>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-medium mb-2">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={decreaseQuantity}
                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-10 text-center">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-6">
                <AnimatedButton 
                  variant="primary" 
                  icon={<ShoppingCart size={18} />}
                  iconPosition="left"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </AnimatedButton>
                <AnimatedButton variant="outline" icon={<Heart size={18} />}>
                  Wishlist
                </AnimatedButton>
                <AnimatedButton variant="outline" icon={<Share2 size={18} />}>
                  Share
                </AnimatedButton>
              </div>
              
              <div className="pt-6">
                <Tabs defaultValue="description">
                  <TabsList className="w-full">
                    <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                    <TabsTrigger value="specs" className="flex-1">Specifications</TabsTrigger>
                    <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="mt-4">
                    <div className="prose dark:prose-invert max-w-none">
                      <p>
                        This high-quality model rocket kit is designed specifically for educational use in schools
                        and clubs. Perfect for teaching principles of physics, engineering, and aerospace science.
                      </p>
                      <p className="mt-4">
                        Each kit includes detailed assembly instructions, making it ideal for classroom projects
                        or club activities. The design focuses on safety while providing an exciting hands-on
                        experience for students of all ages.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="specs" className="mt-4">
                    <ul className="space-y-2">
                      <li className="flex justify-between border-b pb-2">
                        <span className="font-medium">Skill Level</span>
                        <span>Beginner to Intermediate</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="font-medium">Recommended Age</span>
                        <span>12+ (with supervision)</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="font-medium">Assembly Time</span>
                        <span>3-4 hours</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="font-medium">Height</span>
                        <span>45cm</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="font-medium">Recovery System</span>
                        <span>Parachute</span>
                      </li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="reviews" className="mt-4">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star 
                                key={star}
                                size={14} 
                                className={star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium ml-2">Science Teacher</span>
                        </div>
                        <p className="text-sm">
                          Excellent kit for classroom use. My students were engaged throughout the entire
                          building process, and it provided a great opportunity to discuss physics concepts.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star 
                                key={star}
                                size={14} 
                                className={star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium ml-2">Rocketry Club Leader</span>
                        </div>
                        <p className="text-sm">
                          We used these kits for our school's rocketry club and they were perfect. Clear instructions
                          and quality materials made for successful launches.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
