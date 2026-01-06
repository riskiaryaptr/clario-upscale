import React, { useState } from "react";
import DocHeader from "../components/documentation/DocHeader";
import DocFooter from "../components/documentation/DocFooter";

function Documentation() {
    const [activeSection, setActiveSection] = useState("introduction");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("clarioDocTheme");
        return savedTheme === "dark" ? true : false;
    });

    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const next = !prev;
            localStorage.setItem("clarioDocTheme", next ? "dark" : "light");
            return next;
        });
    };

    const sections = [
        { id: "introduction", title: "Introduction", sidebarTitle: "Documentation Overview" },
        { id: "getting-started", title: "Getting Started", sidebarTitle: "Quick Setup Guide" },
        { id: "authentication", title: "Authentication", sidebarTitle: "Secure API Access" },
        { id: "api-overview", title: "API Overview", sidebarTitle: "System Architecture" },
        { id: "frontend-integration", title: "Frontend Integration", category: "Frontend", sidebarTitle: "Client Side Setup" },
        { id: "react-sdk", title: "React SDK", category: "Frontend", sidebarTitle: "React Hooks API" },
        { id: "backend-integration", title: "Backend Integration", category: "Backend", sidebarTitle: "Server Side Integration" },
        { id: "nodejs-server", title: "Node.js Server", category: "Backend", sidebarTitle: "Node.js Implementation" },        
        { id: "endpoints", title: "API Endpoints", sidebarTitle: "Available Resources" },
        { id: "image-upscale", title: "Image Upscale", sidebarTitle: "Upscaling Process" },
        { id: "webhooks", title: "Webhooks", sidebarTitle: "Event Notifications" },
        { id: "rate-limiting", title: "Rate Limiting", sidebarTitle: "Usage Policies" },
        { id: "errors", title: "Error Codes", sidebarTitle: "Debugging Assistant" },
        { id: "sdks", title: "SDKs & Libraries", sidebarTitle: "Language Support" },
        { id: "examples", title: "Code Examples", sidebarTitle: "Implementation Samples" },
        { id: "best-practices", title: "Best Practices", sidebarTitle: "Optimization Tips" },
        { id: "changelog", title: "Changelog", sidebarTitle: "Release History" },
    ];

    // Code Snippets
    const codeSnippet = `{
        "status": "success",
        "data": {
            "image_url": "https://api.clario.ai/v1/outputs/res_7x9k2.jpg",
            "upscale_ratio": "400%",
            "processing_time": "1.2s"
        }
    }`;

    const reactSDKCode = `import { useClarioUpscale } from '@clario/react';

    function ImageUploader() {
        const { upscale, loading, result } = useClarioUpscale();

        const handleUpload = async (file) => {
            const result = await upscale(file, {
                scale: '4x',
                format: 'png'
            });
            console.log(result.url);
        };

        return (
            <div>
                <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />
                {loading && <p>Processing...</p>}
                {result && <img src={result.url} alt="Upscaled" />}
            </div>
        );
    }`;

    const vueSDKCode = `<script setup>
    import { useClario } from '@clario/vue';

    const { upscale, loading, result } = useClario();

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        await upscale(file, { scale: '4x' });
    };
    </script>

    <template>
        <div>
            <input type="file" @change="handleUpload" />
            <div v-if="loading">Processing...</div>
            <img v-if="result" :src="result.url" />
        </div>
    </template>`;

    const jsClientCode = `import ClarioClient from '@clario/js';

    const client = new ClarioClient({
        apiKey: 'YOUR_API_KEY'
    });

    const result = await client.upscale(file, {
        scale: '4x',
        onProgress: (progress) => {
            console.log(\`\${progress}% complete\`);
        }
    });

    console.log(result.url);`;

    const imageComparisonCode = `function ImageComparison({ original, processed }) {
        const [sliderPosition, setSliderPosition] = useState(50);

        return (
            <div className="relative">
                <img src={original} alt="Original" />
                <div style={{ clipPath: \`inset(0 \${100-sliderPosition}% 0 0)\` }}>
                    <img src={processed} alt="Processed" />
                </div>
                <input 
                    type="range" 
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(e.target.value)}
                />
            </div>
        );
    }`;

    const nodejsCode = `const express = require('express');
    const multer = require('multer');
    const ClarioAI = require('clario-ai');

    const app = express();
    const upload = multer({ dest: 'uploads/' });
    const clario = new ClarioAI(process.env.CLARIO_API_KEY);

    app.post('/api/upscale', upload.single('image'), async (req, res) => {
        try {   
            const result = await clario.upscale({
            image: req.file.path,
            scale: req.body.scale || '4x'
            });
            
            res.json({ success: true, url: result.url });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.listen(3000);`;

    const pythonFlaskCode = `from flask import Flask, request, jsonify
    from clario_ai import ClarioClient
    import os

    app = Flask(__name__)
    client = ClarioClient(api_key=os.getenv('CLARIO_API_KEY'))

    @app.route('/api/upscale', methods=['POST'])
    def upscale_image():
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
    
        file = request.files['image']
    scale = request.form.get('scale', '4x')
    
    try:
        result = client.upscale(
            image=file,
            scale=scale
        )
        return jsonify({'success': True, 'url': result.url})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    if __name__ == '__main__':
    
    app.run(debug=True)`;

    const phpLaravelCode = `<?php

    namespace App\\Http\\Controllers;

    use Illuminate\\Http\\Request;
    use Clario\\AI\\ClarioClient;

    class ImageController extends Controller
    {
        public function upscale(Request $request)
        {
            $request->validate([
                'image' => 'required|image|max:10240',
                'scale' => 'in:2x,4x,8x'
            ]);

            $client = new ClarioClient(env('CLARIO_API_KEY'));
            
            $result = $client->upscale([
                'image' => $request->file('image'),
                'scale' => $request->input('scale', '4x')
            ]);

            return response()->json([
                'success' => true,
                'url' => $result->url
            ]);
        }
    }`;

    const databaseStorageCode = `// Example schema
    CREATE TABLE image_processes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        original_url VARCHAR(255),
        processed_url VARCHAR(255),
        scale VARCHAR(10),
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW(),
        completed_at TIMESTAMP
    );

    // Save to database
    const process = await db.imageProcesses.create({
        userId: req.user.id,
        originalUrl: file.url,
        processedUrl: result.url,
        scale: '4x',
        status: 'completed'
    });`;

    const queueProcessingCode = `const Queue = require('bull');
    const upscaleQueue = new Queue('image-upscale');

        // Add job to queues
        app.post('/api/upscale', async (req, res) => {
        const job = await upscaleQueue.add({
        imageUrl: req.body.imageUrl,
        scale: req.body.scale,
        userId: req.user.id
    });
    
    res.json({ jobId: job.id });
    });

    // Process queue
    upscaleQueue.process(async (job) => {
        const result = await clario.upscale(job.data);
        await db.saveResult(job.data.userId, result);
        return result;
    });`;

    const backgroundRemovalCode = `POST /v1/remove-background
    Content-Type: multipart/form-data

    {
        "image": <file>,
        "output_format": "png"
    }`;

        const codeExampleCode = `// JavaScript Example
    const clario = require('clario-ai');
    clario.setApiKey('YOUR_API_KEY');

    const result = await clario.upscale({
        image: './photo.jpg',
        scale: '4x'
    });

    console.log(result.url);`;

    const webhookPayloadCode = `{
    "event": "image.processed",
    "timestamp": "2024-01-06T12:30:00Z",
    "data": {
        "id": "img_7x9k2abc",
        "status": "completed",
        "original_url": "https://api.clario.ai/v1/inputs/original.jpg",
        "processed_url": "https://api.clario.ai/v1/outputs/upscaled.jpg",
        "scale": "4x",
        "processing_time": "1.2s"
    },
    "signature": "sha256=..."
    }`;

    const webhookHandlerCode = `app.post('/webhooks/clario', async (req, res) => {
    // Verify webhook signature
    const signature = req.headers['x-clario-signature'];
    const isValid = verifySignature(req.body, signature, WEBHOOK_SECRET);
  
    if (!isValid) {
        return res.status(401).json({ error: 'Invalid signature' });
    }

    const { event, data } = req.body;

    switch (event) {
        case 'image.processed':
        await handleImageProcessed(data);
        break;
        case 'image.failed':
        await handleImageFailed(data);
        break;
        case 'batch.completed':
        await handleBatchCompleted(data);
        break;
    }

    res.status(200).json({ received: true });
    });`;

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100; 

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const height = element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`min-h-screen font-sans transition-colors duration-200 ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
            <DocHeader 
                isDarkMode={isDarkMode} 
                toggleDarkMode={toggleDarkMode}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <main className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {isMobileMenuOpen && (
                        <div className="fixed inset-0 z-40 lg:hidden">
                            <div className="fixed inset-0 bg-black/40" onClick={() => setIsMobileMenuOpen(false)}></div>
                            <nav className={`fixed top-0 bottom-0 left-0 w-full sm:w-80 z-50 p-6 overflow-y-auto transition-transform duration-300 transform ${isDarkMode ? 'bg-gray-900' : 'bg-white shadow-xl'}`}>
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-lg font-bold">Documentation</h2>
                                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-gray-500">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-1">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => {
                                                scrollToSection(section.id);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-[14px] font-medium leading-normal font-nunito rounded-lg transition-all duration-200 ${
                                                activeSection === section.id
                                                    ? isDarkMode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"
                                                    : isDarkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                            }`}
                                        >
                                            {section.title}
                                        </button>
                                    ))}
                                </div>
                            </nav>
                        </div>
                    )}

                    <aside className="hidden lg:block lg:col-span-2">
                        <nav className="custom-scrollbar sticky top-24 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`w-full text-left px-4 py-2.5 text-[14px] font-medium leading-normal font-nunito rounded-lg transition-all duration-200 ${
                                        activeSection === section.id
                                            ? isDarkMode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"
                                            : isDarkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    }`}
                                >
                                    {section.title}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    <div className="lg:col-span-10 xl:col-span-8">
                        <div className="w-full lg:mx-0">
                            <div className="py-3">
                                <article className="prose prose-slate max-w-none">
                                    <nav className="flex items-center space-x-2 text-sm mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
                                        <a href="/" className={`transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                                            </svg>
                                        </a>
                                        <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>›</span>
                                        <span className="text-blue-600 font-medium">
                                            {sections.find(s => s.id === activeSection)?.title || 'Documentation'}
                                        </span>
                                    </nav>

                                    <div className={`xl:hidden mb-10 pb-8 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                                        <h3 className={`text-[11px] font-bold uppercase tracking-wider mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            On this page
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {sections.map((section) => (
                                                <button 
                                                    key={section.id} 
                                                    onClick={() => scrollToSection(section.id)}
                                                    className={`text-[12px] font-medium py-1.5 px-3 rounded-full border transition-all duration-200 ${
                                                        activeSection === section.id
                                                            ? isDarkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-gray-100 border-gray-300 text-gray-900"
                                                            : isDarkMode 
                                                                ? 'text-gray-400 border-gray-800 hover:border-gray-600' 
                                                                : 'text-gray-600 border-gray-200 hover:border-gray-400'
                                                    }`}
                                                >
                                                    {section.sidebarTitle}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-10">
                                        <section id="introduction">
                                            <h2 className={`text-xl font-medium tracking-wide leading-loose font-nunito mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                Introduction
                                            </h2>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Welcome to the Clario AI API documentation. Our comprehensive API provides developers with powerful tools to programmatically <span className="text-blue-600 font-semibold">upscale images</span>, remove backgrounds, and enhance visual quality using state-of-the-art neural networks and machine learning algorithms.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                The Clario AI API is designed to seamlessly integrate advanced image processing capabilities directly into your applications with just a few lines of code. Whether you're building a photo editing app, an e-commerce platform, a content management system, or any application that requires high-quality image enhancement, our API provides the tools you need to deliver exceptional results.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Our API supports multiple programming languages and frameworks, offers <span className="text-blue-600 font-semibold">real-time processing</span> with webhook notifications, and scales automatically to handle your workload. With industry-leading uptime, comprehensive documentation, and dedicated support, Clario AI empowers developers to focus on building amazing features while we handle the complex image processing behind the scenes.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Built with enterprise-grade security and <span className="text-blue-600 font-semibold">99.9% uptime SLA</span>, our infrastructure is designed to handle millions of requests per day. Every image is processed with the highest quality standards, ensuring your users receive professional-grade results every time.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                The API features intelligent caching, automatic retry mechanisms, and detailed analytics to help you monitor and optimize your image processing workflows. Our global CDN ensures fast delivery of processed images to users worldwide, regardless of their location.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Get started today and transform how your application handles images. From simple upscaling to complex batch processing, Clario AI provides the performance, reliability, and ease of use you need to deliver professional-grade image enhancement to your users.
                                            </p>
                                        </section>

                                        <section id="authentication">
                                            <h2 className={`text-xl font-medium tracking-wide leading-loose font-nunito mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                Authentication
                                            </h2>
                                            
                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                To use the API, you need an API Key. You can generate one from your <span className="font-semibold text-blue-600">Developer Dashboard</span>. All API requests must be made over HTTPS and include your key in the header:
                                            </p>
                                            
                                             <div className={`rounded-lg p-4 font-mono text-sm mb-3 transition-colors ${isDarkMode ? 'bg-[#0b0e14] text-blue-400 border border-gray-800' : 'bg-gray-900 text-blue-300'}`}>
                                                 Authorization: Bearer YOUR_API_KEY
                                             </div>
                                            
                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Your API key is a <span className="font-semibold text-blue-600">secret credential</span> that grants access to your account and should be treated with the same level of security as a password. Each API key is unique to your account and can be used to track usage, enforce rate limits, and ensure secure access to our services.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                <span className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Security Best Practices:</span> Never expose your API key in client-side code, public repositories, or version control systems. For frontend applications, always use a backend proxy or implement temporary token generation. Store your API keys in environment variables or secure secret management systems. Rotate your keys regularly and immediately revoke any keys that may have been compromised.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                You can manage multiple API keys from your Developer Dashboard, allowing you to use different keys for development, staging, and production environments. Each key can be individually revoked without affecting your other keys, providing flexibility and enhanced security for your applications.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                All API requests must be made over <span className="font-semibold text-blue-600">HTTPS</span> to ensure encrypted communication. Requests made over HTTP will be rejected. If authentication fails, the API will return a <code className={`px-2 py-1 rounded text-sm font-mono text-blue-600 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>401 Unauthorized</code> error with details about the authentication failure.
                                            </p>
                                        </section>

                                        <section id="api-overview">
                                            <h2 className={`text-xl font-medium tracking-wide leading-loose font-nunito mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                API Overview
                                            </h2>
                                            
                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                The Clario AI API is organized around <span className="font-semibold text-blue-600">REST principles</span>, providing a simple and intuitive interface for developers. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Built on modern web standards, the API is designed to be <span className="font-semibold text-blue-600">developer-friendly</span> and easy to integrate into any application. Whether you're building a mobile app, web application, or backend service, our RESTful architecture ensures consistent and predictable behavior across all endpoints.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                <span className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>API Versioning:</span> We use URL-based versioning to ensure backward compatibility and smooth transitions when we introduce new features. The current version is <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800 text-blue-400' : 'bg-gray-100 text-blue-600'}`}>v1</code>. When breaking changes are necessary, we'll release a new version while maintaining support for previous versions, giving you ample time to migrate your applications.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                All API requests support standard HTTP methods including <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'}`}>POST</code> for creating resources, <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'}`}>GET</code> for retrieving data, and <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'}`}>DELETE</code> for removing resources. Responses include appropriate HTTP status codes: <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'}`}>200</code> for success, <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'}`}>4xx</code> for client errors, and <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'}`}>5xx</code> for server errors.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                The API supports both <span className="font-semibold text-blue-600">synchronous and asynchronous processing</span>. For quick operations, you'll receive immediate responses. For longer processing tasks, you can use webhooks to receive notifications when processing completes, allowing your application to handle other tasks without blocking.
                                            </p>

                                            <div className={`rounded-lg p-6 border mb-4 transition-colors ${isDarkMode ? 'bg-[#111827] border-gray-800' : 'bg-white border-gray-200'}`}>
                                                <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Base URL</h3>
                                                <code className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>https://api.clario.ai/v1</code>
                                                <p className={`text-[13px] mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>All API endpoints are relative to this base URL. Always use HTTPS for secure communication.</p>
                                            </div>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                All requests and responses use <span className="font-semibold text-blue-600">JSON format</span> for easy parsing and integration. The API delivers fast response times, with an average response time under 100ms for optimal performance. Our infrastructure supports idempotent requests with safe retry mechanisms to prevent duplicate processing, and features auto-scaling capabilities to handle traffic spikes seamlessly.
                                            </p>

                                        </section>

                                        <section id="frontend-integration">
                                            <h2 className={`text-xl font-medium tracking-wide leading-loose font-nunito mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                Frontend Integration
                                            </h2>
                                            
                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Integrate Clario AI directly into your frontend applications with our comprehensive client-side SDKs. Our SDKs are designed to handle file uploads, progress tracking, and result display seamlessly, providing a smooth user experience for your end users.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Our frontend SDKs support popular frameworks including <span className="font-semibold text-blue-600">React, Vue, Angular, and vanilla JavaScript</span>. Each SDK provides intuitive hooks and components that abstract away the complexity of API communication, allowing you to focus on building great user interfaces. Features include automatic retry logic, upload progress tracking, image preview capabilities, and error handling out of the box.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                The client-side integration is perfect for rapid prototyping and development environments. You can quickly implement image upscaling features with just a few lines of code, making it ideal for demos, MVPs, and internal tools. The SDKs handle file validation, size checking, and format conversion automatically.
                                            </p>

                                            <h3 className={`font-semibold mb-3 mt-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Vanilla JavaScript Example</h3>
                                             <div className={`rounded-lg p-4 font-mono text-xs text-white overflow-x-auto mb-4 transition-colors ${isDarkMode ? 'bg-[#0d1117] border border-gray-800' : 'bg-gray-900'}`}>
                                                 <pre>{jsClientCode}</pre>
                                             </div>

                                            <h3 className={`font-semibold mb-3 mt-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Vue.js Example</h3>
                                             <div className={`rounded-lg p-4 font-mono text-xs text-white overflow-x-auto mb-4 transition-colors ${isDarkMode ? 'bg-[#0d1117] border border-gray-800' : 'bg-gray-900'}`}>
                                                 <pre>{vueSDKCode}</pre>
                                             </div>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                For production applications, we recommend implementing a <span className="font-semibold text-blue-600">backend proxy pattern</span> to keep your API keys secure. This approach allows your frontend to communicate with your own backend service, which then makes authenticated requests to the Clario AI API. This architecture provides better security, enables request logging and monitoring, and gives you control over rate limiting and user permissions.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                <span className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Security Note:</span> Never expose your API key in frontend code. Use a backend proxy or temporary tokens for production applications.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Our SDKs are open source and actively maintained. You can find complete documentation, code examples, and community support on our GitHub repository. We regularly release updates with new features, performance improvements, and bug fixes to ensure the best possible developer experience.
                                            </p>
                                        </section>

                                        <section id="react-sdk">
                                            <h2 className={`text-xl font-medium tracking-wide leading-loose font-nunito mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                React SDK
                                            </h2>
                                            
                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Our React SDK provides powerful hooks and components designed specifically for React applications. The SDK leverages React's modern features including hooks, context, and suspense to deliver a seamless integration experience that feels native to the React ecosystem.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                The <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800 text-blue-400' : 'bg-gray-100 text-blue-600'}`}>useClarioUpscale</code> hook is the core of our React SDK, providing a simple interface to upscale images with built-in state management. It handles loading states, error handling, and result caching automatically, allowing you to focus on building your UI. The hook returns the current processing state, the upscale function, and the result, making it easy to create responsive user interfaces.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Installation is simple with npm or yarn: <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'}`}>npm install @clario/react</code>. The SDK is fully typed with TypeScript, providing excellent IDE support and autocomplete. It works seamlessly with both JavaScript and TypeScript projects, and supports React 16.8+ (hooks support required).
                                            </p>

                                             <div className={`rounded-lg p-4 font-mono text-xs text-white overflow-x-auto mb-4 transition-colors ${isDarkMode ? 'bg-[#0d1117] border border-gray-800' : 'bg-gray-900'}`}>
                                                 <pre>{reactSDKCode}</pre>
                                             </div>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                The SDK also includes additional hooks for advanced use cases, such as <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>useClarioBatch</code> for batch processing multiple images, and <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>useClarioProgress</code> for detailed progress tracking. All hooks are optimized for performance and follow React best practices to prevent unnecessary re-renders.
                                            </p>
                                        </section>

                                        <section id="backend-integration">
                                            <h2 className={`text-xl font-medium tracking-wide leading-loose font-nunito mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                Backend Integration
                                            </h2>
                                            
                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Integrate Clario AI into your backend services for secure, scalable image processing. Backend integration is the recommended approach for production applications as it keeps your API keys safe on the server and provides better control over your application's workflow.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Backend integration enables advanced features such as queue processing for handling large volumes efficiently, database storage for processing history and results, and webhook handling for real-time notifications. This architecture provides enhanced security, better performance monitoring, and the flexibility to implement custom business logic around image processing operations.
                                            </p>

                                            <h3 className={`font-semibold mb-3 mt-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Python (Flask) Example</h3>
                                             <div className={`rounded-lg p-4 font-mono text-xs text-white overflow-x-auto mb-4 transition-colors ${isDarkMode ? 'bg-[#0d1117] border border-gray-800' : 'bg-gray-900'}`}>
                                                 <pre>{pythonFlaskCode}</pre>
                                             </div>

                                            <h3 className={`font-semibold mb-3 mt-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>PHP (Laravel) Example</h3>
                                             <div className={`rounded-lg p-4 font-mono text-xs text-white overflow-x-auto transition-colors ${isDarkMode ? 'bg-[#0d1117] border border-gray-800' : 'bg-gray-900'}`}>
                                                 <pre>{phpLaravelCode}</pre>
                                             </div>
                                        </section>

                                        <section id="nodejs-server">
                                            <h2 className={`text-xl font-medium tracking-wide leading-loose font-nunito mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                Node.js Server
                                            </h2>
                                            
                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Build a secure backend service with Node.js and Express.js to handle image upscaling requests. This example demonstrates a complete server implementation using the Clario AI SDK with file upload handling via Multer middleware.
                                            </p>

                                             <div className={`rounded-lg p-4 font-mono text-xs text-white overflow-x-auto mb-4 transition-colors ${isDarkMode ? 'bg-[#0d1117] border border-gray-800' : 'bg-gray-900'}`}>
                                                 <pre>{nodejsCode}</pre>
                                             </div>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                The implementation includes error handling, environment variable configuration for API keys, and JSON response formatting. You can extend this basic setup with authentication middleware, rate limiting, request validation, and database integration to build a production-ready image processing service.
                                            </p>
                                        </section>

                                        <section id="endpoints">
                                            <h2 className={`text-xl font-medium tracking-wide leading-loose font-nunito mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                Endpoints
                                            </h2>
                                            
                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                The Clario AI API provides RESTful endpoints for image processing operations. All endpoints follow consistent patterns with predictable URLs, JSON-encoded request and response bodies, and standard HTTP methods and status codes.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Each endpoint is designed to handle specific image processing tasks. Below you'll find detailed documentation for each available endpoint, including request parameters, response formats, and example usage. All endpoints require authentication via API key in the request header.
                                            </p>

                                            <div className="space-y-6">
                                                <div className="p-3">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className={`px-3 py-1 text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>POST</span>
                                                        <code className="text-blue-600 font-semibold">/v1/upscale</code>
                                                    </div>
                                                    <p className={`mb-4 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Upscale an image up to 8x resolution using AI-powered enhancement.</p>
                                                    
                                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Response Example</h4>
                                                     <div className={`rounded-lg p-4 font-mono text-xs text-white overflow-x-auto transition-colors ${isDarkMode ? 'bg-[#0d1117] border border-gray-800' : 'bg-gray-900'}`}>
                                                         <pre>{codeSnippet}</pre>
                                                     </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section id="image-upscale">
                                            <h2 className={`text-xl font-medium tracking-wide leading-loose font-nunito mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                Image Upscale
                                            </h2>
                                            
                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                The Image Upscale endpoint allows you to enhance image resolution using advanced AI algorithms. This endpoint supports multiple image formats including JPG, PNG, and WebP, with upscaling options up to 8x the original resolution while maintaining image quality and detail.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                The upscaling process uses deep learning models trained on millions of images to intelligently enhance details, reduce artifacts, and preserve natural textures. Processing time varies based on image size and scale factor, typically completing within 1-3 seconds for standard images.
                                            </p>

                                            <div className="mb-4">
                                                <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Parameters</h3>
                                                <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                    <li><code className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>image</code> - The image file to upscale (required)</li>
                                                    <li><code className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>scale</code> - Upscale factor: 2x, 4x, or 8x (default: 4x)</li>
                                                    <li><code className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>format</code> - Output format: jpg, png, webp (default: original)</li>
                                                </ul>
                                            </div>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Maximum file size is 10MB per request. For larger files or batch processing, consider using our asynchronous processing endpoints with webhook notifications. The API automatically optimizes the output based on the selected format and scale factor.
                                            </p>
                                        </section>

                                        <section id="webhooks">
                                            <h2 className={`text-xl font-medium tracking-wide leading-loose font-nunito mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                Webhooks
                                            </h2>
                                            
                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Webhooks allow you to receive real-time notifications when image processing operations complete. Instead of polling the API for results, webhooks push updates directly to your server, enabling efficient asynchronous workflows and better user experiences.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Configure webhook URLs in your developer dashboard to receive POST requests with processing results. Each webhook payload includes the event type, processing status, result URLs, and metadata about the operation. Webhooks are signed with a secret key to ensure authenticity and prevent unauthorized requests.
                                            </p>

                                            <div className="mb-4">
                                                <h3 className="font-semibold text-gray-900 mb-3">Webhook Events</h3>
                                                <ul className="space-y-2 text-sm text-gray-600">
                                                    <li>• <code className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'}`}>image.processed</code> - Image processing completed</li>
                                                    <li>• <code className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'}`}>image.failed</code> - Image processing failed</li>
                                                    <li>• <code className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'}`}>batch.completed</code> - Batch processing completed</li>
                                                </ul>
                                            </div>

                                            <h3 className={`font-semibold mb-3 mt-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Webhook Payload Example</h3>
                                             <div className={`rounded-lg p-4 font-mono text-xs text-white overflow-x-auto mb-4 transition-colors ${isDarkMode ? 'bg-[#0d1117] border border-gray-800' : 'bg-gray-900'}`}>
                                                 <pre>{webhookPayloadCode}</pre>
                                             </div>

                                            <h3 className={`font-semibold mb-3 mt-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Webhook Handler Example</h3>
                                             <div className={`rounded-lg p-4 font-mono text-xs text-white overflow-x-auto mb-4 transition-colors ${isDarkMode ? 'bg-[#0d1117] border border-gray-800' : 'bg-gray-900'}`}>
                                                 <pre>{webhookHandlerCode}</pre>
                                             </div>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Webhooks are retried automatically with exponential backoff if your endpoint is unavailable. You can view webhook delivery history and debug failed deliveries in your dashboard. For security, always verify the webhook signature before processing the payload.
                                            </p>
                                        </section>

                                        <section id="rate-limiting">
                                            <h2 className={`text-xl font-medium tracking-wide leading-loose font-nunito mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                Rate Limiting   
                                            </h2>
                                            
                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                To ensure fair usage and maintain service quality for all users, the Clario AI API implements rate limiting on all endpoints. Free tier accounts are limited to 60 requests per minute, while Pro and Business accounts enjoy higher limits based on their subscription tier.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Every API response includes rate limit headers to help you track your usage. The <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'}`}>X-RateLimit-Remaining</code> header shows how many requests you have left in the current window, while <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'}`}>X-RateLimit-Reset</code> indicates when your limit will reset (as a Unix timestamp).
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                If you exceed your rate limit, the API will return a <code className={`px-2 py-1 rounded text-sm font-mono text-blue-600 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>429 Too Many Requests</code> status code. Implement exponential backoff in your application to handle rate limit errors gracefully. For applications requiring higher throughput, consider upgrading your plan or contact our sales team for custom enterprise limits.
                                            </p>
                                        </section>

                                        <section id="errors" className="pb-2">
                                            <h2 className={`text-xl font-medium tracking-wide leading-loose font-nunito mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                Error Codes
                                            </h2>
                                            
                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                The Clario AI API uses standard HTTP status codes to indicate the success or failure of requests. All error responses include a JSON body with detailed error information, including an error code, message, and suggestions for resolution.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                When an error occurs, the response will contain an <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'}`}>error</code> object with a human-readable message and a machine-readable error code. Use these codes to implement proper error handling in your application and provide helpful feedback to your users.
                                            </p>

                                            <div className="overflow-x-auto mb-4">
                                                <table className={`w-full text-left text-[14px] font-normal tracking-wide leading-loose font-nunito border ${isDarkMode ? 'text-gray-300 border-gray-700' : 'text-gray-600 border-gray-200'}`}>
                                                    <thead className={`border-b ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}>
                                                        <tr>
                                                            <th className="px-6 py-3 font-semibold">Code</th>
                                                            <th className="px-6 py-3 font-semibold">Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        <tr>
                                                            <td className="px-6 py-4 font-mono text-blue-600 font-semibold">400</td>
                                                            <td className="px-6 py-4">Invalid request parameters or unsupported image format.</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-6 py-4 font-mono text-blue-600 font-semibold">401</td>
                                                            <td className="px-6 py-4">Unauthorized. API key is missing or invalid.</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-6 py-4 font-mono text-blue-600 font-semibold">429</td>
                                                            <td className="px-6 py-4">Too many requests. You have reached your rate limit.</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-6 py-4 font-mono text-blue-600 font-semibold">500</td>
                                                            <td className="px-6 py-4">Server error. Our AI is currently taking a break.</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                For <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>4xx</code> errors, check your request parameters and authentication. For <code className={`px-2 py-1 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>5xx</code> errors, implement retry logic with exponential backoff. If errors persist, contact our support team with the request ID from the error response for faster troubleshooting.
                                            </p>
                                        </section>

                                        <section id="sdks">
                                            <h2 className={`text-xl font-medium tracking-wide leading-loose font-nunito mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                SDKs & Libraries
                                            </h2>
                                            
                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                We provide official SDKs for popular programming languages to make integration faster and easier. Each SDK is designed with language-specific best practices, includes comprehensive documentation, and provides type safety where applicable.
                                            </p>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                All SDKs are open source, actively maintained, and include built-in error handling, automatic retries, and progress tracking. They abstract away the complexity of HTTP requests and provide idiomatic interfaces that feel natural in each language ecosystem.
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div className="p-4">
                                                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>JavaScript / Node.js</h3>
                                                    <code className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>npm install clario-ai</code>
                                                </div>

                                                <div className="p-4">
                                                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Python</h3>
                                                    <code className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>pip install clario-ai</code>
                                                </div>

                                                <div className="p-4">
                                                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>PHP</h3>
                                                    <code className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>composer require clario/ai</code>
                                                </div>

                                                <div className="p-4">
                                                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Ruby</h3>
                                                    <code className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>gem install clario-ai</code>
                                                </div>
                                            </div>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Each SDK includes code examples, API reference documentation, and integration guides. For community-maintained SDKs in other languages or framework-specific integrations, visit our GitHub organization or community forum.
                                            </p>
                                        </section>

                                        <section id="examples">
                                            <h2 className={`text-xl font-medium tracking-wide leading-loose font-nunito mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                Code Examples
                                            </h2>
                                            
                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Get started quickly with practical, ready-to-use code examples. These examples demonstrate common use cases and best practices for integrating the Clario AI API into your applications. Each example is fully functional and can be adapted to your specific needs.
                                            </p>

                                             <div className={`rounded-lg p-4 font-mono text-xs text-white overflow-x-auto mb-4 transition-colors ${isDarkMode ? 'bg-[#0d1117] border border-gray-800' : 'bg-gray-900'}`}>
                                                 <pre>{codeExampleCode}</pre>
                                             </div>

                                            <p className={`text-[14px] font-normal tracking-wide leading-loose font-nunito ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                For more comprehensive examples including error handling, progress tracking, and advanced features, visit our GitHub repository. You'll find complete sample applications, integration patterns, and production-ready code snippets for various frameworks and use cases.
                                            </p>
                                        </section>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>

                    <aside className="hidden xl:block lg:col-span-2">
                        <div className="sticky top-20 pl-4">
                            <h3 className={`text-xs font-semibold mb-4 leading-normal tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>On this page</h3>
                            <nav className="custom-scrollbar space-y-2 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
                                {sections.map((section) => (
                                    <button 
                                        key={section.id} 
                                        onClick={() => {
                                            const element = document.getElementById(section.id);
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }
                                        }}
                                        className={`block w-full text-left text-[13px] font-medium leading-normal font-nunito py-1.5 px-3 rounded-lg transition-all duration-200 ${
                                            activeSection === section.id
                                                ? isDarkMode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"
                                                : isDarkMode 
                                                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30' 
                                                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'
                                        }`}
                                    >
                                        {section.sidebarTitle}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>
                </div>
            </main>

            <DocFooter isDarkMode={isDarkMode} />
        </div>
    );
}

export default Documentation;