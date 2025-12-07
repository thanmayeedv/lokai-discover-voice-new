import { Search, Globe, User, LogOut, Settings, ShoppingCart, Package, Plus, BarChart3, Users, Bell, Heart, HelpCircle, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import Logo from './Logo';
import VoiceSearchInput from './VoiceSearchInput';

const Navbar = () => {
  const { user, profile, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const languages = [
    { code: 'en-US', label: 'English', flag: '🇺🇸' },
    { code: 'hi-IN', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'kn-IN', label: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'te-IN', label: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta-IN', label: 'தமிழ்', flag: '🇮🇳' }
  ];

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/auth');
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/services?search=${encodeURIComponent(query)}`);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'vendor': return 'default';
      case 'buyer': return 'secondary';
      default: return 'outline';
    }
  };

  const getRoleSpecificNavItems = () => {
    if (!user || !profile) return null;

    switch (profile.role) {
      case 'buyer':
        return (
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span>{t('nav.cart')}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>{t('nav.orders')}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>{t('nav.favorites')}</span>
            </Button>
          </div>
        );
      
      case 'vendor':
        return (
          <div className="hidden lg:flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => navigate('/vendor/dashboard')}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{t('nav.dashboard')}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => navigate('/vendor/dashboard')}
            >
              <Plus className="w-4 h-4" />
              <span>{t('nav.addService')}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2" disabled>
              <Package className="w-4 h-4" />
              <span>{t('nav.orders')}</span>
            </Button>
          </div>
        );
      
      case 'admin':
        return (
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{t('nav.manageUsers')}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span>{t('nav.analytics')}</span>
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Left Side */}
          <Logo />

          {/* Center Search Box */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <VoiceSearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              language={language}
              placeholder={t('nav.searchPlaceholder')}
            />
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <Select value={language} onValueChange={(val) => setLanguage(val as any)}>
              <SelectTrigger className="hidden sm:flex w-auto border-none bg-transparent gap-2 hover:bg-accent/10 transition-colors">
                <Globe className="w-4 h-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Notifications */}
            {user && (
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
              </Button>
            )}

            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="hidden sm:flex"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Role-specific Navigation */}
            {getRoleSpecificNavItems()}

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="/" className="text-foreground hover:text-accent transition-colors font-medium">
                {t('nav.home')}
              </a>
              <a href="/services" className="text-foreground hover:text-accent transition-colors font-medium">
                {t('nav.services')}
              </a>
              {user && (
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>{t('nav.help')}</span>
                </Button>
              )}
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-2">
              {user && profile ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">{profile.full_name || user.email}</span>
                      <Badge variant={getRoleBadgeVariant(profile.role)} className="text-xs">
                        {profile.role}
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <div className="flex flex-col">
                        <span className="font-medium">{profile.full_name || t('common.user')}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      {t('nav.profileSettings')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="flex items-center gap-2 text-destructive"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.signOut')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-hero text-white hover:opacity-90"
                >
                  {t('nav.signIn')}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <VoiceSearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            language={language}
            placeholder={t('nav.searchPlaceholder')}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
