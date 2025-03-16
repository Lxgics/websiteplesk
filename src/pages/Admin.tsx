import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Trash, Plus, Save, Pencil, Eye, LogIn, Lock, 
  User as UserIcon, Settings, CreditCard, User, 
  Mail, Globe, Truck, ShoppingBag, FileText, AlertTriangle
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Admin credentials
const ADMIN_USERNAME = "Alfred";
const ADMIN_PASSWORD = "DieHard123-";

// Define a literal type for section types
type SectionType = 'hero' | 'products' | 'features' | 'about' | 'custom';

// Product type definition
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  shipping?: {
    weight: number;
    dimensions: string;
    freeShipping: boolean;
  };
  stock?: number;
}

// Order type definition
interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: string;
  paymentMethod: string;
}

// Page content type definition
interface PageContent {
  id: string;
  title: string;
  path: string;
  sections: {
    id: string;
    type: SectionType;
    title: string;
    content: string;
    enabled: boolean;
  }[];
}

// Store settings type definition
interface StoreSettings {
  general: {
    storeName: string;
    storeEmail: string;
    storeLogo: string;
    currencySymbol: string;
    phoneNumber: string;
  };
  payment: {
    revolutEnabled: boolean;
    revolutMerchantId: string;
    revolutApiKey: string;
    paypalEnabled: boolean;
    paypalEmail: string;
    stripeEnabled: boolean;
    stripePublishableKey: string;
    stripeSecretKey: string;
  };
  shipping: {
    freeShippingThreshold: number;
    standardShippingRate: number;
    expressShippingRate: number;
    internationalShippingEnabled: boolean;
  };
  email: {
    orderConfirmationTemplate: string;
    shippingConfirmationTemplate: string;
    adminNotificationEnabled: boolean;
    adminEmail: string;
  };
}

