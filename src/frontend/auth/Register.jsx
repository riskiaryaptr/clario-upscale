import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import workspaceImage from "../../assets/images/images-3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate registration process
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <section className="font-nunito">
            <div className="min-h-screen flex flex-col md:flex-row">
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 flex items-center gap-2">
                        <div className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-md">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.9"/>
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
        
                        <div className="flex flex-col">
                            <h1 className="text-white font-bold text-xl leading-none tracking-tight font-nunito mb-0.5">Clario</h1>
                            <p className="text-white/70 text-[10px] leading-none tracking-wider font-nunito font-medium">Smart AI Tools</p>
                        </div>
                    </div>

                    <svg className="absolute -top-12 -left-20 md:-top-20 md:-left-24 w-[300px] h-[300px] z-0 opacity-25" viewBox="0 0 420 420" fill="none">
                        <circle cx="210" cy="210" r="210" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1" strokeOpacity="0.05"/>
                    </svg>

                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>            
                        <div className="absolute top-20 right-20 w-40 h-40 border-2 border-white/10 rounded-full animate-float"></div>
                        <div className="absolute top-1/3 right-10 w-20 h-20 border border-white/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>                      
                        <div className="absolute bottom-32 left-16 w-32 h-32 border-2 border-white/10 rounded-2xl -rotate-12 animate-float" style={{animationDelay: '0.5s'}}></div>
                        <div className="absolute top-1/2 left-10 w-24 h-24 bg-white/5 rounded-xl rotate-45 animate-float" style={{animationDelay: '1.5s'}}></div>
                        <div className="absolute bottom-20 right-1/4 w-16 h-16 border border-white/10 rounded-lg rotate-12 animate-float" style={{animationDelay: '3s'}}></div>            
                        <div className="absolute top-40 left-1/4 w-20 h-20 bg-white/5 animate-float" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animationDelay: '2.5s'}}></div>                      
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center px-8 sm:px-12 md:px-16 lg:px-20">            
                        <div className="flex items-center justify-center mb-5">
                            <img src={workspaceImage} alt="Workspace Illustration" className="w-full max-w-[800px] object-contain drop-shadow-2xl transition-all duration-500 hover:scale-[1.02]"/>
                        </div>

                        <div className="text-center text-white w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto">
                            <Swiper modules={[Pagination, Autoplay]} spaceBetween={30} slidesPerView={1} speed={800}
                                pagination={{ 
                                    clickable: true,
                                    bulletClass: 'swiper-pagination-bullet !w-1.5 !h-1.5 !rounded-full !bg-white hover:!bg-white/70 transition-all duration-300',
                                    bulletActiveClass: 'swiper-pagination-bullet-active !w-8 !h-1.5 !rounded-full !bg-white shadow-lg'
                                }}

                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }} loop={true} className="w-full">


                                <SwiperSlide>
                                    <div className="pb-10">
                                        <h2 className="text-xl sm:text-2xl md:text-2xl font-bold mb-2 font-nunito tracking-wide bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent">
                                            Speedy, Easy and Fast
                                        </h2>
                                        
                                        <p className="text-blue-50/90 text-xs sm:text-sm md:text-sm leading-relaxed font-nunito font-medium tracking-wide">
                                            Clario helping you upscale and enhance your images with powerful AI tools. Experience the future of image editing today.
                                        </p>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="pb-10">
                                        <h2 className="text-xl sm:text-2xl md:text-2xl font-bold mb-2 font-nunito tracking-wide bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent">
                                            Secure & Reliable
                                        </h2>
                                        
                                        <p className="text-blue-50/90 text-xs sm:text-sm md:text-sm leading-relaxed font-nunito font-medium tracking-wide">
                                            Your data is protected with high-level security. We use advanced technology to keep your images and personal info safe.
                                        </p>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="pb-10">
                                        <h2 className="text-xl sm:text-2xl md:text-2xl font-bold mb-2 font-nunito tracking-wide bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent">
                                            Smart AI Enhancement
                                        </h2>
                                        
                                        <p className="text-blue-50/90 text-xs sm:text-sm md:text-sm leading-relaxed font-nunito font-medium tracking-wide">
                                            Take control of your image quality with our tracking tools. Transform blur images into high resolution with <span className="text-yellow-300 font-bold px-2 py-0.5 bg-yellow-400/20 rounded-md">Clario AI</span>.
                                        </p>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center min-h-screen px-5 md:px-8 xl:px-20 py-14 relative bg-white">
                    <div className="max-w-md w-full mx-auto flex items-center justify-center">    
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-600 mb-1 font-nunito leading-normal tracking-wide">
                                Create your account
                            </h2>

                            <p className="text-gray-500 font-nunito text-sm/6 tracking-wide font-medium leading-normal">
                                Start your journey to <span className="text-blue-500">transform your images</span>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 mb-3 mt-8">
                        <button type="button" className="flex items-center justify-center border border-gray-200 rounded-xl py-2.5 px-3 bg-white hover:bg-gray-50 transition-colors">                       
                            <svg className="mr-2" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        <span className="px-5 text-sm/6 leading-normal font-semibold text-gray-600 font-nunito tracking-wide">
                            Or with email
                        </span>
                        <span className="h-px flex-1 bg-gray-200"></span>
                    </div>

                    <form className="space-y-5 mt-3" onSubmit={handleRegister}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-600 mb-2.5 tracking-wide leading-normal font-nunito">
                                    Full Name
                                    <span className="ml-0 text-red-500 font-nunito text-sm/6 tracking-wide leading-tight">*</span>
                                </label>
                                <input type="text" id="fullName" className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 placeholder:font-nunito placeholder:text-sm/6 text-gray-600 font-nunito tracking-wide leading-tight" placeholder="Full Name" required />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-2.5 tracking-wide leading-normal font-nunito">
                                    Email
                                    <span className="ml-0 text-red-500 font-nunito text-sm/6 tracking-wide leading-tight">*</span>
                                </label>
                                <input type="email" id="email" className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 placeholder:font-nunito placeholder:text-sm/6 text-gray-600 font-nunito tracking-wide leading-tight" placeholder="Email" required />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-2.5 tracking-wide leading-normal font-nunito">
                                Password
                                <span className="ml-0 text-red-500 font-nunito text-sm/6 tracking-wide leading-tight">*</span>
                            </label>

                            <div className="relative flex items-center">
                                <input type={showPassword ? "text" : "password"} id="password"  className="w-full border border-gray-300 rounded-lg px-3 py-3 pr-11 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 placeholder:font-nunito placeholder:text-sm/6 text-gray-600 font-nunito tracking-wide leading-tight" placeholder="********" required />
                                
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 flex items-center justify-center h-9 w-9 p-0 z-20" aria-label="Toggle password visibility">
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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-600 mb-2.5 tracking-wide leading-normal font-nunito">
                                Confirm Password
                                <span className="ml-0 text-red-500 font-nunito text-sm/6 tracking-wide leading-tight">*</span>
                            </label>

                            <div className="relative flex items-center">
                                <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword"  className="w-full border border-gray-300 rounded-lg px-3 py-3 pr-11 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 placeholder:font-nunito placeholder:text-sm/6 text-gray-600 font-nunito tracking-wide leading-tight" placeholder="********" required />
                                
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 flex items-center justify-center h-9 w-9 p-0 z-20" aria-label="Toggle confirm password visibility">
                                    {showConfirmPassword ? (
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

                        <div className="w-full mt-6">
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold font-nunito tracking-wide">
                                Sign Up
                            </button>
                        </div>                        
                    </form>

                    <div className="mt-6 text-center text-sm font-nunito tracking-wide leading-tight text-gray-600 font-semibold">
                        <span className="font-nunito">Already have an account?</span>
                        <Link to="/Login" className="text-blue-600 font-bold hover:underline ml-1 font-nunito">Sign In</Link>
                    </div>
                </div>
            </div>

            {isLoading && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm animate-fadeIn">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-700 font-semibold font-nunito">Loading...</p>
                        <p className="text-gray-500 text-sm font-nunito">Creating your account...</p>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Register;