
import React, { useState, useEffect, useCallback } from 'react';
import ColorSwatch from '@/components/ColorSwatch';
import PaletteControls from '@/components/PaletteControls';
import Header from '@/components/Header';
import ExportPalette from '@/components/ExportPalette';
import { ColorFormat, generateRandomPalette } from '@/utils/colorUtils';

const DEFAULT_PALETTE_SIZE = 5;

const Index = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [lockedColors, setLockedColors] = useState<boolean[]>([]);
  const [activeFormat, setActiveFormat] = useState<ColorFormat>(ColorFormat.HEX);
  const [exportOpen, setExportOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    generateNewPalette();
  }, []);

  const generateNewPalette = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    setColors(prevColors => {
      const newColors = [...prevColors];
      
      if (newColors.length === 0) {
        setLockedColors(Array(DEFAULT_PALETTE_SIZE).fill(false));
        return generateRandomPalette(DEFAULT_PALETTE_SIZE);
      }
      
      const randomColors = generateRandomPalette(newColors.length);
      
      // Only change unlocked colors
      return newColors.map((color, index) => {
        return lockedColors[index] ? color : randomColors[index];
      });
    });
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [lockedColors, isAnimating]);

  const toggleLock = (index: number) => {
    setLockedColors(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleExport = () => {
    setExportOpen(true);
  };
  
  // Handle spacebar press to generate new palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        generateNewPalette();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generateNewPalette]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Header />
      
      <div className="flex h-full">
        {colors.map((color, index) => (
          <div 
            key={`${color}-${index}`}
            className="flex-1 transition-all duration-500 overflow-hidden"
          >
            {/* Create a wrapper for the slide animation */}
            <div className="relative h-full w-full">
              {/* Current color swatch that will slide up */}
              <div 
                className={`absolute top-0 left-0 h-full w-full transition-all duration-500 ease-in-out ${isAnimating && !lockedColors[index] ? '-translate-y-full' : 'translate-y-0'}`}
                style={{ zIndex: 10 }}
              >
                <ColorSwatch 
                  color={color}
                  locked={lockedColors[index]}
                  toggleLock={() => toggleLock(index)}
                  activeFormat={activeFormat}
                />
              </div>
              
              {/* New color swatch that will slide up from below */}
              {isAnimating && !lockedColors[index] && (
                <div 
                  className="absolute top-full left-0 h-full w-full transition-all duration-500 ease-in-out translate-y-0"
                  style={{ 
                    backgroundColor: color, 
                    zIndex: 5 
                  }}
                >
                  <ColorSwatch 
                    color={color}
                    locked={lockedColors[index]}
                    toggleLock={() => toggleLock(index)}
                    activeFormat={activeFormat}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <PaletteControls 
        onGenerate={generateNewPalette}
        onExport={handleExport}
        activeFormat={activeFormat}
        setActiveFormat={setActiveFormat}
      />
      
      <ExportPalette 
        open={exportOpen}
        setOpen={setExportOpen}
        colors={colors}
      />
      
      <div className="absolute bottom-0 w-full text-center text-xs opacity-60 pb-1">
        Press space bar to generate a new palette
      </div>
    </div>
  );
};

export default Index;
