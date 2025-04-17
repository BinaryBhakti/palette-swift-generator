
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    generateNewPalette();
  }, []);

  const generateNewPalette = () => {
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
  };

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

  const columnHeight = `calc(100vh)`;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Header />
      
      <div className="flex h-full">
        {colors.map((color, index) => (
          <div 
            key={index} 
            className="flex-1 transition-all duration-500"
            style={{ height: columnHeight }}
          >
            <ColorSwatch 
              color={color}
              locked={lockedColors[index]}
              toggleLock={() => toggleLock(index)}
              activeFormat={activeFormat}
            />
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
