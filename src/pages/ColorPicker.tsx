import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import chroma from 'chroma-js';
import { CopyIcon, CheckIcon } from '../components/Icons';
import { toast } from 'sonner';

interface ColorFormat {
  format: string;
  value: string;
}

export default function ColorPicker() {
  const [color, setColor] = useState('#6366f1');
  const [copied, setCopied] = useState<string | null>(null);
  const [colorFormats, setColorFormats] = useState<ColorFormat[]>([]);

  useEffect(() => {
    try {
      const chromaColor = chroma(color);
      setColorFormats([
        { format: 'HEX', value: chromaColor.hex() },
        { format: 'RGB', value: chromaColor.css() },
        { format: 'HSL', value: chromaColor.css('hsl') }
      ]);
    } catch (error) {
      console.error('Invalid color', error);
    }
  }, [color]);

  const handleCopy = (value: string, format: string) => {
    navigator.clipboard.writeText(value);
    setCopied(format);
    toast.success(`${format} copied to clipboard`);
    setTimeout(() => setCopied(null), 1500);
  };

  // Calculate text color (black or white) based on background luminance
  const textColor = chroma(color).luminance() > 0.5 ? '#000000' : '#ffffff';

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="mb-8 text-center text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Color Picker
      </motion.h1>

      <div className="mx-auto max-w-3xl">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Color Picker */}
          <motion.div 
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <HexColorPicker 
              color={color} 
              onChange={setColor} 
              className="w-full max-w-[280px]"
            />
            
            {/* Manual Input */}
            <input
              type="text"
              value={color}
              onChange={(e) => {
                // Only update if it's a valid color
                try {
                  chroma(e.target.value);
                  setColor(e.target.value);
                } catch (error) {
                  // Invalid color, don't update
                }
              }}
              className="mt-4 w-full max-w-[280px] rounded border border-gray-300 bg-white px-3 py-2 text-center text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </motion.div>

          {/* Color Preview and Formats */}
          <motion.div 
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Color Preview */}
            <div 
              className="flex h-40 items-center justify-center rounded-lg shadow-md transition-colors"
              style={{ backgroundColor: color }}
            >
              <p className="text-xl font-bold" style={{ color: textColor }}>
                Preview Text
              </p>
            </div>

            {/* Color Formats */}
            <div className="space-y-3">
              {colorFormats.map((format) => (
                <div 
                  key={format.format}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <span className="font-medium text-gray-700 dark:text-gray-300">{format.format}</span>
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-700">
                      {format.value}
                    </code>
                    <button
                      onClick={() => handleCopy(format.value, format.format)}
                      className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                    >
                      {copied === format.format ? (
                        <CheckIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <CopyIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Color Shades */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="mb-4 text-xl font-bold">Color Shades</h2>
          <div className="grid grid-cols-5 gap-2 md:grid-cols-10">
            {Array.from({ length: 10 }).map((_, i) => {
              const shade = chroma(color).set('hsl.l', i / 10);
              return (
                <div 
                  key={i}
                  className="flex h-12 cursor-pointer items-center justify-center rounded-md transition-transform hover:scale-105 md:h-16"
                  style={{ backgroundColor: shade.hex() }}
                  onClick={() => setColor(shade.hex())}
                >
                  <span 
                    className="text-xs font-medium md:text-sm" 
                    style={{ color: shade.luminance() > 0.5 ? '#000' : '#fff' }}
                  >
                    {i * 10}%
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 