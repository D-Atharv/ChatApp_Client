'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import bg_img from '../../../styles/image.png';
import { useSignIn } from '@/hooks/auth/useSignin';
import { useAuthContext } from '@/context/AuthContext';
import Loader from '@/components/ui/animation/LoadingSpinner';

export default function SignIn() {
    const router = useRouter();
    const { authUser, isLoading } = useAuthContext();
    const { signIn } = useSignIn();
    
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showLoader, setShowLoader] = useState(false);

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signIn(inputs.name, inputs.email, inputs.password);
            setShowLoader(true);
            setTimeout(() => {
                router.push("/login");
                setShowLoader(false);
            }, 600);
        } catch (error: any) {
            setError(error.message || 'SignUp failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-fixed flex flex-col justify-center items-center px-8"
             style={{ backgroundImage: `url(${bg_img.src})`, backgroundRepeat: 'no-repeat' }}>
            <main className="bg-black p-8 rounded-lg sm:w-96 lg:w-96 max-w-md shadow-md shadow-c_white">
                <h1 className="text-2xl font-extrabold text-c_blue mb-6 text-center">SIGN UP</h1>

                <form onSubmit={handleSubmitForm}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 bg-gray-400 text-c_black rounded font-semibold"
                            value={inputs.name}
                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="w-full px-3 py-2 bg-gray-400 text-c_black rounded font-semibold"
                            value={inputs.email}
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-300 mb-2">Enter Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 bg-gray-400 text-c_black rounded font-semibold"
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>

                    {error && <p className="text-red-500">{error}</p>} 

                    <div className='flex justify-center'>
                        <button
                            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                            disabled={loading}
                        >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
                                {loading ? 'Signing up...' : 'Sign Up'}
                            </span>
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-gray-400 text-center">
                    Already have an account? <Link href="/login" className="text-c_blue hover:underline">Login</Link>
                </p>
            </main>
        </div>
    );
}