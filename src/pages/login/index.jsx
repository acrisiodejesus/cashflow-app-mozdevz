import { useState } from 'react';
import { ImSpinner6 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoad, setIsLoad] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoad(true);
        if (email.length > 9 && password.length >= 4) {
            navigate("dashboard");
        }
        console.error("Erro de logi");
        setIsLoad(false);
        console.log('Email:', email, 'Password:', password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="px-5 md:max-w-xs w-full space-y-8">
                <div className=''>
                    <strong className='text-4xl w-full flex justify-center animate-bounce duration-500 transition-transform'>✌</strong>
                    <h2 className="mt-6 text-center text-4xl mb-3 uppercase font-extrabold text-[#10B981]">
                        CashFlow
                    </h2>
                    <p className='w-full text-center'>Aceda o seu fluxo de caixa 😜</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Senha
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Lembrar de mim
                            </label>
                        </div>

                       
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3  px-4 border-b-4 border-teal-700 text-sm font-medium rounded-md text-white bg-[#10B981] hover:bg-[#10B981] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:[#10B981] hover:scale-95 hover:opacity-80 active:scale-105 duration-500 transition-all"
                        >
                            {!isLoad ? <span>Entrar</span> : <i className='animate-spin duration-300 transition-all'><ImSpinner6 size={16} color='#FFFFFF' /></i>}
                        </button>
                    </div>
                </form>

                <div className="text-center text-xs text-gray-400">
                    <p>
                        @2025 | MozDevz - Nampula
                    </p>
                </div>
            </div>
        </div>
    );
}