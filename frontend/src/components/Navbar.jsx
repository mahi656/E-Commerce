import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { useThemeStore } from '../store/useThemeStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { FiShoppingCart, FiUser, FiMoon, FiSun, FiHeart } from 'react-icons/fi';
import SearchBar from './SearchBar';

const Navbar = () => {
    const { userInfo, logout } = useAuthStore();
    const { cart } = useCartStore();
    const { wishlist } = useWishlistStore();
    const { theme, toggleTheme } = useThemeStore();

    const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    const wishlistCount = wishlist?.length || 0;

    return (
        <nav className="bg-white/80 dark:bg-premium-charcoal/80 backdrop-blur-xl text-gray-800 dark:text-gray-100 sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-20 gap-8">
                    {/* Futuristic Unique Logo Section */}
                    <div className="flex items-center flex-shrink-0">
                        <Link to="/home" className="group flex items-center gap-3">
                            <div className="relative w-12 h-12">
                                <div className="absolute inset-0 bg-premium-amber rounded-[1.25rem] rotate-12 group-hover:rotate-45 transition-transform duration-700 shadow-xl shadow-premium-amber/20"></div>
                                <div className="absolute inset-0 bg-premium-charcoal dark:bg-white rounded-[1.25rem] -rotate-6 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center text-white dark:text-premium-charcoal font-black text-2xl z-10">
                                    ES
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-premium-amber rounded-full animate-pulse z-20"></div>
                            </div>
                            <div className="flex flex-col -space-y-1">
                                <div className="flex items-baseline">
                                    <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">Next</span>
                                    <span className="text-2xl font-light tracking-tighter text-premium-amber ml-1">Store</span>
                                </div>
                                <span className="text-[7px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-gray-500 group-hover:text-premium-amber transition-colors">E-Commerce</span>
                            </div>
                        </Link>
                    </div>

                    {/* Integrated Search Bar - Expanded */}
                    <div className="flex-1 max-w-2xl hidden lg:block">
                        <SearchBar />
                    </div>

                    {/* Actions Section */}
                    <div className="flex items-center gap-4 ml-auto">
                        <button
                            onClick={toggleTheme}
                            className="p-3 rounded-2xl bg-gray-100 dark:bg-white/5 hover:bg-premium-amber/10 hover:text-premium-amber transition-all duration-300"
                        >
                            {theme === 'dark' ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
                        </button>

                        <Link to="/wishlist" className="relative p-3 rounded-2xl bg-gray-100 dark:bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-all group">
                            <FiHeart className="text-2xl group-hover:scale-110 transition-transform" />
                            {wishlistCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white dark:border-premium-charcoal animate-in zoom-in duration-300">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        <Link to="/cart" className="relative p-3 rounded-2xl bg-premium-amber text-premium-charcoal hover:bg-premium-accent transition-all shadow-xl shadow-premium-amber/10 group overflow-hidden">
                            <FiShoppingCart className="text-2xl relative z-10 group-hover:scale-110 transition-transform" />
                            {cartCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 bg-premium-charcoal text-white text-[9px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-premium-amber animate-in zoom-in duration-300">
                                    {cartCount}
                                </span>
                            )}
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </Link>

                        <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-800 hidden md:block mx-1"></div>

                        {userInfo ? (
                            <div className="relative group">
                                <button className="flex items-center p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-all relative">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-premium-amber via-orange-500 to-red-500 rounded-full animate-spin-slow opacity-40 blur-sm group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative w-11 h-11 rounded-full bg-white dark:bg-premium-charcoal flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-2xl overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-premium-amber/20 to-orange-500/20"></div>
                                        <span className="text-premium-charcoal dark:text-premium-amber font-black text-lg relative z-10">
                                            {userInfo.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                </button>
                                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl py-2 hidden group-hover:block border border-gray-100 dark:border-gray-700 backdrop-blur-3xl animate-in fade-in slide-in-from-top-3 duration-300 z-[60]">
                                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 mb-1">
                                        <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Authenticated As</p>
                                        <p className="text-sm font-black truncate text-gray-800 dark:text-white">{userInfo.name}</p>
                                    </div>
                                    <Link to="/dashboard" className="block px-5 py-3 text-sm font-bold hover:bg-premium-amber hover:text-premium-charcoal transition-colors">Profile & Orders</Link>
                                    <Link to="/wishlist" className="block px-5 py-3 text-sm font-bold hover:bg-premium-amber hover:text-premium-charcoal transition-colors">Wishlist</Link>
                                    <div className="px-2 pt-1 mt-1 border-t border-gray-100 dark:border-gray-700">
                                        <button onClick={logout} className="block w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors">Logout</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-2 font-black text-sm bg-premium-charcoal dark:bg-white text-white dark:text-premium-charcoal px-8 py-3.5 rounded-2xl hover:bg-premium-amber hover:text-premium-charcoal dark:hover:bg-premium-amber transition-all duration-500 shadow-xl shadow-premium-charcoal/10">
                                <FiUser className="text-xl" />
                                <span className="hidden md:block">Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Search - Bottom Bar on mobile */}
            <div className="lg:hidden px-4 pb-4">
                <SearchBar />
            </div>
        </nav>
    );
};

export default Navbar;
