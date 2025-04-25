import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import ColorThief from 'colorthief';
import chroma from 'chroma-js';
import { CopyIcon, CheckIcon } from '../components/Icons';
import { toast } from 'sonner';

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
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="mb-8 text-center text-3xl font-bold"
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
            className={`flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
              isDragging 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-300 dark:border-gray-700'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="mb-4 h-12 w-12 text-gray-400 dark:text-gray-500" 
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
            <p className="mb-2 text-center text-lg font-medium text-gray-700 dark:text-gray-300">
              Drop your image here, or click to select
            </p>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
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
        </motion.div>
        
        {/* Image Preview and Extracted Colors */}
        {imageUrl && (
          <div className="grid gap-8 md:grid-cols-2">
            {/* Image Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="overflow-hidden rounded-lg shadow-md"
            >
              <img 
                ref={imageRef}
                src={imageUrl} 
                alt="Uploaded" 
                className="h-auto w-full object-cover"
                onLoad={handleImageLoad}
                crossOrigin="anonymous"
              />
            </motion.div>
            
            {/* Extracted Colors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="mb-4 text-xl font-bold">Extracted Colors</h2>
              
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                  <span className="ml-3">Extracting colors...</span>
                </div>
              ) : extractedColors.length > 0 ? (
                <div className="space-y-3">
                  {extractedColors.map((color, index) => (
                    <div 
                      key={index}
                      className="flex items-center overflow-hidden rounded-lg shadow-sm"
                    >
                      <div 
                        className="h-16 w-16 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <div className="flex flex-1 items-center justify-between p-3">
                        <code className="font-mono text-sm">{color.hex}</code>
                        <button
                          onClick={() => handleCopy(color.hex, index)}
                          className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                        >
                          {copiedIndex === index ? (
                            <CheckIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <CopyIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  Upload an image to extract colors
                </p>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
} 