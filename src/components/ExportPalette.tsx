
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ColorFormat, getColorInFormat } from '@/utils/colorUtils';
import { Copy, Download } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ExportPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  colors: string[];
}

const ExportPalette = ({ open, setOpen, colors }: ExportPaletteProps) => {
  const copyPaletteAsText = (format: ColorFormat) => {
    const formattedColors = colors.map(color => getColorInFormat(color, format));
    navigator.clipboard.writeText(formattedColors.join(', '));
    toast.success(`Palette copied as ${format} values!`);
  };

  const downloadPalette = () => {
    // Create a string representation of the palette
    const hexValues = colors.map(color => color).join('\n');
    
    // Create a Blob with the data
    const blob = new Blob([hexValues], { type: 'text/plain' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'palette-swift-colors.txt';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Palette downloaded!');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Palette</DialogTitle>
          <DialogDescription>
            Copy or download your color palette in different formats.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-wrap gap-2">
            {colors.map((color, index) => (
              <div 
                key={index}
                className="w-12 h-12 rounded-md border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          <div className="flex flex-col gap-2">
            <Button 
              onClick={() => copyPaletteAsText(ColorFormat.HEX)}
              variant="outline" 
              className="justify-start"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy as HEX values
            </Button>
            <Button 
              onClick={() => copyPaletteAsText(ColorFormat.RGB)}
              variant="outline" 
              className="justify-start"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy as RGB values
            </Button>
            <Button 
              onClick={() => copyPaletteAsText(ColorFormat.HSL)}
              variant="outline" 
              className="justify-start"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy as HSL values
            </Button>
            <Button 
              onClick={downloadPalette}
              variant="outline" 
              className="justify-start"
            >
              <Download className="mr-2 h-4 w-4" />
              Download as TXT
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportPalette;
