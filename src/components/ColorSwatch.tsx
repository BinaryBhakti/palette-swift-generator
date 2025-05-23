
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
  const [isHovered, setIsHovered] = useState(false);
  const contrastColor = getContrastColor(color);
  const formattedColor = getColorInFormat(color, activeFormat);
  
  // Convert HEX to uppercase if the format is HEX
  const displayColor = activeFormat === ColorFormat.HEX 
    ? formattedColor.toUpperCase()
    : formattedColor;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedColor);
    setCopied(true);
    toast.success(`${displayColor} copied to clipboard!`);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center h-full w-full"
      style={{ 
        backgroundColor: color, 
        color: contrastColor
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={copyToClipboard}
          className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all duration-200"
          aria-label="Copy color code"
        >
          {copied ? <Check size={20} /> : <Copy size={20} />}
        </button>
      </div>
      
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">{displayColor}</h2>
        <p className="text-sm opacity-80">{activeFormat}</p>
      </div>
      
      {/* Lock button positioned below the hex value, ~75% down from the top */}
      <button
        onClick={toggleLock}
        className={`absolute left-1/2 transform -translate-x-1/2 bottom-1/4 p-3 rounded-full 
                   ${locked ? 'bg-white/30' : 'bg-white/10'} 
                   backdrop-blur-sm hover:bg-white/30 transition-all duration-300 
                   ${isHovered || locked ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        aria-label={locked ? "Unlock color" : "Lock color"}
      >
        {locked ? 
          <Lock size={24} className="animate-fade-in" /> : 
          <Unlock size={24} className={isHovered ? "animate-fade-in" : ""} />
        }
      </button>
    </div>
  );
};

export default ColorSwatch;
