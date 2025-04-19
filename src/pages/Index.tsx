import React, { useState, useEffect, useCallback } from 'react';
import ColorSwatch from '@/components/ColorSwatch';
import PaletteControls from '@/components/PaletteControls';
import Header from '@/components/Header';
import ExportPalette from '@/components/ExportPalette';
import { ColorFormat, generateRandomPalette } from '@/utils/colorUtils';
import { useIsMobile } from '@/hooks/use-mobile';

const DEFAULT_PALETTE_SIZE = 5;

const Index = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [nextColors, setNextColors] = useState<string[]>([]);
  const [lockedColors, setLockedColors] = useState<boolean[]>([]);
  const [activeFormat, setActiveFormat] = useState<ColorFormat>(ColorFormat.HEX);
  const [exportOpen, setExportOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobile = useIsMobile();

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
    
    setTimeout(() => {
      setColors(newColors);
      setIsAnimating(false);
    }, 600);
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
    <div className="relative min-h-screen w-full overflow-hidden">
      <Header />
      
      <div className={`flex ${isMobile ? 'flex-col h-[calc(100vh-4rem)]' : 'h-full'}`}>
        {colors.map((color, index) => (
          <div 
            key={`${color}-${index}`}
            className={`${isMobile ? 'h-full flex-1' : 'flex-1 h-full'} relative overflow-hidden`}
          >
            <div 
              className={`absolute inset-0 transition-transform duration-500 ease-out ${
                isAnimating && !lockedColors[index] 
                  ? isMobile 
                    ? '-translate-x-full' 
                    : '-translate-y-full'
                  : 'translate-x-0 translate-y-0'
              }`}
              style={{
                transitionDelay: `${index * 50}ms`
              }}
            >
              <ColorSwatch 
                color={color}
                locked={lockedColors[index]}
                toggleLock={() => toggleLock(index)}
                activeFormat={activeFormat}
              />
            </div>
            
            <div 
              className={`absolute inset-0 transition-transform duration-500 ease-out ${
                isAnimating && !lockedColors[index] 
                  ? isMobile 
                    ? '-translate-x-full' 
                    : '-translate-y-full'
                  : isMobile 
                    ? 'translate-x-full'
                    : 'translate-y-full'
              }`}
              style={{
                transitionDelay: `${index * 50}ms`
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
