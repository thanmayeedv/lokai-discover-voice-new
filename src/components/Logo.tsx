import { MapPin, Cpu } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="relative">
        {/* Location pin with AI circuits merged */}
        <div className="relative">
          <MapPin className="w-8 h-8 text-primary logo-pulse" />
          <Cpu className="w-4 h-4 text-accent absolute top-1 right-0 opacity-80" />
        </div>
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="font-bold text-2xl">
        <span className="text-primary">Lok</span>
        <span className="text-accent">AI</span>
      </div>
    </div>
  );
};

export default Logo;