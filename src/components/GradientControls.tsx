import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Share } from 'lucide-react'; // Or Download icon if preferred

interface GradientControlsProps {
  onGenerate: () => void;
  onExport: () => void;
  isGenerating: boolean; // To disable button during animation
}

const GradientControls: React.FC<GradientControlsProps> = ({ onGenerate, onExport, isGenerating }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center items-center gap-4 bg-black/30 backdrop-blur-sm z-10">
      {/* TODO: Add controls for angle, type etc. here later */}
      <Button onClick={onGenerate} size="lg" disabled={isGenerating}>
        <RefreshCcw className={`mr-2 h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} /> Generate Gradient
      </Button>
      <Button onClick={onExport} size="lg" variant="outline">
        <Share className="mr-2 h-5 w-5" /> Export CSS
      </Button>
    </div>
  );
};

export default GradientControls; 