import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import chroma from 'chroma-js';
import { CopyIcon, CheckIcon } from '../components/Icons';
import { toast } from 'sonner';

interface ContrastResult {
  ratio: number;
  AA: boolean;
  AAA: boolean;
  AAALarge: boolean;
  AALarge: boolean;
}

export default function ContrastChecker() {
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('#121212');
  const [activeTab, setActiveTab] = useState<'text' | 'background'>('text');
  const [contrastResult, setContrastResult] = useState<ContrastResult>({
    ratio: 0,
    AA: false,
    AAA: false,
    AAALarge: false,
    AALarge: false,
  });
  const [copied, setCopied] = useState<boolean>(false);
  
  // Calculate contrast ratio and compliance whenever colors change
  useEffect(() => {
    try {
      const ratio = chroma.contrast(textColor, bgColor);
      
      setContrastResult({
        ratio: Math.round(ratio * 100) / 100,
        AA: ratio >= 4.5,
        AAA: ratio >= 7,
        AALarge: ratio >= 3,
        AAALarge: ratio >= 4.5,
      });
    } catch (error) {
      console.error('Invalid colors', error);
    }
  }, [textColor, bgColor]);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success('CSS copied to clipboard');
    setTimeout(() => setCopied(false), 1500);
  };
  
  const swapColors = () => {
    const temp = textColor;
    setTextColor(bgColor);
    setBgColor(temp);
  };
  
  // Generate CSS for the current color combination
  const generateCSS = () => {
    return `color: ${textColor};\nbackground-color: ${bgColor};`;
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="mb-8 text-center text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contrast Checker
      </motion.h1>
      
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Color Pickers */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Tabs */}
            <div className="flex rounded-lg border border-gray-200 p-1 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'text'
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50'
                }`}
              >
                Text Color
              </button>
              <button
                onClick={() => setActiveTab('background')}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'background'
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50'
                }`}
              >
                Background Color
              </button>
            </div>
            
            {/* Active Color Picker */}
            <div className="flex justify-center">
              {activeTab === 'text' ? (
                <div className="flex flex-col items-center">
                  <HexColorPicker 
                    color={textColor} 
                    onChange={setTextColor} 
                    className="w-full max-w-[260px]"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => {
                      try {
                        chroma(e.target.value);
                        setTextColor(e.target.value);
                      } catch (error) {
                        // Invalid color, don't update
                      }
                    }}
                    className="mt-4 w-full max-w-[260px] rounded border border-gray-300 bg-white px-3 py-2 text-center text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <HexColorPicker 
                    color={bgColor} 
                    onChange={setBgColor} 
                    className="w-full max-w-[260px]"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => {
                      try {
                        chroma(e.target.value);
                        setBgColor(e.target.value);
                      } catch (error) {
                        // Invalid color, don't update
                      }
                    }}
                    className="mt-4 w-full max-w-[260px] rounded border border-gray-300 bg-white px-3 py-2 text-center text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              )}
            </div>
            
            {/* Swap Colors Button */}
            <div className="flex justify-center">
              <button
                onClick={swapColors}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
                Swap Colors
              </button>
            </div>
          </motion.div>
          
          {/* Preview and Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Preview */}
            <div 
              className="flex h-40 flex-col items-center justify-center rounded-lg shadow-md"
              style={{ backgroundColor: bgColor }}
            >
              <p 
                className="text-center text-xl font-bold"
                style={{ color: textColor }}
              >
                Preview Text
              </p>
              <p 
                className="text-center text-sm"
                style={{ color: textColor }}
              >
                This is how your text will look
              </p>
            </div>
            
            {/* Contrast Ratio */}
            <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-medium">Contrast Ratio</h3>
                <span className={`rounded-full px-3 py-1 text-sm font-bold ${
                  contrastResult.ratio >= 7 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : contrastResult.ratio >= 4.5 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {contrastResult.ratio}:1
                </span>
              </div>
              
              {/* WCAG Compliance Badges */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className={`rounded border p-2 text-center text-sm ${
                  contrastResult.AA 
                    ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400' 
                    : 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  AA: {contrastResult.AA ? 'Pass ✓' : 'Fail ✗'}
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">Normal Text</div>
                </div>
                <div className={`rounded border p-2 text-center text-sm ${
                  contrastResult.AAA 
                    ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400' 
                    : 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  AAA: {contrastResult.AAA ? 'Pass ✓' : 'Fail ✗'}
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">Normal Text</div>
                </div>
                <div className={`rounded border p-2 text-center text-sm ${
                  contrastResult.AALarge 
                    ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400' 
                    : 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  AA: {contrastResult.AALarge ? 'Pass ✓' : 'Fail ✗'}
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">Large Text</div>
                </div>
                <div className={`rounded border p-2 text-center text-sm ${
                  contrastResult.AAALarge 
                    ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400' 
                    : 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  AAA: {contrastResult.AAALarge ? 'Pass ✓' : 'Fail ✗'}
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">Large Text</div>
                </div>
              </div>
            </div>
            
            {/* CSS Code */}
            <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-medium">CSS Code</h3>
                <button
                  onClick={() => handleCopy(generateCSS())}
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                >
                  {copied ? (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <CopyIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <pre className="mt-2 rounded bg-gray-100 p-3 font-mono text-sm dark:bg-gray-700">
                {generateCSS()}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 