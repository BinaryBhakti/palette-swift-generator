import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import chroma from 'chroma-js';
import { CopyIcon, CheckIcon } from '../components/Icons';
import { toast } from 'sonner';
import Header from '@/components/Header';

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
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pb-12">
      <Header />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-[25rem] h-[25rem] rounded-full opacity-30 blur-[80px]" style={{ backgroundColor: textColor }}></div>
        <div className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] rounded-full opacity-30 blur-[80px]" style={{ backgroundColor: bgColor }}></div>
      </div>

      <div className="relative z-10 pt-24 px-4">
        <motion.h1 
          className="mb-8 text-center text-3xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contrast Checker
        </motion.h1>
        
        <div className="mx-auto max-w-5xl">
          <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg ring-1 ring-white/10">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Color Pickers */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-white mb-4">Select Colors</h2>
                
                {/* Tabs */}
                <div className="flex rounded-lg border border-gray-700 p-1 bg-gray-800/60">
                  <button
                    onClick={() => setActiveTab('text')}
                    className={`flex-1 rounded-md px-4 py-2 font-medium transition-colors ${
                      activeTab === 'text'
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    Text Color
                  </button>
                  <button
                    onClick={() => setActiveTab('background')}
                    className={`flex-1 rounded-md px-4 py-2 font-medium transition-colors ${
                      activeTab === 'background'
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    Background Color
                  </button>
                </div>
                
                {/* Active Color Picker */}
                <div className="flex justify-center">
                  {activeTab === 'text' ? (
                    <div className="flex flex-col items-center">
                      <p className="text-gray-300 mb-3">Current text color: <span className="font-mono">{textColor}</span></p>
                      <div className="relative">
                        <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-50 blur-lg"></div>
                        <HexColorPicker 
                          color={textColor} 
                          onChange={setTextColor} 
                          className="w-full max-w-[260px] relative"
                        />
                      </div>
                      <div className="mt-4 w-full max-w-[260px]">
                        <div className="relative">
                          <div 
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full shadow-inner"
                            style={{ backgroundColor: textColor }}
                          ></div>
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
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 pl-12 py-3 text-gray-100 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <p className="text-gray-300 mb-3">Current background color: <span className="font-mono">{bgColor}</span></p>
                      <div className="relative">
                        <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-50 blur-lg"></div>
                        <HexColorPicker 
                          color={bgColor} 
                          onChange={setBgColor} 
                          className="w-full max-w-[260px] relative"
                        />
                      </div>
                      <div className="mt-4 w-full max-w-[260px]">
                        <div className="relative">
                          <div 
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full shadow-inner"
                            style={{ backgroundColor: bgColor }}
                          ></div>
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
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 pl-12 py-3 text-gray-100 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Swap Colors Button */}
                <div className="flex justify-center">
                  <button
                    onClick={swapColors}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 font-medium text-white shadow-md hover:shadow-lg hover:opacity-90 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
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
                <h2 className="text-xl font-bold text-white mb-4">Preview & Results</h2>
                
                {/* Preview */}
                <div className="overflow-hidden rounded-xl p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                  <div 
                    className="flex flex-col items-center justify-center rounded-lg p-6 transition-colors h-48"
                    style={{ backgroundColor: bgColor }}
                  >
                    <p 
                      className="text-2xl font-bold mb-2"
                      style={{ color: textColor }}
                    >
                      Preview Text
                    </p>
                    <p 
                      className="text-base"
                      style={{ color: textColor }}
                    >
                      This is how your text will look
                    </p>
                    <p 
                      className="text-sm mt-1"
                      style={{ color: textColor }}
                    >
                      Check if it's readable across different text sizes
                    </p>
                  </div>
                </div>
                
                {/* Contrast Ratio */}
                <div className="rounded-xl bg-gray-800/60 p-5 shadow-lg ring-1 ring-white/10">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Contrast Ratio</h3>
                    <div className={`text-center ${
                      contrastResult.ratio >= 7
                        ? 'text-green-400'
                        : contrastResult.ratio >= 4.5
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}>
                      <span className="block text-2xl font-bold">
                        {contrastResult.ratio}:1
                      </span>
                      <span className="text-xs uppercase tracking-wider">
                        {contrastResult.ratio >= 7
                          ? 'Excellent'
                          : contrastResult.ratio >= 4.5
                          ? 'Good'
                          : 'Poor'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="h-3 w-full rounded-full bg-gray-700 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        contrastResult.ratio >= 7
                          ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                          : contrastResult.ratio >= 4.5
                          ? 'bg-gradient-to-r from-yellow-500 to-amber-400'
                          : 'bg-gradient-to-r from-red-500 to-rose-400'
                      }`}
                      style={{ width: `${Math.min(100, (contrastResult.ratio / 21) * 100)}%` }}
                    ></div>
                  </div>
                  
                  {/* WCAG Compliance Badges */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className={`rounded-xl border p-3 backdrop-blur-sm ${
                      contrastResult.AA 
                        ? 'border-green-500/30 bg-green-500/10 text-green-400' 
                        : 'border-red-500/30 bg-red-500/10 text-red-400'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">AA Standard</span>
                        <span className="rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wider bg-black/20">
                          {contrastResult.AA ? 'Pass' : 'Fail'}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-400">Normal Text (4.5:1)</div>
                    </div>
                    
                    <div className={`rounded-xl border p-3 backdrop-blur-sm ${
                      contrastResult.AAA 
                        ? 'border-green-500/30 bg-green-500/10 text-green-400' 
                        : 'border-red-500/30 bg-red-500/10 text-red-400'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">AAA Enhanced</span>
                        <span className="rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wider bg-black/20">
                          {contrastResult.AAA ? 'Pass' : 'Fail'}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-400">Normal Text (7:1)</div>
                    </div>
                    
                    <div className={`rounded-xl border p-3 backdrop-blur-sm ${
                      contrastResult.AALarge 
                        ? 'border-green-500/30 bg-green-500/10 text-green-400' 
                        : 'border-red-500/30 bg-red-500/10 text-red-400'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">AA Large</span>
                        <span className="rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wider bg-black/20">
                          {contrastResult.AALarge ? 'Pass' : 'Fail'}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-400">Large Text (3:1)</div>
                    </div>
                    
                    <div className={`rounded-xl border p-3 backdrop-blur-sm ${
                      contrastResult.AAALarge 
                        ? 'border-green-500/30 bg-green-500/10 text-green-400' 
                        : 'border-red-500/30 bg-red-500/10 text-red-400'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">AAA Large</span>
                        <span className="rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wider bg-black/20">
                          {contrastResult.AAALarge ? 'Pass' : 'Fail'}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-400">Large Text (4.5:1)</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* CSS Code */}
            <motion.div 
              className="mt-8 rounded-xl bg-gray-800/60 p-5 shadow-lg ring-1 ring-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">CSS Code</h3>
                <button
                  onClick={() => handleCopy(generateCSS())}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none transition-colors"
                >
                  {copied ? (
                    <CheckIcon className="h-5 w-5 text-green-400" />
                  ) : (
                    <CopyIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <pre className="rounded-lg bg-gray-900 p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                {generateCSS()}
              </pre>
            </motion.div>
          </div>
          
          {/* Accessibility Tips */}
          <motion.div 
            className="mt-8 bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg ring-1 ring-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="mb-6 text-xl font-bold text-white">Accessibility Tips</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-gray-900/50 p-4 backdrop-blur-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white">WCAG Standards</h3>
                <p className="mt-2 text-sm text-gray-400">WCAG 2.1 requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.</p>
              </div>
              
              <div className="rounded-xl bg-gray-900/50 p-4 backdrop-blur-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white">Large Text</h3>
                <p className="mt-2 text-sm text-gray-400">Large text is defined as 18pt (24px) or 14pt (18.5px) if bold. These have a lower contrast requirement.</p>
              </div>
              
              <div className="rounded-xl bg-gray-900/50 p-4 backdrop-blur-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white">Best Practice</h3>
                <p className="mt-2 text-sm text-gray-400">Aim for AAA compliance (7:1) whenever possible for better readability and inclusivity.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 