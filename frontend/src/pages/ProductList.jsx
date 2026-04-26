import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/Skeletons';
import { FiFilter, FiX, FiSearch, FiArrowRight } from 'react-icons/fi';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    
    const keyword = queryParams.get('keyword') || '';
    const category = queryParams.get('category') || '';
    const sort = queryParams.get('sort') || '';

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/products/info/categories');
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/products?keyword=${keyword}&category=${category}&sort=${sort}&page=${page}`);
                setProducts(data.products);
                setTotalPages(data.pages);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [keyword, category, sort, page]);

    const handleFilterChange = (type, value) => {
        const params = new URLSearchParams(location.search);
        if (value) {
            params.set(type, value);
        } else {
            params.delete(type);
        }
        params.delete('page');
        setPage(1);
        navigate(`/products?${params.toString()}`);
    };

    const clearAllFilters = () => {
        navigate('/products');
        setPage(1);
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 animate-fade-in py-6">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden flex justify-between items-center mb-4">
                <h1 className="text-2xl font-black text-premium-charcoal dark:text-white">Shop</h1>
                <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 bg-premium-amber text-premium-charcoal px-4 py-2 rounded-xl font-bold text-sm shadow-lg"
                >
                    <FiFilter /> Filters
                </button>
            </div>

            {/* Sidebar Filters */}
            <aside className={`w-full md:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} md:block h-fit sticky top-28`}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex justify-between items-center md:hidden mb-6">
                        <h2 className="font-black text-xl dark:text-white">Filters</h2>
                        <button onClick={() => setShowFilters(false)} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full"><FiX size={20} /></button>
                    </div>
                    
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Categories</h3>
                            {(category || keyword) && (
                                <button onClick={clearAllFilters} className="text-[10px] font-bold text-premium-amber uppercase hover:underline">Clear All</button>
                            )}
                        </div>
                        <ul className="space-y-3">
                            <li>
                                <button 
                                    onClick={() => handleFilterChange('category', '')}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${!category ? 'bg-premium-amber text-premium-charcoal font-bold shadow-md shadow-premium-amber/20' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-premium-amber'}`}
                                >
                                    All Products
                                </button>
                            </li>
                            {categories.map((cat, idx) => (
                                <li key={idx}>
                                    <button 
                                        onClick={() => handleFilterChange('category', cat)}
                                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm capitalize transition-all ${category === cat ? 'bg-premium-amber text-premium-charcoal font-bold shadow-md shadow-premium-amber/20' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-premium-amber'}`}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                         <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs mb-6">Sorting</h3>
                         <select 
                            value={sort} 
                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-premium-amber dark:text-white outline-none cursor-pointer"
                        >
                            <option value="">Featured</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="rating">Average Rating</option>
                        </select>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-premium-charcoal dark:text-white mb-2">
                        {keyword ? `Search: ${keyword}` : category ? `Category: ${category}` : 'Explore All'}
                    </h1>
                    <p className="text-gray-500 text-sm">Showing the finest selection curated just for you.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                        Array.from({ length: 12 }).map((_, idx) => <ProductSkeleton key={idx} />)
                    ) : products?.length > 0 ? (
                        products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full py-32 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                                <FiSearch size={32} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold dark:text-white mb-2">No results found</h3>
                            <p className="text-gray-500 max-w-xs mb-8">We couldn't find anything matching "{keyword || category}". Try adjusting your filters.</p>
                            <button 
                                onClick={clearAllFilters}
                                className="bg-premium-charcoal dark:bg-white text-white dark:text-premium-charcoal px-8 py-3 rounded-full font-bold hover:bg-premium-amber hover:text-premium-charcoal dark:hover:bg-premium-amber transition-all shadow-xl"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 mt-16">
                        <button 
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl disabled:opacity-30 hover:bg-premium-amber hover:text-premium-charcoal transition-all shadow-sm"
                        >
                            <FiArrowRight className="rotate-180" />
                        </button>
                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i + 1)}
                                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${page === i + 1 ? 'bg-premium-amber text-premium-charcoal shadow-lg shadow-premium-amber/20 scale-110' : 'bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button 
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            className="p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl disabled:opacity-30 hover:bg-premium-amber hover:text-premium-charcoal transition-all shadow-sm"
                        >
                            <FiArrowRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
