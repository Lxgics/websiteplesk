
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Edit, Eye, LinkIcon, Settings, Home, ShoppingBag, Info, Book, Shield } from 'lucide-react';

const AdminSecret = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  // Define all available pages
  const pages = [
    { id: 'home', name: 'Home', path: '/', icon: <Home size={18} /> },
    { id: 'products', name: 'All Products', path: '/all-model-rocket-kits', icon: <ShoppingBag size={18} /> },
    { id: 'building-kits', name: 'Building Kits', path: '/building-kits', icon: <ShoppingBag size={18} /> },
    { id: 'schools-clubs', name: 'Schools & Clubs Kits', path: '/schools-clubs-kits', icon: <ShoppingBag size={18} /> },
    { id: 'motors', name: 'Rocket Motors', path: '/rocket-motors', icon: <ShoppingBag size={18} /> },
    { id: 'about', name: 'About Us', path: '/about-us', icon: <Info size={18} /> },
    { id: 'laws', name: 'UK Laws', path: '/uk-laws', icon: <Shield size={18} /> },
    { id: 'terms', name: 'Terms of Service', path: '/terms', icon: <Book size={18} /> },
    { id: 'account', name: 'Account', path: '/account', icon: <Settings size={18} /> },
    { id: 'login', name: 'Login', path: '/login', icon: <Settings size={18} /> },
    { id: 'register', name: 'Register', path: '/register', icon: <Settings size={18} /> },
  ];

  useEffect(() => {
    // Check if the user is an admin
    if (user && user.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-white dark:bg-space-950 text-space-900 dark:text-white">
      <Helmet>
        <title>Admin Secret | Rocketry For Schools</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <main className="w-full md:w-[90%] mx-auto pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            {!isAdmin && (
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg mt-4 text-yellow-800 dark:text-yellow-200">
                <p className="font-medium">Admin Access Required</p>
                <p className="text-sm mt-1">You need admin privileges to edit pages. Please log in with an admin account.</p>
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">All Pages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pages.map((page) => (
                <Card key={page.id} className="bg-white dark:bg-space-900 border border-gray-200 dark:border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <span className="mr-2">{page.icon}</span>
                      {page.name}
                    </CardTitle>
                    <CardDescription>
                      {page.path}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between pt-4">
                    <AnimatedButton 
                      variant="outline" 
                      size="sm" 
                      icon={<Eye size={16} />} 
                      iconPosition="left"
                      onClick={() => window.open(page.path, '_blank')}
                    >
                      View
                    </AnimatedButton>
                    <AnimatedButton 
                      variant={isAdmin ? "primary" : "outline"} 
                      size="sm" 
                      icon={<Edit size={16} />} 
                      iconPosition="left"
                      disabled={!isAdmin}
                      className={!isAdmin ? "opacity-60 cursor-not-allowed" : ""}
                    >
                      Edit Page
                    </AnimatedButton>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-white dark:bg-space-900 border border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle>Clear Cache</CardTitle>
                  <CardDescription>Reset the application's cache data</CardDescription>
                </CardHeader>
                <CardFooter>
                  <AnimatedButton 
                    variant="outline" 
                    size="sm" 
                    disabled={!isAdmin}
                    className={!isAdmin ? "opacity-60 cursor-not-allowed" : ""}
                  >
                    Clear Cache
                  </AnimatedButton>
                </CardFooter>
              </Card>
              
              <Card className="bg-white dark:bg-space-900 border border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle>Rebuild Index</CardTitle>
                  <CardDescription>Rebuild the product search index</CardDescription>
                </CardHeader>
                <CardFooter>
                  <AnimatedButton 
                    variant="outline" 
                    size="sm" 
                    disabled={!isAdmin}
                    className={!isAdmin ? "opacity-60 cursor-not-allowed" : ""}
                  >
                    Rebuild Index
                  </AnimatedButton>
                </CardFooter>
              </Card>
              
              <Card className="bg-white dark:bg-space-900 border border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>View current system status</CardDescription>
                </CardHeader>
                <CardFooter>
                  <AnimatedButton 
                    variant="outline" 
                    size="sm" 
                    disabled={!isAdmin}
                    className={!isAdmin ? "opacity-60 cursor-not-allowed" : ""}
                  >
                    View Status
                  </AnimatedButton>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminSecret;
