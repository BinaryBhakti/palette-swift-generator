import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import ColorThief from 'colorthief';
import chroma from 'chroma-js';
import { CopyIcon, CheckIcon } from '../components/Icons';
import { toast } from 'sonner';
import Header from '@/components/Header';

interface ExtractedColor {
  hex: string;
  rgb: string;
}

export default function ImagePicker() {
  const [isDragging, setIsDragging] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const handleImageLoad = useCallback(() => {
    if (!imageRef.current) return;
    
    try {
      setLoading(true);
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(imageRef.current, 8);
      
      const colors = palette.map((color: number[]) => {
        const [r, g, b] = color;
        const chromaColor = chroma(r, g, b);
        return {
          hex: chromaColor.hex(),
          rgb: `rgb(${r}, ${g}, ${b})`
        };
      });
      
      setExtractedColors(colors);
      setLoading(false);
    } catch (error) {
      console.error('Error extracting colors:', error);
      toast.error('Error extracting colors. Please try another image.');
      setLoading(false);
    }
  }, []);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check if the file is an image
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (!file) return;
    
    // Check if the file is an image
    if (!file.type.match('image.*')) {
      toast.error('Please drop an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleCopy = (value: string, index: number) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    toast.success('Color copied to clipboard');
    setTimeout(() => setCopiedIndex(null), 1500);
  };
  
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pb-12">
      <Header />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {extractedColors.length > 0 && extractedColors.map((color, index) => (
          <div 
            key={index}
            className="absolute opacity-20 rounded-full blur-[100px]"
            style={{
              backgroundColor: color.hex,
              width: '25rem',
              height: '25rem',
              top: `${(index * 20) % 80}%`,
              left: `${(index * 15) % 70}%`,
              animationDelay: `${index * 0.2}s`,
              animation: 'pulse 8s infinite'
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 pt-24 px-4">
        <motion.h1 
          className="mb-8 text-center text-3xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Image Color Picker
        </motion.h1>
        
        <div className="mx-auto max-w-4xl">
          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div 
              className={`relative overflow-hidden flex h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors backdrop-blur-sm ${
                isDragging 
                  ? 'border-purple-500 bg-purple-500/10' 
                  : 'border-gray-700 bg-gray-800/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-transparent to-blue-700/20 z-0"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
                    />
                  </svg>
                </div>
                <p className="mb-2 text-center text-lg font-medium text-white">
                  Drop your image here, or click to select
                </p>
                <p className="text-center text-sm text-gray-400">
                  PNG, JPG, or GIF (max 10MB)
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </motion.div>
          
          {/* Image Preview and Extracted Colors */}
          {imageUrl && (
            <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg ring-1 ring-white/10">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Image Preview */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="mb-4 text-xl font-bold text-white">Uploaded Image</h2>
                  <div className="relative overflow-hidden rounded-xl bg-gray-900/50 p-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20"></div>
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img 
                        ref={imageRef}
                        src={imageUrl} 
                        alt="Uploaded" 
                        className="h-full w-full object-contain"
                        onLoad={handleImageLoad}
                        crossOrigin="anonymous"
                      />
                    </div>
                  </div>
                </motion.div>
                
                {/* Extracted Colors */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="mb-4 text-xl font-bold text-white">Extracted Colors</h2>
                  
                  {loading ? (
                    <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-gray-900/50 p-6">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-purple-500"></div>
                      <span className="ml-3 text-gray-300">Extracting colors...</span>
                    </div>
                  ) : extractedColors.length > 0 ? (
                    <div className="space-y-4">
                      {extractedColors.map((color, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="group flex items-center overflow-hidden rounded-lg bg-gray-900/50 shadow-md transition-all hover:bg-gray-800/70"
                        >
                          <div 
                            className="h-16 w-16 shrink-0 transition-all duration-300 group-hover:w-20"
                            style={{ backgroundColor: color.hex }}
                          ></div>
                          <div className="flex flex-1 items-center justify-between p-3">
                            <code className="font-mono text-sm text-gray-300">{color.hex}</code>
                            <button
                              onClick={() => handleCopy(color.hex, index)}
                              className="rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none transition-colors"
                            >
                              {copiedIndex === index ? (
                                <CheckIcon className="h-5 w-5 text-green-400" />
                              ) : (
                                <CopyIcon className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-gray-900/50 p-6 text-gray-400">
                      Upload an image to extract colors
                    </div>
                  )}
                </motion.div>
              </div>
              
              {/* Color Palette Preview */}
              {extractedColors.length > 0 && (
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h2 className="mb-4 text-xl font-bold text-white">Complete Palette</h2>
                  <div className="overflow-hidden rounded-xl shadow-lg">
                    <div className="flex h-24">
                      {extractedColors.map((color, index) => (
                        <div
                          key={index}
                          className="flex-1 cursor-pointer transition-transform hover:scale-y-110"
                          style={{ backgroundColor: color.hex }}
                          onClick={() => handleCopy(color.hex, index)}
                          title={color.hex}
                        ></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
          
          {/* Helpful Tips */}
          <motion.div 
            className="mt-8 bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg ring-1 ring-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="mb-4 text-xl font-bold text-white">Tips</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <svg className="mr-2 h-5 w-5 mt-0.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Upload high-quality images for the best color extraction results
              </li>
              <li className="flex items-start">
                <svg className="mr-2 h-5 w-5 mt-0.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Click on any color to copy its HEX code to your clipboard
              </li>
              <li className="flex items-start">
                <svg className="mr-2 h-5 w-5 mt-0.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Try images with distinct colors to create interesting palettes
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 