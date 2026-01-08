import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/frontend/components/Header";
import Footer from "@/frontend/components/Footer";
import profile from "../../assets/images/profile.avif";

function Pricing() {
    const navigate = useNavigate();
    const [billingCycle, setBillingCycle] = useState("monthly");
    const [toastMessage, setToastMessage] = useState(null);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [toastTimeoutId, setToastTimeoutId] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const showToast = (message) => {
        if (toastTimeoutId) {
            clearTimeout(toastTimeoutId);
        }

        setToastMessage(message);

        const timeoutId = setTimeout(() => {
            setToastMessage(null);
            setToastTimeoutId(null);
        }, 3000);
        
        setToastTimeoutId(timeoutId);
    };

    const copyCoupon = () => {
        navigator.clipboard.writeText("FRIEND50");
        showToast("Coupon code copied");
    };

    const showLoginMessage = () => {
        showToast("Please create and login an account first.");
    };

    const faqs = [
        {
            question: "Can I cancel my subscription at any time?",
            answer: "Yes, you can cancel your subscription at any time through your account settings. Once cancelled, you will continue to have access to your plan's benefits until the end of your current billing period."
        },
        {
            question: "How can I get more credits if I run out?",
            answer: "If you run out of credits, you can either upgrade your plan for a higher monthly limit or purchase 'Pay as you go' credit packs to get immediate access to more processing power."
        },
        {
            question: "Is it safe to make payments on this site?",
            answer: "Absolutely. We use industry-standard SSL encryption to protect your data. All payments are processed through secure gateways like PayPro, ensuring your financial information is never stored on our servers."
        },
        {
            question: "Do unused credits roll over?",
            answer: "Yes! Unused credits from our subscription plans roll over to the next month as long as your subscription remains active. This ensures you never lose what you've paid for."
        },
        {
            question: "What should I do if my payment isn't going through?",
            answer: "First, check if your card details are correct and have sufficient funds. If the issue persists, try using a different payment method or contact our support team for assistance."
        },
        {
            question: "When will I be billed for my subscription?",
            answer: "For monthly plans, you will be billed on the same day each month starting from your initial purchase. For annual plans, you will be billed once a year on your anniversary date."
        }
    ];

    return (
        <>
            <div className="bg-white min-h-screen relative">
                
                <Header />
                
                <div className="relative isolate px-6 lg:px-8 overflow-x-hidden">
                    <div className="mx-auto max-w-4xl py-14 sm:py-14 lg:py-14">
                        <div className="text-center mb-2 flex flex-col items-center">                          
                            <h1 className="text-5xl font-semibold tracking-tight text-gray-800 mb-3 max-w-2xl mx-auto leading-tight">
                                Pricing & Plans
                            </h1>

                            <p className="text-md text-gray-600 max-w-3xl mx-auto mb-8">
                                Pay the package to get unlimited access to the image upscaler services. Sign up a free account to get 20 free credits per month. Upscale and enhance images for free without creating account.
                            </p>

                            <div className="flex items-center justify-center gap-4">
                                <span className={`text-[15px] font-medium transition-colors duration-200 ${billingCycle === 'monthly' ? 'text-blue-600' : 'text-gray-400'}`}>
                                    Monthly
                                </span>
                                
                                <button onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')} className={`relative w-[52px] h-[26px] rounded-full transition-colors duration-300 focus:outline-none ${billingCycle === 'yearly' ? 'bg-blue-600' : 'bg-gray-300'}`} aria-label="Toggle billing cycle">
                                    <div className={`absolute top-[3px] left-[3px] w-5 h-5 rounded-full shadow-sm transition-all duration-300 transform ${billingCycle === 'yearly' ? 'translate-x-[26px] bg-blue-100' : 'translate-x-0 bg-white'}`} />
                                </button>

                                <span className={`text-[15px] font-medium transition-colors duration-200 ${billingCycle === 'yearly' ? 'text-blue-600' : 'text-gray-400'}`}>
                                    Yearly
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="relative mx-auto max-w-5xl mb-10 sm:mb-12 px-0 sm:px-0 pb-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-col items-center text-center">
                                <h3 className="text-xl font-semibold leading-normal tracking-wide text-gray-800 mb-5">Free</h3>
                                
                                <div className="flex items-baseline mb-2.5">
                                    <span className="text-2xl font-bold tracking-wide text-gray-800">$</span>
                                    <span className="text-5xl font-bold tracking-wide text-gray-800">0</span>
                                    <span className="text-gray-500 ml-1 font-medium tracking-wide">/ month</span>
                                </div>

                                <p className="text-[13px] text-gray-500 mb-8 font-normal leading-normal tracking-wide">Forever free</p>
                                
                                <ul className="w-full space-y-4 mb-10 text-left">
                                    {['20 credits/mo', 'No Subscription', 'Email Support', 'Reimagine AI', 'Single Processing'].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-[13px] text-gray-600 tracking-wide font-normal">
                                            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                
                                <button onClick={() => navigate('/Register')} className="mt-auto w-full py-2 px-6 rounded-xl border border-gray-200 font-normal tracking-wide text-gray-700 text-sm/6 hover:bg-gray-50 transition-colors">
                                    Create Account
                                </button>
                            </div>

                            <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-col items-center text-center">
                                <h3 className="text-xl font-semibold leading-normal tracking-wide text-gray-800 mb-5">Starter</h3>
                                
                                <div className="flex items-baseline mb-2.5">
                                    <span className="text-2xl font-bold tracking-wide text-gray-800">$</span>
                                    <span className="text-5xl font-bold tracking-wide text-gray-800">
                                        {billingCycle === "monthly" ? "5.9" : "46.8"}
                                    </span>

                                    <span className="text-gray-500 ml-1 font-medium tracking-wide">
                                        {billingCycle === "monthly" ? "/ month" : "/ year"}
                                    </span>
                                </div>

                                <p className="text-[13px] text-gray-500 mb-8 font-normal leading-normal tracking-wide">Limited credits for starters</p>
                                
                                <ul className="w-full space-y-4 mb-10 text-left">
                                    {['100 credits/mo', 'Credits Roll up', 'Email Support', 'Reimagine AI', 'Batch Processing', 'No Ads'].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-[13px] text-gray-600 tracking-wide font-normal">
                                            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                
                                <button onClick={showLoginMessage} className="mt-auto w-full py-2 px-6 rounded-xl bg-blue-600 text-white font-normal tracking-wide text-sm/6 flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                    <span>Pay With PayPro</span>
                                </button>
                            </div> 

                            <div className="bg-white rounded-xl p-5 border-2 border-blue-600 flex flex-col items-center text-center relative mt-4 lg:mt-0">
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-100 px-3 py-2 rounded-lg">
                                    <span className="text-[11px] font-bold text-blue-600">Most Popular</span>
                                </div>

                                <h3 className="text-xl font-semibold leading-normal tracking-wide text-gray-800 mb-5 mt-6">Premium</h3>
                                
                                <div className="flex items-baseline mb-2.5">
                                    <span className="text-2xl font-bold tracking-wide text-gray-800">$</span>
                                    <span className="text-5xl font-bold tracking-wide text-gray-800">
                                        {billingCycle === "monthly" ? "9.9" : "82.8"}
                                    </span>

                                    <span className="text-gray-500 ml-1 font-medium tracking-wide">
                                        {billingCycle === "monthly" ? "/ month" : "/ year"}
                                    </span>
                                </div>

                                <p className="text-[13px] text-gray-500 mb-8 font-normal leading-normal tracking-wide">Save 40%</p>
                                
                                <ul className="w-full space-y-4 mb-10 text-left">
                                    {['500 credits/mo', 'Credits Roll up', 'Email Support', 'Reimagine AI', 'Batch Processing', 'No Ads'].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-[13px] text-gray-600 tracking-wide font-normal">
                                            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                
                                <button onClick={showLoginMessage} className="mt-auto w-full py-2 px-6 rounded-xl bg-blue-600 text-white font-normal tracking-wide text-sm/6 flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                    <span>Pay With PayPro</span>
                                </button>
                            </div>

                            <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-col items-center text-center">
                                <h3 className="text-xl font-semibold leading-normal tracking-wide text-gray-800 mb-5">Business</h3>                                
                                <div className="flex items-baseline mb-2.5">
                                    <span className="text-2xl font-bold tracking-wide text-gray-800">$</span>
                                    <span className="text-5xl font-bold tracking-wide text-gray-800">
                                        {billingCycle === "monthly" ? "29" : "228"}
                                    </span>
                                    
                                    <span className="text-gray-500 ml-1 font-medium tracking-wide">
                                        {billingCycle === "monthly" ? "/ month" : "/ year"}
                                    </span>
                                </div>

                                <p className="text-[13px] text-gray-500 mb-8 font-normal leading-normal tracking-wide">Unlimited credits for usage</p>
                                
                                <ul className="w-full space-y-4 mb-10 text-left">
                                    {['No Credits Limit', 'Email Support', 'Single Processing', 'Reimagine AI', 'Batch Processing', 'No Ads'].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-[13px] text-gray-600 tracking-wide font-normal">
                                            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                
                                <div className="mt-auto w-full flex flex-col items-center">
                                    <button onClick={copyCoupon} className="bg-white shadow-sm text-gray-700 text-[10px] px-3 py-1 rounded-md z-10 -mb-2 border border-gray-100 shadow-sm relative hover:bg-gray-50 transition-colors cursor-pointer">
                                        Coupon: FRIEND50
                                    </button>

                                    <button onClick={showLoginMessage} className="mt-auto w-full py-2 px-6 rounded-xl bg-blue-600 text-white font-normal tracking-wide text-sm/6 flex items-center justify-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg>
                                        <span>Pay With PayPro</span>
                                    </button>
                                </div>
                            </div>                           
                        </div>
                    </div>

                    <div className="mx-auto max-w-4xl mt-5 mb-12 sm:mb-10 px-4 sm:px-4">
                        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                                    </svg>
                                </div>
                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">Transparent Pricing</h3>
                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed">All prices include taxes based on your location. The final cost is shown at checkout—no hidden fees.</p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.952 11.952 0 0112 13.5c-2.998 0-5.74 1.1-7.843 2.918m15.686 0A8.959 8.959 0 013 12c0-.778.099-1.533.284-2.253" />
                                    </svg>
                                </div>
                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">Credits Explained</h3>
                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed">1 upscaling costs 1 credit. 2 credits for reimagination AI. No credits required for business plan.</p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                </div>
                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">7-Day Money-Back Guarantee</h3>
                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed">Try imgupscaler for 7 days, risk-free. If you're not satisfied, get a full refund.</p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.724 10.339 8.75 11.722 5.026-1.383 8.75-6.13 8.75-11.722 0-1.285-.203-2.523-.582-3.686A11.959 11.959 0 0112 2.714z" />
                                    </svg>
                                </div>
                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">Secure Payments</h3>
                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed">We protect your payment info with 256-bit SSL encryption, ensuring safe transactions.</p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                                    </svg>
                                </div>
                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">Cancel or Upgrade Anytime</h3>
                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed">Cancel your plan anytime. Need more credits? Upgrade easily through your account.</p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </div>
                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">Credits Roll Over</h3>
                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed">Unused credits roll over to the next month. If you cancel, credits reset when your plan ends.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto max-w-5xl mt-5 mb-10 sm:mb-10 px-4 sm:px-0">
                        <div className="text-center py-6 sm:py-8 px-4 ">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full shadow-sm bg-white mb-4">
                                <img src={profile} alt="Users" className="h-6 object-contain" />
                                <span className="text-[12px] font-medium text-gray-600 px-1">
                                    200k+ people use ImgUpscaler daily
                                </span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-2 tracking-tight">Discover Your Plan</h2>

                            <p className="text-xs sm:text-[13px] font-normal tracking-wide text-gray-600 max-w-lg mx-auto">
                                Compare our plans and find the perfect fit for your workflow. From free credits to unlimited business solutions, we have the right options for you.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-start pb-5 border-b border-gray-100">                        
                            <div className="w-full lg:w-1/6 flex flex-col items-start px-2 mb-4 lg:mb-0">
                                <div className="flex items-center gap-3">
                                    <span className={`text-[13px] transition-colors duration-200 ${billingCycle === 'monthly' ? 'text-blue-600 font-semibold' : 'text-gray-400 font-medium'}`}>Monthly</span>
                                    <button onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')} className={`relative w-[52px] h-[26px] rounded-full transition-colors duration-300 focus:outline-none ${billingCycle === 'yearly' ? 'bg-blue-600' : 'bg-gray-300'}`} aria-label="Toggle billing cycle">
                                        <div className={`absolute top-[3px] left-[3px] w-5 h-5 rounded-full shadow-sm transition-all duration-300 transform ${billingCycle === 'yearly' ? 'translate-x-[26px] bg-blue-100' : 'translate-x-0 bg-white'}`} />
                                    </button>
                                    <span className={`text-[13px] transition-colors duration-200 ${billingCycle === 'yearly' ? 'text-blue-600 font-semibold' : 'text-gray-400 font-medium'}`}>Annually</span>                                    
                                </div>
                            </div>
                            
                            <div className="w-full lg:w-5/6 grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-y-6 px-2 lg:px-0">
                                {[
                                    { 
                                        name: 'Free plan', 
                                        credits: billingCycle === 'monthly' ? '3 credits/month' : '36 credits/year', 
                                        price: '$0' 
                                    },
                                    { 
                                        name: 'Pay as you go', 
                                        credits: '200 credits', 
                                        price: '$0.11' 
                                    },
                                    { 
                                        name: 'Lite plan', 
                                        credits: billingCycle === 'monthly' ? '150 credits/month' : '1800 credits/year', 
                                        price: billingCycle === 'monthly' ? '$0.06' : '$0.04',
                                        suffix: '/ month' 
                                    },
                                    { 
                                        name: 'Pro plan', 
                                        credits: billingCycle === 'monthly' ? '550 credits/month' : '6500 credits/year', 
                                        price: billingCycle === 'monthly' ? '$0.03' : '$0.02',
                                        suffix: '/ month' 
                                    },
                                    { 
                                        name: 'Enterprise plan', 
                                        credits: 'Credits as needed', 
                                        price: 'Custom' 
                                    }
                                ].map((plan, idx) => (
                                    <div key={idx} className="flex flex-col items-start lg:items-center text-left lg:text-center">
                                        <h4 className="text-[13px] font-semibold text-gray-700 tracking-wide leading-normal mb-0.5">{plan.name}</h4>
                                        <p className="text-[11px] text-gray-500 mb-0.5">{plan.credits}</p>
                                        <span className="text-xs/6 font-medium text-gray-800">
                                            {plan.price}{plan.suffix && <span className="text-[10px] text-gray-400 font-normal ml-0.5">{plan.suffix}</span>}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-3 mb-4">
                            <h2 className="text-md/6 leading-normal tracking-wide font-medium text-gray-800 ml-2">General features</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <tbody className="text-[13px]">
                                    {[
                                        { name: 'Batch processing', values: [false, true, true, true, true] },
                                        { name: 'Basic transformations', values: [true, true, true, true, true] },
                                        { name: 'AI transformations', values: [false, true, true, true, true] },
                                        { name: 'Storage', values: ['- ', '2 GB', '10 GB', '50 GB', 'Unlimited'] },
                                        { name: 'CDN', values: [false, false, true, true, true] },
                                        { name: 'Refundable', values: [false, false, true, true, true] },
                                        { name: 'API access', values: [false, false, false, false, true] },
                                        { name: 'SDK integration', values: [false, false, false, false, true] },
                                        { name: 'Email support', values: [false, true, true, true, true] },
                                        { name: 'Dedicated support', values: [false, false, false, false, true] },
                                    ].map((row, i) => (
                                        <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50/50' : ''} rounded-lg`}>
                                            <td className="w-1/6 py-5 px-6 text-[13px] font-normal leading-normal tracking-wide text-gray-700 rounded-l-xl">{row.name}</td>
                                            {row.values.map((val, j) => (
                                                <td key={j} className={`w-1/6 py-5 px-4 text-center text-[13px] ${j === row.values.length - 1 ? 'rounded-r-xl' : ''}`}>
                                                    {typeof val === 'boolean' ? (
                                                        val ? (
                                                            <svg className="w-4 h-4 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                                                        )
                                                    ) : (
                                                        <span className="text-gray-500">{val}</span>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pt-4 mb-4 mt-5 border-t border-gray-100">
                            <h2 className="text-md/6 leading-normal tracking-wide font-medium text-gray-800 ml-2">Image editing</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <tbody className="text-[13px]">
                                    {[
                                        { name: 'Watermark remover', values: ['3 images', '50 images', '1800 images', '6500 images', 'Custom'] },
                                        { name: 'Image upscale (2X, 4X)', values: ['3 images', '50 images', '1800 images', '6500 images', 'Custom'] },
                                        { name: 'Image upscale (8X)', values: [true, true, true, true, true] },
                                        { name: 'Add custom backgrounds', values: [true, true, true, true, true] },
                                        { name: 'AI background remover', values: ['3 images', '50 images', '1800 images', '6500 images', 'Custom'] },
                                        { name: 'AI background generator', values: [false, '10 images', '360 images', '1300 images', 'Custom'] },
                                        { name: 'Soft shadow generator', values: ['1 image', '16 images', '600 images', '2166 images', 'Custom'] },
                                        { name: 'AI headshot generator +training pack', values: [false, 'Coming soon', 'Coming soon', 'Coming soon', 'Coming soon'] },
                                        { name: 'AI photoshoot generator + training pack', values: [false, 'Coming soon', 'Coming soon', 'Coming soon', 'Coming soon'] },
                                    ].map((row, i) => (
                                        <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50/50' : ''} rounded-lg`}>
                                            <td className="w-1/6 py-5 px-6 text-[13px] font-normal leading-normal tracking-wide text-gray-700 rounded-l-xl">{row.name}</td>
                                            {row.values.map((val, j) => (
                                                <td key={j} className={`w-1/6 py-5 px-4 text-center text-[13px] ${j === row.values.length - 1 ? 'rounded-r-xl' : ''}`}>
                                                    {typeof val === 'boolean' ? (
                                                        val ? (
                                                            <svg className="w-4 h-4 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                                                        )
                                                    ) : (
                                                        <span className={`${val === 'Coming soon' ? 'text-green-600 font-medium' : 'text-gray-500'}`}>{val}</span>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pt-4 mb-4 mt-5 border-t border-gray-100">
                            <h2 className="text-md/6 leading-normal tracking-wide font-medium text-gray-800 ml-2">Video editing</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <tbody className="text-[13px]">
                                    {[
                                        { name: 'Video generation (SD)', values: [false, 'Coming soon', 'Coming soon', 'Coming soon', 'Coming soon'] },
                                        { name: 'Video upscaler', values: [false, 'Coming soon', 'Coming soon', 'Coming soon', 'Coming soon'] },
                                        { name: 'Video watermark remover', values: [false, 'Coming soon', 'Coming soon', 'Coming soon', 'Coming soon'] },
                                    ].map((row, i) => (
                                        <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50/50' : ''} rounded-lg`}>
                                            <td className="w-1/6 py-5 px-6 text-[13px] font-normal leading-normal tracking-wide text-gray-700 rounded-l-xl">{row.name}</td>
                                            {row.values.map((val, j) => (
                                                <td key={j} className={`w-1/6 py-5 px-4 text-center text-[13px] ${j === row.values.length - 1 ? 'rounded-r-xl' : ''}`}>
                                                    {typeof val === 'boolean' ? (
                                                        val ? (
                                                            <svg className="w-4 h-4 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                                                        )
                                                    ) : (
                                                        <span className={`${val === 'Coming soon' ? 'text-green-600 font-medium' : 'text-gray-500'}`}>{val}</span>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="relative mx-auto max-w-5xl mt-5 mb-5 sm:mb-6 px-0 sm:px-0 pb-5">
                        <div className="text-center py-6 sm:py-8 px-4">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-2 tracking-tight">Frequently Asked Questions</h2>
                            <p className="text-xs sm:text-[13px] font-normal tracking-wide text-gray-600 max-w-md mx-auto line-clamp-2">
                                Get answers to your questions about our AI Image Upscaler
                            </p>
                        </div>

                        <div className="space-y-0">
                            {faqs.map((faq, index) => (
                                <div key={index}>
                                    <button onClick={() => toggleFaq(index)} className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-200">
                                        <div className="flex items-center gap-3 flex-1">
                                            <span className="text-gray-700 font-medium text-base">
                                                {index + 1}.
                                            </span>
                                            
                                            <h3 className={`text-md font-medium pr-4 transition-colors duration-200 ${openFaqIndex === index ? 'text-blue-600' : 'text-gray-700'}`}>
                                                {faq.question}
                                            </h3>
                                        </div>

                                        <svg className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                    <div className={`transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                                        <div className="px-6 pb-5 pt-0 pl-[52px]">
                                            <p className="text-sm/6 text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>                

            {toastMessage && (
                <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-6 py-4 flex items-center gap-4">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[12px] font-serif italic font-bold">i</span>
                        </div>
                        <span className="text-gray-700 text-[15px] font-medium tracking-tight">
                            {toastMessage}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}



export default Pricing; 
