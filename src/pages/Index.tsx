
import React, { useState, useEffect, useCallback } from 'react';
import ColorSwatch from '@/components/ColorSwatch';
import PaletteControls from '@/components/PaletteControls';
import Header from '@/components/Header';
import ExportPalette from '@/components/ExportPalette';
import { ColorFormat, generateRandomPalette } from '@/utils/colorUtils';

const DEFAULT_PALETTE_SIZE = 5;

const Index = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [nextColors, setNextColors] = useState<string[]>([]);
  const [lockedColors, setLockedColors] = useState<boolean[]>([]);
  const [activeFormat, setActiveFormat] = useState<ColorFormat>(ColorFormat.HEX);
  const [exportOpen, setExportOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const initialColors = generateRandomPalette(DEFAULT_PALETTE_SIZE);
    setColors(initialColors);
    setNextColors(initialColors);
    setLockedColors(Array(DEFAULT_PALETTE_SIZE).fill(false));
  }, []);

  const generateNewPalette = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    const randomColors = generateRandomPalette(colors.length);
    const newColors = colors.map((color, idx) => {
      return lockedColors[idx] ? color : randomColors[idx];
    });
    
    setNextColors(newColors);
    
    // Ensure animation timeout is longer than the longest animation + delay
    // The longest animation will be the last swatch: (75ms * 4) + 500ms = 800ms
    setTimeout(() => {
      setColors(newColors);
      setIsAnimating(false);
    }, 600); // Increased from 500ms to ensure all animations complete
  }, [colors, lockedColors, isAnimating]);

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
            className="flex-1 h-full relative overflow-hidden"
          >
            {/* Current color swatch */}
            <div 
              className={`absolute top-0 left-0 h-full w-full transition-transform duration-500 ease-out ${
                isAnimating && !lockedColors[index] ? '-translate-y-full' : 'translate-y-0'
              }`}
              style={{
                transitionDelay: `${index * 50}ms` // Reduced delay to prevent animation cutting off
              }}
            >
              <ColorSwatch 
                color={color}
                locked={lockedColors[index]}
                toggleLock={() => toggleLock(index)}
                activeFormat={activeFormat}
              />
            </div>
            
            {/* Next color swatch */}
            <div 
              className={`absolute top-full left-0 h-full w-full transition-transform duration-500 ease-out ${
                isAnimating && !lockedColors[index] ? '-translate-y-full' : 'translate-y-0'
              }`}
              style={{
                transitionDelay: `${index * 50}ms` // Reduced delay to prevent animation cutting off
              }}
            >
              <ColorSwatch 
                color={nextColors[index]}
                locked={lockedColors[index]}
                toggleLock={() => toggleLock(index)}
                activeFormat={activeFormat}
              />
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
