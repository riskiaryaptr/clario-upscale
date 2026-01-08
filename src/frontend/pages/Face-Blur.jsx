import React, { useState, useEffect } from "react";    
import Header from "@/frontend/components/Header";
import personUpscale from "@/assets/images/images-2.jpg";
import Footer from "@/frontend/components/Footer";

function FaceBlur() {
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
            question: "What is Face Blur and how does it work?",
            answer: "Face Blur is an AI-powered privacy protection tool that automatically detects and blurs faces in your images. Using advanced facial recognition technology, it identifies all faces in your photos and applies customizable blur effects to protect identities while maintaining the overall image quality."
        },
        {
            question: "How accurate is the face detection?",
            answer: "Our AI face detection system uses state-of-the-art machine learning algorithms with high accuracy rates. It can detect faces at various angles, sizes, and lighting conditions. The system is trained on millions of images to ensure reliable detection even in challenging scenarios like partial faces or group photos."
        },
        {
            question: "Can I control the intensity of the blur effect?",
            answer: "Yes! Face Blur offers adjustable blur intensity settings, allowing you to choose from subtle pixelation to complete anonymization. You can customize the blur level based on your specific privacy requirements, whether for social media, legal documents, or professional publications."
        },
        {
            question: "Is my data safe and private?",
            answer: "Absolutely! We take privacy seriously. All images are processed with end-to-end encryption, and we never store your photos on our servers. Once processing is complete, your images are immediately deleted from our system. Your data remains completely private and secure throughout the entire process."
        },
        {
            question: "What image formats does Face Blur support?",
            answer: "Face Blur supports the most common image formats including JPG, PNG, and WebP. Simply drag and drop your images or use the 'Choose Images' button to upload. The tool processes them quickly and delivers privacy-protected versions ready for download."
        },
        {
            question: "Can I use Face Blur for commercial purposes?",
            answer: "Yes! All images processed with Face Blur are 100% free for commercial use. There are no hidden fees, watermarks, or usage restrictions. You can use the privacy-protected images for business, marketing, publications, legal documents, or any other commercial purpose while staying GDPR compliant."
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
                                Protect Privacy with AI Face Blur
                            </h1>

                            <p className="text-md text-gray-600 max-w-3xl mx-auto">
                                Automatically detect and blur faces in your images with advanced AI technology. Perfect for protecting privacy in photos, videos, and documents. Process multiple images at once with ease.
                            </p>
                        </div>

                        <div className="border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 relative p-5 min-h-[300px] flex items-center justify-center" onDrop={handleDrop} onDragOver={handleDragOver}>
                            {processedImages.length > 0 ? (
                                <div className="space-y-6 w-full">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-800">Upscaling Results</h3>
                                        <button onClick={() => { setProcessedImages([]); setUploadedImages([]); }} className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                            Process More
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
                                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{selectedRatio} AI</span>
                                                </div>

                                                <div className="relative group w-full sm:w-48 aspect-square flex-shrink-0">
                                                    <img src={image.processedPreview} alt="Processed" className="w-full h-full object-cover rounded-lg shadow-md border-2 border-blue-500/20" />
                                                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-blue-600 text-white text-[10px] rounded uppercase font-bold tracking-wider">Processed</div>
                                                    <a href={image.processedPreview} download={`upscaled-${image.name}`} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                                        <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                            </svg>
                                                            Download
                                                        </button>
                                                    </a>
                                                </div>

                                                <div className="flex-1 text-center sm:text-left">
                                                    <p className="text-sm font-semibold text-gray-900 mb-1">{image.name}</p>
                                                    <p className="text-xs text-gray-500 mb-4">Upscaled to {selectedRatio} resolution</p>
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wide">
                                                        Success
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

                    <div className="mx-auto max-w-4xl mb-12 sm:mb-14 px-4 sm:px-4">
                        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Smart Face Detection
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Advanced AI automatically detects all faces in your images with high precision, ensuring complete privacy protection in every photo.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Privacy Protection
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Your images are processed securely with end-to-end encryption. We never store your photos, ensuring complete privacy and data security.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Adjustable Blur Intensity
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Control the level of blur applied to faces with customizable intensity settings, from subtle to complete anonymization.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>  

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Batch Processing
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Blur faces in multiple images simultaneously with batch processing, saving time while maintaining consistent quality across all photos.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    GDPR Compliant
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Fully compliant with GDPR and privacy regulations, perfect for legal documents, publications, and professional use cases.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Lightning Fast
                                </h3>
                                
                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Get instant results with our optimized processing engine. Blur faces in seconds, not minutes, for quick and efficient workflow.
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
                                    Upload Your Image
                                </h3>

                                <p className="text-[13px] font-normal text-gray-600 leading-relaxed max-w-[200px] lg:max-w-[240px] w-full mx-auto line-clamp-3">
                                    Simply drag and drop or select the image containing faces you want to blur for privacy.
                                </p>
                            </div>

                            <div className="relative flex flex-col items-center text-center">
                                <div className="hidden min-[700px]:block absolute top-5 left-[calc(50%+32px)] w-[calc(100%-24px)] lg:w-[calc(100%-16px)] h-px bg-gray-200 -z-0"></div>
                                
                                <div className="relative z-10 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center mb-4 min-[500px]:mb-6">
                                    <span className="text-sm font-semibold text-gray-400">2</span>
                                </div>
                                
                                <h3 className="text-sm sm:text-md font-semibold text-gray-800 mb-3 min-[500px]:mb-3 px-2 w-full line-clamp-1">
                                    AI Face Detection
                                </h3>

                                <p className="text-[13px] font-normal text-gray-600 leading-relaxed max-w-[200px] lg:max-w-[240px] w-full mx-auto line-clamp-3">
                                    Our AI automatically detects all faces in your image with high accuracy and precision.
                                </p>
                            </div>

                            <div className="relative flex flex-col items-center text-center">
                                <div className="hidden min-[500px]:block absolute top-5 left-[calc(50%+32px)] w-[calc(100%-24px)] lg:w-[calc(100%-16px)] h-px bg-gray-200 -z-0"></div>

                                <div className="relative z-10 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center mb-4 min-[500px]:mb-6">
                                    <span className="text-sm font-semibold text-gray-400">3</span>
                                </div>

                                <h3 className="text-sm sm:text-md font-semibold text-gray-800 mb-3 min-[500px]:mb-3 px-2 w-full line-clamp-1">
                                    Apply Blur Effect
                                </h3>

                                <p className="text-[13px] font-normal text-gray-600 leading-relaxed max-w-[200px] lg:max-w-[240px] w-full mx-auto line-clamp-3">
                                    Faces are automatically blurred to protect privacy while maintaining image quality.
                                </p>
                            </div>

                            <div className="relative flex flex-col items-center text-center">
                                <div className="relative z-10 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center mb-4 min-[500px]:mb-6">
                                    <span className="text-sm font-semibold text-gray-400">4</span>
                                </div>

                                <h3 className="text-sm sm:text-md font-semibold text-gray-800 mb-3 min-[500px]:mb-3 px-2 w-full line-clamp-1">
                                    Download & Share
                                </h3>

                                <p className="text-[13px] font-normal text-gray-600 leading-relaxed max-w-[200px] lg:max-w-[240px] w-full mx-auto line-clamp-3">
                                    Download your privacy-protected image and share it safely anywhere you need.
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
                                            "Perfect for protecting privacy in our company's event photos! The face detection is incredibly accurate and the blur effect looks natural."
                                        </p>           

                                        <div className="flex items-center gap-3">
                                            <p className="text-sm font-semibold text-gray-800">Sarah Mitchell</p>                                            
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
                                            "As a journalist, I need to protect sources' identities. This tool makes it fast and easy to blur faces in photos while maintaining image quality."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm font-semibold text-gray-800">Marcus Chen</p>                                            
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
                                            "Essential tool for GDPR compliance! Automatically blurs faces in our documentation photos. Saves hours of manual editing work."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm font-semibold text-gray-800">Rachel Thompson</p>                                            
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
                                            "The batch processing is a lifesaver! I can blur faces in hundreds of photos at once. Perfect for our social media team's workflow."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm font-semibold text-gray-800">Daniel Foster</p>
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
                                            "Great for protecting children's privacy in school photos. The AI detection works perfectly even with group shots. Highly recommended!"
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm font-semibold text-gray-800">Jennifer Walsh</p>
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
                                            "Excellent privacy protection tool! We use it for all our public event photos. The adjustable blur intensity is perfect for different needs."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm font-semibold text-gray-800">Kevin Park</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                                            "As a legal professional, I need reliable anonymization tools. This face blur solution is fast, accurate, and meets all our compliance requirements."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm font-semibold text-gray-800">Victoria Hayes</p>
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
                                            "Perfect for our healthcare facility! Protects patient privacy in documentation photos while keeping images clear and professional."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm font-semibold text-gray-800">Dr. Alex Rivera</p>
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
                                            "Fantastic tool for our HR department! Makes it easy to comply with privacy regulations when sharing team photos and event pictures."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm font-semibold text-gray-800">Laura Bennett</p>
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
                                            "Simple and effective privacy solution! The AI accurately detects faces even in challenging lighting. Essential for our security team."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm font-semibold text-gray-800">Thomas Anderson</p>
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
                                            "Best privacy tool I've used! Quick processing, natural-looking blur effects, and perfect for our nonprofit's community outreach photos."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm font-semibold text-gray-800">Nicole Carter</p>
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
                                            "Exceptional privacy protection! We use it for all sensitive documentation. The batch feature and GDPR compliance make it indispensable."
                                        </p>
                                        
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm font-semibold text-gray-800">Brian Murphy</p>
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
                                Get answers to your questions about our AI Face Blur
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

export default FaceBlur; 