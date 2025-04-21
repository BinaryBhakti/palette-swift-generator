import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import GradientControls from '@/components/GradientControls';
import ExportGradient from '@/components/ExportGradient';
import { generateRandomColor } from '@/utils/colorUtils';
import { useIsMobile } from '@/hooks/use-mobile';

const GradientGenerator = () => {
  const [colors, setColors] = useState<[string, string]>(['#FFFFFF', '#000000']);
  const [nextColors, setNextColors] = useState<[string, string]>(['#FFFFFF', '#000000']);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const isMobile = useIsMobile();

  const generateNewGradient = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newColors: [string, string] = [generateRandomColor(), generateRandomColor()];
    setNextColors(newColors);

    setTimeout(() => {
      setColors(newColors);
      setIsAnimating(false);
    }, 600);
  }, [isAnimating]);

  useEffect(() => {
    const initialColors: [string, string] = [generateRandomColor(), generateRandomColor()];
    setColors(initialColors);
    setNextColors(initialColors);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        generateNewGradient();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generateNewGradient]);

  const handleExport = () => {
    setExportOpen(true);
  };

  const gradientStyle = (gradientColors: [string, string]) => ({
    background: `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`,
    transition: 'background 0.6s ease-out',
  });

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <Header />

      <div className={`flex-1 relative ${isMobile ? 'pt-32' : ''}`}>
        <div
          className={`absolute inset-0 transition-opacity duration-600 ease-out ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
          style={gradientStyle(colors)}
        >
        </div>
        <div
           className={`absolute inset-0 transition-opacity duration-600 ease-out ${
            isAnimating ? 'opacity-100' : 'opacity-0'
          }`}
           style={isAnimating ? gradientStyle(nextColors) : {}}
        ></div>
      </div>

      <GradientControls
        onGenerate={generateNewGradient}
        onExport={handleExport}
        isGenerating={isAnimating}
      />

       <ExportGradient
         open={exportOpen}
         setOpen={setExportOpen}
         colors={colors}
       />
    </div>
  );
};

export default GradientGenerator;