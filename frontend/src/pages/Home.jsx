import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiSmartphone, FiHome, FiStar, FiActivity, FiGift, FiBook, FiWatch, FiTruck, FiShield, FiRotateCcw, FiHeadphones, FiArrowRight } from 'react-icons/fi';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/Skeletons';

const CATEGORIES = [
    { name: "Groceries", slug: "groceries", icon: <FiShoppingBag /> },
    { name: "Accessories", slug: "mobile-accessories", icon: <FiSmartphone /> },
    { name: "Fashion", slug: "mens-shirts", icon: <FiWatch /> },
    { name: "Home", slug: "home-decoration", icon: <FiHome /> },
    { name: "Beauty", slug: "fragrances", icon: <FiStar /> },
    { name: "Laptops", slug: "laptops", icon: <FiActivity /> },
    { name: "Shoes", slug: "mens-shoes", icon: <FiGift /> },
    { name: "Kitchen", slug: "kitchen-accessories", icon: <FiBook /> }
];

const FEATURES = [
    { title: "Free Shipping", desc: "On all orders over $99", icon: <FiTruck /> },
    { title: "Secure Payment", desc: "100% secure payment processing", icon: <FiShield /> },
    { title: "Easy Returns", desc: "30-day money back guarantee", icon: <FiRotateCcw /> },
    { title: "24/7 Support", desc: "Dedicated support team", icon: <FiHeadphones /> }
];

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products?limit=12');
                setProducts(data.products);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching", error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="space-y-20 animate-fade-in pb-20">

            {/* Categories Section */}
            <section className="pt-4">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-2xl font-black text-premium-charcoal dark:text-white uppercase tracking-tighter">Browse by <span className="text-gradient">Universe</span></h2>
                        <div className="h-1.5 w-10 bg-premium-amber mt-1 rounded-full"></div>
                    </div>
                    <div className="h-[1px] flex-1 bg-gray-200/50 dark:bg-gray-800/50 ml-10 hidden md:block"></div>
                </div>
                <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide">
                    {CATEGORIES.map((cat, idx) => (
                        <Link
                            key={idx}
                            to={`/products?category=${encodeURIComponent(cat.slug)}`}
                            className="flex-shrink-0 flex flex-col items-center p-8 bg-white dark:bg-gray-800/50 rounded-[3rem] min-w-[140px] border border-gray-100 dark:border-gray-700/50 shadow-xl shadow-black/5 hover:shadow-premium-amber/20 hover:border-premium-amber hover:-translate-y-2 transition-all duration-500 cursor-pointer group backdrop-blur-xl"
                        >
                            <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 dark:bg-premium-charcoal flex items-center justify-center text-3xl text-premium-amber group-hover:scale-110 group-hover:bg-premium-amber group-hover:text-premium-charcoal transition-all duration-500 mb-5 shadow-inner">
                                {cat.icon}
                            </div>
                            <span className="text-[10px] font-black text-center text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] group-hover:text-premium-amber transition-colors">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Main Hero Ad */}
            <section className="relative rounded-[4rem] overflow-hidden bg-gradient-to-br from-premium-charcoal via-gray-900 to-premium-charcoal text-white px-10 py-24 flex flex-col lg:flex-row items-center justify-between ultra-shadow border border-white/5 group">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-premium-amber/5 to-transparent pointer-events-none"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-premium-amber rounded-full blur-[150px] opacity-10 animate-pulse"></div>

                <div className="relative z-10 max-w-2xl space-y-10 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-premium-amber text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-xl"
                    >
                        <span className="w-2 h-2 rounded-full bg-premium-amber animate-ping"></span>
                        The Future of Retail
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                        Beyond <br /> <span className="text-gradient">Commerce.</span>
                    </h1>

                    <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                        Experience a curated universe of premium products, powered by AI and delivered with surgical precision.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 pt-6 justify-center lg:justify-start">
                        <Link to="/products" className="group/btn relative px-12 py-6 bg-premium-amber text-premium-charcoal font-black rounded-[2rem] transition-all overflow-hidden shadow-2xl shadow-premium-amber/20 hover:-translate-y-1 hover:shadow-premium-amber/40">
                            <span className="relative z-10 flex items-center gap-3 text-lg">
                                Begin Journey <FiArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        </Link>
                    </div>
                </div>

                {/* Ultra-Premium Product Cluster */}
                <div className="mt-20 lg:mt-0 relative w-full lg:w-1/2 flex justify-center items-center">
                    <div className="relative z-10 grid grid-cols-2 gap-8 w-full max-w-lg p-4">
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="aspect-[4/5] bg-white/5 backdrop-blur-2xl rounded-[3rem] p-6 border border-white/10 shadow-2xl rotate-[-4deg] hover:rotate-0 transition-all duration-700 group/item"
                        >
                            <img src="./photos/photo1.jpg" alt="Product" className="w-full h-full object-contain filter drop-shadow-2xl group-hover/item:scale-110 transition-transform duration-500" />
                            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/5 backdrop-blur-md opacity-0 group-hover/item:opacity-100 transition-opacity">
                                <p className="text-[10px] font-black uppercase text-premium-amber">Trending Now</p>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="aspect-[4/5] bg-white/5 backdrop-blur-2xl rounded-[3rem] p-6 border border-white/10 shadow-2xl translate-y-12 rotate-[4deg] hover:rotate-0 transition-all duration-700 group/item"
                        >
                            <img src="./photos/photo2.jpg" alt="Product" className="w-full h-full object-contain filter drop-shadow-2xl group-hover/item:scale-110 transition-transform duration-500" />
                            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/5 backdrop-blur-md opacity-0 group-hover/item:opacity-100 transition-opacity">
                                <p className="text-[10px] font-black uppercase text-premium-amber">New Arrival</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trending Products */}
            <section className="space-y-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-black dark:text-white text-premium-charcoal tracking-tighter">Trending Now</h2>
                        <div className="h-1.5 w-12 bg-premium-amber mt-2 rounded-full"></div>
                    </div>
                    <Link to="/products" className="group flex items-center gap-2 text-premium-amber font-black uppercase text-xs tracking-widest hover:gap-4 transition-all">
                        View All Collections <FiActivity />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, idx) => <ProductSkeleton key={idx} />)
                    ) : (
                        (products || []).slice(0, 6).map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    )}
                </div>
            </section>

            {/* Feature Advertisement Banners */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 rounded-[3rem] p-12 text-white relative overflow-hidden group shadow-2xl">
                    <div className="relative z-10 max-w-sm space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Tech Spotlight</span>
                        <h3 className="text-4xl font-black leading-none">The Future of <br /> Sound is Here.</h3>
                        <p className="text-blue-100/70 text-sm">Experience noise cancellation like never before with our new audio range.</p>
                        <Link to="/products?category=mobile-accessories" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-900 rounded-xl font-black text-sm hover:bg-blue-100 transition-all mt-4">
                            Shop Audio <FiArrowRight />
                        </Link>
                    </div>
                    <div className="absolute -right-12 -bottom-12 w-[32rem] h-[32rem] opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out pointer-events-none">
                        <img src="./photos/speaker.jpg" alt="Audio" className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
                    </div>
                </div>
                <div className="bg-premium-amber rounded-[3rem] p-12 text-premium-charcoal flex flex-col justify-between relative overflow-hidden shadow-2xl group">
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black leading-none mb-2">Fragrance <br /> Essentials</h3>
                        <p className="text-premium-charcoal/60 text-sm font-bold">Up to 40% Off</p>
                    </div>
                    <Link to="/products?category=fragrances" className="relative z-10 w-12 h-12 bg-premium-charcoal text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                        <FiArrowRight size={24} />
                    </Link>
                    <div className="absolute -right-8 -bottom-8 w-72 h-72 opacity-90 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                        <img src="./photos/perfume.jpg" alt="Fragrance" className="w-full h-full object-contain filter drop-shadow-2xl" />
                    </div>
                </div>
            </section>

            {/* Daily Essentials */}
            <section className="space-y-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-black dark:text-white text-premium-charcoal tracking-tighter">Daily Essentials</h2>
                        <div className="h-1.5 w-12 bg-premium-amber mt-2 rounded-full"></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, idx) => <ProductSkeleton key={idx} />)
                    ) : (
                        (products || []).slice(6, 12).map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    )}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-gray-100 dark:bg-white/5 rounded-[4rem] p-12 md:p-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-black dark:text-white text-premium-charcoal tracking-tighter mb-4">The Premium Difference</h2>
                    <p className="text-gray-500 font-medium">We go beyond just e-commerce. We provide an experience built on trust and quality.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {FEATURES.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-3xl bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center text-2xl text-premium-amber mb-6 group-hover:bg-premium-amber group-hover:text-premium-charcoal transition-all duration-500">
                                {feature.icon}
                            </div>
                            <h4 className="text-lg font-black dark:text-white text-premium-charcoal mb-2 uppercase tracking-tighter">{feature.title}</h4>
                            <p className="text-sm text-gray-500 font-medium">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
