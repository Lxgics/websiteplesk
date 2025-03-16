
import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { LogIn, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { Helmet } from 'react-helmet';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state, or default to '/'
  const from = (location.state as any)?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate(from);
      } else {
        toast({
          title: "Login failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-space-950 text-space-900 dark:text-white">
      <Helmet>
        <title>Login | Rocketry For Schools</title>
        <meta name="description" content="Log in to your Rocketry For Schools account" />
      </Helmet>
      
      <Navbar />
      
      <main className="w-full md:w-[90%] mx-auto pt-28 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <RevealAnimation>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-space-600 dark:text-space-400">
                Log in to access your account and orders
              </p>
            </div>
          </RevealAnimation>
          
          <RevealAnimation delay={0.1}>
            <div className="bg-white dark:bg-space-900 rounded-xl shadow-sm p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-1 focus:ring-rocket-500 focus:border-rocket-500"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-1 focus:ring-rocket-500 focus:border-rocket-500"
                      placeholder="••••••••"
                    />
                    <button 
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="flex justify-end mt-1">
                    <Link to="/forgot-password" className="text-xs text-rocket-600 dark:text-rocket-400 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  fullWidth
                  icon={<LogIn size={18} />}
                  iconPosition="left"
                  disabled={loading}
                  className={loading ? "opacity-70 cursor-not-allowed" : ""}
                >
                  {loading ? "Logging in..." : "Login"}
                </AnimatedButton>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-space-600 dark:text-space-400">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-rocket-600 dark:text-rocket-400 hover:underline">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </RevealAnimation>
          
          <RevealAnimation delay={0.2}>
            <div className="mt-8 flex justify-center">
              <Link to="/" className="text-sm text-space-600 dark:text-space-400 hover:text-rocket-600 dark:hover:text-rocket-400 flex items-center">
                <ArrowRight size={16} className="mr-1 rotate-180" />
                Back to Home
              </Link>
            </div>
          </RevealAnimation>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
