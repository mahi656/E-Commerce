import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="bg-premium-charcoal text-gray-400 py-16 mt-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Brand Section */}
                <div className="space-y-6">
                    <Link to="/home" className="text-3xl font-extrabold tracking-tighter text-premium-amber drop-shadow-sm">
                        E-Shop
                    </Link>
                    <p className="text-sm leading-relaxed">
                        Experience excellence in e-commerce. Curating the finest products for your premium lifestyle with unmatched delivery speed and quality.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-premium-amber hover:text-premium-charcoal transition-all"><FiFacebook /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-premium-amber hover:text-premium-charcoal transition-all"><FiTwitter /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-premium-amber hover:text-premium-charcoal transition-all"><FiInstagram /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
                    <ul className="space-y-4 text-sm">
                        <li><Link to="/home" className="hover:text-premium-amber transition-colors">Home</Link></li>
                        <li><Link to="/products" className="hover:text-premium-amber transition-colors">Shop All</Link></li>
                        <li><Link to="/cart" className="hover:text-premium-amber transition-colors">My Cart</Link></li>
                        <li><Link to="/wishlist" className="hover:text-premium-amber transition-colors">Wishlist</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-6">Support</h3>
                    <ul className="space-y-4 text-sm">
                        <li><Link to="/dashboard" className="hover:text-premium-amber transition-colors">My Account</Link></li>
                        <li><Link to="/orders" className="hover:text-premium-amber transition-colors">Order Tracking</Link></li>
                        <li><Link to="/help" className="hover:text-premium-amber transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/help" className="hover:text-premium-amber transition-colors">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-center gap-3">
                            <FiMapPin className="text-premium-amber" />
                            <span>123 Commerce Way, Pune</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FiPhone className="text-premium-amber" />
                            <span>+91 9090909090</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FiMail className="text-premium-amber" />
                            <span>support@eshop.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <p>&copy; {new Date().getFullYear()} E-Shop Platform. Crafted for Excellence.</p>
                <div className="flex gap-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 opacity-50 hover:opacity-100 transition-opacity" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 opacity-50 hover:opacity-100 transition-opacity" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="Paypal" className="h-4 opacity-50 hover:opacity-100 transition-opacity" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
