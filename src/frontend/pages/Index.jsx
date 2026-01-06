import React, { useState } from "react";
import Header from "@/frontend/components/Header";
import Footer from "@/frontend/components/Footer";
import personUpscale from "@/assets/images/images-1.png";
import upscalingVideo from "@/assets/vidio/vidio-upscaling.mp4";

function Index() {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedRatio, setSelectedRatio] = useState("200%");
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedImages, setProcessedImages] = useState([]);
    const [isPlayingVideo, setIsPlayingVideo] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is an AI Image Upscaler?",
            answer: "An AI Image Upscaler is a tool that uses artificial intelligence to increase the resolution and quality of images. It analyzes the image and intelligently fills in missing details to create a higher-resolution version without losing quality."
        },
        {
            question: "How does an AI Image Upscaler work?",
            answer: "Our AI Image Upscaler uses advanced deep learning algorithms trained on millions of images. It examines patterns, textures, and structures in your image, then intelligently reconstructs and enhances details to produce a higher-resolution output."
        },
        {
            question: "What is the difference between AI Image Enlarger and AI Image Upscaler?",
            answer: "While both terms are often used interchangeably, an AI Image Upscaler specifically focuses on increasing resolution using AI technology, whereas an Image Enlarger might use traditional interpolation methods. Our tool uses AI for superior results."
        },
        {
            question: "How do I upscale an image to 4K?",
            answer: "Simply upload your image, select the 4x or 8x upscale option depending on your original image size, and click 'Upload & Start'. Our AI will process your image and deliver a 4K quality result in seconds."
        },
        {
            question: "Is the upscaled image free for commercial use?",
            answer: "Yes! All images upscaled using our tool are 100% free for commercial use. There are no hidden fees or restrictions. You can use them for business, marketing, or any commercial purpose."
        },
        {
            question: "How long does the upscaling process take?",
            answer: "The upscaling process typically takes just a few seconds per image. For batch processing, the time depends on the number of images, but our AI technology ensures fast processing even for multiple files."
        }
    ];

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

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
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const results = uploadedImages.map(img => ({
            ...img,
            processedPreview: img.preview, // In a real app, this would be the URL from the server
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
                                Make your images bigger and better with AI Upscaler
                            </h1>

                            <p className="text-md text-gray-600 max-w-3xl mx-auto">
                                Based on the latest super-resolution technology, Our smart image upscaler could enhance your jpg, png, webp images in batch process. Increase image resolution effortlessly.
                            </p>
                        </div>

                        <div className="border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 relative p-5 pb-16 min-h-[180px]" onDrop={handleDrop} onDragOver={handleDragOver}>
                            {processedImages.length > 0 ? (
                                <div className="space-y-6">
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
                                <>
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
                                </>
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

                    <div className="mx-auto max-w-4xl -mt-3"> 
                        <h2 className="text-sm/6 leading-normal tracking-wide font-medium text-gray-700 mb-5">
                            Other tools you may be interested in
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">                    
                            <a href="/" className="group relative bg-white border border-gray-200 rounded-xl p-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="text-sm/6 leading-normal tracking-wide font-semibold text-gray-700 group-hover:text-blue-600 flex items-center gap-2 transition-colors duration-200">
                                        <h3>AI Background Remover</h3>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                                            Free
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="flex items-start justify-between gap-3">
                                    <p className="text-[13px] font-normal text-gray-600 flex-grow line-clamp-2">
                                         Remove background from images with AI
                                    </p>
                                    
                                    <svg className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>

                            <a href="/" className="group relative bg-white border border-gray-200 rounded-xl p-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-sm/6 leading-normal tracking-wide font-semibold text-gray-700 group-hover:text-blue-600 flex items-center gap-2 transition-colors duration-200">
                                        B&W Photo Colorizer
                                    </h3>
                                </div>
                                
                                <div className="flex items-start justify-between gap-3">
                                    <p className="text-[13px] font-normal text-gray-600 flex-grow line-clamp-2">
                                        Turn black and white memories into vivid, realistic color photos
                                    </p>
                                    
                                    <svg className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>

                            <a href="/" className="group relative bg-white border border-gray-200 rounded-xl p-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="text-sm/6 leading-normal tracking-wide font-semibold text-gray-700 group-hover:text-blue-600 flex items-center gap-2 transition-colors duration-200">
                                        <h3>Creative AI Art Studio</h3>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                                            Free
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="flex items-start justify-between gap-3">
                                    <p className="text-[13px] font-normal text-gray-600 flex-grow line-clamp-2">
                                        Generate stunning works of art and visuals from simple text commands
                                    </p>
                                    
                                    <svg className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>

                            <a href="/" className="group relative bg-white border border-gray-200 rounded-xl p-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-sm/6 leading-normal tracking-wide font-semibold text-gray-700 group-hover:text-blue-600 flex items-center gap-2 transition-colors duration-200">
                                        Magic Object Cleanup
                                    </h3>
                                </div>
                                
                                <div className="flex items-start justify-between gap-3">
                                    <p className="text-[13px] font-normal text-gray-600 flex-grow line-clamp-2">
                                        Seamlessly erase unwanted people, objects, or watermarks from photos
                                    </p>
                                    
                                    <svg className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>

                            <a href="/" className="group relative bg-white border border-gray-200 rounded-xl p-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-sm/6 leading-normal tracking-wide font-semibold text-gray-700 group-hover:text-blue-600 flex items-center gap-2 transition-colors duration-200">
                                        Smart Batch Resizer
                                    </h3>
                                </div>
                                
                                <div className="flex items-start justify-between gap-3">
                                    <p className="text-[13px] font-normal text-gray-600 flex-grow line-clamp-2">
                                        Modify dimensions for thousands of photos simultaneously with ease
                                    </p>
                                    
                                    <svg className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>

                            <a href="/" className="group relative bg-white border border-gray-200 rounded-xl p-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-sm/6 leading-normal tracking-wide font-semibold text-gray-700 group-hover:text-blue-600 flex items-center gap-2 transition-colors duration-200">
                                        Universal Format Converter
                                    </h3>
                                </div>
                                
                                <div className="flex items-start justify-between gap-3">
                                    <p className="text-[13px] font-normal text-gray-600 flex-grow line-clamp-2">
                                        Seamlessly transform images across all popular file formats
                                    </p>
                                    
                                    <svg className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>
                        </div>                   
                    </div>                   

                    <div className="mx-auto max-w-3xl mt-5 mb-10 sm:mb-16 px-0 sm:px-4">
                        <div className="text-center py-6 sm:py-8 px-4">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-2 tracking-tight">AI Image Transformation</h2>
                            <p className="text-xs sm:text-[13px] font-normal tracking-wide text-gray-600 max-w-md mx-auto line-clamp-2">
                                Powered by advanced AI technology, our upscaler restores lost details and enhances image clarity in seconds.
                            </p>
                        </div>

                        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-black group transition-all duration-500 hover:shadow-blue-200/50 aspect-[16/9]">
                            {!isPlayingVideo ? (
                                <>
                                    <div className="flex h-full">
                                        <div className="relative w-1/2 overflow-hidden">
                                            <img src={personUpscale} alt="Before" className="absolute h-full w-[200%] max-w-none object-cover brightness-95 blur-[0.5px]" />
                                            <div className="absolute inset-0 bg-black/10"></div>
                                            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/40 backdrop-blur-md text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs/6 leading-normal font-semibold tracking-wider">Before</div>
                                        </div>

                                        <div className="relative w-1/2 overflow-hidden border-l border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                            <img src={personUpscale} alt="After" className="absolute h-full w-[200%] -left-full max-w-none object-cover" />
                                            <div className="absolute inset-0 bg-black/10"></div>
                                            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-blue-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs/6 leading-normal font-semibold tracking-wider">After AI Upscale</div>
                                        </div>
                                    </div>

                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                        <button onClick={() => setIsPlayingVideo(true)} className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-full flex items-center justify-center shadow-2xl" aria-label="Play video">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                                        <div className="flex justify-between items-end gap-2">
                                            <div className="text-white">
                                                <p className="text-[10px] sm:text-sm leading-tight font-semibold opacity-90">Original Quality</p>
                                                <p className="text-[8px] sm:text-xs leading-tight font-normal opacity-70 mt-0.5">Low resolution</p>
                                            </div>
                                            <div className="text-right text-white">
                                                <p className="text-[10px] sm:text-sm leading-tight font-semibold text-blue-400">AI Upscaled 4K</p>
                                                <p className="text-[8px] sm:text-xs leading-tight font-normal opacity-70 mt-0.5">High resolution & detail</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="relative w-full h-full">
                                    <video src={upscalingVideo} autoPlay controls className="w-full h-full object-cover" onEnded={() => setIsPlayingVideo(false)}> 
                                        Your browser does not support the video tag.
                                    </video>
                                    
                                    <button onClick={() => setIsPlayingVideo(false)} className="absolute top-2 sm:top-4 right-2 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 z-50" aria-label="Close video">
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mx-auto max-w-4xl mt-5 mb-12 sm:mb-14 px-4 sm:px-4">
                        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Latest AI, Much Faster
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Integrated with latest AI and Super-Resolution technology, the whole upscaling process becomes faster. Only a few seconds are needed.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Increase Resolution
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    By using our image upscaler, you can enlarge images and increase the resolution by 200% or 400%.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Batch Process
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    Have hundreds of small images for upscaling? We provide the ultimate solution for batch processing. 5 images for batch processing currently.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>  

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Powerful Image Editor
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    We integrate powerful image editor tools for cropping, filters, finetune, annotation, sticker, frames before or after image upscaling.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    We Protect Your Privacy
                                </h3>

                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    All photos will be cleared within 24 hours. Your privacy is highly protected and feel safe to use our services.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 sm:mb-5">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>

                                <h3 className="text-sm sm:text-md leading-normal font-semibold text-gray-800 mb-2 sm:mb-3">
                                    Free for Commercial
                                </h3>
                                
                                <p className="text-xs sm:text-[13px] font-normal text-gray-600 leading-relaxed line-clamp-3">
                                    All upscaled and enhanced images could be used for commercial and it is 100% free. No hidden payment and feel safe to upscale images.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto max-w-5xl mt-5 mb-10 sm:mb-14 sm:px-4">
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3">
                            <span className="text-sm font-medium text-gray-700">Discover more</span>
                            
                            <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium leading-normal text-blue-600 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="truncate">AI Image Enlarger</span>
                            </a>

                            <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium leading-normal text-blue-600 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="truncate">Photo Editing Tutorials</span>
                            </a>

                            <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium leading-normal text-blue-600 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="truncate">artificial intelligence</span>
                            </a>

                            <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium leading-normal text-blue-600 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="truncate">Mobile Image Editor</span>
                            </a>

                            <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium leading-normal text-blue-600 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="truncate">Video scaling tool</span>
                            </a>

                            <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium leading-normal text-blue-600 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="truncate">AI technology</span>
                            </a>

                            <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium leading-normal text-blue-600 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="truncate">Batch Image Enhancer</span>
                            </a>

                            <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium leading-normal text-blue-600 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="truncate">Website Design Templates</span>
                            </a>

                            <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium leading-normal text-blue-600 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="truncate">Online Image Editor</span>
                            </a>
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
                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-2 tracking-tight">Supported file formats</h2>
                            <p className="text-xs sm:text-[13px] font-normal tracking-wide text-gray-600 max-w-md mx-auto line-clamp-2">
                                Skip conversions. Our tool directly supports multiple image formats to help you enhance without interruptions.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8">
                            <div className="bg-gray-50 rounded-2xl p-5">
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
                                            No need to convert. Just upload your WEBP file, and our Free AI image upscaler & image enhancer will improve resolution, clarity, and visual sharpness in seconds.
                                        </span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[60px]">PNG:</span>
                                        <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                            Enhance your PNG images without losing transparency, and our tool preserves edge precision and quality while increasing resolution up to 8x.
                                        </span>
                                    </li>
                                    
                                    <li className="flex items-start gap-3">
                                        <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[60px]">JPG:</span>
                                        <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                            Pixelbin effortlessly enhances JPG files without extra steps. It sharpens blurry areas, corrects tones, and doubles or quadruples resolution without pixel loss.
                                        </span>
                                    </li>
                                    
                                    <li className="flex items-start gap-3">
                                        <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[60px]">JPEG:</span>
                                        <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                            Transform compressed JPEGs into crisp, vibrant images, with no distortion, no conversion, just a quick upscale with AI precision.
                                        </span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[60px]">HEIC:</span>
                                        <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                            Whether from iPhones or cameras, upscale your HEIC images directly, and our AI ensures smooth enhancement without converting files beforehand.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="bg-gray-50 rounded-2xl p-5">
                                    <h3 className="text-lg font-semibold text-gray-600 leading-normal tracking-wide mb-1">
                                        Batch processing
                                    </h3>

                                    <p className="text-[12px] font-normal text-gray-600 mb-4">
                                        Handle hundreds of files at once.
                                    </p>

                                    <ul className="space-y-3 mb-4">
                                        <li className="flex items-start gap-3">
                                            <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[100px]">In one click:</span>
                                            <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                                Enhance multiple images simultaneously.
                                            </span>
                                        </li>

                                        <li className="flex items-start gap-3">
                                            <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[100px]">AI detection:</span>
                                            <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                                Smart analysis for each image.
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-5">

                                    <h3 className="text-lg font-semibold text-gray-600 leading-normal tracking-wide mb-1">
                                        Choose your upscale level: 2x, 4x, 8x
                                    </h3>

                                    <p className="text-[12px] font-normal text-gray-600 mb-5">
                                        Control your output with multiple scaling options.
                                    </p>

                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[70px] sm:min-w-[100px]">2x upscale:</span>
                                            <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                                Double your image resolution, ideal for quick enhancement. That too without overwhelming file size, and maintaining pixel clarity while instantly sharpening soft edges.
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[70px] sm:min-w-[100px]">4x upscale:</span>
                                            <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                                Ideal for eCommerce, design, or printing projects. Transition from 1000×1000 to 4000×4000 while preserving fine detail and realistic lighting.
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="font-semibold leading-normal tracking-wide text-xs/6 text-gray-700 min-w-[70px] sm:min-w-[100px]">8x upscale:</span>
                                            <span className="text-[12px] text-gray-600 leading-normal tracking-wide">
                                                Go ultra-high resolution with 8x enhancement. Best for high-def displays, posters, or large product shots. AI fills in missing details naturally.
                                            </span>
                                        </li>
                                    </ul>
                                </div>
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