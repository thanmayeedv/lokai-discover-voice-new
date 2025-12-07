import { useState, useEffect } from 'react';
import { Mic, MicOff, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useVoiceSearch } from '@/hooks/useVoiceSearch';

interface VoiceSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  language?: string;
  className?: string;
}

const VoiceSearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search for services in your area...",
  language = "en-US",
  className = ""
}: VoiceSearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState(value);

  const handleTranscript = (transcript: string) => {
    const cleanTranscript = transcript.trim();
    setSearchQuery(cleanTranscript);
    onChange(cleanTranscript);
  };

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    clearTranscript,
    isSupported
  } = useVoiceSearch(handleTranscript, language);

  // Update transcript in real-time
  useEffect(() => {
    if (transcript) {
      setSearchQuery(transcript);
      onChange(transcript);
    }
  }, [transcript, onChange]);

  // Update from external value changes
  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    onChange(newValue);
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      clearTranscript();
      startListening();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      e.preventDefault();
      onSearch(searchQuery);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={isListening ? "Listening..." : placeholder}
        className={`pl-10 pr-12 py-2 w-full rounded-xl border-2 focus:border-accent transition-colors ${
          isListening ? 'border-accent bg-accent/5' : ''
        }`}
      />
      {isSupported && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleMicClick}
          className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${
            isListening 
              ? 'text-accent hover:text-accent-dark animate-pulse' 
              : 'text-muted-foreground hover:text-accent'
          }`}
        >
          {isListening ? (
            <MicOff className="w-4 h-4" />
          ) : (
            <Mic className="w-4 h-4" />
          )}
        </Button>
      )}
      
      {/* Voice indicator */}
      {isListening && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
      )}
    </div>
  );
};

export default VoiceSearchInput;