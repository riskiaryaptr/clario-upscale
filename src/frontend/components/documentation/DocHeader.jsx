import React, { useState, useEffect } from 'react';

const DocHeader = ({ isDarkMode, toggleDarkMode, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) { 
                setIsSearchOpen(false);
            }
        };  
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className={`sticky top-0 z-50 border-b transition-colors duration-200 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="w-full px-4 sm:px-5 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    {isSearchOpen ? (
                        <div className="flex items-center w-full gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
                             <div className="relative flex-1">
                                <input type="text" autoFocus placeholder="Search documentation..." className={`w-full px-4 py-2 pl-10 pr-4 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-gray-50 border-gray-200'}`}/>
                                <svg className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </div>
                            <button onClick={() => setIsSearchOpen(false)} className={`text-sm font-medium px-2 py-1 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'}`}>Cancel</button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-2">
                                <div className="flex-shrink-0">
                                    <a href="/index" className="flex flex-col justify-center line-none">
                                        <span className={`font-bold text-base sm:text-lg leading-none tracking-tight ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                                            Clario AI
                                        </span>
                                        <span className={`text-[10px] font-medium tracking-tight mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Smart AI Tools
                                        </span>
                                    </a>
                                </div>
                            </div>
                            
                            <div className="hidden sm:flex flex-1 mx-4 w-full">
                                <div className="relative w-full">
                                    <input type="text" placeholder="Search documentation..." className={`w-full px-4 py-2 pl-10 pr-12 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-gray-50 border-gray-200'}`}/>
                                    
                                    <svg className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>

                                    <kbd className={`hidden md:inline-flex absolute right-3 top-1/2 transform -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-semibold rounded border ${isDarkMode ? 'text-gray-400 bg-gray-800 border-gray-600' : 'text-gray-500 bg-white border-gray-200'}`}>
                                        ⌘K
                                    </kbd>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3">
                                <button onClick={() => setIsSearchOpen(true)} className={`p-2 sm:hidden rounded-lg transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}> 
                                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                </button>

                                <div className="relative">
                                    <select className={`pl-2 pr-7 py-1.5 sm:pl-3 sm:pr-8 sm:py-2 text-[11px] sm:text-[13px] font-medium rounded-lg appearance-none cursor-pointer focus:outline-none transition-colors ${isDarkMode ? 'text-gray-200 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}>
                                        <option>v1.2.x</option>
                                        <option>v1.1.x</option>
                                        <option>v1.0.x</option>
                                        <option>v0.9.x</option>
                                        <option>v0.8.x</option>
                                        <option>v0.7.x</option>
                                        <option>v0.6.x</option>
                                        <option>v0.5.x</option>
                                        <option>v0.4.x</option>
                                        <option>v0.3.x</option>
                                        <option>v0.2.x</option>
                                    </select>

                                    <svg className={`absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 pointer-events-none ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                                    </svg>
                                </div>

                                <button onClick={toggleDarkMode} className={`p-2 transition-all rounded-lg ${isDarkMode ? 'text-yellow-400 bg-gray-700 hover:bg-gray-600' : 'text-gray-600 bg-gray-100 hover:bg-200'}`} aria-label="Toggle dark mode">
                                    {isDarkMode ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                                        </svg>
                                    )}
                                </button>

                                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`p-2 lg:hidden -mr-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}>
                                    {isMobileMenuOpen ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default DocHeader;
