import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import workspaceImage from "../../assets/images/images-3.png";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            navigate('/ForgotPassword');
        }, 1200);
    };

    return (
        <section>
            <div className="min-h-screen flex flex-col md:flex-row">
                <div className="hidden md:flex md:w-1/2 bg-[#f2f3f8] flex-col justify-center items-center relative overflow-hidden">                    
                    <div className="relative z-10 text-left px-8 max-w-md">
                        <div className="mb-8">
                            <img src={workspaceImage} alt="Workspace Illustration" className="w-full h-auto" />
                        </div>

                        <h2 className="text-2xl font-bold leading-normal mb-3 text-gray-700">
                            Log in to your workspace
                        </h2>
                        
                        <p className="text-gray-600 text-sm/6 leading-relaxed mb-5">
                            Enter your email and password to access your Clario AI account. You are one step closer to enhance your images.
                        </p>

                        <a href="/" className="text-sm text-gray-700 font-semibold hover:text-gray-900 inline-flex items-center gap-1">
                            <span>See all tools</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center min-h-screen px-5 md:px-8 xl:px-20 py-14 lg:py-0 relative bg-white">
                    <div className="max-w-md w-full mx-auto flex items-center justify-center">    
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-600 mb-1 leading-normal tracking-wide font-nunito">
                                Sign in to your account
                            </h2>

                            <p className="text-gray-500 text-sm/6 tracking-wide font-medium leading-normal font-nunito">
                                Upscale and <span className="text-blue-500">transform your images</span>
                            </p>
                        </div>
                    </div>

                    <div className="mb-3 mt-8">
                        <button type="button" className="w-full flex items-center justify-center border border-gray-200 rounded-xl py-2.5 px-3 bg-white hover:bg-gray-50 transition-colors">                       
                            <svg className="mr-2" width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <g clipPath="url(#clip0_36737_45212)">
                                    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="white"></path>
                                    <path d="M20.64 12.2047C20.64 11.5665 20.5827 10.9529 20.4764 10.3638H12V13.8451H16.8436C16.635 14.9701 16.0009 15.9233 15.0477 16.5615V18.8197H17.9564C19.6582 17.2529 20.64 14.9456 20.64 12.2047Z" fill="#4285F4"></path>
                                    <path d="M11.9998 21C14.4298 21 16.467 20.1941 17.9561 18.8195L15.0475 16.5613C14.2416 17.1013 13.2107 17.4204 11.9998 17.4204C9.65567 17.4204 7.67158 15.8372 6.96385 13.71H3.95703V16.0418C5.43794 18.9831 8.48158 21 11.9998 21Z" fill="#34A853"></path>
                                    <path d="M6.96409 13.7098C6.78409 13.1698 6.68182 12.593 6.68182 11.9998C6.68182 11.4066 6.78409 10.8298 6.96409 10.2898V7.95801H3.95727C3.34773 9.17301 3 10.5476 3 11.9998C3 13.4521 3.34773 14.8266 3.95727 16.0416L6.96409 13.7098Z" fill="#FBBC05"></path>
                                    <path d="M11.9998 6.57955C13.3211 6.57955 14.5075 7.03364 15.4402 7.92545L18.0216 5.34409C16.4629 3.89182 14.4257 3 11.9998 3C8.48158 3 5.43794 5.01682 3.95703 7.95818L6.96385 10.29C7.67158 8.16273 9.65567 6.57955 11.9998 6.57955Z" fill="#EA4335"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_36737_45212">
                                        <rect width="24" height="24" fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                            <span className="text-sm/6 leading-normal tracking-wide font-semibold text-gray-600 font-nunito">
                                Sign Up with Google
                            </span>
                        </button>
                    </div>

                    <div className="flex items-center my-4">
                        <span className="h-px flex-1 bg-gray-200"></span>
                        <span className="px-5 text-sm/6 leading-normal font-medium text-gray-600 tracking-wide font-nunito">
                            Or with email
                        </span>
                        <span className="h-px flex-1 bg-gray-200"></span>
                    </div>

                    <form className="space-y-5 mt-3">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-2.5 tracking-wide leading-normal font-nunito">
                                Email
                                <span className="ml-0 text-red-500 text-sm/6 tracking-wide leading-tight font-nunito">*</span>
                            </label>
                            <input type="email" id="email" className="w-full border border-gray-300 rounded-lg px-3 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-600 tracking-wide leading-tight font-nunito" placeholder="Email" required />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-2.5 tracking-wide leading-normal font-nunito">
                                Password
                                <span className="ml-0 text-red-500 text-sm/6 tracking-wide leading-tight font-nunito">*</span>
                            </label>

                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} id="password"  className="w-full border border-gray-300 rounded-lg px-3 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-600 tracking-wide leading-tight font-nunito" placeholder="********" required />
                                
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 flex items-center justify-center h-6 w-6 p-0">
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input type="checkbox" id="remember" className="w-4 h-4 text-blue-500 border-gray-300 rounded" />
                                <label htmlFor="remember" className="ml-2 text-sm font-semibold text-gray-600 tracking-wide leading-normal cursor-pointer font-nunito">
                                    Remember me
                                </label>
                            </div>

                            <a href="/ForgotPassword" onClick={handleForgotPassword} className="text-sm font-bold text-blue-600 hover:underline tracking-wide leading-normal font-nunito">
                                Forgot password?
                            </a>
                        </div>

                        <div className="w-full mt-6">
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors font-nunito">
                                Sign In
                            </button>
                        </div>                        
                    </form>
                </div>
            </div>

            {isLoading && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm animate-fadeIn">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-700 font-semibold font-nunito">Loading...</p>
                        <p className="text-gray-500 text-sm font-nunito">Redirecting to Password Recovery</p>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Login;
