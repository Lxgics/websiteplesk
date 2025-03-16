
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import AnimatedButton from '../ui/AnimatedButton';
import { Menu, X, Search, User, ChevronDown, ShoppingCart, LogIn } from 'lucide-react';
import CartDropdown from '../cart/CartDropdown';
import { useAuth } from '@/context/AuthContext';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      setEmail('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    logout();
  };

  const goToAccount = () => {
    navigate('/account');
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled 
          ? "bg-white/80 dark:bg-space-950/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container px-6 mx-auto max-w-[90%]">
        <div className="flex items-center justify-between">
          {/* Logo - removed floating animation */}
          <Link 
            to="/" 
            className="relative z-10 flex items-center gap-2"
          >
            <img 
              src="/lovable-uploads/373348eb-ba6f-426f-8c69-0d78f91c2881.png" 
              alt="Rocketry For Schools Logo" 
              className="h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors",
                "hover:text-rocket-600 dark:hover:text-rocket-400",
                "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0",
                "after:bg-rocket-500 dark:after:bg-rocket-400 after:transition-all after:duration-300",
                "hover:after:w-full"
              )}
            >
              Home
            </Link>

            {/* Model Rocket Kits Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-rocket-600 dark:hover:text-rocket-400 focus:bg-transparent">
                    Model Rocket Kits
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[200px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/building-kits"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">Model Rocket Build Kits</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/schools-clubs-kits"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">Schools & Clubs Kits</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/all-model-rocket-kits"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">All Model Rocket Kits</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/building-equipment"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">Building Equipment</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/rocket-motors"
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors",
                "hover:text-rocket-600 dark:hover:text-rocket-400",
                "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0",
                "after:bg-rocket-500 dark:after:bg-rocket-400 after:transition-all after:duration-300",
                "hover:after:w-full"
              )}
            >
              Rocket Motors
            </Link>

            {/* Information Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-rocket-600 dark:hover:text-rocket-400 focus:bg-transparent">
                    Information
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[200px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/about-us"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">About Us</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/uk-laws"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">Model Rocketry Law in the UK</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/terms"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">Terms of Service</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-rocket-600 dark:hover:text-rocket-400">
              <Search size={20} />
            </button>
            
            {/* User Account Hover Card */}
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-rocket-600 dark:hover:text-rocket-400">
                    <User size={20} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56 z-[100] bg-white dark:bg-space-900">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Hello, {user.name}
                    </div>
                    <button 
                      onClick={goToAccount}
                      className="text-left text-sm px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-space-800 rounded transition-colors"
                    >
                      My Account
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="text-left text-sm px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-space-800 rounded transition-colors text-red-600 dark:text-red-400"
                    >
                      Sign Out
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <HoverCard openDelay={0} closeDelay={200}>
                <HoverCardTrigger asChild>
                  <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-rocket-600 dark:hover:text-rocket-400">
                    <User size={20} />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 z-[100] bg-white dark:bg-space-900">
                  <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <div className="text-lg font-medium mb-2">
                      Sign In
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-1 focus:ring-rocket-500 focus:border-rocket-500 text-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="hover-password" className="block text-sm font-medium mb-1">
                        Password
                      </label>
                      <input
                        id="hover-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-1 focus:ring-rocket-500 focus:border-rocket-500 text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                    <AnimatedButton
                      type="submit"
                      variant="primary"
                      fullWidth
                      size="sm"
                      icon={<LogIn size={16} />}
                      iconPosition="left"
                      className="mt-1"
                    >
                      Login
                    </AnimatedButton>
                    <div className="text-xs text-center mt-1">
                      New customer?{' '}
                      <Link to="/register" className="text-rocket-600 dark:text-rocket-400 hover:underline">
                        Create an account
                      </Link>
                    </div>
                  </form>
                </HoverCardContent>
              </HoverCard>
            )}
            
            {/* Cart Dropdown */}
            <CartDropdown />
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="ml-2 p-2 md:hidden text-gray-600 dark:text-gray-300 hover:text-rocket-600 dark:hover:text-rocket-400"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white dark:bg-space-950 pt-24 px-6 transform transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6">
          <Link
            to="/"
            onClick={toggleMobileMenu}
            className="text-2xl font-medium border-b border-gray-100 dark:border-gray-800 pb-4"
          >
            Home
          </Link>
          
          {/* Mobile dropdown for Model Rocket Kits */}
          <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-2xl font-medium w-full justify-between">
                Model Rocket Kits <ChevronDown size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem onClick={toggleMobileMenu} asChild>
                  <Link to="/building-kits">Model Rocket Build Kits</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleMobileMenu} asChild>
                  <Link to="/schools-clubs-kits">Schools & Clubs Kits</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleMobileMenu} asChild>
                  <Link to="/all-model-rocket-kits">All Model Rocket Kits</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleMobileMenu} asChild>
                  <Link to="/building-equipment">Building Equipment</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Link
            to="/rocket-motors"
            onClick={toggleMobileMenu}
            className="text-2xl font-medium border-b border-gray-100 dark:border-gray-800 pb-4"
          >
            Rocket Motors
          </Link>
          
          {/* Mobile dropdown for Information */}
          <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-2xl font-medium w-full justify-between">
                Information <ChevronDown size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem onClick={toggleMobileMenu} asChild>
                  <Link to="/about-us">About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleMobileMenu} asChild>
                  <Link to="/uk-laws">Model Rocketry Law in the UK</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleMobileMenu} asChild>
                  <Link to="/terms">Terms of Service</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="pt-4 flex flex-col space-y-4">
            <AnimatedButton 
              variant="primary" 
              fullWidth
              icon={<User size={18} />}
              iconPosition="left"
            >
              Sign In
            </AnimatedButton>
            <AnimatedButton 
              variant="outline" 
              fullWidth
              icon={<ShoppingCart size={18} />}
              iconPosition="left"
            >
              Cart (3)
            </AnimatedButton>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
