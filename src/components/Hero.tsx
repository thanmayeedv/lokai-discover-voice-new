import { MapPin, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import VoiceSearch from './VoiceSearch';
import heroBg from '@/assets/hero-bg.jpg';

const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroBg})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-white">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-6 h-6 text-accent" />
              <span className="text-accent font-medium">{t('hero.hyperlocal')}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {t('hero.discover')} <br />
              <span className="text-gradient bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                {t('hero.somethingLokai')}
              </span>
            </h1>
            
            <p className="text-xl mb-8 text-white/90 max-w-lg">
              {t('hero.description')}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-8">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                <span className="text-white/90">{t('hero.serviceProviders')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                <span className="text-white/90">{t('hero.avgRating')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-white/90">{t('hero.neighborhoods')}</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-hero" onClick={() => navigate('/auth')}>
                {t('hero.getStarted')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                {t('hero.learnMore')}
              </Button>
            </div>
          </div>
          
          {/* Right - Voice Search Component */}
          <div className="lg:pl-8">
            <VoiceSearch />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
