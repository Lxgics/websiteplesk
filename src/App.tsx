
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

// Pages
import Index from '@/pages/Index';
import AboutUs from '@/pages/AboutUs';
import BuildingKits from '@/pages/BuildingKits';
import SchoolsClubsKits from '@/pages/SchoolsClubsKits';
import AllModelRocketKits from '@/pages/AllModelRocketKits';
import BuildingEquipment from '@/pages/BuildingEquipment';
import RocketMotors from '@/pages/RocketMotors';
import UKLaws from '@/pages/UKLaws';
import Terms from '@/pages/Terms';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Account from '@/pages/Account';
import Admin from '@/pages/Admin';
import AdminSecret from '@/pages/AdminSecret';
import NotFound from '@/pages/NotFound';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import CheckoutSuccess from '@/pages/CheckoutSuccess';

// Styling
import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/building-kits" element={<BuildingKits />} />
              <Route path="/schools-clubs-kits" element={<SchoolsClubsKits />} />
              <Route path="/all-model-rocket-kits" element={<AllModelRocketKits />} />
              <Route path="/building-equipment" element={<BuildingEquipment />} />
              <Route path="/rocket-motors" element={<RocketMotors />} />
              <Route path="/uk-laws" element={<UKLaws />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account" element={<Account />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/adminsecret" element={<AdminSecret />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
