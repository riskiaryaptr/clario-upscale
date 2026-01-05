import React, { useState, useEffect } from "react";    
import Header from "@/frontend/components/Header";
import Footer from "@/frontend/components/Footer";
import personUpscale from "@/assets/images/images-2.jpg";

function Index() {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedRatio, setSelectedRatio] = useState("200%");
    const [isUploading, setIsUploading] = useState(false);
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    useEffect(() => {
        if (showLoginModal) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [showLoginModal]);
    
    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is Reimagine AI and how is it different?",
            answer: "Reimagine AI is an advanced image enhancement tool that goes beyond traditional upscaling. It uses generative AI to not just increase resolution, but to reimagine and add creative details to your images while maintaining their essence. You can control the creativity level to get results ranging from faithful upscaling to artistic transformations."
        },
        {
            question: "How does the Creativity slider work?",
            answer: "The Creativity slider controls how much AI-generated detail is added to your image. Setting it at 0.35 or below produces stable, high-quality upscaling similar to traditional methods. Higher values allow the AI to add more creative interpretations and artistic details, potentially transforming your image with new patterns and textures."
        },
        {
            question: "What is Resemblance Strength and when should I adjust it?",
            answer: "Resemblance Strength determines how closely the output should match your original image. The default setting works well for most cases. Increase it if you want the result to stay very close to the original, or decrease it if you want more creative freedom for the AI to reimagine details."
        },
        {
            question: "Can I use Reimagine AI for batch processing?",
            answer: "Yes! Reimagine AI supports batch processing, allowing you to upscale and enhance multiple images at once with the same settings. This is perfect for processing large collections of photos, product images, or artwork efficiently while maintaining consistent quality."
        },
        {
            question: "What image formats are supported?",
            answer: "Reimagine AI supports the most common image formats including JPG, PNG, and WebP. Simply drag and drop your images or use the 'Choose Images' button to upload. The tool automatically processes them and delivers high-quality enhanced versions."
        },
        {
            question: "Are the enhanced images free for commercial use?",
            answer: "Yes! All images processed with Reimagine AI are 100% free for commercial use. There are no hidden fees, watermarks, or usage restrictions. You can use the enhanced images for business, marketing, print, web, or any other commercial purpose."
        }
    ];

    const handleMove = (e) => {
        if (!isDragging) return;
        
        const container = e.currentTarget.getBoundingClientRect();
        const x = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
        if (!x) return;
        
        const position = ((x - container.left) / container.width) * 100;
        setSliderPosition(Math.max(0, Math.min(100, position)));
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        if (!isLoggedIn) {
            setShowLoginModal(true);
            e.target.value = '';
            return;
        }

        setIsUploading(true);
        
        await new Promise(resolve => setTimeout(resolve, 4000));
        
        const newImages = files.map(file => ({
            id: Math.random().toString(36).substring(2, 11),
            file: file,
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            preview: URL.createObjectURL(file)
        }));
        
        setUploadedImages(prev => [...prev, ...newImages]);
        setIsUploading(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        
        if (imageFiles.length === 0) return;

        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        setIsUploading(true);
        
        await new Promise(resolve => setTimeout(resolve, 4000));
        
        const newImages = imageFiles.map(file => ({
            id: Math.random().toString(36).substring(2, 11),
            file: file,
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            preview: URL.createObjectURL(file)
        }));
        
        setUploadedImages(prev => [...prev, ...newImages]);
        setIsUploading(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const removeImage = (id) => {
        setUploadedImages(prev => prev.filter(img => img.id !== id));
    };

    const clearAll = () => {
        setUploadedImages([]);
    };

    const handleUploadStart = () => {
        console.log('Starting upload with ratio:', selectedRatio);
        console.log('Images:', uploadedImages);
    };

    return (
        <>
        
            <div className="bg-white min-h-screen relative">

                <Header />
                
                {showLoginModal && (
                    <div className="bg-yellow-50 py-3.5 px-6">
                        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0">
                                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>

                                <p className="text-sm/6 text-gray-800">
                                    Please create a free account and login to use the Reimagine AI
                                </p>
                            </div>

                            <button onClick={() => setShowLoginModal(false)} className="flex-shrink-0 text-gray-500 hover:text-gray-700">
                                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
                
                <div className="relative isolate px-6 lg:px-8 overflow-x-hidden">
                    <div className="mx-auto max-w-4xl py-14 sm:py-14 lg:py-14">
                        <div className="text-center mb-8">
                            <h1 className="text-5xl font-semibold tracking-tight text-gray-800 mb-3 max-w-2xl mx-auto leading-tight">
                                Magnify Image by stunning Reimagination AI
                            </h1>

                            <p className="text-md text-gray-600 max-w-3xl mx-auto">
                                Let Reimagination AI create a modified version of your image. Increase image resolution effortlessly with more details and patterns. Choose different upscaling models and set the creativity level.
                            </p>
                        </div>

                        <div className="border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 relative p-5 pb-16 min-h-[180px]" onDrop={handleDrop} onDragOver={handleDragOver}>

                            <div className="flex h-full min-h-[inherit] flex-col items-center justify-center text-center">
                                <input type="file" id="file-upload" className="hidden" accept="image/jpeg,image/png,image/webp" multiple onChange={handleFileChange}/>
                                
                                <label htmlFor="file-upload" className="mb-5 rounded-lg bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Choose Images</span>
                                </label>

                                <p className="text-base font-semibold text-gray-700 mb-2 whitespace-nowrap">
                                    Drag & Drop your images here
                                </p>

                                <p className="text-sm text-gray-500">
                                    Jpg / Png / Webp images allowed
                                </p>
                            </div>

                            <div tabIndex={0} className="absolute bottom-6 right-6 flex items-center gap-2 px-3 py-1.5 bg-blue-600 border border-blue-500 rounded-full transition-all duration-300 group/batch cursor-pointer outline-none">
                                <div className="flex items-center justify-center w-5 h-5 bg-white/20 rounded-full">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <span className="text-xs font-semibold text-white">Batch Process</span>

                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded whitespace-nowrap pointer-events-none opacity-0 transition-opacity group-hover/batch:opacity-100 group-focus-within/batch:opacity-100 group-active/batch:opacity-100">
                                    Upscale multiple images at once
                                </div>
                            </div>
                        </div>

                        {isUploading && (
                            <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5 sm:p-5">
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <div className="relative w-16 h-16">
                                        <div className="w-14 h-14 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                                    </div>

                                    <div className="text-center space-y-2">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            Uploading images...
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Please wait while we process your files
                                        </p>
                                    </div>

                                    <div className="w-full max-w-xs">
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                            <div className="bg-blue-600 h-full rounded-full transition-all ease-linear" style={{ width: '0%', animation: 'progressFill 4s ease-out forwards'}}> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {uploadedImages.length > 0 && !isUploading && (
                            <div className="mt-6 bg-white border border-gray-200 rounded-xl p-3 sm:p-4 animate-fadeIn">
                                {uploadedImages.map((image, index) => (
                                    <div key={image.id} className={`flex items-center gap-3 sm:gap-4 ${index !== uploadedImages.length - 1 ? 'mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200' : ''}`}>
                                        <img src={image.preview} alt={image.name} className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0" />
                                        
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate">{image.name}</p>
                                            <p className="text-xs text-gray-500">{image.size}</p>
                                        </div>

                                        <button onClick={() => removeImage(image.id)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
                                            <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}

                                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                        <span className="text-sm font-medium text-gray-700">Ratio:</span>
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="ratio" value="200%" checked={selectedRatio === "200%"} onChange={(e) => setSelectedRatio(e.target.value)} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                                                <span className="text-sm text-gray-700">200%</span>
                                            </label>

                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="ratio" value="400%" checked={selectedRatio === "400%"} onChange={(e) => setSelectedRatio(e.target.value)} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                                                <span className="text-sm text-gray-700">400%</span>
                                            </label>

                                            <button onClick={clearAll} className="ml-2 sm:ml-4 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">
                                                Clear All
                                            </button>
                                        </div>
                                    </div>

                                    <button onClick={handleUploadStart} className="w-full sm:w-auto rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <span>Upload & Start</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>                                     

                    <div className="mx-auto max-w-3xl -mt-8 mb-10 sm:mb-16 px-0 sm:px-4">
                        <div className="text-center py-5 sm:py-8 px-4">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-2 tracking-tight">Add creative details to your image</h2>
                            <p className="text-xs sm:text-[13px] font-normal tracking-wide text-gray-600 max-w-xl mx-auto line-clamp-3">
                                Setting the Creativity at 0.35 or below and the Resemblance Strength by default will yield more stable and higher-quality images. The larger the creativity, the more different possible results may be produced. Just have fun!
                            </p>
                        </div>

                        <div className="relative rounded-xl overflow-hidden mx-auto max-w-2xl select-none cursor-ew-resize" onMouseDown={() => setIsDragging(true)} onMouseUp={() => setIsDragging(false)} onMouseLeave={() => setIsDragging(false)} onMouseMove={handleMove} onTouchStart={() => setIsDragging(true)} onTouchEnd={() => setIsDragging(false)} onTouchMove={handleMove}>
                            <img src={personUpscale} alt="Before - Low Quality" className="w-full h-auto max-h-88 object-cover blur-[0.8px] brightness-95" draggable="false"/>
                            
                            <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                                <img src={personUpscale} alt="After - High Quality" className="w-full h-full object-cover" draggable="false"/>
                            </div>
                            
                            <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20" style={{ left: `${sliderPosition}%` }}>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>   

                    <div className="mx-auto max-w-4xl mt-5 mb-12 sm:mb-14 px-4 sm:px-4">
                        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    AI-Powered Upscaling
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Reimagine AI uses advanced AI technology to upscale images with enhanced details, delivering high-resolution results quickly and efficiently.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Creative Control Slider
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Adjust the 'Creativity' slider to add more detail or transform your image, offering flexibility in how you enhance your visuals.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Generative AI
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Leverage Generative AI to reimagine and transform images with new details, guided by your prompts for unique, artistic outcomes.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>  

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Batch Processing
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Process multiple images at once with batch upscaling, saving time while ensuring consistent high-quality results for all your images.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Versatile Application
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Reimagine AI works across portraits, illustrations, graphics, and more, enhancing images for various creative fields seamlessly.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Secure Payments
                                </h3>
                                
                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Payments are SSL encrypted for security. You can easily manage subscriptions, upgrades, and refunds, all while keeping your information safe.
                                </p>
                            </div>
                        </div>
                    </div>     

                    <div className="mx-auto max-w-5xl mt-5 mb-8 sm:mb-10 px-4">
                        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[700px]:grid-cols-4 gap-x-4 lg:gap-x-12 gap-y-10 min-[500px]:gap-y-16 items-start">

                            <div className="relative flex flex-col items-center text-center">
                                <div className="hidden min-[500px]:block absolute top-5 left-[calc(50%+32px)] w-[calc(100%-24px)] lg:w-[calc(100%-16px)] h-px bg-gray-200 -z-0"></div>
                                
                                <div className="relative z-10 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center mb-4 min-[500px]:mb-6">
                                    <span className="text-sm font-semibold text-gray-400">1</span>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-3 min-[500px]:mb-3 px-2 w-full line-clamp-1">
                                    Upload an Image
                                </h3>

                                <p className="text-[13px] font-normal text-gray-600 leading-relaxed max-w-[200px] lg:max-w-[240px] w-full mx-auto line-clamp-3">
                                    Simply drag and drop the image you want to upscale with AI Image Upscaler.
                                </p>
                            </div>

                            <div className="relative flex flex-col items-center text-center">
                                <div className="hidden min-[700px]:block absolute top-5 left-[calc(50%+32px)] w-[calc(100%-24px)] lg:w-[calc(100%-16px)] h-px bg-gray-200 -z-0"></div>
                                
                                <div className="relative z-10 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center mb-4 min-[500px]:mb-6">
                                    <span className="text-sm font-semibold text-gray-400">2</span>
                                </div>
                                
                                <h3 className="text-sm sm:text-md font-semibold text-gray-800 mb-3 min-[500px]:mb-3 px-2 w-full line-clamp-1">
                                    Select the Ratio
                                </h3>

                                <p className="text-[13px] font-normal text-gray-600 leading-relaxed max-w-[200px] lg:max-w-[240px] w-full mx-auto line-clamp-3">
                                    Choose either '200%' or '400%' to increase the size of your image by that percentage.
                                </p>
                            </div>

                            <div className="relative flex flex-col items-center text-center">
                                <div className="hidden min-[500px]:block absolute top-5 left-[calc(50%+32px)] w-[calc(100%-24px)] lg:w-[calc(100%-16px)] h-px bg-gray-200 -z-0"></div>

                                <div className="relative z-10 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center mb-4 min-[500px]:mb-6">
                                    <span className="text-sm font-semibold text-gray-400">3</span>
                                </div>

                                <h3 className="text-sm sm:text-md font-semibold text-gray-800 mb-3 min-[500px]:mb-3 px-2 w-full line-clamp-1">
                                    Preview and Download
                                </h3>

                                <p className="text-[13px] font-normal text-gray-600 leading-relaxed max-w-[200px] lg:max-w-[240px] w-full mx-auto line-clamp-3">
                                    Once the image is upscaled with higher resolution, you can preview or download.
                                </p>
                            </div>

                            <div className="relative flex flex-col items-center text-center">
                                <div className="relative z-10 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center mb-4 min-[500px]:mb-6">
                                    <span className="text-sm font-semibold text-gray-400">4</span>
                                </div>

                                <h3 className="text-sm sm:text-md font-semibold text-gray-800 mb-3 min-[500px]:mb-3 px-2 w-full line-clamp-1">
                                    Share & Enjoy
                                </h3>

                                <p className="text-[13px] font-normal text-gray-600 leading-relaxed max-w-[200px] lg:max-w-[240px] w-full mx-auto line-clamp-3">
                                    Use your enhanced high-resolution image for any purpose and share it.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto max-w-5xl mt-5 mb-10 sm:mb-10 px-4 sm:px-4">
                        <div className="text-center py-6 sm:py-8 px-4">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-2 tracking-tight">What Our Users Say</h2>
                            <p className="text-xs sm:text-[13px] font-normal tracking-wide text-gray-600 max-w-md mx-auto line-clamp-2">
                                Trusted by thousands of professionals and creatives worldwide
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
                            <div className="testimonial-scroll-container h-[630px] overflow-hidden relative">
                                <div className="testimonial-scroll-up space-y-6">
                                    <div className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300">
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        
                                        <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                            "This AI upscaler is incredible! I've used it for my e-commerce product photos and the results are stunning. The quality improvement is night and day."
                                        </p>                           
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">John Doe</p>
                                            </div>
                                        </div>             
                                    </div>

                                    <div className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300">
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        
                                        <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                            "Fast, easy to use, and the results are amazing! I use it for all my design projects. The batch processing feature is a game-changer."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">Emily Rodriguez</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300">
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        
                                        <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                            "I've tried many upscalers, but this one stands out. The speed and quality are unmatched. It's now an essential part of my workflow."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">Lisa Parker</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300">
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        
                                        <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                            "The batch processing saves me so much time! I can upscale hundreds of images in minutes. Absolutely love this tool!"
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">Robert Taylor</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300">
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        
                                        <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                            "Outstanding quality! The AI enhancement is remarkable. My clients are always impressed with the final results."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">Amanda White</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300">
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        
                                        <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                            "Game changer for my business! The quality is incredible and it's so easy to use. I recommend it to all my colleagues."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">Christopher Lee</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Scrolling Down & Up (Yoyo Reverse) */}
                            <div className="testimonial-scroll-container h-[630px] md:mt-12 overflow-hidden relative">
                                <div className="testimonial-scroll-down space-y-6">
                                    <div className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300">
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        
                                        <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                            "As a photographer, I need the best quality for my clients. This tool has saved me countless hours and the upscaling quality is professional-grade."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">Michael Chen</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300">
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        
                                        <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                            "Perfect for restoring old family photos! The AI does an incredible job of enhancing details without making them look artificial. Highly recommended!"
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">David Kim</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300">
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        
                                        <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                            "Absolutely fantastic tool! The free tier is generous and the results are professional. I upgraded to premium and couldn't be happier."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">James Wilson</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300">
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        
                                        <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                            "Simple, powerful, and effective. This is exactly what I needed for my design workflow. Highly recommend to everyone!"
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">Jennifer Martinez</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300">
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        
                                        <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                            "Best upscaling tool I've ever used! The results are consistently amazing and the interface is so user-friendly."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">Thomas Anderson</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300">
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        
                                        <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                            "Exceptional service and results! This tool has transformed how I work with images. Couldn't be happier with it!"
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">Patricia Brown</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        </>
    );
}

export default Index; 