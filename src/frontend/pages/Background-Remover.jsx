import React, { useState, useEffect } from "react";    
import Header from "@/frontend/components/Header";
import Footer from "@/frontend/components/Footer";

function BackgroundRemover() {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedRatio, setSelectedRatio] = useState("200%");
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedImages, setProcessedImages] = useState([]);
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

    const handleUploadStart = async () => {
        if (uploadedImages.length === 0) return;
        
        setIsProcessing(true);
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const results = uploadedImages.map(img => ({
            ...img,
            processedPreview: img.preview,
            status: 'completed'
        }));
        
        setProcessedImages(results);
        setIsProcessing(false);
    };

    return (
        <>
        
            <div className="bg-white min-h-screen relative">

                <Header />
                
                <div className="relative isolate px-6 lg:px-8 overflow-x-hidden">
                    <div className="mx-auto max-w-4xl py-14 sm:py-14 lg:py-14">
                        <div className="text-center mb-8">
                            <h1 className="text-5xl font-semibold tracking-tight text-gray-800 mb-3 max-w-2xl mx-auto leading-tight">
                                Instantly Remove Background with AI Precision
                            </h1>

                            <p className="text-md text-gray-600 max-w-3xl mx-auto">
                                Instantly remove backgrounds from your images with advanced AI technology. Perfect for product photos, portraits, and professional designs. Get clean, transparent backgrounds in seconds with batch processing support.
                            </p>
                        </div>

                        <div className="border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 relative p-5 min-h-[300px] flex items-center justify-center" onDrop={handleDrop} onDragOver={handleDragOver}>
                            {processedImages.length > 0 ? (
                                <div className="space-y-6 w-full">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-800 tracking-tight">AI Reimagined Results</h3>
                                        <button onClick={() => { setProcessedImages([]); setUploadedImages([]); }} className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                            New Reimagine
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {processedImages.map((image) => (
                                            <div key={image.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-6">
                                                <div className="relative group w-full sm:w-48 aspect-square flex-shrink-0">
                                                    <img src={image.preview} alt="Original" className="w-full h-full object-cover rounded-lg shadow-sm" />
                                                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white text-[10px] rounded uppercase font-bold tracking-wider">Original</div>
                                                </div>
                                                
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-indigo-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.675.337a4 4 0 01-2.574.345l-3.113-.623a2 2 0 11.4-.78l3.112.623a6 6 0 003.86-.517l.674-.337a4 4 0 012.574-.345l2.387.477a4 4 0 012.044 1.093m-9.988 9.988a2 2 0 11-1.414-1.414m1.414 1.414a2 2 0 01-1.414-1.414m1.414 1.414a2.25 2.25 0 001.591-.659l1.414-1.414a2.25 2.25 0 013.182 0l1.414 1.414a2.25 2.25 0 001.591.659M7.75 5a.75.75 0 01.75.75v3.5l3.5 3.5a.75.75 0 01-1.06 1.06l-3.5-3.5h-3.5a.75.75 0 010-1.5h3.5v-3.5A.75.75 0 017.75 5z" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none">Reimagine</span>
                                                </div>

                                                <div className="relative group w-full sm:w-48 aspect-square flex-shrink-0">
                                                    <img src={image.processedPreview} alt="Reimagined" className="w-full h-full object-cover rounded-lg shadow-md border-2 border-indigo-500/20" />
                                                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-indigo-600 text-white text-[10px] rounded uppercase font-bold tracking-wider">AI Reimagined</div>
                                                    <a href={image.processedPreview} download={`reimagined-${image.name}`} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                                        <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                            </svg>
                                                            <span>Save HD</span>
                                                        </button>
                                                    </a>
                                                </div>

                                                <div className="flex-1 text-center sm:text-left">
                                                    <p className="text-sm font-semibold text-gray-900 mb-1">{image.name}</p>
                                                    <p className="text-xs text-slate-500 mb-4 tracking-wide">Enhanced with Creative AI mode</p>
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wide">
                                                        High Definition
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center w-full">
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
                            )}
                        </div>                        

                        {isProcessing && (
                            <div className="mt-6 bg-white border border-gray-200 rounded-xl p-8 border-t-4 border-t-blue-600 shadow-xl animate-scaleIn">
                                <div className="flex flex-col items-center justify-center gap-4 text-center">
                                    <div className="relative w-20 h-20">
                                        <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-gray-800">Enhancing with AI</h3>
                                        <p className="text-sm text-gray-500 max-w-xs mx-auto">
                                            Our neural network is refining pixels and restoring details. This usually takes 2-3 seconds.
                                        </p>
                                    </div>

                                    <div className="w-full max-w-xs mt-2">
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-progress"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

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

                        {uploadedImages.length > 0 && !isUploading && !isProcessing && processedImages.length === 0 && (
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

                    <div className="mx-auto max-w-4xl mb-10 sm:mb-10 px-4 sm:px-4">
                        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    AI Object Detection
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Advanced AI automatically detects and separates subjects from backgrounds with precision, ensuring clean and accurate cutouts every time.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Transparent Backgrounds
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Export images with transparent backgrounds in PNG format, perfect for overlays, product photos, and professional design work.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Precision Edge Editing
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Fine-tune edges with precision tools to handle complex details like hair, fur, and intricate patterns for flawless results.
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
                                    Remove backgrounds from multiple images simultaneously, saving valuable time for e-commerce, marketing, and bulk photo editing.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Instant Processing
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Get results in seconds with our optimized AI engine. Upload, process, and download your images with lightning-fast speed.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Privacy Protected
                                </h3>
                                
                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Your images are processed securely and automatically deleted after processing. We never store or share your personal photos.
                                </p>
                            </div>
                        </div>
                    </div>    
                    
                    <div className="mx-auto max-w-4xl mb-10 sm:mb-8 px-4 sm:px-4">
                        <div className="text-center py-5 sm:py-8 px-4">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-2 tracking-tight">Remove Backgrounds Instantly</h2>
                            <p className="text-xs sm:text-[13px] font-normal tracking-wide text-gray-600 max-w-xl mx-auto line-clamp-3">
                                AI-powered background removal for perfect results in seconds. Ideal for e-commerce, marketing, and creative work. Just upload and download transparent PNG images.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8">
                            <div className="bg-gray-50 rounded-2xl p-5 h-full">
                                <h3 className="text-lg font-semibold text-gray-600 leading-normal tracking-wide mb-1">
                                    Supported file formats
                                </h3>

                                <p className="text-[12px] font-normal text-gray-600 mb-5">
                                    Skip conversions. Our tool directly supports multiple image formats to help you enhance without interruptions.
                                </p>
                                
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[60px]">WEBP:</span>
                                        <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                            No need to convert. Just upload your WEBP file, and our AI background remover will process it instantly with perfect edge detection.
                                        </span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[60px]">PNG:</span>
                                        <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                            Remove backgrounds from PNG images while preserving transparency, perfect for layered designs and professional graphics.
                                        </span>
                                    </li>
                                    
                                    <li className="flex items-start gap-3">
                                        <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[60px]">JPG:</span>
                                        <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                            Effortlessly remove backgrounds from JPG files. Our AI detects subjects accurately and creates clean cutouts in seconds.
                                        </span>
                                    </li>
                                    
                                    <li className="flex items-start gap-3">
                                        <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[60px]">JPEG:</span>
                                        <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                            Transform JPEG images with precise background removal, no distortion, no conversion, just clean transparent results.
                                        </span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[60px]">HEIC:</span>
                                        <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                            Whether from iPhones or cameras, remove backgrounds from HEIC images directly without converting files beforehand.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-5 h-full">
                                <h3 className="text-lg font-semibold text-gray-600 leading-normal tracking-wide mb-1">
                                    Process Multiple Images at Once
                                </h3>

                                <p className="text-[12px] font-normal text-gray-600 mb-5">
                                    Save time with batch background removal. Upload hundreds of images and process them all simultaneously with consistent quality.
                                </p>

                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[100px]">In one click:</span>
                                        <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                            Remove backgrounds from multiple images simultaneously, saving hours of manual editing work.
                                        </span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[100px]">AI detection:</span>
                                        <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                            Smart analysis for each image ensures consistent quality across your entire batch of photos.
                                        </span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[100px]">Fast export:</span>
                                        <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                            Download all processed images as transparent PNGs in a single ZIP file for easy organization.
                                        </span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[100px]">E-commerce:</span>
                                        <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                            Perfect for online stores needing consistent product photos with clean, professional backgrounds.
                                        </span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[100px]">Time saver:</span>
                                        <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                            Process entire photo shoots in minutes instead of hours, boosting your productivity dramatically.
                                        </span>
                                    </li>
                                </ul>
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

export default BackgroundRemover; 