
import React, { useState } from 'react';
import { Lock, Unlock, Copy, Check } from 'lucide-react';
import { ColorFormat, getColorInFormat, getContrastColor } from '@/utils/colorUtils';
import { toast } from '@/components/ui/sonner';

interface ColorSwatchProps {
  color: string;
  locked: boolean;
  toggleLock: () => void;
  activeFormat: ColorFormat;
}

const ColorSwatch = ({ color, locked, toggleLock, activeFormat }: ColorSwatchProps) => {
  const [copied, setCopied] = useState(false);
  const contrastColor = getContrastColor(color);
  const formattedColor = getColorInFormat(color, activeFormat);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedColor);
    setCopied(true);
    toast.success(`${formattedColor} copied to clipboard!`);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center h-full w-full transition-all duration-300 animate-fade-in"
      style={{ 
        backgroundColor: color, 
        color: contrastColor
      }}
    >
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={toggleLock}
          className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all duration-200"
          aria-label={locked ? "Unlock color" : "Lock color"}
        >
          {locked ? <Lock size={20} /> : <Unlock size={20} />}
        </button>
        <button
          onClick={copyToClipboard}
          className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all duration-200"
          aria-label="Copy color code"
        >
          {copied ? <Check size={20} /> : <Copy size={20} />}
        </button>
      </div>
      
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">{formattedColor}</h2>
        <p className="text-sm opacity-80">{activeFormat}</p>
      </div>
    </div>
  );
};

export default ColorSwatch;
