import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiX, FiClock, FiTrendingUp } from 'react-icons/fi';
import api from '../services/api';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const searchRef = useRef(null);

    // Load recent searches on mount
    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) setRecentSearches(JSON.parse(saved));
    }, []);

    // Close suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Sync search term with URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const keyword = params.get('keyword') || '';
        setSearchTerm(keyword);
    }, [location.search]);

    // Fetch suggestions with highlighting support
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.trim().length < 2) {
                setSuggestions([]);
                return;
            }
            try {
                const { data } = await api.get(`/products/search/suggestions?q=${searchTerm}`);
                setSuggestions(data);
            } catch (error) {
                console.error('Error fetching suggestions', error);
            }
        };

        const timer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const addToRecent = (term) => {
        const updated = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const term = searchTerm.trim();
        if (term) {
            addToRecent(term);
            navigate(`/products?keyword=${term}`);
        } else {
            navigate('/products');
        }
        setShowSuggestions(false);
    };

    const handleClear = () => {
        setSearchTerm('');
        setSuggestions([]);
        navigate('/products');
    };

    const handleSuggestionClick = (id, title) => {
        addToRecent(title);
        navigate(`/products/${id}`);
        setShowSuggestions(false);
        setSearchTerm('');
    };

    const handleRecentClick = (term) => {
        setSearchTerm(term);
        navigate(`/products?keyword=${term}`);
        setShowSuggestions(false);
    };

    // Helper to highlight matching text
    const highlightMatch = (text, query) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, i) => 
            part.toLowerCase() === query.toLowerCase() 
                ? <span key={i} className="text-premium-amber font-black">{part}</span> 
                : part
        );
    };

    return (
        <div className="relative w-full z-50 group" ref={searchRef}>
            <form onSubmit={handleSubmit} className="relative flex items-center">
                <div className="absolute left-4 text-gray-400 group-focus-within:text-premium-amber transition-colors">
                    <FiSearch className="text-lg" />
                </div>
                <input
                    type="text"
                    className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-transparent focus:bg-white dark:focus:bg-gray-800 focus:border-premium-amber focus:ring-4 focus:ring-premium-amber/10 transition-all duration-300 outline-none text-sm font-bold dark:text-white placeholder:text-gray-400"
                    placeholder="Search for premium products..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                />
                
                {searchTerm && (
                    <button 
                        type="button"
                        onClick={handleClear}
                        className="absolute right-4 p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors text-gray-400"
                    >
                        <FiX size={14} />
                    </button>
                )}
            </form>

            {showSuggestions && (
                <div className="absolute top-full left-0 w-full mt-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2rem] shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    
                    {/* Suggestions Section */}
                    {suggestions.length > 0 && (
                        <div className="p-3 border-b border-gray-50 dark:border-gray-700/50">
                            <p className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Best Matches</p>
                            {suggestions.map((item) => (
                                <div
                                    key={item._id}
                                    className="px-4 py-3 hover:bg-premium-amber/10 rounded-2xl cursor-pointer flex items-center gap-4 transition-all group/item"
                                    onClick={() => handleSuggestionClick(item._id, item.title)}
                                >
                                    <div className="w-10 h-10 bg-white rounded-xl p-1.5 flex-shrink-0 shadow-sm">
                                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="truncate text-sm font-bold text-gray-800 dark:text-white">
                                            {highlightMatch(item.title, searchTerm)}
                                        </div>
                                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{item.category}</div>
                                    </div>
                                    <FiTrendingUp className="text-gray-300 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Recent Searches Section */}
                    {recentSearches.length > 0 && (
                        <div className="p-3">
                            <p className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Recently Searched</p>
                            <div className="flex flex-wrap gap-2 px-3 py-2">
                                {recentSearches.map((term, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleRecentClick(term)}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/5 hover:bg-premium-amber hover:text-premium-charcoal rounded-full text-xs font-bold transition-all"
                                    >
                                        <FiClock size={12} className="opacity-50" />
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No results state */}
                    {searchTerm.trim().length >= 2 && suggestions.length === 0 && (
                        <div className="px-6 py-10 text-center">
                            <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiSearch className="text-xl text-gray-300" />
                            </div>
                            <p className="text-sm font-bold dark:text-white mb-1">No matches found for "{searchTerm}"</p>
                            <p className="text-xs text-gray-500">Check for typos or try broader keywords.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
