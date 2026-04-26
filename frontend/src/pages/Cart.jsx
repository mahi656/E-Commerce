import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { FiTrash2, FiShoppingBag, FiArrowRight, FiShield, FiTruck, FiRefreshCcw } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, cartTotals } = useCartStore();
    const navigate = useNavigate();

    const { itemsPrice, taxPrice, totalPrice } = cartTotals();

    if (!cart?.items || cart.items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center animate-fade-in text-center px-6">
                <div className="w-64 h-64 bg-gray-100 dark:bg-white/5 rounded-[4rem] flex items-center justify-center mb-8 relative">
                    <FiShoppingBag className="text-7xl text-gray-300" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-premium-amber rounded-full blur-[80px] opacity-10"></div>
                </div>
                <h2 className="text-3xl font-black text-premium-charcoal dark:text-white mb-3 tracking-tighter">Your cart feels lonely</h2>
                <p className="text-gray-500 mb-10 max-w-sm font-medium">Add some premium products to your cart and make it happy. Delivery is on us for your first order!</p>
                <Link to="/home" className="bg-premium-amber text-premium-charcoal font-black py-4 px-12 rounded-2xl hover:bg-premium-accent transition-all shadow-xl shadow-premium-amber/20 hover:-translate-y-1">
                    Start Exploring
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                
                {/* Cart Items List */}
                <div className="flex-1 w-full space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-4xl font-black text-premium-charcoal dark:text-white tracking-tighter">Shopping Bag</h1>
                        <span className="bg-gray-100 dark:bg-white/5 px-4 py-1.5 rounded-full text-xs font-black uppercase text-gray-500 tracking-widest">
                            {cart.items.reduce((a, c) => a + c.quantity, 0)} Items
                        </span>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence>
                            {cart.items.map((item) => (
                                <motion.div 
                                    key={item.product._id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-8 shadow-sm group hover:shadow-xl hover:shadow-premium-amber/5 transition-all duration-500"
                                >
                                    <div className="w-32 h-32 bg-gray-50 dark:bg-gray-900 rounded-[2rem] p-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                                        <img src={item.product.images?.[0]} alt={item.product.title} className="w-full h-full object-contain" />
                                    </div>

                                    <div className="flex-1 text-center sm:text-left">
                                        <div className="text-[10px] font-black text-premium-amber uppercase tracking-widest mb-1">{item.product.category}</div>
                                        <Link to={`/products/${item.product._id}`} className="text-lg font-black text-premium-charcoal dark:text-white hover:text-premium-amber transition-colors line-clamp-1 mb-2">
                                            {item.product.title}
                                        </Link>
                                        <div className="text-xl font-black text-gray-400 tracking-tighter mb-4 sm:mb-0">
                                            ${item.product.price.toFixed(2)} <span className="text-xs font-bold uppercase tracking-widest ml-1">/ unit</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center bg-gray-50 dark:bg-gray-900 p-1 rounded-2xl border border-transparent focus-within:border-premium-amber transition-all">
                                            <button 
                                                onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                className="w-10 h-10 flex items-center justify-center font-bold text-gray-400 hover:text-premium-amber transition-colors"
                                            >-</button>
                                            <span className="w-8 text-center font-black dark:text-white">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.product._id, Math.min(item.product.stock, item.quantity + 1))}
                                                className="w-10 h-10 flex items-center justify-center font-bold text-gray-400 hover:text-premium-amber transition-colors"
                                            >+</button>
                                        </div>

                                        <div className="text-right min-w-[100px] hidden sm:block">
                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total</div>
                                            <div className="text-xl font-black text-premium-charcoal dark:text-white tracking-tighter">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => removeFromCart(item.product._id)}
                                            className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Trust badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                        <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-white/5 rounded-3xl">
                            <FiTruck className="text-2xl text-premium-amber" />
                            <span className="text-xs font-black dark:text-white uppercase tracking-tighter leading-tight">Free <br /> Express Delivery</span>
                        </div>
                        <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-white/5 rounded-3xl">
                            <FiShield className="text-2xl text-premium-amber" />
                            <span className="text-xs font-black dark:text-white uppercase tracking-tighter leading-tight">Secure <br /> Checkout</span>
                        </div>
                        <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-white/5 rounded-3xl">
                            <FiRefreshCcw className="text-2xl text-premium-amber" />
                            <span className="text-xs font-black dark:text-white uppercase tracking-tighter leading-tight">Easy <br /> 14 Day Returns</span>
                        </div>
                    </div>
                </div>

                {/* Summary Panel */}
                <div className="w-full lg:w-[400px] sticky top-28">
                    <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-700 shadow-2xl shadow-premium-amber/5">
                        <h3 className="text-2xl font-black text-premium-charcoal dark:text-white mb-8 tracking-tighter">Order Summary</h3>
                        
                        <div className="space-y-5 mb-8">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-gray-500 uppercase tracking-widest text-[10px]">Subtotal</span>
                                <span className="font-black dark:text-white">${itemsPrice}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-gray-500 uppercase tracking-widest text-[10px]">Tax (15%)</span>
                                <span className="font-black dark:text-white">${taxPrice}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-gray-500 uppercase tracking-widest text-[10px]">Shipping</span>
                                <span className="font-black text-green-500">FREE</span>
                            </div>
                            <div className="pt-5 border-t border-gray-100 dark:border-gray-700 flex justify-between items-end">
                                <span className="font-black text-premium-charcoal dark:text-white text-lg tracking-tighter">Grand Total</span>
                                <span className="text-3xl font-black text-premium-amber tracking-tighter">${totalPrice}</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-premium-amber hover:bg-premium-accent text-premium-charcoal font-black py-5 rounded-2xl transition-all shadow-xl shadow-premium-amber/20 flex justify-center items-center gap-3 hover:-translate-y-1 group"
                        >
                            Checkout Now <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                        
                        <p className="mt-6 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                            Tax included. Shipping and promo codes <br /> calculated at checkout.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
