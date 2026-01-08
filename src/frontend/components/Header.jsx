import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

function Header() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <div className="bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-4">
                    <div className="text-center text-[13px] text-gray-700 font-normal leading-normal tracking-wide">
                        <span>New! AI-Powered Image Upscaler - Enhance your images up to 4K resolution with our smart AI technology</span>
                        <Link to="/" className="ml-2 font-semibold leading-normal tracking-wide text-blue-600 hover:text-blue-700">Try it now →</Link>
                    </div>
                </div>
            </div>

            <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${ isScrolled ? 'bg-white/95 backdrop-blur-lg border-gray-200/50' : 'bg-white border-gray-200'}`}>
                <nav aria-label="Global" className="mx-auto max-w-7xl flex items-center justify-between p-5 xl:px-8">
                    <div className="flex xl:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.9"/>
                                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>

                            <div className="flex flex-col">
                                <h1 className="text-gray-700 font-bold text-base leading-none tracking-tight mb-0.5">Clario AI</h1>
                                <p className="text-gray-600 text-[10px] leading-none tracking-wider font-medium">Smart AI Tools</p>
                            </div>
                        </Link>
                    </div>

                    <div className="flex xl:hidden">
                        <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                            <span className="sr-only">Open main menu</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6">
                                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden xl:flex xl:gap-x-8 text-gray-700 font-medium leading-normal tracking-wide">
                        <Link to="/" className={`text-sm/6 transition-colors ${isActive('/') || isActive('/index') ? 'text-blue-600' : 'hover:text-blue-600'}`}>Image Upscaler</Link>                        
                        <Link to="/Reimagine" className={`text-sm/6 transition-colors ${isActive('/Reimagine') ? 'text-blue-600' : 'hover:text-blue-600'}`}>Reimagine Upscaler</Link>
                        <Link to="/" className={`text-sm/6 transition-colors ${isActive('/resize') ? 'text-blue-600' : 'hover:text-blue-600'}`}>Resize Image</Link>
                        <Link to="/" className={`text-sm/6 transition-colors ${isActive('/crop') ? 'text-blue-600' : 'hover:text-blue-600'}`}>Crop Image</Link>
                        <Link to="/Pricing" className={`text-sm/6 transition-colors ${isActive('/Pricing') ? 'text-blue-600' : 'hover:text-blue-600'}`}>Pricing</Link>
                        <Link to="/" className={`text-sm/6 transition-colors ${isActive('/blur') ? 'text-blue-600' : 'hover:text-blue-600'}`}>Blur Face</Link>
                    </div>

                    <div className="hidden xl:flex xl:flex-1 xl:justify-end xl:gap-x-4 xl:items-center">
                        <Link to="/Login" className="text-sm/6 font-semibold text-gray-600 leading-normal tracking-wide hover:text-blue-600 transition-colors">
                            Sign In
                        </Link>
                        
                        <Link to="/" className="rounded-md bg-blue-600 px-3 py-2 text-[13px] font-semibold tracking-wide text-white shadow-sm">
                            Start Free Account
                        </Link>
                    </div>
                </nav>
            </header>

            {mobileMenuOpen && (
                <div className="xl:hidden">
                    <div className="fixed inset-0 z-[60] bg-black/20" onClick={() => setMobileMenuOpen(false)} />                    
                    
                    <div className="fixed inset-y-0 right-0 z-[60] w-full overflow-y-auto bg-white sm:ring-1 sm:ring-gray-900/10">
                        <div className="border-b border-gray-200">
                            <div className="flex items-center justify-between px-6 py-4">
                                <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.9"/>
                                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <h1 className="text-gray-700 font-bold text-base leading-none tracking-tight mb-0.5">Clario AI</h1>
                                        <p className="text-gray-600 text-[10px] leading-none tracking-wider font-medium">Smart AI Tools</p>
                                    </div>
                                </Link>

                                <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                    <span className="sr-only">Close menu</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6">
                                        <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="px-6 mt-6 flow-root">
                            <div className="-my-6">
                                <div className="space-y-4 py-6 font-medium text-gray-700 text-sm/6">
                                    <Link to="/" className={`-mx-3 block rounded-lg px-3 py-2.5 border-b border-dotted border-gray-300 ${isActive('/') || isActive('/index') ? 'text-blue-600' : ''}`}>Image Upscaler</Link>
                                    <Link to="/" className={`-mx-3 block rounded-lg px-3 py-2.5 border-b border-dotted border-gray-300 ${isActive('/resize') ? 'text-blue-600' : ''}`}>Resize Image</Link>
                                    <Link to="/Reimagine" className={`-mx-3 block rounded-lg px-3 py-2.5 border-b border-dotted border-gray-300 ${isActive('/Reimagine') ? 'text-blue-600' : ''}`}>Reimagine Upscaler</Link>
                                    <Link to="/" className={`-mx-3 block rounded-lg px-3 py-2.5 border-b border-dotted border-gray-300 ${isActive('/crop') ? 'text-blue-600' : ''}`}>Crop Image</Link>
                                    <Link to="/Pricing" className={`-mx-3 block rounded-lg px-3 py-2.5 border-b border-dotted border-gray-300 ${isActive('/Pricing') ? 'text-blue-600' : ''}`}>Pricing</Link>
                                    <Link to="/" className={`-mx-3 block rounded-lg px-3 py-2.5 border-b border-dotted border-gray-300 ${isActive('/convert') ? 'text-blue-600' : ''}`}>Convert to JPG</Link>
                                </div>

                                <div className="py-2 space-y-1">
                                    <Link to="/Login" className="-mx-3 block rounded-lg px-3 py-2.5 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50">
                                        Sign In
                                    </Link>

                                    <Link to="/" className="-mx-3 block rounded-md bg-blue-600 px-3 py-2.5 text-[13px] font-semibold tracking-wide text-white shadow-sm">
                                        Start Free Account
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;