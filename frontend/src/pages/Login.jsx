import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/home');
        } catch (err) {
            // Error mapped in store
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[60vh] animate-fade-in">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border dark:border-gray-700">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome Back</h2>
                    <p className="text-sm text-gray-500 mt-2">Sign in to your account</p>
                </div>

                {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-premium-amber focus:border-premium-amber transition-shadow"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-premium-amber focus:border-premium-amber transition-shadow"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-premium-amber hover:bg-premium-accent text-premium-charcoal shadow-md font-bold py-3 rounded-lg transition-colors flex justify-center items-center"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    
                    <div className="text-center text-sm text-gray-600 dark:text-gray-400 pt-4 border-t dark:border-gray-700">
                        Don't have an account? <Link to="/register" className="text-premium-amber font-semibold hover:underline">Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
