import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PaletteIcon, GradientIcon, ColorPickerIcon, ImagePickerIcon, ContrastIcon } from '../components/Icons';

interface ToolCardProps {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  color: string;
}

const ToolCard = ({ title, description, path, icon, color }: ToolCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-xl p-6 ${color} shadow-md backdrop-blur-sm`}
    >
      <Link to={path} className="block h-full w-full">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-white/20 p-3 text-white">{icon}</div>
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="mt-1 text-sm text-white/80">{description}</p>
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
      icon: <PaletteIcon className="h-6 w-6" />,
      color: "bg-gradient-to-br from-violet-500 to-purple-600"
    },
    {
      title: "Gradient Maker",
      description: "Design stunning gradients with unlimited color stops",
      path: "/gradient",
      icon: <GradientIcon className="h-6 w-6" />,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      title: "Color Picker",
      description: "Select perfect colors with precision controls",
      path: "/color-picker",
      icon: <ColorPickerIcon className="h-6 w-6" />,
      color: "bg-gradient-to-br from-rose-500 to-pink-600"
    },
    {
      title: "Image Color Picker",
      description: "Extract color palettes from your favorite images",
      path: "/image-picker",
      icon: <ImagePickerIcon className="h-6 w-6" />,
      color: "bg-gradient-to-br from-amber-500 to-orange-600"
    },
    {
      title: "Contrast Checker",
      description: "Ensure accessibility with WCAG compliance testing",
      path: "/contrast",
      icon: <ContrastIcon className="h-6 w-6" />,
      color: "bg-gradient-to-br from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block text-gray-900 dark:text-white">HueCraft</span>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
              Color Tools Suite
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 dark:text-gray-300 sm:max-w-3xl sm:mx-auto">
            Modern color tools for designers and developers. Create, explore, and refine your color choices with ease.
          </p>
        </motion.div>

        {/* Animated orb/gradient (simplified version) */}
        <div className="relative mb-12 h-40 w-full mx-auto max-w-md">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-gradient-to-r from-violet-600 via-pink-500 to-amber-500 blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 blur-xl opacity-70 animate-pulse" style={{ animationDelay: "300ms" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-gradient-to-r from-rose-600 via-orange-500 to-yellow-500 blur-xl opacity-70 animate-pulse" style={{ animationDelay: "600ms" }}></div>
        </div>
      </div>

      {/* Tool Cards Grid */}
      <div className="mx-auto mt-16 max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ToolCard {...tool} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mx-auto mt-20 max-w-7xl">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-4">Created with ❤️ by HueCraft Team</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">GitHub</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Twitter</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
} 