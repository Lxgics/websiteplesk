
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

// Order interface for type safety when displaying orders
export interface Order {
  id: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}

interface UserProfile {
  address?: {
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  phone?: string;
  preferences?: {
    emailNotifications: boolean;
    marketing: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  orders: Order[];
  updateProfile: (profile: Partial<UserProfile>) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  login: async () => ({ success: false, message: 'Not implemented' }),
  register: async () => ({ success: false, message: 'Not implemented' }),
  logout: () => {},
  isAuthenticated: false,
  orders: [],
  updateProfile: async () => ({ success: false, message: 'Not implemented' }),
});

export const useAuth = () => useContext(AuthContext);

// Simulated user database for demonstration
const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'admin@rocketryforschools.co.uk',
    name: 'Admin User',
    isAdmin: true
  },
  {
    id: '2',
    email: 'teacher@school.edu',
    name: 'Teacher Demo',
    isAdmin: false
  }
];

// Simulated user credentials 
const USER_CREDENTIALS: Record<string, string> = {
  'admin@rocketryforschools.co.uk': 'password123',
  'teacher@school.edu': 'teacher123'
};

// Simulated user profile data
const USER_PROFILES: Record<string, UserProfile> = {
  '1': {
    address: {
      street: '123 School Lane',
      city: 'London',
      postcode: 'SW1A 1AA',
      country: 'United Kingdom'
    },
    phone: '020 7123 4567',
    preferences: {
      emailNotifications: true,
      marketing: false
    }
  },
  '2': {
    address: {
      street: '45 Education Road',
      city: 'Manchester',
      postcode: 'M1 1XY',
      country: 'United Kingdom'
    },
    phone: '0161 987 6543',
    preferences: {
      emailNotifications: true,
      marketing: true
    }
  }
};

// Mock order data
const MOCK_ORDERS: Record<string, Order[]> = {
  '1': [
    {
      id: 'ORD-9876543',
      date: '2023-11-05',
      status: 'Delivered',
      total: 349.97,
      items: [
        { id: '1', name: 'School Rocketry Starter Pack', quantity: 1, price: 349.97 }
      ]
    },
    {
      id: 'ORD-8765432',
      date: '2023-08-15',
      status: 'Delivered',
      total: 129.95,
      items: [
        { id: '2', name: 'Klima D9-0 Rocket Motors (Pack of 5)', quantity: 3, price: 29.99 },
        { id: '3', name: 'Launch Controller Kit', quantity: 1, price: 39.98 }
      ]
    }
  ],
  '2': [
    {
      id: 'ORD-1234567',
      date: '2023-10-15',
      status: 'Delivered',
      total: 149.97,
      items: [
        { id: '1', name: 'UKROC Competition Team Kit', quantity: 1, price: 149.97 }
      ]
    },
    {
      id: 'ORD-7654321',
      date: '2023-09-22',
      status: 'Shipped',
      total: 58.98,
      items: [
        { id: '2', name: 'B6-4 Rocket Motors (Pack of 3)', quantity: 2, price: 15.99 },
        { id: '3', name: 'A8-3 Rocket Motors (Pack of 3)', quantity: 2, price: 12.99 }
      ]
    }
  ]
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Check for saved session in localStorage
    const checkAuth = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          
          // Load profile and orders for the user
          if (parsedUser.id) {
            setUserProfile(USER_PROFILES[parsedUser.id] || null);
            setOrders(MOCK_ORDERS[parsedUser.id] || []);
          }
        } catch (e) {
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
      setInitialized(true);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Simple validation
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }

    // In a real app, this would be an API call
    // For demo, we check against our mock users
    if (USER_CREDENTIALS[email] === password) {
      const foundUser = DEMO_USERS.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        setUserProfile(USER_PROFILES[foundUser.id] || null);
        setOrders(MOCK_ORDERS[foundUser.id] || []);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return { success: true, message: 'Login successful' };
      }
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const register = async (name: string, email: string, password: string) => {
    // Simple validation
    if (!name || !email || !password) {
      return { success: false, message: 'All fields are required' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }

    // Check if user already exists
    if (DEMO_USERS.some(u => u.email === email)) {
      return { success: false, message: 'Email already in use' };
    }

    // In a real app, this would create a user in the database
    // For demo purposes, we'll create a new user object but not persist it
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      isAdmin: false
    };

    // Create a default profile for the new user
    const newProfile: UserProfile = {
      preferences: {
        emailNotifications: true,
        marketing: false
      }
    };

    // In a real app, we'd save the user to the database here
    // For demo, we just set the current user
    setUser(newUser);
    setUserProfile(newProfile);
    setOrders([]);
    localStorage.setItem('user', JSON.stringify(newUser));

    return { success: true, message: 'Registration successful' };
  };

  const updateProfile = async (profile: Partial<UserProfile>) => {
    if (!user) {
      return { success: false, message: 'You must be logged in to update your profile' };
    }

    // In a real app, this would update the database
    // For demo, we'll just update the state
    setUserProfile(prev => {
      if (!prev) return profile as UserProfile;
      return { ...prev, ...profile };
    });

    return { success: true, message: 'Profile updated successfully' };
  };

  const logout = () => {
    setUser(null);
    setUserProfile(null);
    setOrders([]);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    userProfile,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    orders,
    updateProfile
  };

  // Don't render until we've checked for a saved session
  if (!initialized) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
