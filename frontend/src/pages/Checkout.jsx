import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const Checkout = () => {
    const { cart, cartTotals, clearCart } = useCartStore();
    const navigate = useNavigate();
    
    const [step, setStep] = useState(1);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loading, setLoading] = useState(false);

    const { itemsPrice, taxPrice, totalPrice } = cartTotals();

    useEffect(() => {
        if (!cart?.items || cart.items.length === 0) {
            navigate('/cart');
            return;
        }

        const fetchAddresses = async () => {
            try {
                const { data } = await api.get('/address');
                setAddresses(data);
                if (data.length > 0) {
                    const defaultAddr = data.find(a => a.isDefault) || data[0];
                    setSelectedAddress(defaultAddr);
                }
            } catch (error) {
                console.error("Fetch address error", error);
            }
        };

        fetchAddresses();
    }, [cart, navigate]);

    // Form inputs for new address
    const [newAddress, setNewAddress] = useState({
        name: '', street: '', city: '', state: '', zipCode: '', country: ''
    });

    const handleSaveAddress = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/address', { ...newAddress, isDefault: true });
            
            // Avoid adding to state if it already exists (prevents UI duplicates)
            setAddresses(prev => {
                const exists = prev.find(a => a._id === data._id);
                if (exists) return prev;
                return [...prev, data];
            });

            setSelectedAddress(data);
            setNewAddress({ name: '', street: '', city: '', state: '', zipCode: '', country: '' });
            setStep(2); // Auto-advance to payment step
        } catch (error) {
            toast.error("Failed to add address");
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error("Please select a delivery address");
            return;
        }

        setLoading(true);
        try {
            const orderItems = cart.items.map(i => ({
                product: i.product._id,
                title: i.product.title,
                quantity: i.quantity,
                price: i.product.price,
                image: i.product.images[0]
            }));

            const { data } = await api.post('/orders', {
                orderItems,
                deliveryAddress: selectedAddress,
                totalPrice: Number(totalPrice)
            });

            await clearCart();
            toast.success("Order placed successfully!");
            navigate('/dashboard', { state: { message: "Order Placed" } });
        } catch (error) {
            toast.error("Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto animate-fade-in py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Secure Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-2/3 space-y-6">
                    {/* Step 1: Address */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="bg-gray-50 dark:bg-gray-750 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 1 ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}`}>1</span>
                                Delivery Address
                            </h2>
                        </div>
                        
                        {step === 1 && (
                            <div className="p-6">
                                {addresses.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        {addresses.map(addr => (
                                            <div 
                                                key={addr._id}
                                                onClick={() => {
                                                    setSelectedAddress(addr);
                                                    setNewAddress({
                                                        name: addr.name,
                                                        street: addr.street,
                                                        city: addr.city,
                                                        state: addr.state,
                                                        zipCode: addr.zipCode,
                                                        country: addr.country
                                                    });
                                                }}
                                                className={`cursor-pointer border-2 rounded-xl p-4 transition-colors ${selectedAddress?._id === addr._id ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'}`}
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-bold text-gray-900 dark:text-white">{addr.name}</span>
                                                    {addr.isDefault && <span className="bg-gray-200 dark:bg-gray-600 text-xs px-2 py-1 rounded">Default</span>}
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">{addr.street}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">{addr.city}, {addr.state} {addr.zipCode}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">{addr.country}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 mb-6">No saved addresses found.</p>
                                )}

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Add New Address</h3>
                                    <form onSubmit={handleSaveAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input type="text" placeholder="Full Name" required value={newAddress.name} onChange={e => setNewAddress({...newAddress, name: e.target.value})} className="border p-3 rounded-md dark:bg-gray-700 dark:border-gray-600" />
                                        <input type="text" placeholder="Street Address" required value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} className="border p-3 rounded-md dark:bg-gray-700 dark:border-gray-600" />
                                        <input type="text" placeholder="City" required value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className="border p-3 rounded-md dark:bg-gray-700 dark:border-gray-600" />
                                        <input type="text" placeholder="State" required value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} className="border p-3 rounded-md dark:bg-gray-700 dark:border-gray-600" />
                                        <input type="text" placeholder="Zip Code" required value={newAddress.zipCode} onChange={e => setNewAddress({...newAddress, zipCode: e.target.value})} className="border p-3 rounded-md dark:bg-gray-700 dark:border-gray-600" />
                                        <input type="text" placeholder="Country" required value={newAddress.country} onChange={e => setNewAddress({...newAddress, country: e.target.value})} className="border p-3 rounded-md dark:bg-gray-700 dark:border-gray-600" />
                                        <button type="submit" className="md:col-span-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 text-white py-3 rounded-md transition-colors">Add Address</button>
                                    </form>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button 
                                        disabled={!selectedAddress}
                                        onClick={() => setStep(2)}
                                        className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50"
                                    >
                                        Deliver to this Address
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Step 2: Payment */}
                    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden ${step === 2 ? 'opacity-100' : 'opacity-60'}`}>
                        <div className="bg-gray-50 dark:bg-gray-750 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 2 ? 'bg-orange-500 text-white' : 'bg-gray-400 text-white'}`}>2</span>
                                Payment Method
                            </h2>
                        </div>
                        {step === 2 && (
                            <div className="p-6">
                                <div className="border border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl mb-6 text-green-700 dark:text-green-400 font-medium">
                                    💳 Mock Order Enabled. No real payment required.
                                </div>
                                <p className="mb-6 text-gray-600 dark:text-gray-300">By clicking "Place Order" below, you agree to our Terms of Service.</p>
                                <button 
                                    onClick={handlePlaceOrder}
                                    disabled={loading}
                                    className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        `Place Order - $${totalPrice}`
                                    )}
                                </button>
                                
                                <div className="mt-6 text-center">
                                    <button 
                                        onClick={() => setStep(1)} 
                                        className="text-gray-400 hover:text-orange-500 text-sm font-bold transition-colors underline decoration-gray-200 dark:decoration-gray-700 underline-offset-4"
                                    >
                                        Back to Delivery Address
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Fixed Summary Sidebar */}
                <div className="lg:w-1/3">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
                        <h3 className="font-bold text-lg mb-4 dark:text-white">Order Summary</h3>
                        <div className="max-h-64 overflow-y-auto mb-4 border-b dark:border-gray-700 pb-4 space-y-3">
                            {cart.items.map(item => (
                                <div key={item.product._id} className="flex gap-2 text-sm">
                                    <span className="text-gray-500">{item.quantity}x</span>
                                    <span className="flex-1 truncate dark:text-white">{item.product.title}</span>
                                    <span className="font-semibold dark:text-white">${(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="space-y-2 mt-4 text-sm">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Items</span>
                                <span>${itemsPrice}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Tax (15%)</span>
                                <span>${taxPrice}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white mt-4 pt-4 border-t dark:border-gray-700">
                                <span>Order Total:</span>
                                <span>${totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
