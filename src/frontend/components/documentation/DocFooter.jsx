import React from 'react';

const DocFooter = ({ isDarkMode }) => {
    return (
        <footer className={`border-t py-10 transition-colors duration-200 ${isDarkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] font-normal leading-relaxed font-nunito">
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
                        <span className="font-medium">© 2026 Clario AI</span>
                        <span className={`h-3 w-[1px] ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></span>
                        <span>Clario AI adalah merek milik PT Smart Vision Technologies, perusahaan induk dari PT Clario AI Indonesia.</span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-gray-200' : 'hover:text-gray-900'}`}>Terms</a>
                        <span className="text-[10px] opacity-30">●</span>
                        <a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-gray-200' : 'hover:text-gray-900'}`}>Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default DocFooter;
