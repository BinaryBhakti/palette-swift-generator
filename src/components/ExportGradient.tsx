import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy } from 'lucide-react';

interface ExportGradientProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  colors: [string, string];
  // angle?: number; // Add if angle control is implemented
}

const ExportGradient: React.FC<ExportGradientProps> = ({ open, setOpen, colors /*, angle = 90*/ }) => {

  // Construct the CSS gradient string
  // Update this if angle/type controls are added
  const cssGradient = `background: linear-gradient(to right, ${colors[0]}, ${colors[1]});`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssGradient)
      .then(() => {
        toast.success("CSS gradient copied to clipboard!");
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        toast.error("Failed to copy CSS.");
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Gradient CSS</DialogTitle>
          <DialogDescription>
            Copy the CSS code below to use this gradient in your project.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            readOnly
            value={cssGradient}
            rows={4}
            className="font-mono text-sm resize-none"
          />
        </div>
        <Button onClick={handleCopy} className="w-full">
          <Copy className="mr-2 h-4 w-4" /> Copy CSS
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ExportGradient; 