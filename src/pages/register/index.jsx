import axios from "axios";
import { useState } from "react";
import { ImSpinner6 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export default function Register() {

     const navigate = useNavigate();
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [isLoad, setIsLoad] = useState(false);
    
        const handleSubmit = (e) => {
            e.preventDefault();
            setIsLoad(true);
            
            axios.post('http://127.0.0.1:5000/api/register', {
                username,
                password
                })
                .then(function (response) {
                    if(response.status == 201) {
                        setIsLoad(false);
                        navigate("/");
                    }
                })
                .catch(function (error) {
                    console.error(error);
                });
        };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="px-5 md:max-w-xs w-full space-y-8">
                        <div className=''>
                            <strong className='text-4xl w-full flex justify-center animate-bounce duration-500 transition-transform'>😜</strong>
                            <h2 className="mt-6 text-4xl mb-3 font-extrabold text-[#10B981]">
                                Nova conta 
                            </h2>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm space-y-4">
                                <div>
                                    <label htmlFor="username" className="sr-only">
                                        username
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Teu Nome"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
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
                                        placeholder="Tua Senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
        
                            <div className="flex items-center justify-between">
                              
        
                               
                            </div>
        
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-3  px-4 border-b-4 border-teal-700 text-sm font-medium rounded-md text-white bg-[#10B981] hover:bg-[#10B981] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:[#10B981] hover:scale-95 hover:opacity-80 active:scale-105 duration-500 transition-all"
                                >
                                    {isLoad ? <i className='animate-spin duration-300 transition-all'><ImSpinner6 size={16} color='#FFFFFF' /></i> : <span>Registar</span>}
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
    )
}