// ProductList component
const ProductList = ({ 
  products, 
  onSelect, 
  onDelete, 
  selectedId 
}: { 
  products: Product[]; 
  onSelect: (product: Product) => void; 
  onDelete: (id: string) => void; 
  selectedId?: string;
}) => {
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-2">
        {products.length === 0 ? (
          <div className="text-center py-4 text-space-500">
            No products found
          </div>
        ) : (
          products.map(product => (
            <div 
              key={product.id} 
              className={`p-3 border rounded-md cursor-pointer flex items-center ${
                selectedId === product.id 
                  ? 'border-rocket-500 bg-rocket-50 dark:bg-rocket-900/20' 
                  : 'hover:bg-space-100 dark:hover:bg-space-800'
              }`}
              onClick={() => onSelect(product)}
            >
              <div className="w-10 h-10 rounded-md overflow-hidden bg-space-100 dark:bg-space-800 mr-3 shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/100?text=Error';
                  }}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-space-900 dark:text-white truncate">{product.name}</h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-space-500 dark:text-space-400">£{product.price.toFixed(2)}</span>
                  <Badge variant="outline" className="bg-space-100 dark:bg-space-800 text-[10px]">
                    {product.category === 'motors' ? 'Rocket Motors' : 'Building Kits'}
                  </Badge>
                  {product.stock !== undefined && product.stock <= 5 && (
                    <Badge variant="destructive" className="text-[10px]">
                      Low Stock: {product.stock}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="shrink-0 flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(product);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-red-500" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(product.id);
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

const Admin = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'motors',
    shipping: {
      weight: 0,
      dimensions: '0x0x0',
      freeShipping: false
    },
    stock: 10
  });
  
  // Page content state
  const [pages, setPages] = useState<PageContent[]>([]);
  const [selectedPage, setSelectedPage] = useState<PageContent | null>(null);
  
  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderFilter, setOrderFilter] = useState<string>('all');
  
  // Store settings state
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    general: {
      storeName: 'Rocketry For Schools',
      storeEmail: 'contact@rocketryforschools.com',
      storeLogo: '/lovable-uploads/373348eb-ba6f-426f-8c69-0d78f91c2881.png',
      currencySymbol: '£',
      phoneNumber: '+44 20 1234 5678',
    },
    payment: {
      revolutEnabled: false,
      revolutMerchantId: '',
      revolutApiKey: '',
      paypalEnabled: false,
      paypalEmail: '',
      stripeEnabled: false,
      stripePublishableKey: '',
      stripeSecretKey: '',
    },
    shipping: {
      freeShippingThreshold: 50,
      standardShippingRate: 3.99,
      expressShippingRate: 8.99,
      internationalShippingEnabled: false,
    },
    email: {
      orderConfirmationTemplate: 'Thank you for your order! Your items will be shipped soon.',
      shippingConfirmationTemplate: 'Your order has been shipped and is on its way!',
      adminNotificationEnabled: true,
      adminEmail: 'admin@rocketryforschools.com',
    }
  });
  
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // On mount, load products from localStorage
  useEffect(() => {
    // Check if user is already logged in (from session storage)
    const loggedInStatus = sessionStorage.getItem('adminLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }

    // Load products
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Default sample data if nothing exists
      const defaultProducts = [
        {
          id: '1',
          name: 'A8-3 Rocket Motors',
          description: 'Entry-level rocket motors suitable for small model rockets.',
          price: 12.99,
          image: 'https://images.unsplash.com/photo-1614726365952-510103b9eda5?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3',
          category: 'motors',
          shipping: {
            weight: 0.1,
            dimensions: '10x5x5',
            freeShipping: true
          },
          stock: 24
        },
        {
          id: '2',
          name: 'Beginner Rocket Kit',
          description: 'Perfect starter kit for students new to model rocketry.',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1614315517650-3771cf72d18a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
          category: 'kits',
          shipping: {
            weight: 0.5,
            dimensions: '30x15x10',
            freeShipping: true
          },
          stock: 15
        }
      ];
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
    
    // Load pages
    const savedPages = localStorage.getItem('pages');
    if (savedPages) {
      setPages(JSON.parse(savedPages));
    } else {
      // Default sample data for pages with proper typing
      const defaultPages: PageContent[] = [
        {
          id: '1',
          title: 'Home Page',
          path: '/',
          sections: [
            {
              id: '1-1',
              type: 'hero' as SectionType,
              title: 'Hero Section',
              content: 'Inspire Learning Through Rocketry',
              enabled: true
            },
            {
              id: '1-2',
              type: 'products' as SectionType,
              title: 'Featured Products',
              content: 'Explore our collection of educational model rocketry products',
              enabled: true
            },
            {
              id: '1-3',
              type: 'features' as SectionType,
              title: 'Features',
              content: 'Why choose our products for educational purposes',
              enabled: true
            },
            {
              id: '1-4',
              type: 'about' as SectionType,
              title: 'About Us',
              content: 'Our mission and vision for educational rocketry',
              enabled: true
            }
          ]
        },
        {
          id: '2',
          title: 'About Us',
          path: '/about-us',
          sections: [
            {
              id: '2-1',
              type: 'hero' as SectionType,
              title: 'About Us Hero',
              content: 'Learn about our journey in educational rocketry',
              enabled: true
            },
            {
              id: '2-2',
              type: 'custom' as SectionType,
              title: 'Our Story',
              content: 'The story of how we started and our mission',
              enabled: true
            }
          ]
        }
      ];
      setPages(defaultPages);
      localStorage.setItem('pages', JSON.stringify(defaultPages));
    }
    
    // Load orders
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Default sample data for orders
      const defaultOrders = [
        {
          id: 'ORD-001',
          customerName: 'John Smith',
          customerEmail: 'john.smith@example.com',
          date: '2023-05-15',
          items: [
            {
              productId: '1',
              name: 'A8-3 Rocket Motors',
              quantity: 2,
              price: 12.99
            },
            {
              productId: '2',
              name: 'Beginner Rocket Kit',
              quantity: 1,
              price: 29.99
            }
          ],
          total: 55.97,
          status: 'delivered',
          address: '123 Main St, London, UK',
          paymentMethod: 'Credit Card'
        },
        {
          id: 'ORD-002',
          customerName: 'Sarah Johnson',
          customerEmail: 'sarah@schooldistrict.edu',
          date: '2023-06-02',
          items: [
            {
              productId: '5',
              name: 'Classroom Group Kit (30 Students)',
              quantity: 1,
              price: 299.99
            }
          ],
          total: 299.99,
          status: 'processing',
          address: 'City School District, 456 Education Ln, Manchester, UK',
          paymentMethod: 'Bank Transfer'
        },
        {
          id: 'ORD-003',
          customerName: 'David Williams',
          customerEmail: 'david.williams@gmail.com',
          date: '2023-06-10',
          items: [
            {
              productId: '1',
              name: 'A8-3 Rocket Motors',
              quantity: 3,
              price: 12.99
            }
          ],
          total: 38.97,
          status: 'pending',
          address: '789 Park Avenue, Edinburgh, UK',
          paymentMethod: 'PayPal'
        }
      ] as Order[];
      setOrders(defaultOrders);
      localStorage.setItem('orders', JSON.stringify(defaultOrders));
    }
    
    // Load store settings
    const savedSettings = localStorage.getItem('storeSettings');
    if (savedSettings) {
      setStoreSettings(JSON.parse(savedSettings));
    } else {
      // Use default settings defined above and save to localStorage
      localStorage.setItem('storeSettings', JSON.stringify(storeSettings));
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);
  
  // Save pages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pages', JSON.stringify(pages));
  }, [pages]);
  
  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);
  
  // Save store settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('storeSettings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties (e.g., shipping.weight)
      const [parent, child] = name.split('.');
      if (parent === 'shipping' && formData.shipping) {
        setFormData({
          ...formData,
          shipping: {
            ...formData.shipping,
            [child]: child === 'freeShipping' 
              ? (e.target as HTMLInputElement).checked 
              : (child === 'weight' || child === 'dimensions') 
                ? value 
                : Number(value)
          }
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties (e.g., shipping.freeShipping)
      const [parent, child] = name.split('.');
      if (parent === 'shipping' && formData.shipping) {
        setFormData({
          ...formData,
          shipping: {
            ...formData.shipping,
            [child]: checked
          }
        });
      }
    }
  };

  const selectProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      shipping: product.shipping || {
        weight: 0,
        dimensions: '0x0x0',
        freeShipping: false
      },
      stock: product.stock || 0
    });
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: 'motors',
      shipping: {
        weight: 0,
        dimensions: '0x0x0',
        freeShipping: false
      },
      stock: 10
    });
  };

  const saveProduct = () => {
    if (!formData.name || !formData.description || formData.price <= 0 || !formData.image) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (selectedProduct) {
      // Update existing product
      const updatedProducts = products.map(p => 
        p.id === selectedProduct.id ? { ...formData, id: selectedProduct.id } : p
      );
      setProducts(updatedProducts);
      toast({
        title: "Product Updated",
        description: `${formData.name} has been updated successfully`,
      });
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: Date.now().toString()
      };
      setProducts([...products, newProduct]);
      toast({
        title: "Product Added",
        description: `${formData.name} has been added successfully`,
      });
    }
    resetForm();
  };

  const deleteProduct = (id: string) => {
    const productToDelete = products.find(p => p.id === id);
    if (!productToDelete) return;
    
    if (confirm(`Are you sure you want to delete ${productToDelete.name}?`)) {
      setProducts(products.filter(p => p.id !== id));
      if (selectedProduct?.id === id) {
        resetForm();
      }
      toast({
        title: "Product Deleted",
        description: `${productToDelete.name} has been removed`,
      });
    }
  };

  // Page content management functions
  const selectPage = (page: PageContent) => {
    setSelectedPage(page);
  };
  
  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (selectedPage) {
      setSelectedPage({
        ...selectedPage,
        [name]: value
      });
    }
  };
  
  const handleSectionChange = (sectionId: string, field: string, value: any) => {
    if (selectedPage) {
      // For the 'type' field, ensure we're using a valid SectionType
      if (field === 'type') {
        // Validate that the value is a valid SectionType
        const validValue = (
          value === 'hero' || 
          value === 'products' || 
          value === 'features' || 
          value === 'about' || 
          value === 'custom'
        ) ? value as SectionType : 'custom' as SectionType;
        
        const updatedSections = selectedPage.sections.map(section => 
          section.id === sectionId ? { ...section, [field]: validValue } : section
        );
        
        setSelectedPage({
          ...selectedPage,
          sections: updatedSections
        });
      } else {
        // For other fields, proceed normally
        const updatedSections = selectedPage.sections.map(section => 
          section.id === sectionId ? { ...section, [field]: value } : section
        );
        
        setSelectedPage({
          ...selectedPage,
          sections: updatedSections
        });
      }
    }
  };
  
  const savePage = () => {
    if (!selectedPage) return;
    
    const pageExists = pages.some(p => p.id === selectedPage.id);
    
    if (pageExists) {
      setPages(pages.map(p => p.id === selectedPage.id ? selectedPage : p));
    } else {
      setPages([...pages, { ...selectedPage, id: Date.now().toString() }]);
    }
    
    setSelectedPage(null);
    
    toast({
      title: "Page Saved",
      description: "Page content has been updated successfully",
    });
  };
  
  // Order management functions
  const selectOrder = (order: Order) => {
    setSelectedOrder(order);
  };
  
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
    
    toast({
      title: "Order Updated",
      description: `Order ${orderId} status changed to ${status}`,
    });
  };
  
  const getFilteredOrders = () => {
    if (orderFilter === 'all') return orders;
    return orders.filter(order => order.status === orderFilter);
  };
  
  // Store settings functions
  const handleSettingsChange = (section: keyof StoreSettings, field: string, value: any) => {
    setStoreSettings({
      ...storeSettings,
      [section]: {
        ...storeSettings[section],
        [field]: value
      }
    });
  };
  
  const saveSettings = () => {
    localStorage.setItem('storeSettings', JSON.stringify(storeSettings));
    
    toast({
      title: "Settings Saved",
      description: "Your store settings have been updated successfully",
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      sessionStorage.setItem('adminLoggedIn', 'true');
      toast({
        title: "Logged In",
        description: "Welcome to the admin panel",
      });
    } else {
      setLoginError('Invalid username or password');
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('adminLoggedIn');
    setUsername('');
    setPassword('');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white dark:bg-space-950 text-space-900 dark:text-white flex items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 text-sm bg-red-50 text-red-500 rounded-md border border-red-200">
                  {loginError}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            {/* Admin header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="px-3 py-1 text-xs font-medium bg-space-100 dark:bg-space-800 text-space-800 dark:text-space-200 rounded-full mb-4 inline-block">
                Admin Panel
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                Store <span className="text-rocket-600 dark:text-rocket-400">Management</span>
              </h1>
              <p className="text-space-600 dark:text-space-400">
                Create, update, and manage your product catalog. All changes are automatically saved to the database.
              </p>
              <div className="mt-4">
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>

            <Tabs defaultValue="products" className="w-full mb-8">
              <TabsList className="w-full mb-8">
                <TabsTrigger value="products" className="flex-1">Products</TabsTrigger>
                <TabsTrigger value="pages" className="flex-1">Pages</TabsTrigger>
                <TabsTrigger value="orders" className="flex-1">Orders</TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Product listing - 2 columns */}
                  <div className="lg:col-span-2 bg-white dark:bg-space-900 rounded-xl shadow-subtle p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Products</h2>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={resetForm}
                      >
                        <Plus className="h-4 w-4 mr-1" /> New
                      </Button>
                    </div>
                    
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="w-full mb-4">
                        <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                        <TabsTrigger value="motors" className="flex-1">Motors</TabsTrigger>
                        <TabsTrigger value="kits" className="flex-1">Kits</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="all" className="mt-0">
                        <ProductList 
                          products={products}
                          onSelect={selectProduct}
                          onDelete={deleteProduct}
                          selectedId={selectedProduct?.id}
                        />
                      </TabsContent>
                      
                      <TabsContent value="motors" className="mt-0">
                        <ProductList 
                          products={products.filter(p => p.category === 'motors')}
                          onSelect={selectProduct}
                          onDelete={deleteProduct}
                          selectedId={selectedProduct?.id}
                        />
                      </TabsContent>
                      
                      <TabsContent value="kits" className="mt-0">
                        <ProductList 
                          products={products.filter(p => p.category === 'kits')}
                          onSelect={selectProduct}
                          onDelete={deleteProduct}
                          selectedId={selectedProduct?.id}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  {/* Product form - 3 columns */}
                  <div className="lg:col-span-3 bg-white dark:bg-space-900 rounded-xl shadow-subtle p-5">
                    <h2 className="text-xl font-semibold mb-4">
                      {selectedProduct ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); saveProduct(); }}>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Product Name</label>
                        <Input 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter product name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Description</label>
                        <Textarea 
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Enter product description"
                          rows={4}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Price (£)</label>
                          <Input 
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            min="0.01"
                            step="0.01"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Category</label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            required
                          >
                            <option value="motors">Rocket Motors</option>
                            <option value="kits">Building Kits</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Stock Quantity</label>
                          <Input 
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            min="0"
                            step="1"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Product Weight (kg)</label>
                          <Input 
                            type="number"
                            name="shipping.weight"
                            value={formData.shipping?.weight}
                            onChange={handleInputChange}
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Dimensions (LxWxH cm)</label>
                          <Input 
                            name="shipping.dimensions"
                            value={formData.shipping?.dimensions}
                            onChange={handleInputChange}
                            placeholder="e.g. 20x15x10"
                          />
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="freeShipping"
                            name="shipping.freeShipping"
                            checked={formData.shipping?.freeShipping}
                            onChange={handleCheckboxChange}
                            className="mr-2 h-4 w-4"
                          />
                          <label htmlFor="freeShipping" className="text-sm font-medium">
                            Free Shipping
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Image URL</label>
                        <Input 
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          placeholder="Enter image URL"
                          required
                        />
                      </div>
                      
                      {formData.image && (
                        <div className="mt-2">
                          <p className="text-sm font-medium mb-1">Image Preview:</p>
                          <div className="w-full h-48 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <img 
                              src={formData.image} 
                              alt="Product preview" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Not+Found';
                              }}
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-end space-x-3 pt-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={resetForm}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          {selectedProduct ? 'Update Product' : 'Save Product'}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="pages">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Pages listing - 2 columns */}
                  <div className="lg:col-span-2 bg-white dark:bg-space-900 rounded-xl shadow-subtle p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Pages</h2>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedPage({
                          id: '',
                          title: 'New Page',
                          path: '/new-page',
                          sections: []
                        })}
                      >
                        <Plus className="h-4 w-4 mr-1" /> New
                      </Button>
                    </div>
                    
                    <ScrollArea className="h-[60vh]">
                      <div className="space-y-2">
                        {pages.map(page => (
                          <div 
                            key={page.id} 
                            className={`p-3 border rounded-md cursor-pointer flex items-center ${
                              selectedPage?.id === page.id 
                                ? 'border-rocket-500 bg-rocket-50 dark:bg-rocket-900/20' 
                                : 'hover:bg-space-100 dark:hover:bg-space-800'
                            }`}
                            onClick={() => selectPage(page)}
                          >
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-space-900 dark:text-white truncate">
                                {page.title}
                              </h3>
                              <div className="text-xs text-space-500 dark:text-space-400">
                                {page.path}
                              </div>
                            </div>
                            <div className="shrink-0 flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectPage(page);
                                }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(page.path, '_blank');
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  {/* Page editor - 3 columns */}
                  <div className="lg:col-span-3 bg-white dark:bg-space-900 rounded-xl shadow-subtle p-5">
                    {selectedPage ? (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">
                          Edit Page
                        </h2>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Page Title</label>
                            <Input 
                              name="title"
                              value={selectedPage.title}
                              onChange={handlePageChange}
                              placeholder="Enter page title"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-1 block">Page Path</label>
                            <Input 
                              name="path"
                              value={selectedPage.path}
                              onChange={handlePageChange}
                              placeholder="Enter page path (e.g., /about-us)"
                              required
                            />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="text-sm font-medium block">Sections</label>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  const newSection = {
                                    id: Date.now().toString(),
                                    type: 'custom' as const,
                                    title: 'New Section',
                                    content: 'Enter content here',
                                    enabled: true
                                  };
                                  
                                  setSelectedPage({
                                    ...selectedPage,
                                    sections: [...selectedPage.sections, newSection]
                                  });
                                }}
                              >
                                <Plus className="h-4 w-4 mr-1" /> Add Section
                              </Button>
                            </div>
                            
                            <div className="space-y-4 mt-4">
                              {selectedPage.sections.length === 0 ? (
                                <div className="text-center py-4 text-space-500 border border-dashed rounded-md">
                                  No sections added yet. Click "Add Section" to create one.
                                </div>
                              ) : (
                                selectedPage.sections.map((section, index) => (
                                  <div 
                                    key={section.id} 
                                    className="border rounded-md p-4"
                                  >
                                    <div className="flex justify-between items-center mb-3">
                                      <h4 className="font-medium">Section {index + 1}</h4>
                                      <div className="flex space-x-2">
                                        <Switch 
                                          checked={section.enabled}
                                          onCheckedChange={(checked) => {
                                            handleSectionChange(section.id, 'enabled', checked);
                                          }}
                                        />
                                        <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          className="h-8 w-8 text-red-500"
                                          onClick={() => {
                                            if (confirm('Are you sure you want to delete this section?')) {
                                              setSelectedPage({
                                                ...selectedPage,
                                                sections: selectedPage.sections.filter(s => s.id !== section.id)
                                              });
                                            }
                                          }}
                                        >
                                          <Trash className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                      <div>
                                        <label className="text-xs font-medium mb-1 block">Section Title</label>
                                        <Input 
                                          value={section.title}
                                          onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                                          placeholder="Enter section title"
                                        />
                                      </div>
                                      
                                      <div>
                                        <label className="text-xs font-medium mb-1 block">Section Type</label>
                                        <select
                                          value={section.type}
                                          onChange={(e) => handleSectionChange(
                                            section.id, 
                                            'type', 
                                            e.target.value as 'hero' | 'products' | 'features' | 'about' | 'custom'
                                          )}
                                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        >
                                          <option value="hero">Hero</option>
                                          <option value="products">Products</option>
                                          <option value="features">Features</option>
                                          <option value="about">About</option>
                                          <option value="custom">Custom</option>
                                        </select>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <label className="text-xs font-medium mb-1 block">Content</label>
                                      <Textarea 
                                        value={section.content}
                                        onChange={(e) => handleSectionChange(section.id, 'content', e.target.value)}
                                        placeholder="Enter section content"
                                        rows={3}
                                      />
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-3 pt-4">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setSelectedPage(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              onClick={savePage}
                            >
                              <Save className="h-4 w-4 mr-1" />
                              Save Page
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-20 text-space-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <h3 className="text-lg font-medium mb-1">No Page Selected</h3>
                        <p className="text-sm max-w-md mx-auto">
                          Select a page from the list to edit its content, or click the "New" button to create a new page.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="orders">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Orders listing - 2 columns */}
                  <div className="lg:col-span-2 bg-white dark:bg-space-900 rounded-xl shadow-subtle p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Orders</h2>
                      <Select 
                        defaultValue={orderFilter} 
                        onValueChange={setOrderFilter}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Orders</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <ScrollArea className="h-[60vh]">
                      <div className="space-y-2">
                        {getFilteredOrders().length === 0 ? (
                          <div className="text-center py-10 text-space-500">
                            <ShoppingBag className="h-8 w-8 mx-auto mb-2 opacity-20" />
                            <p>No orders found</p>
                          </div>
                        ) : (
                          getFilteredOrders().map(order => (
                            <div 
                              key={order.id} 
                              className={`p-3 border rounded-md cursor-pointer ${
                                selectedOrder?.id === order.id 
                                  ? 'border-rocket-500 bg-rocket-50 dark:bg-rocket-900/20' 
                                  : 'hover:bg-space-100 dark:hover:bg-space-800'
                              }`}
                              onClick={() => selectOrder(order)}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <div className="font-medium">{order.id}</div>
                                <Badge 
                                  variant={
                                    order.status === 'delivered' ? 'default' :
                                    order.status === 'shipped' ? 'secondary' :
                                    order.status === 'processing' ? 'outline' :
                                    order.status === 'pending' ? 'secondary' : 'destructive'
                                  }
                                  className="capitalize"
                                >
                                  {order.status}
                                </Badge>
                              </div>
                              
                              <div className="text-sm text-space-500 dark:text-space-400 flex justify-between">
                                <span>{order.customerName}</span>
                                <span>£{order.total.toFixed(2)}</span>
                              </div>
                              
                              <div className="text-xs text-space-500 dark:text-space-400 mt-1">
                                {order.date}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  {/* Order details - 3 columns */}
                  <div className="lg:col-span-3 bg-white dark:bg-space-900 rounded-xl shadow-subtle p-5">
                    {selectedOrder ? (
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h2 className="text-xl font-semibold">
                              Order: {selectedOrder.id}
                            </h2>
                            <p className="text-space-500 dark:text-space-400 text-sm">
                              {selectedOrder.date}
                            </p>
                          </div>
                          
                          <Select 
                            defaultValue={selectedOrder.status} 
                            onValueChange={(value) => updateOrderStatus(
                              selectedOrder.id, 
                              value as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
                            )}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Change status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <div>
                            <h3 className="text-sm font-medium mb-2 flex items-center">
                              <User className="h-4 w-4 mr-1 text-space-400" />
                              Customer Information
                            </h3>
                            <div className="space-y-1 text-sm">
                              <div className="font-medium">{selectedOrder.customerName}</div>
                              <div className="text-space-500 dark:text-space-400">
                                <a href={`mailto:${selectedOrder.customerEmail}`}>
                                  {selectedOrder.customerEmail}
                                </a>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium mb-2 flex items-center">
                              <Truck className="h-4 w-4 mr-1 text-space-400" />
                              Shipping Address
                            </h3>
                            <div className="space-y-1 text-sm text-space-500 dark:text-space-400">
                              <div>{selectedOrder.address}</div>
                            </div>
                          </div>
                        </div>
                        
                        <Separator className="my-6" />
                        
                        <h3 className="text-sm font-medium mb-3 flex items-center">
                          <ShoppingBag className="h-4 w-4 mr-1 text-space-400" />
                          Order Items
                        </h3>
                        
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead className="text-right">Quantity</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                              <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedOrder.items.map((item) => (
                              <TableRow key={item.productId}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell className="text-right">{item.quantity}</TableCell>
                                <TableCell className="text-right">£{item.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right">£{(item.quantity * item.price).toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        
                        <div className="flex justify-between mt-6 pt-6 border-t">
                          <div>
                            <p className="text-sm text-space-500 dark:text-space-400 flex items-center">
                              <CreditCard className="h-4 w-4 mr-1" /> 
                              Payment Method: {selectedOrder.paymentMethod}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-space-500 dark:text-space-400">Order Total</div>
                            <div className="text-xl font-semibold">£{selectedOrder.total.toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-20 text-space-500">
                        <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <h3 className="text-lg font-medium mb-1">No Order Selected</h3>
                        <p className="text-sm max-w-md mx-auto">
                          Select an order from the list to view its details and update its status.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings">
                <div className="bg-white dark:bg-space-900 rounded-xl shadow-subtle p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Store Settings
                  </h2>
                  
                  <Tabs defaultValue="general" className="w-full">
                    <TabsList className="w-full mb-6">
                      <TabsTrigger value="general" className="flex-1">
                        <Globe className="h-4 w-4 mr-2" />
                        General
                      </TabsTrigger>
                      <TabsTrigger value="payment" className="flex-1">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Payment
                      </TabsTrigger>
                      <TabsTrigger value="shipping" className="flex-1">
                        <Truck className="h-4 w-4 mr-2" />
                        Shipping
                      </TabsTrigger>
                      <TabsTrigger value="email" className="flex-1">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="general" className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Store Name</label>
                          <Input 
                            value={storeSettings.general.storeName}
                            onChange={(e) => handleSettingsChange('general', 'storeName', e.target.value)}
                            placeholder="Enter store name"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Store Email</label>
                          <Input 
                            type="email"
                            value={storeSettings.general.storeEmail}
                            onChange={(e) => handleSettingsChange('general', 'storeEmail', e.target.value)}
                            placeholder="Enter store email"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Currency Symbol</label>
                          <Input 
                            value={storeSettings.general.currencySymbol}
                            onChange={(e) => handleSettingsChange('general', 'currencySymbol', e.target.value)}
                            placeholder="£"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Phone Number</label>
                          <Input 
                            value={storeSettings.general.phoneNumber}
                            onChange={(e) => handleSettingsChange('general', 'phoneNumber', e.target.value)}
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Store Logo URL</label>
                        <Input 
                          value={storeSettings.general.storeLogo}
                          onChange={(e) => handleSettingsChange('general', 'storeLogo', e.target.value)}
                          placeholder="Enter logo URL"
                        />
                        {storeSettings.general.storeLogo && (
                          <div className="mt-2 w-40 h-20 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden p-2">
                            <img 
                              src={storeSettings.general.storeLogo} 
                              alt="Store logo" 
                              className="h-full w-auto object-contain mx-auto"
                            />
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="payment" className="space-y-6">
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Revolut Business</CardTitle>
                            <Switch 
                              checked={storeSettings.payment.revolutEnabled}
                              onCheckedChange={(checked) => handleSettingsChange('payment', 'revolutEnabled', checked)}
                            />
                          </div>
                          <CardDescription>Accept payments through Revolut Business</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Merchant ID</label>
                            <Input 
                              value={storeSettings.payment.revolutMerchantId}
                              onChange={(e) => handleSettingsChange('payment', 'revolutMerchantId', e.target.value)}
                              placeholder="Enter Revolut merchant ID"
                              disabled={!storeSettings.payment.revolutEnabled}
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-1 block">API Key</label>
                            <Input 
                              type="password"
                              value={storeSettings.payment.revolutApiKey}
                              onChange={(e) => handleSettingsChange('payment', 'revolutApiKey', e.target.value)}
                              placeholder="Enter Revolut API key"
                              disabled={!storeSettings.payment.revolutEnabled}
                            />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">PayPal</CardTitle>
                            <Switch 
                              checked={storeSettings.payment.paypalEnabled}
                              onCheckedChange={(checked) => handleSettingsChange('payment', 'paypalEnabled', checked)}
                            />
                          </div>
                          <CardDescription>Accept payments through PayPal</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div>
                            <label className="text-sm font-medium mb-1 block">PayPal Email</label>
                            <Input 
                              type="email"
                              value={storeSettings.payment.paypalEmail}
                              onChange={(e) => handleSettingsChange('payment', 'paypalEmail', e.target.value)}
                              placeholder="Enter PayPal email"
                              disabled={!storeSettings.payment.paypalEnabled}
                            />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Stripe</CardTitle>
                            <Switch 
                              checked={storeSettings.payment.stripeEnabled}
                              onCheckedChange={(checked) => handleSettingsChange('payment', 'stripeEnabled', checked)}
                            />
                          </div>
                          <CardDescription>Accept payments through Stripe</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Stripe Publishable Key</label>
                            <Input 
                              value={storeSettings.payment.stripePublishableKey}
                              onChange={(e) => handleSettingsChange('payment', 'stripePublishableKey', e.target.value)}
                              placeholder="Enter Stripe publishable key"
                              disabled={!storeSettings.payment.stripeEnabled}
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-1 block">Stripe Secret Key</label>
                            <Input 
                              type="password"
                              value={storeSettings.payment.stripeSecretKey}
                              onChange={(e) => handleSettingsChange('payment', 'stripeSecretKey', e.target.value)}
                              placeholder="Enter Stripe secret key"
                              disabled={!storeSettings.payment.stripeEnabled}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="shipping" className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Free Shipping Threshold (£)</label>
                          <Input 
                            type="number"
                            value={storeSettings.shipping.freeShippingThreshold}
                            onChange={(e) => handleSettingsChange('shipping', 'freeShippingThreshold', parseFloat(e.target.value))}
                            placeholder="Enter amount"
                            min="0"
                            step="0.01"
                          />
                          <p className="text-xs text-space-500 mt-1">
                            Orders above this amount qualify for free shipping
                          </p>
                        </div>
                        
                        <div className="flex items-center h-full">
                          <div className="space-x-2 flex items-center">
                            <Switch 
                              id="internationalShipping"
                              checked={storeSettings.shipping.internationalShippingEnabled}
                              onCheckedChange={(checked) => handleSettingsChange('shipping', 'internationalShippingEnabled', checked)}
                            />
                            <label htmlFor="internationalShipping" className="text-sm font-medium cursor-pointer">
                              Enable International Shipping
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Standard Shipping Rate (£)</label>
                          <Input 
                            type="number"
                            value={storeSettings.shipping.standardShippingRate}
                            onChange={(e) => handleSettingsChange('shipping', 'standardShippingRate', parseFloat(e.target.value))}
                            placeholder="Enter rate"
                            min="0"
                            step="0.01"
                          />
                          <p className="text-xs text-space-500 mt-1">
                            Base rate for standard shipping (3-5 business days)
                          </p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Express Shipping Rate (£)</label>
                          <Input 
                            type="number"
                            value={storeSettings.shipping.expressShippingRate}
                            onChange={(e) => handleSettingsChange('shipping', 'expressShippingRate', parseFloat(e.target.value))}
                            placeholder="Enter rate"
                            min="0"
                            step="0.01"
                          />
                          <p className="text-xs text-space-500 mt-1">
                            Base rate for express shipping (1-2 business days)
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="email" className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Admin Email</label>
                          <Input 
                            type="email"
                            value={storeSettings.email.adminEmail}
                            onChange={(e) => handleSettingsChange('email', 'adminEmail', e.target.value)}
                            placeholder="Enter admin email"
                          />
                        </div>
                        
                        <div className="flex items-center h-full">
                          <div className="space-x-2 flex items-center">
                            <Switch 
                              id="adminNotifications"
                              checked={storeSettings.email.adminNotificationEnabled}
                              onCheckedChange={(checked) => handleSettingsChange('email', 'adminNotificationEnabled', checked)}
                            />
                            <label htmlFor="adminNotifications" className="text-sm font-medium cursor-pointer">
                              Enable Admin Order Notifications
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Order Confirmation Template</label>
                        <Textarea 
                          value={storeSettings.email.orderConfirmationTemplate}
                          onChange={(e) => handleSettingsChange('email', 'orderConfirmationTemplate', e.target.value)}
                          placeholder="Enter template content"
                          rows={3}
                        />
                        <p className="text-xs text-space-500 mt-1">
                          Use {'{order_number}'}, {'{customer_name}'}, etc. as placeholders
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Shipping Confirmation Template</label>
                        <Textarea 
                          value={storeSettings.email.shippingConfirmationTemplate}
                          onChange={(e) => handleSettingsChange('email', 'shippingConfirmationTemplate', e.target.value)}
                          placeholder="Enter template content"
                          rows={3}
                        />
                        <p className="text-xs text-space-500 mt-1">
                          Use {'{order_number}'}, {'{tracking_number}'}, etc. as placeholders
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-end mt-8">
                    <Button onClick={saveSettings}>
                      <Save className="h-4 w-4 mr-1" />
                      Save Settings
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
