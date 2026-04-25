import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const { addToCart } = useCartStore();
    const { toggleWishlist, isInWishlist } = useWishlistStore();
    const { userInfo } = useAuthStore();

    const inWishlist = isInWishlist(product._id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-premium-amber/10 transition-all duration-500 border border-gray-100 dark:border-gray-700 flex flex-col h-full relative"
        >
            {/* Image Section */}
            <div className="relative pt-[100%] bg-white w-full overflow-hidden">
                <Link to={`/products/${product._id}`}>
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                </Link>

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-premium-charcoal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="absolute top-6 right-6 flex flex-col gap-4 translate-x-20 group-hover:translate-x-0 transition-all duration-500 z-30">
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            if (!userInfo) {
                                toast.error("Please login to wishlist products");
                                return;
                            }
                            toggleWishlist(product);
                        }}
                        className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-xl transition-all duration-300 border shadow-2xl ${
                            inWishlist 
                            ? 'bg-red-500 border-red-400 text-white scale-110 shadow-red-500/40' 
                            : 'bg-white dark:bg-premium-charcoal border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-300 hover:text-red-500 hover:scale-110 hover:shadow-red-500/20'
                        }`}
                    >
                        <FiHeart className={`text-2xl ${inWishlist ? 'fill-current' : ''}`} />
                    </button>
                    <Link 
                        to={`/products/${product._id}`}
                        className="w-14 h-14 bg-white dark:bg-premium-charcoal backdrop-blur-xl text-gray-400 dark:text-gray-300 hover:text-premium-amber rounded-full flex items-center justify-center shadow-2xl border border-gray-200 dark:border-white/10 transition-all duration-300 hover:scale-110 hover:shadow-premium-amber/20"
                    >
                        <FiEye className="text-2xl" />
                    </Link>
                </div>

                {product.stock < 5 && product.stock > 0 && (
                    <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        Low Stock
                    </div>
                )}
            </div>

            {/* Info Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-premium-amber uppercase tracking-widest bg-premium-amber/10 px-2 py-0.5 rounded-full">
                        {product.category}
                    </span>
                    <div className="flex items-center text-amber-400 text-[10px] font-bold">
                        ★ {product.rating.toFixed(1)}
                    </div>
                </div>

                <Link to={`/products/${product._id}`}>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 line-clamp-2 min-h-[2.8rem] mb-4 group-hover:text-premium-amber transition-colors text-sm leading-tight tracking-tight">
                        {product.title}
                    </h3>
                </Link>

                <div className="mt-auto flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Price</span>
                        <span className="text-xl font-black text-premium-charcoal dark:text-white tracking-tighter">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>
                    <button
                        onClick={() => addToCart(product._id)}
                        className="bg-premium-charcoal dark:bg-premium-amber text-white dark:text-premium-charcoal w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl shadow-premium-charcoal/10 hover:shadow-premium-amber/30 hover:bg-premium-amber hover:text-premium-charcoal transform hover:scale-110"
                    >
                        <FiShoppingCart className="text-xl" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
