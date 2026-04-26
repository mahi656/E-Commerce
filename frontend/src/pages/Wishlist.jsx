import { motion } from 'framer-motion';
import { useWishlistStore } from '../store/useWishlistStore';
import ProductCard from '../components/ProductCard';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist } = useWishlistStore();

    if (wishlist.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-6"
                >
                    <FiHeart size={48} />
                </motion.div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Your wishlist is empty</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                    Explore our finest collection and save your favorites to view them later.
                </p>
                <Link
                    to="/products"
                    className="bg-premium-amber text-premium-charcoal px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-premium-accent transition-all shadow-xl shadow-premium-amber/20"
                >
                    <FiShoppingBag />
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                <div>
                    <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">
                        Your <span className="text-premium-amber">Favorites</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved in your list
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {wishlist.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
