import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpModal from "./OTPModal.jsx";
import personUpscale from "@/assets/images/images-4.png";

function ForgotPassword() {
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowOtpModal(true);
    };

    const handleVerifyOtp = (otpCode) => {
        console.log('OTP Code:', otpCode);
        setShowOtpModal(false);
    };

    const handleBackToLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        setTimeout(() => {
            navigate('/Login');
        }, 1200);
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4 py-10  relative overflow-hidden">      
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>            
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-blue-50/40 to-gray-100/40 rounded-full blur-2xl"></div>
                <div className="absolute top-1/4 right-1/3 w-16 h-16 bg-blue-100/20 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>            
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50"></div>
            </div>

            <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-5 items-center relative z-10">
                <div className="space-y-6 order-2 lg:order-1">            
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-gray-200 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        <span className="text-xs/6 leading-normal text-gray-500 font-semibold font-nunito">
                            Password Recovery
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold leading-tight text-gray-600 font-nunito">
                        Forgot your<span className="text-blue-500"> password?</span>
                    </h1>

                    <div className="flex items-start gap-3 text-sm/6 leading-6 font-medium text-gray-600 font-nunito">
                        <svg className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>

                        <p className="leading-relaxed">
                            No worries! Enter your email address below and we'll send you a link to reset your password.
                            
                            <br/><br/>

                            <span className="text-gray-500 italic">
                                Make sure to check your spam folder if you don't see the email in your inbox.
                            </span>
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-2.5 tracking-wide leading-normal font-nunito">
                                Email Address
                                <span className="ml-0 text-red-500 font-nunito text-sm/6 tracking-wide leading-tight">*</span>
                            </label>

                            <div className="relative">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                <input type="email" id="email" className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 placeholder:font-nunito placeholder:text-sm text-gray-700 font-nunito tracking-wide transition-all" placeholder="Enter your email address" required />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 via-gray-300 to-transparent"></div>
                            <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                        </div>

                        <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm font-nunito">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"/>
                            </svg>
                            <span>Send Reset Link</span>
                        </button>

                        <div className="text-center mt-4">
                            <a href="/Login" onClick={handleBackToLogin} className="text-sm/6 font-semibold text-gray-600 hover:text-blue-600 transition-colors font-nunito inline-flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
                                </svg>
                                <span>Back to Login</span>
                            </a>
                        </div>
                    </form>
                </div>

                <div className="flex justify-center lg:justify-end order-1 lg:order-2 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent rounded-3xl"></div>                    
                    <div className="relative">
                        <img src={personUpscale} alt="Password Recovery Illustration" className="w-64 md:w-80 lg:w-[450px] xl:w-[500px] select-none pointer-events-none drop-shadow-2xl relative z-10"/>
                    </div>
                </div>
            </div>

            <OtpModal 
                isOpen={showOtpModal}
                onClose={() => setShowOtpModal(false)}
                onVerify={handleVerifyOtp}
            />

            {isLoading && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm animate-fadeIn">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-700 font-semibold font-nunito">Loading...</p>
                        <p className="text-gray-500 text-sm font-nunito">Redirecting to Login page</p>
                    </div>
                </div>
            )}
        </section>
    )
}

export default ForgotPassword