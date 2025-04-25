import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import chroma from 'chroma-js';
import { CopyIcon, CheckIcon } from '../components/Icons';
import { toast } from 'sonner';
import Header from '@/components/Header';

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
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pb-12">
      <Header />
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] rounded-full" style={{
          background: `radial-gradient(circle, ${chroma(color).alpha(0.2).css()} 0%, transparent 70%)`,
          filter: 'blur(72px)'
        }}></div>
      </div>

      <div className="relative z-10 pt-24 px-4">
        <motion.h1 
          className="mb-8 text-center text-3xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Color Picker
        </motion.h1>

        <div className="mx-auto max-w-4xl">
          <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg ring-1 ring-white/10">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Color Picker */}
              <motion.div 
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-50 blur-lg"></div>
                  <HexColorPicker 
                    color={color} 
                    onChange={setColor} 
                    className="w-full max-w-[280px] relative"
                  />
                </div>
                
                {/* Manual Input */}
                <div className="mt-6 w-full max-w-[280px]">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Color Value</label>
                  <div className="relative">
                    <div 
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full shadow-inner"
                      style={{ backgroundColor: color }}
                    ></div>
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
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 pl-12 py-3 text-gray-100 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Color Preview and Formats */}
              <motion.div 
                className="flex flex-col gap-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Color Preview */}
                <div className="relative overflow-hidden rounded-xl p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
                  <div 
                    className="flex h-44 items-center justify-center rounded-lg transition-colors relative"
                    style={{ backgroundColor: color }}
                  >
                    <p className="text-2xl font-bold" style={{ color: textColor }}>
                      Preview Text
                    </p>
                    <div className="absolute bottom-3 right-3 text-xs rounded-full px-2 py-1 bg-black/30 backdrop-blur-md text-white">
                      {color}
                    </div>
                  </div>
                </div>

                {/* Color Formats */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white mb-3">Color Formats</h3>
                  {colorFormats.map((format) => (
                    <div 
                      key={format.format}
                      className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800/70 p-3 shadow-md backdrop-blur-sm hover:border-gray-600 transition"
                    >
                      <span className="font-medium text-gray-300">{format.format}</span>
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-gray-900 px-3 py-2 font-mono text-sm text-gray-200">
                          {format.value}
                        </code>
                        <button
                          onClick={() => handleCopy(format.value, format.format)}
                          className="rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none transition-colors"
                        >
                          {copied === format.format ? (
                            <CheckIcon className="h-5 w-5 text-green-400" />
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
          </div>

          {/* Color Shades */}
          <motion.div 
            className="mt-8 bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg ring-1 ring-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="mb-4 text-xl font-bold text-white">Color Shades</h2>
            <div className="grid grid-cols-5 gap-3 md:grid-cols-10">
              {Array.from({ length: 10 }).map((_, i) => {
                const shade = chroma(color).set('hsl.l', i / 10);
                return (
                  <div 
                    key={i}
                    className="group relative overflow-hidden"
                  >
                    <div
                      className="absolute -inset-0.5 rounded-md opacity-75 blur-sm bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 group-hover:opacity-100 transition duration-300"
                      style={{ opacity: i === Math.round(chroma(color).get('hsl.l') * 10) ? 0.9 : 0 }}
                    ></div>
                    <div 
                      className="relative flex h-14 cursor-pointer items-center justify-center rounded-md transition-transform hover:scale-105 md:h-16"
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
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Color Harmony */}
          <motion.div 
            className="mt-8 bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg ring-1 ring-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="mb-6 text-xl font-bold text-white">Color Harmonies</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { name: 'Complementary', colors: [color, chroma(color).set('hsl.h', (chroma(color).get('hsl.h') + 180) % 360).hex()] },
                { name: 'Triadic', colors: [
                  color, 
                  chroma(color).set('hsl.h', (chroma(color).get('hsl.h') + 120) % 360).hex(),
                  chroma(color).set('hsl.h', (chroma(color).get('hsl.h') + 240) % 360).hex()
                ]},
                { name: 'Analogous', colors: [
                  chroma(color).set('hsl.h', (chroma(color).get('hsl.h') - 30 + 360) % 360).hex(),
                  color,
                  chroma(color).set('hsl.h', (chroma(color).get('hsl.h') + 30) % 360).hex()
                ]},
                { name: 'Monochromatic', colors: [
                  chroma(color).brighten(1.5).hex(),
                  color,
                  chroma(color).darken(1.5).hex()
                ]}
              ].map((harmony, idx) => (
                <div key={harmony.name} className="rounded-xl bg-gray-900/50 p-4 backdrop-blur-sm">
                  <h3 className="mb-3 text-md font-medium text-gray-200">{harmony.name}</h3>
                  <div className="flex overflow-hidden rounded-lg">
                    {harmony.colors.map((harmonyColor, i) => (
                      <div
                        key={i}
                        className="h-16 flex-1 cursor-pointer hover:scale-y-110 transition-transform"
                        style={{ backgroundColor: harmonyColor }}
                        onClick={() => setColor(harmonyColor)}
                        title={harmonyColor}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 