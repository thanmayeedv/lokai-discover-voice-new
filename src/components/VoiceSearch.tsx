import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type SupportedLanguage = 'hi-IN' | 'en-US' | 'te-IN' | 'ta-IN' | 'kn-IN';

const LANGUAGES: { code: SupportedLanguage; label: string }[] = [
  { code: 'hi-IN', label: 'हिंदी' },
  { code: 'en-US', label: 'English' },
  { code: 'te-IN', label: 'తెలుగు' },
  { code: 'ta-IN', label: 'தமிழ்' },
  { code: 'kn-IN', label: 'ಕನ್ನಡ' },
];

const VoiceSearch = () => {
  const { language, t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(language as SupportedLanguage);
  const [isTranslating, setIsTranslating] = useState(false);
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();

  // Sync selected language with global language
  useEffect(() => {
    setSelectedLang(language as SupportedLanguage);
  }, [language]);

  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcriptText = result[0].transcript;
        setTranscript(transcriptText);
        
        if (result.isFinal) {
          setSearchQuery(transcriptText);
          setIsListening(false);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          toast.error('Microphone access denied. Please enable it in your browser settings.');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognitionRef.current.lang = selectedLang;
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const translateAndSearch = async (query: string) => {
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setIsTranslating(true);
    try {
      const { data, error } = await supabase.functions.invoke('search-services', {
        body: { query, language: selectedLang }
      });

      if (error) throw error;

      const translatedQuery = data?.translatedQuery || query;
      
      if (data?.detected) {
        toast.success(`Translated: "${query}" → "${translatedQuery}"`);
      }

      navigate(`/services?search=${encodeURIComponent(translatedQuery)}`);
    } catch (error: any) {
      console.error('Translation error:', error);
      // Fallback to direct search if translation fails
      navigate(`/services?search=${encodeURIComponent(query)}`);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSearch = () => {
    const query = searchQuery || transcript;
    translateAndSearch(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">{t('voice.tapToSpeak')}</h3>
        <p className="text-muted-foreground mb-6">
          {t('hero.description')}
        </p>

        {/* Search Input */}
        <div className="flex gap-2 mb-6">
          <Input
            value={searchQuery || transcript}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="ಪ್ಲಂಬರ್, प्लम्बर, plumber..."
            className="flex-1"
            disabled={isTranslating}
          />
          <Button 
            onClick={handleSearch} 
            disabled={isTranslating || (!searchQuery && !transcript)}
          >
            {isTranslating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Voice Button */}
        <div className="relative mb-6">
          <Button
            onClick={toggleListening}
            size="lg"
            className={`w-20 h-20 rounded-full ${
              isListening 
                ? 'bg-accent hover:bg-accent-dark animate-pulse' 
                : 'bg-gradient-primary hover:opacity-90'
            }`}
            disabled={isTranslating}
          >
            {isListening ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </Button>

          {/* Voice Waveform Animation */}
          {isListening && (
            <div className="absolute -inset-4 flex items-center justify-center pointer-events-none">
              <div className="voice-wave">
                <div className="w-1 bg-accent rounded-full animate-pulse" style={{ height: '20px', animationDelay: '0s' }} />
                <div className="w-1 bg-accent rounded-full animate-pulse" style={{ height: '30px', animationDelay: '0.1s' }} />
                <div className="w-1 bg-accent rounded-full animate-pulse" style={{ height: '25px', animationDelay: '0.2s' }} />
                <div className="w-1 bg-accent rounded-full animate-pulse" style={{ height: '35px', animationDelay: '0.3s' }} />
                <div className="w-1 bg-accent rounded-full animate-pulse" style={{ height: '20px', animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="min-h-[60px] flex items-center justify-center">
          {isTranslating ? (
            <div className="text-primary font-medium flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              {t('voice.searching')}
            </div>
          ) : isListening ? (
            <div className="text-accent font-medium flex items-center gap-2">
              <Volume2 className="w-5 h-5 animate-pulse" />
              {t('voice.speakNow')} ({LANGUAGES.find(l => l.code === selectedLang)?.label})
            </div>
          ) : transcript ? (
            <div className="text-foreground bg-muted p-3 rounded-lg max-w-sm">
              "{transcript}"
            </div>
          ) : (
            <p className="text-muted-foreground">
              {t('voice.tapToSpeak')}
            </p>
          )}
        </div>

        {/* Language Options */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {LANGUAGES.map((lang) => (
            <Button 
              key={lang.code} 
              variant={selectedLang === lang.code ? 'default' : 'outline'} 
              size="sm" 
              className="rounded-full"
              onClick={() => setSelectedLang(lang.code)}
            >
              {lang.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceSearch;
