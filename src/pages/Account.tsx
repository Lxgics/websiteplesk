
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Package, User, Settings, Clock, ChevronRight, Phone, Mail, MapPin, Bell, Edit } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RevealAnimation from '@/components/ui/RevealAnimation';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from 'react-helmet';

const Account = () => {
  const { user, userProfile, orders, logout, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  
  // If user is not logged in, redirect to login page
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/account' } });
    }
  }, [user, navigate]);
  
  if (!user) {
    return null; // Will redirect to login through the effect above
  }
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(price);
  };

  const toggleEmailNotifications = async () => {
    if (!userProfile) return;
    
    const result = await updateProfile({
      preferences: {
        ...userProfile.preferences,
        emailNotifications: !userProfile.preferences?.emailNotifications
      }
    });
    
    if (result.success) {
      toast({
        title: "Preferences updated",
        description: "Your notification settings have been updated",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-space-950 text-space-900 dark:text-white">
      <Helmet>
        <title>My Account | Rocketry For Schools</title>
        <meta name="description" content="View your account information and order history" />
      </Helmet>
      
      <Navbar />
      
      <main className="w-full md:w-[90%] mx-auto pt-28 pb-16 px-4">
        <RevealAnimation>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">My Account</h1>
              <p className="text-space-600 dark:text-space-400">
                Welcome back, {user.name}
              </p>
            </div>
            
            <AnimatedButton 
              variant="outline" 
              icon={<LogOut size={18} />}
              iconPosition="left"
              onClick={handleLogout}
              className="mt-4 sm:mt-0"
            >
              Logout
            </AnimatedButton>
          </div>
        </RevealAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar / Navigation */}
          <RevealAnimation delay={0.1} className="md:col-span-1">
            <div className="bg-white dark:bg-space-900 rounded-xl shadow-sm overflow-hidden sticky top-28">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-rocket-100 dark:bg-rocket-900 flex items-center justify-center text-rocket-600 dark:text-rocket-400">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-2">
                <button 
                  onClick={() => setActiveTab("orders")}
                  className={`flex w-full items-center space-x-2 p-2 rounded-lg ${
                    activeTab === "orders" 
                      ? "bg-rocket-50 dark:bg-rocket-900/20 text-rocket-600 dark:text-rocket-400" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <Package size={18} />
                  <span>Orders</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab("profile")}
                  className={`flex w-full items-center space-x-2 p-2 rounded-lg ${
                    activeTab === "profile" 
                      ? "bg-rocket-50 dark:bg-rocket-900/20 text-rocket-600 dark:text-rocket-400" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <User size={18} />
                  <span>Profile</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab("settings")}
                  className={`flex w-full items-center space-x-2 p-2 rounded-lg ${
                    activeTab === "settings" 
                      ? "bg-rocket-50 dark:bg-rocket-900/20 text-rocket-600 dark:text-rocket-400" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
              </div>
              
              <div className="p-4 mt-4 bg-space-50 dark:bg-space-900/40 border-t border-gray-200 dark:border-gray-800">
                <p className="text-xs text-space-500">Need assistance?</p>
                <a 
                  href="mailto:admin@rocketryforschools.co.uk" 
                  className="flex items-center mt-2 text-sm text-rocket-600 dark:text-rocket-400 hover:underline"
                >
                  <Mail size={14} className="mr-1" />
                  Contact Support
                </a>
              </div>
            </div>
          </RevealAnimation>
          
          {/* Main content area */}
          <RevealAnimation delay={0.2} className="md:col-span-3">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white dark:bg-space-900 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-xl font-semibold">Order History</h2>
                </div>
                
                {orders.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto flex items-center justify-center mb-4">
                      <Package size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-4">
                      You haven't placed any orders yet.
                    </p>
                    <Link to="/all-model-rocket-kits">
                      <AnimatedButton 
                        variant="outline" 
                        icon={<ChevronRight size={16} />}
                        iconPosition="right"
                      >
                        Browse Products
                      </AnimatedButton>
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between mb-4">
                          <div>
                            <h3 className="font-medium">{order.id}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Clock size={14} />
                              <span>{formatDate(order.date)}</span>
                            </div>
                          </div>
                          <div className="mt-2 sm:mt-0 flex flex-col sm:items-end">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                            }`}>
                              {order.status}
                            </span>
                            <span className="text-lg font-mono font-medium mt-1">
                              {formatPrice(order.total)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between">
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-mono">{formatPrice(item.price)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                          <Link to={`/order/${order.id}`}>
                            <AnimatedButton 
                              variant="ghost" 
                              size="sm"
                              icon={<ChevronRight size={16} />}
                              iconPosition="right"
                            >
                              View Details
                            </AnimatedButton>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white dark:bg-space-900 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-xl font-semibold">My Profile</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{user.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email Address</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="font-medium">{userProfile?.phone || "Not provided"}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <AnimatedButton
                          variant="outline"
                          size="sm"
                          icon={<Edit size={16} />}
                          iconPosition="left"
                        >
                          Edit Profile
                        </AnimatedButton>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
                      {userProfile?.address ? (
                        <div className="space-y-1">
                          <p>{userProfile.address.street}</p>
                          <p>{userProfile.address.city}</p>
                          <p>{userProfile.address.postcode}</p>
                          <p>{userProfile.address.country}</p>
                          
                          <div className="mt-6">
                            <AnimatedButton
                              variant="outline"
                              size="sm"
                              icon={<Edit size={16} />}
                              iconPosition="left"
                            >
                              Edit Address
                            </AnimatedButton>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-gray-500 mb-4">No shipping address saved yet.</p>
                          <AnimatedButton
                            variant="outline"
                            size="sm"
                            icon={<MapPin size={16} />}
                            iconPosition="left"
                          >
                            Add Address
                          </AnimatedButton>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white dark:bg-space-900 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-xl font-semibold">Account Settings</h2>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive order updates and delivery notifications</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700">
                        <input 
                          type="checkbox" 
                          id="emailToggle" 
                          className="sr-only"
                          checked={userProfile?.preferences?.emailNotifications ?? true}
                          onChange={toggleEmailNotifications}
                        />
                        <label 
                          htmlFor="emailToggle" 
                          className={`absolute inset-0 rounded-full cursor-pointer transition-all duration-300 ${
                            userProfile?.preferences?.emailNotifications ? 'bg-rocket-500' : ''
                          }`}
                        >
                          <span 
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform transform ${
                              userProfile?.preferences?.emailNotifications ? 'translate-x-6' : ''
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-gray-500">Receive offers, discounts and product updates</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700">
                        <input 
                          type="checkbox" 
                          id="marketingToggle" 
                          className="sr-only"
                          checked={userProfile?.preferences?.marketing ?? false}
                        />
                        <label 
                          htmlFor="marketingToggle" 
                          className={`absolute inset-0 rounded-full cursor-pointer transition-all duration-300 ${
                            userProfile?.preferences?.marketing ? 'bg-rocket-500' : ''
                          }`}
                        >
                          <span 
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform transform ${
                              userProfile?.preferences?.marketing ? 'translate-x-6' : ''
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-medium mb-4">Security</h3>
                    
                    <AnimatedButton
                      variant="outline"
                      size="sm"
                      className="mb-4"
                    >
                      Change Password
                    </AnimatedButton>
                    
                    <AnimatedButton
                      variant="destructive"
                      size="sm"
                    >
                      Delete Account
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            )}
          </RevealAnimation>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
