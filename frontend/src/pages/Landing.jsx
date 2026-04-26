import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const banners = [
    {
        id: 1,
        title: "Groceries in Minutes",
        subtitle: "Everything you need, delivered exactly when you need it.",
        image: "./photos/land1.avif"
    },
    {
        id: 2,
        title: "Premium Quality, Always",
        subtitle: "Handpicked fresh produce and top-tier brands.",
        image: "./photos/land2.avif"
    },
    {
        id: 3,
        title: "Unbeatable Deals Today",
        subtitle: "Save big on your daily essentials and more.",
        image: "./photos/land3.avif"
    }
];

const Landing = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-premium-charcoal">
            {/* Carousel Backgrounds */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={banners[currentIndex].image}
                        alt="banner"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-premium-charcoal via-premium-charcoal/80 to-transparent"></div>
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-premium-gray">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-3xl space-y-6"
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                            {banners[currentIndex].title}
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-300">
                            {banners[currentIndex].subtitle}
                        </p>
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-12"
                >
                    <button
                        onClick={() => navigate('/login')}
                        className="px-10 py-4 text-xl font-bold rounded-full bg-premium-amber text-premium-charcoal hover:bg-premium-accent transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transform hover:-translate-y-1"
                    >
                        Get Started
                    </button>
                </motion.div>

                {/* Pagination Dots */}
                <div className="absolute bottom-12 flex space-x-3">
                    {banners.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-premium-amber w-8' : 'bg-gray-500 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Landing;
