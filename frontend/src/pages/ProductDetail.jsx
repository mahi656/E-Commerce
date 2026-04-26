import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { FiShoppingCart, FiHeart, FiStar, FiTruck, FiShield, FiRotateCcw, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    
    const { addToCart } = useCartStore();
    const { toggleWishlist, isInWishlist } = useWishlistStore();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                if (data.images && data.images.length > 0) {
                    setActiveImage(data.images[0]);
                }
            } catch (error) {
                console.error(error);
                navigate('/products');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="w-full md:w-1/2 bg-gray-200 dark:bg-gray-800 aspect-square rounded-[3rem]"></div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 w-1/4 rounded-full"></div>
                        <div className="h-12 bg-gray-200 dark:bg-gray-800 w-3/4 rounded-2xl"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-800 w-1/3 rounded-full"></div>
                        <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
                        <div className="h-16 bg-gray-200 dark:bg-gray-800 w-1/2 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return null;

    const inWishlist = isInWishlist(product._id);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                
                {/* Image Gallery */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <motion.div 
                        layoutId={`img-${product._id}`}
                        className="bg-white dark:bg-gray-800 rounded-[3rem] p-10 md:p-16 border border-gray-100 dark:border-gray-700 flex items-center justify-center relative overflow-hidden group shadow-sm"
                    >
                        <AnimatePresence mode="wait">
                            <motion.img 
                                key={activeImage}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                                src={activeImage} 
                                alt={product.title} 
                                className="w-full h-auto max-h-[600px] object-contain group-hover:scale-105 transition-transform duration-700"
                            />
                        </AnimatePresence>
                        
                        <div className="absolute top-6 left-6 flex flex-col gap-3">
                             {product.stock > 0 ? (
                                <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <FiCheckCircle /> In Stock
                                </span>
                             ) : (
                                <span className="bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    Out of Stock
                                </span>
                             )}
                        </div>
                    </motion.div>

                    {product.images && product.images.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-2 px-1 scrollbar-hide">
                            {product.images.map((img, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`w-24 h-24 flex-shrink-0 bg-white dark:bg-gray-800 border-2 rounded-[1.5rem] p-3 transition-all duration-300 ${activeImage === img ? 'border-premium-amber shadow-xl shadow-premium-amber/20 scale-105' : 'border-gray-100 dark:border-gray-700 opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-contain" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="w-full lg:w-1/2 flex flex-col pt-2">
                    <div className="flex items-center gap-3 text-premium-amber mb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-premium-amber/10 px-3 py-1 rounded-full">
                            {product.brand}
                        </span>
                        <div className="h-[1px] w-8 bg-premium-amber/30"></div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{product.category}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-premium-charcoal dark:text-white leading-tight mb-6 tracking-tighter">
                        {product.title}
                    </h1>
                    
                    <div className="flex items-center gap-6 mb-8">
                        <div className="flex items-center gap-1.5">
                            <div className="flex text-premium-amber">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar key={i} className={`text-lg ${i < Math.round(product.rating) ? "fill-current" : "opacity-30"}`} />
                                ))}
                            </div>
                            <span className="text-sm font-black text-premium-charcoal dark:text-white ml-2">{product.rating.toFixed(1)}</span>
                        </div>
                        <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700"></div>
                        <span className="text-sm font-bold text-blue-500 hover:underline cursor-pointer">
                            {product.reviewCount} Verfied Reviews
                        </span>
                    </div>

                    <div className="bg-gray-50 dark:bg-white/5 rounded-[2.5rem] p-8 mb-10 border border-gray-100 dark:border-gray-700/50">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-5xl font-black text-premium-charcoal dark:text-white tracking-tighter">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.price > 100 && (
                                <span className="text-gray-400 line-through text-xl font-bold">
                                    ${(product.price * 1.2).toFixed(2)}
                                </span>
                            )}
                            <div className="ml-auto bg-premium-amber text-premium-charcoal text-[10px] font-black px-3 py-1 rounded-full">
                                SAVE 20%
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            {product.stock > 0 ? (
                                <>
                                    <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-transparent focus-within:border-premium-amber transition-all">
                                        <button 
                                            className="w-12 h-12 flex items-center justify-center text-xl font-bold hover:text-premium-amber transition-colors"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        >-</button>
                                        <span className="w-10 text-center font-black text-premium-charcoal dark:text-white">{quantity}</span>
                                        <button 
                                            className="w-12 h-12 flex items-center justify-center text-xl font-bold hover:text-premium-amber transition-colors"
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        >+</button>
                                    </div>
                                    <button 
                                        onClick={() => addToCart(product._id, quantity)}
                                        className="flex-1 bg-premium-amber hover:bg-premium-accent text-premium-charcoal font-black py-4 px-10 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-premium-amber/20 hover:shadow-premium-amber/30 group"
                                    >
                                        <FiShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" /> 
                                        Add to Cart
                                    </button>
                                </>
                            ) : (
                                <button disabled className="flex-1 bg-gray-200 text-gray-500 font-black py-4 px-10 rounded-2xl cursor-not-allowed">
                                    Currently Unavailable
                                </button>
                            )}
                            <button 
                                onClick={() => toggleWishlist(product)}
                                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${inWishlist ? 'border-red-100 bg-red-50 text-red-500' : 'border-gray-100 dark:border-gray-700 bg-transparent text-gray-400 hover:border-red-100 hover:text-red-500 hover:bg-red-50'}`}
                            >
                                <FiHeart size={24} className={inWishlist ? "fill-current" : ""} />
                            </button>
                        </div>

                        {/* Delivery Features */}
                        <div className="grid grid-cols-2 gap-6 p-8 border border-gray-100 dark:border-gray-800 rounded-3xl mt-4">
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-premium-amber/10 text-premium-amber flex items-center justify-center text-xl group-hover:bg-premium-amber group-hover:text-premium-charcoal transition-all">
                                    <FiTruck />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-black dark:text-white uppercase tracking-tighter">Fast Delivery</span>
                                    <span className="text-[10px] text-gray-500 font-bold">2-4 Business Days</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-premium-amber/10 text-premium-amber flex items-center justify-center text-xl group-hover:bg-premium-amber group-hover:text-premium-charcoal transition-all">
                                    <FiShield />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-black dark:text-white uppercase tracking-tighter">Secure Payment</span>
                                    <span className="text-[10px] text-gray-500 font-bold">100% Protected</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-premium-amber/10 text-premium-amber flex items-center justify-center text-xl group-hover:bg-premium-amber group-hover:text-premium-charcoal transition-all">
                                    <FiRotateCcw />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-black dark:text-white uppercase tracking-tighter">Easy Return</span>
                                    <span className="text-[10px] text-gray-500 font-bold">14 Days Free</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-premium-amber/10 text-premium-amber flex items-center justify-center text-xl group-hover:bg-premium-amber group-hover:text-premium-charcoal transition-all">
                                    <FiCheckCircle />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-black dark:text-white uppercase tracking-tighter">Quality Assured</span>
                                    <span className="text-[10px] text-gray-500 font-bold">Verified Store</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Recommended Products could be added here */}
        </div>
    );
};

export default ProductDetail;
