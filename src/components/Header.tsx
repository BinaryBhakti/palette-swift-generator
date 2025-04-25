import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Info, Palette, Layers, ArrowRightLeft, Pipette, Image, Contrast } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'HueCraft';
      case '/palette':
        return 'Palette Generator';
      case '/gradient':
        return 'Gradient Generator';
      case '/color-picker':
        return 'Color Picker';
      case '/image-picker':
        return 'Image Color Picker';
      case '/contrast':
        return 'Contrast Checker';
      default:
        return 'HueCraft';
    }
  };
  
  const getPageIcon = () => {
    switch (location.pathname) {
      case '/palette':
        return <Palette className="h-6 w-6 text-white group-hover:text-primary transition-colors" />;
      case '/gradient':
        return <Layers className="h-6 w-6 text-white group-hover:text-primary transition-colors" />;
      case '/color-picker':
        return <Pipette className="h-6 w-6 text-white group-hover:text-primary transition-colors" />;
      case '/image-picker':
        return <Image className="h-6 w-6 text-white group-hover:text-primary transition-colors" />;
      case '/contrast':
        return <Contrast className="h-6 w-6 text-white group-hover:text-primary transition-colors" />;
      default:
        return <Palette className="h-6 w-6 text-white group-hover:text-primary transition-colors" />;
    }
  };
  
  return (
    <header className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md text-white p-4 flex justify-between items-center z-10">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <Palette className="h-6 w-6 text-white group-hover:text-primary transition-colors" />
          <div>
            <h1 className="font-bold text-xl group-hover:text-primary transition-colors">HueCraft</h1>
            <p className="text-xs text-white/70">Color tools suite</p>
          </div>
        </Link>
        
        {location.pathname !== '/' && (
          <>
            <ArrowRightLeft className="h-5 w-5 text-white/50" />
            <div className="flex items-center gap-2 group">
              {getPageIcon()}
              <div>
                <h1 className="font-bold text-xl transition-colors">{getPageTitle()}</h1>
                <p className="text-xs text-white/70">
                  {location.pathname === '/palette' && 'Create harmonious palettes'}
                  {location.pathname === '/gradient' && 'Design stunning gradients'}
                  {location.pathname === '/color-picker' && 'Select perfect colors'}
                  {location.pathname === '/image-picker' && 'Extract from images'}
                  {location.pathname === '/contrast' && 'Check accessibility'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <span className="hidden sm:inline">Tools</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/palette" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span>Palette Generator</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/gradient" className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Gradient Generator</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/color-picker" className="flex items-center gap-2">
                <Pipette className="h-4 w-4" />
                <span>Color Picker</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/image-picker" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span>Image Color Picker</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/contrast" className="flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                <span>Contrast Checker</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">How to use</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">How to Use</DialogTitle>
              <DialogDescription>
                Tools and features available in HueCraft
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 my-4 text-sm">
              <p className="text-muted-foreground">
                Use the <span className="font-semibold">Tools</span> dropdown in the header to switch between different color tools.
              </p>
              <hr className="border-white/20" />
              <h3 className="font-semibold pt-2">Palette Generator</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground pl-2">
                <li>Press <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Spacebar</kbd> or click <span className="font-semibold">Generate</span> to create a new palette.</li>
                <li>Click the <span className="font-semibold">Lock</span> icon on a swatch to keep it during generation.</li>
                <li>Switch color formats (HEX, RGB, HSL) using the selector.</li>
                <li>Click the <span className="font-semibold">Copy</span> icon on a swatch to copy its code.</li>
                <li>Click <span className="font-semibold">Export</span> to save or share the palette.</li>
              </ol>

              <hr className="border-white/20" />
              <h3 className="font-semibold pt-2">Gradient Generator</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground pl-2">
                <li>Press <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Spacebar</kbd> or click <span className="font-semibold">Generate Gradient</span> to create a new gradient.</li>
                <li>Click <span className="font-semibold">Export CSS</span> to view and copy the CSS code for the gradient.</li>
              </ol>
              
              <hr className="border-white/20" />
              <h3 className="font-semibold pt-2">Other Tools</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
                <li><span className="font-semibold">Color Picker</span>: Select and explore colors with precision.</li>
                <li><span className="font-semibold">Image Color Picker</span>: Extract color palettes from uploaded images.</li>
                <li><span className="font-semibold">Contrast Checker</span>: Verify accessibility compliance for text/background combinations.</li>
              </ul>
            </div>
          </DialogContent>
        </Dialog>
        
        {(location.pathname === '/palette' || location.pathname === '/gradient') && (
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">
              {location.pathname === '/gradient' ? 'Save Gradient' : 'Save Palette'}
            </span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
