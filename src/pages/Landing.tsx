import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PaletteIcon, GradientIcon, ColorPickerIcon, ImagePickerIcon, ContrastIcon } from '../components/Icons';

interface ToolCardProps {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  color: string;
  index: number;
}

const ToolCard = ({ title, description, path, icon, color, index }: ToolCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-xl backdrop-blur-sm ${color} shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-20 w-20 rounded-full bg-white/10 blur-xl"></div>
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-20 w-20 rounded-full bg-white/10 blur-xl"></div>
      
      <Link to={path} className="block h-full w-full p-6">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left sm:flex-row sm:gap-4">
          <div className="mb-4 sm:mb-0 rounded-2xl bg-white/20 p-4 text-white shadow-inner transform transition-transform duration-300 group-hover:rotate-3">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm text-white/80">{description}</p>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                Explore tool <span className="ml-1">→</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function Landing() {
  const tools = [
    {
      title: "Palette Generator",
      description: "Create harmonious color palettes with one click",
      path: "/palette",
      icon: <PaletteIcon className="h-8 w-8" />,
      color: "bg-gradient-to-br from-violet-500 to-purple-600"
    },
    {
      title: "Gradient Maker",
      description: "Design stunning gradients with unlimited color stops",
      path: "/gradient",
      icon: <GradientIcon className="h-8 w-8" />,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      title: "Color Picker",
      description: "Select perfect colors with precision controls",
      path: "/color-picker",
      icon: <ColorPickerIcon className="h-8 w-8" />,
      color: "bg-gradient-to-br from-rose-500 to-pink-600"
    },
    {
      title: "Image Color Picker",
      description: "Extract color palettes from your favorite images",
      path: "/image-picker",
      icon: <ImagePickerIcon className="h-8 w-8" />,
      color: "bg-gradient-to-br from-amber-500 to-orange-600"
    },
    {
      title: "Contrast Checker",
      description: "Ensure accessibility with WCAG compliance testing",
      path: "/contrast",
      icon: <ContrastIcon className="h-8 w-8" />,
      color: "bg-gradient-to-br from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[10%] right-[10%] w-[20rem] h-[20rem] rounded-full bg-purple-600/20 blur-[8rem] animate-pulse"></div>
        <div className="absolute top-[40%] left-[10%] w-[30rem] h-[20rem] rounded-full bg-blue-600/20 blur-[8rem] animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-[10%] right-[20%] w-[25rem] h-[25rem] rounded-full bg-rose-600/20 blur-[8rem] animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-white mb-2">Palette Swift</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                Color Palette Generator
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 sm:max-w-3xl sm:mx-auto">
              Modern color tools for designers and developers. Create, explore, and refine your color choices with ease.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 flex justify-center gap-4"
            >
              <Link to="/palette" className="transform transition-all hover:scale-105 inline-flex items-center rounded-lg bg-white px-6 py-3 font-medium text-gray-900 shadow-md hover:shadow-xl">
                Get Started <span className="ml-2">→</span>
              </Link>
              <a href="#tools" className="inline-flex items-center rounded-lg border border-white/30 px-6 py-3 font-medium text-white backdrop-blur-sm hover:bg-white/10 transition-colors">
                Explore Tools
              </a>
            </motion.div>
          </motion.div>

          {/* Animated orb/gradient */}
          <div className="relative mb-20 h-48 w-full mx-auto max-w-md">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-gradient-to-r from-violet-600 via-pink-500 to-amber-500 blur-xl opacity-80 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 blur-xl opacity-80 animate-pulse" style={{ animationDelay: "500ms" }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-gradient-to-r from-rose-600 via-orange-500 to-yellow-500 blur-xl opacity-80 animate-pulse" style={{ animationDelay: "1000ms" }}></div>
              
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white shadow-lg shadow-white/30"></div>
            </motion.div>
          </div>
        </div>

        {/* Tool Cards Grid */}
        <motion.div 
          id="tools"
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="mb-10 text-center text-3xl font-bold text-white">Our Tools</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => (
              <ToolCard key={tool.title} {...tool} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Feature Section */}
        <motion.div 
          className="mx-auto mt-32 max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-8 shadow-lg ring-1 ring-white/10">
            <h2 className="mb-6 text-center text-3xl font-bold text-white">Why Choose Palette Swift?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">Fast & Intuitive</h3>
                <p className="text-gray-300">Generate beautiful color schemes with just one click</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">Pro-grade Tools</h3>
                <p className="text-gray-300">Everything you need for color work in one place</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">Accessibility First</h3>
                <p className="text-gray-300">Ensure your colors meet WCAG standards</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mx-auto mt-32 max-w-7xl text-center">
          <div className="pt-8 flex justify-center">
            <a 
              href="https://github.com/BinaryBhakti/palette-swift-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800/70 hover:bg-gray-700/80 transition-colors text-white backdrop-blur-sm border border-white/10 hover:scale-105 transform duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
} 