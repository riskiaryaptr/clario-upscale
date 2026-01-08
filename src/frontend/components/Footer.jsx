import React from "react";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="mx-auto max-w-5xl px-6 py-5 lg:px-0 border-t border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 mb-8">
                    <div className="space-y-4">        
                        <div className="mt-0">
                            <h4 className="text-sm/6 font-semibold text-gray-700 mb-3 tracking-wide">Download the app</h4>
                            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 justify-end sm:justify-start">
                                <a href="/" className="inline-flex items-center gap-2 px-2 py-1.5 bg-gray-800 rounded-lg">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 1.658L16.802 8.99l-2.303 2.303-8.635-8.635z" fill="#34A853"/>
                                        <path d="M14.499 11.293l2.303-2.303 2.807 1.626a1 1 0 010 1.73l-2.808 1.626-2.302-2.302.001-.377z" fill="#FBBC04"/>
                                        <path d="M3.609 1.814a.996.996 0 00-.609.92v18.532c0 .398.24.755.61.92l10.182-10.186L3.61 1.814z" fill="#4285F4"/>
                                        <path d="M14.499 12l2.303 2.302-10.938 6.333a.997.997 0 01-1.255-.127L14.5 12z" fill="#EA4335"/>
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-[9px] text-gray-300 leading-none mb-0.5">GET IT ON</div>
                                        <div className="text-xs font-semibold text-white leading-tight">Google Play</div>
                                    </div>
                                </a>
                            
                                <a href="/" className="inline-flex items-center gap-2 px-2 py-1.5 bg-gray-800 rounded-lg">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-[9px] text-gray-300 leading-none mb-0.5">Download on the</div>
                                        <div className="text-xs font-semibold text-white leading-tight">App Store</div>
                                    </div>
                                </a>
                            </div>

                            <div className="mt-6">
                                <h4 className="text-sm/6 font-semibold text-gray-700 mb-2 tracking-wide">Partnership</h4>
                                <a href="/" className="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-xs leading-normal tracking-wide font-semibold">Partner with Clario AI</span>
                                </a>
                            </div>

                            <div className="mt-8">
                                <div className="flex gap-3">
                                    <a href="/" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
                                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </a>

                                    <a href="/" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
                                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                        </svg>
                                    </a>
                                    
                                    <a href="/" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
                                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </a>
                                    
                                    <a href="/" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
                                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 ml-0 lg:ml-5">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-4 tracking-wide">Product</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        Image Upscaler
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        Crop Image
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        Photo Colorizer
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        Batch Processing
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        API Access
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        Image Compressor
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-4 tracking-wide">Resources</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        API Reference
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        Tutorials
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        Community
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-4 tracking-wide">Company</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        Partners
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-4 tracking-wide">Get in Touch</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        Raise a ticket
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        Become Affiliate
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        Email Support
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm/6 hover:underline text-gray-600 hover:text-blue-600 transition-colors">
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-5 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[13px] font-normal leading-normal tracking-wide text-gray-600">
                            © {currentYear} Clario AI | Clario AI adalah merek milik PT Smart Vision Technologies, perusahaan induk dari PT Clario AI Indonesia.
                        </p>
                        <div className="flex items-center gap-3">                           
                            <a href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                Terms
                            </a>
                            <span className="text-gray-400">•</span>
                            <a href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                Privacy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
