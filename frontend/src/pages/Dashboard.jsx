import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import api from '../services/api';
import { FiPackage, FiMapPin, FiHeart, FiLogOut } from 'react-icons/fi';

const Dashboard = () => {
    const { userInfo, logout } = useAuthStore();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders');
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Packed': return 'bg-blue-100 text-blue-800';
            case 'Shipped': return 'bg-purple-100 text-purple-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Account</h1>
            
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b dark:border-gray-700">
                            <div className="w-12 h-12 bg-amazon-orange text-white rounded-full flex items-center justify-center text-xl font-bold uppercase">
                                {userInfo?.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white truncate max-w-[120px]">{userInfo?.name}</h3>
                                <p className="text-xs text-gray-500 truncate max-w-[120px]">{userInfo?.email}</p>
                            </div>
                        </div>

                        <ul className="space-y-2">
                            <li>
                                <button className="w-full flex items-center gap-3 px-4 py-3 bg-amazon-light dark:bg-gray-700 text-white rounded-lg font-medium transition-colors">
                                    <FiPackage /> Orders
                                </button>
                            </li>
                            <li>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                    <FiMapPin /> Addresses
                                </button>
                            </li>
                            <li>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                    <FiHeart /> Wishlist
                                </button>
                            </li>
                            <li className="pt-4 border-t dark:border-gray-700 mt-4">
                                <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                    <FiLogOut /> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Content Area - Orders view default */}
                <div className="flex-1 space-y-6">
                    <h2 className="text-2xl font-bold dark:text-white">Order History</h2>
                    
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                            ))}
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-100 dark:border-gray-700">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiPackage className="text-3xl text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No orders yet</h3>
                            <p className="text-gray-500 mt-2">When you place an order, it will appear here.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map(order => (
                                <div key={order._id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="bg-gray-50 dark:bg-gray-750 px-6 py-4 flex flex-wrap gap-4 justify-between border-b dark:border-gray-700 text-sm">
                                        <div>
                                            <p className="text-gray-500 uppercase text-xs font-semibold mb-1">Order Placed</p>
                                            <p className="font-medium dark:text-white">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 uppercase text-xs font-semibold mb-1">Total</p>
                                            <p className="font-medium dark:text-white">${order.totalPrice.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 uppercase text-xs font-semibold mb-1">Order #</p>
                                            <p className="font-medium dark:text-white">{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <div className="mb-6 flex items-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        
                                        {/* Mock Delivery Progress Bar */}
                                        <div className="mb-8 relative max-w-xl">
                                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                                                <div style={{ width: order.status === 'Pending' ? '25%' : order.status === 'Packed' ? '50%' : order.status === 'Shipped' ? '75%' : '100%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-1000"></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500 font-medium">
                                                <span className={['Pending', 'Packed', 'Shipped', 'Delivered'].includes(order.status) ? 'text-green-600 dark:text-green-400' : ''}>Ordered</span>
                                                <span className={['Packed', 'Shipped', 'Delivered'].includes(order.status) ? 'text-green-600 dark:text-green-400' : ''}>Packed</span>
                                                <span className={['Shipped', 'Delivered'].includes(order.status) ? 'text-green-600 dark:text-green-400' : ''}>Shipped</span>
                                                <span className={order.status === 'Delivered' ? 'text-green-600 dark:text-green-400' : ''}>Delivered</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {order.items.map(item => (
                                                <div key={item.product} className="flex gap-4">
                                                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-lg p-2 shrink-0">
                                                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{item.title}</p>
                                                        <p className="text-sm text-gray-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
