import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { FiMoon, FiSun } from 'react-icons/fi';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore';
import { useAuthStore } from './store/useAuthStore';
import { useCartStore } from './store/useCartStore';
import { useWishlistStore } from './store/useWishlistStore';

import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Wishlist from './pages/Wishlist';

function App() {
  const { theme, initTheme, toggleTheme } = useThemeStore();
  const { userInfo } = useAuthStore();
  const { fetchCart } = useCartStore();
  const { fetchWishlist } = useWishlistStore();
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const hideNavbarFooter = isLanding || isAuthPage;

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  useEffect(() => {
    if (userInfo) {
      fetchCart();
      fetchWishlist();
    }
  }, [userInfo, fetchCart, fetchWishlist]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {!hideNavbarFooter && <Navbar />}
      {isAuthPage && (
        <div className="absolute top-6 right-6 z-50">
            <button onClick={toggleTheme} className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-xl text-gray-800 dark:text-gray-200 hover:text-premium-amber transition-colors">
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
        </div>
      )}
      <main className={isLanding ? "flex-grow w-full" : "flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8"}>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<Landing />} />
        </Routes>
      </main>
      {!hideNavbarFooter && <Footer />}
      <Toaster position="bottom-right" />
    </div>
  )
}

export default App
