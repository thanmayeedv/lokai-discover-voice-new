import { createContext, useContext, useState, ReactNode } from 'react';

type LanguageCode = 'en-US' | 'hi-IN' | 'kn-IN' | 'te-IN' | 'ta-IN';

interface Translations {
  [key: string]: {
    [key in LanguageCode]: string;
  };
}

const translations: Translations = {
  // Navbar
  'nav.home': {
    'en-US': 'Home',
    'hi-IN': 'होम',
    'kn-IN': 'ಮುಖಪುಟ',
    'te-IN': 'హోమ్',
    'ta-IN': 'முகப்பு',
  },
  'nav.services': {
    'en-US': 'Services',
    'hi-IN': 'सेवाएं',
    'kn-IN': 'ಸೇವೆಗಳು',
    'te-IN': 'సేవలు',
    'ta-IN': 'சேவைகள்',
  },
  'nav.cart': {
    'en-US': 'Cart',
    'hi-IN': 'कार्ट',
    'kn-IN': 'ಕಾರ್ಟ್',
    'te-IN': 'కార్ట్',
    'ta-IN': 'வண்டி',
  },
  'nav.orders': {
    'en-US': 'Orders',
    'hi-IN': 'ऑर्डर',
    'kn-IN': 'ಆದೇಶಗಳು',
    'te-IN': 'ఆర్డర్లు',
    'ta-IN': 'ஆர்டர்கள்',
  },
  'nav.favorites': {
    'en-US': 'Favorites',
    'hi-IN': 'पसंदीदा',
    'kn-IN': 'ಮೆಚ್ಚಿನವುಗಳು',
    'te-IN': 'ఇష్టమైనవి',
    'ta-IN': 'பிடித்தவை',
  },
  'nav.dashboard': {
    'en-US': 'Dashboard',
    'hi-IN': 'डैशबोर्ड',
    'kn-IN': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'te-IN': 'డాష్‌బోర్డ్',
    'ta-IN': 'டாஷ்போர்டு',
  },
  'nav.addService': {
    'en-US': 'Add Service',
    'hi-IN': 'सेवा जोड़ें',
    'kn-IN': 'ಸೇವೆ ಸೇರಿಸಿ',
    'te-IN': 'సేవ జోడించు',
    'ta-IN': 'சேவை சேர்',
  },
  'nav.manageUsers': {
    'en-US': 'Manage Users',
    'hi-IN': 'उपयोगकर्ता प्रबंधित करें',
    'kn-IN': 'ಬಳಕೆದಾರರನ್ನು ನಿರ್ವಹಿಸಿ',
    'te-IN': 'వినియోగదారులను నిర్వహించు',
    'ta-IN': 'பயனர்களை நிர்வகி',
  },
  'nav.analytics': {
    'en-US': 'Analytics',
    'hi-IN': 'विश्लेषण',
    'kn-IN': 'ವಿಶ್ಲೇಷಣೆ',
    'te-IN': 'విశ్లేషణలు',
    'ta-IN': 'பகுப்பாய்வு',
  },
  'nav.help': {
    'en-US': 'Help',
    'hi-IN': 'मदद',
    'kn-IN': 'ಸಹಾಯ',
    'te-IN': 'సహాయం',
    'ta-IN': 'உதவி',
  },
  'nav.signIn': {
    'en-US': 'Sign In',
    'hi-IN': 'साइन इन',
    'kn-IN': 'ಸೈನ್ ಇನ್',
    'te-IN': 'సైన్ ఇన్',
    'ta-IN': 'உள்நுழை',
  },
  'nav.signOut': {
    'en-US': 'Sign Out',
    'hi-IN': 'साइन आउट',
    'kn-IN': 'ಸೈನ್ ಔಟ್',
    'te-IN': 'సైన్ అవుట్',
    'ta-IN': 'வெளியேறு',
  },
  'nav.profileSettings': {
    'en-US': 'Profile Settings',
    'hi-IN': 'प्रोफ़ाइल सेटिंग्स',
    'kn-IN': 'ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    'te-IN': 'ప్రొఫైల్ సెట్టింగ్‌లు',
    'ta-IN': 'சுயவிவர அமைப்புகள்',
  },
  'nav.searchPlaceholder': {
    'en-US': 'Search for services in your area...',
    'hi-IN': 'अपने क्षेत्र में सेवाएं खोजें...',
    'kn-IN': 'ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ...',
    'te-IN': 'మీ ప్రాంతంలో సేవలను వెతకండి...',
    'ta-IN': 'உங்கள் பகுதியில் சேவைகளைத் தேடுங்கள்...',
  },

  // Hero
  'hero.hyperlocal': {
    'en-US': 'Hyperlocal Discovery',
    'hi-IN': 'स्थानीय खोज',
    'kn-IN': 'ಸ್ಥಳೀಯ ಶೋಧನೆ',
    'te-IN': 'స్థానిక అన్వేషణ',
    'ta-IN': 'உள்ளூர் கண்டுபிடிப்பு',
  },
  'hero.discover': {
    'en-US': 'Discover',
    'hi-IN': 'खोजें',
    'kn-IN': 'ಅನ್ವೇಷಿಸಿ',
    'te-IN': 'కనుగొనండి',
    'ta-IN': 'கண்டறியுங்கள்',
  },
  'hero.somethingLokai': {
    'en-US': 'something LokAI',
    'hi-IN': 'कुछ LokAI',
    'kn-IN': 'ಏನಾದರೂ LokAI',
    'te-IN': 'ఏదైనా LokAI',
    'ta-IN': 'ஏதாவது LokAI',
  },
  'hero.description': {
    'en-US': 'Find trusted local services in your neighborhood using AI-powered voice search. Speak in your language, get instant recommendations.',
    'hi-IN': 'AI-संचालित वॉयस सर्च का उपयोग करके अपने पड़ोस में विश्वसनीय स्थानीय सेवाएं खोजें। अपनी भाषा में बोलें, तुरंत सिफारिशें पाएं।',
    'kn-IN': 'AI-ಚಾಲಿತ ಧ್ವನಿ ಹುಡುಕಾಟವನ್ನು ಬಳಸಿ ನಿಮ್ಮ ನೆರೆಹೊರೆಯಲ್ಲಿ ವಿಶ್ವಾಸಾರ್ಹ ಸ್ಥಳೀಯ ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ।',
    'te-IN': 'AI-ఆధారిత వాయిస్ సెర్చ్ ఉపయోగించి మీ పొరుగులో నమ్మదగిన స్థానిక సేవలను కనుగొనండి।',
    'ta-IN': 'AI-இயக்கப்படும் குரல் தேடலைப் பயன்படுத்தி உங்கள் அக்கம்பக்கத்தில் நம்பகமான உள்ளூர் சேவைகளைக் கண்டறியுங்கள்।',
  },
  'hero.serviceProviders': {
    'en-US': '10K+ Service Providers',
    'hi-IN': '10K+ सेवा प्रदाता',
    'kn-IN': '10K+ ಸೇವಾ ಪೂರೈಕೆದಾರರು',
    'te-IN': '10K+ సేవా ప్రదాతలు',
    'ta-IN': '10K+ சேவை வழங்குநர்கள்',
  },
  'hero.avgRating': {
    'en-US': '4.8 Average Rating',
    'hi-IN': '4.8 औसत रेटिंग',
    'kn-IN': '4.8 ಸರಾಸರಿ ರೇಟಿಂಗ್',
    'te-IN': '4.8 సగటు రేటింగ్',
    'ta-IN': '4.8 சராசரி மதிப்பீடு',
  },
  'hero.neighborhoods': {
    'en-US': '500+ Neighborhoods',
    'hi-IN': '500+ पड़ोस',
    'kn-IN': '500+ ನೆರೆಹೊರೆಗಳು',
    'te-IN': '500+ పొరుగు ప్రాంతాలు',
    'ta-IN': '500+ சுற்றுப்புறங்கள்',
  },
  'hero.getStarted': {
    'en-US': 'Get Started Free',
    'hi-IN': 'मुफ्त शुरू करें',
    'kn-IN': 'ಉಚಿತ ಪ್ರಾರಂಭಿಸಿ',
    'te-IN': 'ఉచితంగా ప్రారంభించండి',
    'ta-IN': 'இலவசமாக தொடங்குங்கள்',
  },
  'hero.learnMore': {
    'en-US': 'Learn More',
    'hi-IN': 'और जानें',
    'kn-IN': 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
    'te-IN': 'మరింత తెలుసుకోండి',
    'ta-IN': 'மேலும் அறிய',
  },

  // Service Categories
  'categories.title': {
    'en-US': 'Popular Services',
    'hi-IN': 'लोकप्रिय सेवाएं',
    'kn-IN': 'ಜನಪ್ರಿಯ ಸೇವೆಗಳು',
    'te-IN': 'ప్రసిద్ధ సేవలు',
    'ta-IN': 'பிரபலமான சேவைகள்',
  },
  'categories.description': {
    'en-US': 'Find trusted local service providers in your neighborhood. All verified and rated by your community.',
    'hi-IN': 'अपने पड़ोस में विश्वसनीय स्थानीय सेवा प्रदाताओं को खोजें। सभी सत्यापित और आपके समुदाय द्वारा रेटेड।',
    'kn-IN': 'ನಿಮ್ಮ ನೆರೆಹೊರೆಯಲ್ಲಿ ವಿಶ್ವಾಸಾರ್ಹ ಸ್ಥಳೀಯ ಸೇವಾ ಪೂರೈಕೆದಾರರನ್ನು ಹುಡುಕಿ।',
    'te-IN': 'మీ పొరుగులో నమ్మదగిన స్థానిక సేవా ప్రదాతలను కనుగొనండి।',
    'ta-IN': 'உங்கள் அக்கம்பக்கத்தில் நம்பகமான உள்ளூர் சேவை வழங்குநர்களைக் கண்டறியுங்கள்।',
  },
  'categories.plumber': {
    'en-US': 'Plumber',
    'hi-IN': 'प्लंबर',
    'kn-IN': 'ಪ್ಲಂಬರ್',
    'te-IN': 'ప్లంబర్',
    'ta-IN': 'குழாய் பணியாளர்',
  },
  'categories.plumberDesc': {
    'en-US': 'Pipes, leaks, repairs',
    'hi-IN': 'पाइप, रिसाव, मरम्मत',
    'kn-IN': 'ಪೈಪ್‌ಗಳು, ಸೋರಿಕೆಗಳು, ದುರಸ್ತಿಗಳು',
    'te-IN': 'పైపులు, లీక్‌లు, మరమ్మత్తులు',
    'ta-IN': 'குழாய்கள், கசிவுகள், பழுதுபார்ப்பு',
  },
  'categories.kirani': {
    'en-US': 'Kirani Store',
    'hi-IN': 'किराना दुकान',
    'kn-IN': 'ಕಿರಾಣಿ ಅಂಗಡಿ',
    'te-IN': 'కిరాణా షాపు',
    'ta-IN': 'மளிகைக் கடை',
  },
  'categories.kiraniDesc': {
    'en-US': 'Groceries, daily needs',
    'hi-IN': 'किराना, दैनिक जरूरतें',
    'kn-IN': 'ದಿನಸಿ, ದೈನಂದಿನ ಅಗತ್ಯಗಳು',
    'te-IN': 'కిరాణా, రోజువారీ అవసరాలు',
    'ta-IN': 'மளிகை, தினசரி தேவைகள்',
  },
  'categories.tutor': {
    'en-US': 'Tutor',
    'hi-IN': 'शिक्षक',
    'kn-IN': 'ಶಿಕ್ಷಕ',
    'te-IN': 'ట్యూటర్',
    'ta-IN': 'ஆசிரியர்',
  },
  'categories.tutorDesc': {
    'en-US': 'Home tutoring, classes',
    'hi-IN': 'होम ट्यूशन, कक्षाएं',
    'kn-IN': 'ಮನೆ ಟ್ಯೂಷನ್, ತರಗತಿಗಳು',
    'te-IN': 'హోమ్ ట్యూషన్, క్లాసులు',
    'ta-IN': 'வீட்டு பயிற்சி, வகுப்புகள்',
  },
  'categories.electrician': {
    'en-US': 'Electrician',
    'hi-IN': 'इलेक्ट्रीशियन',
    'kn-IN': 'ಎಲೆಕ್ಟ್ರಿಷಿಯನ್',
    'te-IN': 'ఎలక్ట్రీషియన్',
    'ta-IN': 'மின் தொழிலாளி',
  },
  'categories.electricianDesc': {
    'en-US': 'Wiring, appliances',
    'hi-IN': 'वायरिंग, उपकरण',
    'kn-IN': 'ವೈರಿಂಗ್, ಉಪಕರಣಗಳು',
    'te-IN': 'వైరింగ్, ఉపకరణాలు',
    'ta-IN': 'வயரிங், சாதனங்கள்',
  },
  'categories.mechanic': {
    'en-US': 'Mechanic',
    'hi-IN': 'मैकेनिक',
    'kn-IN': 'ಮೆಕ್ಯಾನಿಕ್',
    'te-IN': 'మెకానిక్',
    'ta-IN': 'மெக்கானிக்',
  },
  'categories.mechanicDesc': {
    'en-US': 'Vehicle repairs',
    'hi-IN': 'वाहन मरम्मत',
    'kn-IN': 'ವಾಹನ ದುರಸ್ತಿ',
    'te-IN': 'వాహన మరమ్మత్తు',
    'ta-IN': 'வாகன பழுதுபார்ப்பு',
  },
  'categories.cook': {
    'en-US': 'Cook',
    'hi-IN': 'खाना बनाने वाला',
    'kn-IN': 'ಅಡುಗೆಯವರು',
    'te-IN': 'వంటవాడు',
    'ta-IN': 'சமையல்காரர்',
  },
  'categories.cookDesc': {
    'en-US': 'Home cooking, catering',
    'hi-IN': 'घर का खाना, कैटरिंग',
    'kn-IN': 'ಮನೆ ಅಡುಗೆ, ಕ್ಯಾಟರಿಂಗ್',
    'te-IN': 'ఇంటి వంట, క్యాటరింగ్',
    'ta-IN': 'வீட்டு சமையல், கேட்டரிங்',
  },

  // Services Page
  'services.title': {
    'en-US': 'Available Services',
    'hi-IN': 'उपलब्ध सेवाएं',
    'kn-IN': 'ಲಭ್ಯವಿರುವ ಸೇವೆಗಳು',
    'te-IN': 'అందుబాటులో ఉన్న సేవలు',
    'ta-IN': 'கிடைக்கும் சேவைகள்',
  },
  'services.searchResults': {
    'en-US': 'Search Results',
    'hi-IN': 'खोज परिणाम',
    'kn-IN': 'ಹುಡುಕಾಟ ಫಲಿತಾಂಶಗಳು',
    'te-IN': 'శోధన ఫలితాలు',
    'ta-IN': 'தேடல் முடிவுகள்',
  },
  'services.noResults': {
    'en-US': 'No services found. New vendor services require admin approval before appearing here.',
    'hi-IN': 'कोई सेवा नहीं मिली। नई विक्रेता सेवाओं को यहां दिखाई देने से पहले व्यवस्थापक अनुमोदन की आवश्यकता है।',
    'kn-IN': 'ಯಾವುದೇ ಸೇವೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ। ಹೊಸ ಮಾರಾಟಗಾರ ಸೇವೆಗಳಿಗೆ ಇಲ್ಲಿ ಕಾಣಿಸಿಕೊಳ್ಳಲು ನಿರ್ವಾಹಕ ಅನುಮೋದನೆ ಅಗತ್ಯವಿದೆ।',
    'te-IN': 'సేవలు కనుగొనబడలేదు. కొత్త విక్రేత సేవలకు ఇక్కడ కనిపించడానికి అడ్మిన్ ఆమోదం అవసరం.',
    'ta-IN': 'சேவைகள் எதுவும் கிடைக்கவில்லை. புதிய விற்பனையாளர் சேவைகள் இங்கு தோன்ற நிர்வாகி ஒப்புதல் தேவை.',
  },
  'services.loading': {
    'en-US': 'Loading services...',
    'hi-IN': 'सेवाएं लोड हो रही हैं...',
    'kn-IN': 'ಸೇವೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
    'te-IN': 'సేవలను లోడ్ చేస్తోంది...',
    'ta-IN': 'சேவைகள் ஏற்றப்படுகின்றன...',
  },
  'services.approved': {
    'en-US': 'Approved',
    'hi-IN': 'स्वीकृत',
    'kn-IN': 'ಅನುಮೋದಿಸಲಾಗಿದೆ',
    'te-IN': 'ఆమోదించబడింది',
    'ta-IN': 'அங்கீகரிக்கப்பட்டது',
  },

  // Voice Search
  'voice.speakNow': {
    'en-US': 'Speak now...',
    'hi-IN': 'अभी बोलें...',
    'kn-IN': 'ಈಗ ಮಾತನಾಡಿ...',
    'te-IN': 'ఇప్పుడు మాట్లాడండి...',
    'ta-IN': 'இப்போது பேசுங்கள்...',
  },
  'voice.tapToSpeak': {
    'en-US': 'Tap to speak',
    'hi-IN': 'बोलने के लिए टैप करें',
    'kn-IN': 'ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
    'te-IN': 'మాట్లాడటానికి నొక్కండి',
    'ta-IN': 'பேச தட்டவும்',
  },
  'voice.searching': {
    'en-US': 'Searching...',
    'hi-IN': 'खोज रहे हैं...',
    'kn-IN': 'ಹುಡುಕುತ್ತಿದೆ...',
    'te-IN': 'వెతుకుతోంది...',
    'ta-IN': 'தேடுகிறது...',
  },

  // Common
  'common.user': {
    'en-US': 'User',
    'hi-IN': 'उपयोगकर्ता',
    'kn-IN': 'ಬಳಕೆದಾರ',
    'te-IN': 'వినియోగదారు',
    'ta-IN': 'பயனர்',
  },
  'common.locationDetected': {
    'en-US': 'Location detected',
    'hi-IN': 'स्थान का पता चला',
    'kn-IN': 'ಸ್ಥಳ ಪತ್ತೆಯಾಗಿದೆ',
    'te-IN': 'స్థానం గుర్తించబడింది',
    'ta-IN': 'இடம் கண்டறியப்பட்டது',
  },
  'common.detectingLocation': {
    'en-US': 'Detecting location...',
    'hi-IN': 'स्थान का पता लगा रहे हैं...',
    'kn-IN': 'ಸ್ಥಳವನ್ನು ಪತ್ತೆಮಾಡಲಾಗುತ್ತಿದೆ...',
    'te-IN': 'స్థానాన్ని గుర్తిస్తోంది...',
    'ta-IN': 'இடம் கண்டறியப்படுகிறது...',
  },
  'common.detectLocation': {
    'en-US': 'Detect my location',
    'hi-IN': 'मेरा स्थान पता करें',
    'kn-IN': 'ನನ್ನ ಸ್ಥಳವನ್ನು ಪತ್ತೆಮಾಡಿ',
    'te-IN': 'నా స్థానాన్ని గుర్తించు',
    'ta-IN': 'என் இடத்தை கண்டறி',
  },
  'common.recommended': {
    'en-US': 'Recommended for You',
    'hi-IN': 'आपके लिए अनुशंसित',
    'kn-IN': 'ನಿಮಗಾಗಿ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ',
    'te-IN': 'మీకోసం సిఫార్సు చేయబడింది',
    'ta-IN': 'உங்களுக்கு பரிந்துரைக்கப்பட்டது',
  },
  'common.aiInsights': {
    'en-US': 'AI Insights',
    'hi-IN': 'AI अंतर्दृष्टि',
    'kn-IN': 'AI ಒಳನೋಟಗಳು',
    'te-IN': 'AI అంతర్దృష్టులు',
    'ta-IN': 'AI நுண்ணறிவுகள்',
  },
  'common.allServices': {
    'en-US': 'All Services',
    'hi-IN': 'सभी सेवाएं',
    'kn-IN': 'ಎಲ್ಲಾ ಸೇವೆಗಳು',
    'te-IN': 'అన్ని సేవలు',
    'ta-IN': 'அனைத்து சேவைகள்',
  },

  // Help Page
  'helpTitle': {
    'en-US': 'Help & Support',
    'hi-IN': 'सहायता और समर्थन',
    'kn-IN': 'ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ',
    'te-IN': 'సహాయం & మద్దతు',
    'ta-IN': 'உதவி & ஆதரவு',
  },
  'helpSubtitle': {
    'en-US': 'Find answers to common questions or get in touch with our support team',
    'hi-IN': 'सामान्य प्रश्नों के उत्तर पाएं या हमारी सहायता टीम से संपर्क करें',
    'kn-IN': 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಗಳನ್ನು ಹುಡುಕಿ ಅಥವಾ ನಮ್ಮ ಬೆಂಬಲ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ',
    'te-IN': 'సాధారణ ప్రశ్నలకు సమాధానాలు కనుగొనండి లేదా మా మద్దతు బృందాన్ని సంప్రదించండి',
    'ta-IN': 'பொதுவான கேள்விகளுக்கான பதில்களைக் கண்டறியுங்கள் அல்லது எங்கள் ஆதரவு குழுவைத் தொடர்பு கொள்ளுங்கள்',
  },
  'helpGetStarted': {
    'en-US': 'Getting Started',
    'hi-IN': 'शुरू करें',
    'kn-IN': 'ಪ್ರಾರಂಭಿಸಿ',
    'te-IN': 'ప్రారంభించండి',
    'ta-IN': 'தொடங்குங்கள்',
  },
  'helpGetStartedDesc': {
    'en-US': 'Learn how to find and book local services',
    'hi-IN': 'स्थानीय सेवाएं खोजने और बुक करने का तरीका जानें',
    'kn-IN': 'ಸ್ಥಳೀಯ ಸೇವೆಗಳನ್ನು ಹುಡುಕುವ ಮತ್ತು ಬುಕ್ ಮಾಡುವ ವಿಧಾನ ತಿಳಿಯಿರಿ',
    'te-IN': 'స్థానిక సేవలను కనుగొని బుక్ చేయడం నేర్చుకోండి',
    'ta-IN': 'உள்ளூர் சேவைகளை கண்டுபிடித்து புக் செய்வது எப்படி என்று அறியுங்கள்',
  },
  'helpBecomeVendor': {
    'en-US': 'Become a Vendor',
    'hi-IN': 'विक्रेता बनें',
    'kn-IN': 'ವಿಕ್ರೇತರಾಗಿ',
    'te-IN': 'విక్రేతగా మారండి',
    'ta-IN': 'விற்பனையாளராக மாறுங்கள்',
  },
  'helpBecomeVendorDesc': {
    'en-US': 'Register your business and reach local customers',
    'hi-IN': 'अपना व्यवसाय पंजीकृत करें और स्थानीय ग्राहकों तक पहुंचें',
    'kn-IN': 'ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ನೋಂದಾಯಿಸಿ ಮತ್ತು ಸ್ಥಳೀಯ ಗ್ರಾಹಕರನ್ನು ತಲುಪಿ',
    'te-IN': 'మీ వ్యాపారాన్ని నమోదు చేసి స్థానిక కస్టమర్లను చేరుకోండి',
    'ta-IN': 'உங்கள் வணிகத்தை பதிவு செய்து உள்ளூர் வாடிக்கையாளர்களை அடையுங்கள்',
  },
  'helpTrustSafety': {
    'en-US': 'Trust & Safety',
    'hi-IN': 'विश्वास और सुरक्षा',
    'kn-IN': 'ನಂಬಿಕೆ ಮತ್ತು ಸುರಕ್ಷತೆ',
    'te-IN': 'నమ్మకం & భద్రత',
    'ta-IN': 'நம்பிக்கை & பாதுகாப்பு',
  },
  'helpTrustSafetyDesc': {
    'en-US': 'Learn how we verify vendors and protect users',
    'hi-IN': 'जानें कि हम विक्रेताओं को कैसे सत्यापित करते हैं और उपयोगकर्ताओं की रक्षा करते हैं',
    'kn-IN': 'ನಾವು ವಿಕ್ರೇತರನ್ನು ಹೇಗೆ ಪರಿಶೀಲಿಸುತ್ತೇವೆ ಮತ್ತು ಬಳಕೆದಾರರನ್ನು ರಕ್ಷಿಸುತ್ತೇವೆ ಎಂದು ತಿಳಿಯಿರಿ',
    'te-IN': 'మేము విక్రేతలను ఎలా ధృవీకరిస్తామో మరియు వినియోగదారులను ఎలా రక్షిస్తామో తెలుసుకోండి',
    'ta-IN': 'விற்பனையாளர்களை எவ்வாறு சரிபார்க்கிறோம், பயனர்களை எவ்வாறு பாதுகாக்கிறோம் என்பதை அறியுங்கள்',
  },
  'helpFaqTitle': {
    'en-US': 'Frequently Asked Questions',
    'hi-IN': 'अक्सर पूछे जाने वाले प्रश्न',
    'kn-IN': 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು',
    'te-IN': 'తరచుగా అడిగే ప్రశ్నలు',
    'ta-IN': 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
  },
  'helpFaq1Question': {
    'en-US': 'How do I find services near me?',
    'hi-IN': 'मैं अपने पास की सेवाएं कैसे खोजूं?',
    'kn-IN': 'ನನ್ನ ಹತ್ತಿರದ ಸೇವೆಗಳನ್ನು ನಾನು ಹೇಗೆ ಹುಡುಕುವುದು?',
    'te-IN': 'నా దగ్గర సేవలను ఎలా కనుగొనాలి?',
    'ta-IN': 'என் அருகிலுள்ள சேவைகளை எவ்வாறு கண்டுபிடிப்பது?',
  },
  'helpFaq1Answer': {
    'en-US': 'Enable location access and use our search or voice search feature. LokAI will automatically show services available in your area with AI-powered recommendations.',
    'hi-IN': 'स्थान एक्सेस सक्षम करें और हमारी खोज या वॉयस सर्च सुविधा का उपयोग करें। LokAI स्वचालित रूप से AI-संचालित अनुशंसाओं के साथ आपके क्षेत्र में उपलब्ध सेवाएं दिखाएगा।',
    'kn-IN': 'ಸ್ಥಳ ಪ್ರವೇಶವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ ಮತ್ತು ನಮ್ಮ ಹುಡುಕಾಟ ಅಥವಾ ಧ್ವನಿ ಹುಡುಕಾಟ ವೈಶಿಷ್ಟ್ಯವನ್ನು ಬಳಸಿ। LokAI AI-ಚಾಲಿತ ಶಿಫಾರಸುಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಲಭ್ಯವಿರುವ ಸೇವೆಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ತೋರಿಸುತ್ತದೆ।',
    'te-IN': 'లొకేషన్ యాక్సెస్‌ను ఎనేబుల్ చేసి మా సెర్చ్ లేదా వాయిస్ సెర్చ్ ఫీచర్‌ను ఉపయోగించండి. LokAI AI-ఆధారిత సిఫార్సులతో మీ ప్రాంతంలో అందుబాటులో ఉన్న సేవలను స్వయంచాలకంగా చూపిస్తుంది.',
    'ta-IN': 'இருப்பிட அணுகலை இயக்கி எங்கள் தேடல் அல்லது குரல் தேடல் அம்சத்தைப் பயன்படுத்துங்கள். LokAI AI-இயக்கப்படும் பரிந்துரைகளுடன் உங்கள் பகுதியில் கிடைக்கும் சேவைகளை தானாகக் காண்பிக்கும்.',
  },
  'helpFaq2Question': {
    'en-US': 'How are vendors verified?',
    'hi-IN': 'विक्रेताओं को कैसे सत्यापित किया जाता है?',
    'kn-IN': 'ವಿಕ್ರೇತರನ್ನು ಹೇಗೆ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ?',
    'te-IN': 'విక్రేతలు ఎలా ధృవీకరించబడతారు?',
    'ta-IN': 'விற்பனையாளர்கள் எவ்வாறு சரிபார்க்கப்படுகிறார்கள்?',
  },
  'helpFaq2Answer': {
    'en-US': 'All vendors go through our admin verification process. We check business details, location, and service authenticity before approving vendors to ensure quality and trust.',
    'hi-IN': 'सभी विक्रेता हमारी व्यवस्थापक सत्यापन प्रक्रिया से गुजरते हैं। गुणवत्ता और विश्वास सुनिश्चित करने के लिए हम विक्रेताओं को मंजूरी देने से पहले व्यापार विवरण, स्थान और सेवा प्रामाणिकता की जांच करते हैं।',
    'kn-IN': 'ಎಲ್ಲಾ ವಿಕ್ರೇತರು ನಮ್ಮ ನಿರ್ವಾಹಕ ಪರಿಶೀಲನಾ ಪ್ರಕ್ರಿಯೆಯ ಮೂಲಕ ಹೋಗುತ್ತಾರೆ। ಗುಣಮಟ್ಟ ಮತ್ತು ನಂಬಿಕೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ವಿಕ್ರೇತರನ್ನು ಅನುಮೋದಿಸುವ ಮೊದಲು ನಾವು ವ್ಯಾಪಾರ ವಿವರಗಳು, ಸ್ಥಳ ಮತ್ತು ಸೇವಾ ಪ್ರಮಾಣಿಕತೆಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತೇವೆ.',
    'te-IN': 'అన్ని విక్రేతలు మా అడ్మిన్ వెరిఫికేషన్ ప్రాసెస్ ద్వారా వెళ్తారు. నాణ్యత మరియు నమ్మకాన్ని నిర్ధారించడానికి విక్రేతలను ఆమోదించే ముందు మేము వ్యాపార వివరాలు, లొకేషన్ మరియు సేవ ప్రామాణికతను తనిఖీ చేస్తాము.',
    'ta-IN': 'அனைத்து விற்பனையாளர்களும் எங்கள் நிர்வாக சரிபார்ப்பு செயல்முறை வழியாக செல்கிறார்கள். தரம் மற்றும் நம்பிக்கையை உறுதிப்படுத்த விற்பனையாளர்களை அங்கீகரிக்கும் முன் வணிக விவரங்கள், இருப்பிடம் மற்றும் சேவை நம்பகத்தன்மையை சரிபார்க்கிறோம்.',
  },
  'helpFaq3Question': {
    'en-US': 'Can I use voice search in my language?',
    'hi-IN': 'क्या मैं अपनी भाषा में वॉयस सर्च का उपयोग कर सकता हूं?',
    'kn-IN': 'ನಾನು ನನ್ನ ಭಾಷೆಯಲ್ಲಿ ಧ್ವನಿ ಹುಡುಕಾಟವನ್ನು ಬಳಸಬಹುದೇ?',
    'te-IN': 'నా భాషలో వాయిస్ సెర్చ్ ఉపయోగించవచ్చా?',
    'ta-IN': 'என் மொழியில் குரல் தேடலைப் பயன்படுத்த முடியுமா?',
  },
  'helpFaq3Answer': {
    'en-US': 'Yes! LokAI supports voice search in English, Hindi, Kannada, Telugu, and Tamil. Just tap the microphone icon and speak naturally in your preferred language.',
    'hi-IN': 'हां! LokAI अंग्रेजी, हिंदी, कन्नड़, तेलुगु और तमिल में वॉयस सर्च का समर्थन करता है। बस माइक्रोफ़ोन आइकन पर टैप करें और अपनी पसंदीदा भाषा में स्वाभाविक रूप से बोलें।',
    'kn-IN': 'ಹೌದು! LokAI ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ, ಕನ್ನಡ, ತೆಲುಗು ಮತ್ತು ತಮಿಳಿನಲ್ಲಿ ಧ್ವನಿ ಹುಡುಕಾಟವನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ। ಮೈಕ್ರೋಫೋನ್ ಐಕಾನ್ ಅನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ಸ್ವಾಭಾವಿಕವಾಗಿ ಮಾತನಾಡಿ.',
    'te-IN': 'అవును! LokAI ఇంగ్లీష్, హిందీ, కన్నడ, తెలుగు మరియు తమిళంలో వాయిస్ సెర్చ్‌ను సపోర్ట్ చేస్తుంది. మైక్రోఫోన్ ఐకాన్‌పై టాప్ చేసి మీకు ఇష్టమైన భాషలో సహజంగా మాట్లాడండి.',
    'ta-IN': 'ஆம்! LokAI ஆங்கிலம், இந்தி, கன்னடம், தெலுங்கு மற்றும் தமிழில் குரல் தேடலை ஆதரிக்கிறது. மைக்ரோஃபோன் ஐகானைத் தட்டி உங்கள் விருப்பமான மொழியில் இயல்பாகப் பேசுங்கள்.',
  },
  'helpFaq4Question': {
    'en-US': 'What payment methods are supported?',
    'hi-IN': 'कौन से भुगतान तरीके समर्थित हैं?',
    'kn-IN': 'ಯಾವ ಪಾವತಿ ವಿಧಾನಗಳು ಬೆಂಬಲಿತವಾಗಿವೆ?',
    'te-IN': 'ఏ పేమెంట్ మెథడ్స్ సపోర్ట్ చేయబడతాయి?',
    'ta-IN': 'என்ன கட்டண முறைகள் ஆதரிக்கப்படுகின்றன?',
  },
  'helpFaq4Answer': {
    'en-US': 'We support UPI payments and Cash on Delivery (COD). Choose your preferred method at checkout.',
    'hi-IN': 'हम UPI भुगतान और कैश ऑन डिलीवरी (COD) का समर्थन करते हैं। चेकआउट पर अपना पसंदीदा तरीका चुनें।',
    'kn-IN': 'ನಾವು UPI ಪಾವತಿಗಳು ಮತ್ತು ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ (COD) ಅನ್ನು ಬೆಂಬಲಿಸುತ್ತೇವೆ। ಚೆಕ್‌ಔಟ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಆದ್ಯತೆಯ ವಿಧಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    'te-IN': 'మేము UPI పేమెంట్లు మరియు క్యాష్ ఆన్ డెలివరీ (COD)ని సపోర్ట్ చేస్తాము. చెక్‌అవుట్‌లో మీకు ఇష్టమైన మెథడ్‌ను ఎంచుకోండి.',
    'ta-IN': 'UPI கட்டணங்கள் மற்றும் காசு வழங்கல் (COD) ஆதரிக்கப்படுகின்றன. செக்அவுட்டில் உங்கள் விருப்பமான முறையைத் தேர்ந்தெடுக்கவும்.',
  },
  'helpFaq5Question': {
    'en-US': 'How do I become a vendor on LokAI?',
    'hi-IN': 'मैं LokAI पर विक्रेता कैसे बनूं?',
    'kn-IN': 'ನಾನು LokAI ನಲ್ಲಿ ವಿಕ್ರೇತನಾಗುವುದು ಹೇಗೆ?',
    'te-IN': 'LokAIలో విక్రేతగా ఎలా మారాలి?',
    'ta-IN': 'LokAI-ல் விற்பனையாளராக எவ்வாறு மாறுவது?',
  },
  'helpFaq5Answer': {
    'en-US': 'Sign up as a vendor, enable location access, fill in your business details, and submit for admin approval. Once approved, add your payment details and start receiving orders!',
    'hi-IN': 'विक्रेता के रूप में साइन अप करें, स्थान एक्सेस सक्षम करें, अपना व्यापार विवरण भरें, और व्यवस्थापक अनुमोदन के लिए सबमिट करें। एक बार स्वीकृत होने के बाद, अपना भुगतान विवरण जोड़ें और ऑर्डर प्राप्त करना शुरू करें!',
    'kn-IN': 'ವಿಕ್ರೇತರಾಗಿ ಸೈನ್ ಅಪ್ ಮಾಡಿ, ಸ್ಥಳ ಪ್ರವೇಶವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ, ನಿಮ್ಮ ವ್ಯಾಪಾರ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ, ಮತ್ತು ನಿರ್ವಾಹಕ ಅನುಮೋದನೆಗಾಗಿ ಸಲ್ಲಿಸಿ। ಅನುಮೋದಿಸಿದ ನಂತರ, ನಿಮ್ಮ ಪಾವತಿ ವಿವರಗಳನ್ನು ಸೇರಿಸಿ ಮತ್ತು ಆದೇಶಗಳನ್ನು ಸ್ವೀಕರಿಸಲು ಪ್ರಾರಂಭಿಸಿ!',
    'te-IN': 'విక్రేతగా సైన్ అప్ చేయండి, లొకేషన్ యాక్సెస్ ఎనేబుల్ చేయండి, మీ బిజినెస్ వివరాలు నింపండి, మరియు అడ్మిన్ అప్రూవల్ కోసం సబ్మిట్ చేయండి. అప్రూవ్ అయిన తర్వాత, మీ పేమెంట్ వివరాలు జోడించి ఆర్డర్లు అందుకోవడం ప్రారంభించండి!',
    'ta-IN': 'விற்பனையாளராக பதிவு செய்யுங்கள், இருப்பிட அணுகலை இயக்குங்கள், உங்கள் வணிக விவரங்களை நிரப்புங்கள், நிர்வாக ஒப்புதலுக்கு சமர்ப்பிக்கவும். அங்கீகரிக்கப்பட்டதும், உங்கள் கட்டண விவரங்களைச் சேர்த்து ஆர்டர்களைப் பெறத் தொடங்குங்கள்!',
  },
  'helpContactTitle': {
    'en-US': 'Contact Support',
    'hi-IN': 'सहायता से संपर्क करें',
    'kn-IN': 'ಬೆಂಬಲವನ್ನು ಸಂಪರ್ಕಿಸಿ',
    'te-IN': 'సపోర్ట్‌ను సంప్రదించండి',
    'ta-IN': 'ஆதரவைத் தொடர்பு கொள்ளுங்கள்',
  },
  'helpContactName': {
    'en-US': 'Your Name',
    'hi-IN': 'आपका नाम',
    'kn-IN': 'ನಿಮ್ಮ ಹೆಸರು',
    'te-IN': 'మీ పేరు',
    'ta-IN': 'உங்கள் பெயர்',
  },
  'helpContactEmail': {
    'en-US': 'Your Email',
    'hi-IN': 'आपका ईमेल',
    'kn-IN': 'ನಿಮ್ಮ ಇಮೇಲ್',
    'te-IN': 'మీ ఇమెయిల్',
    'ta-IN': 'உங்கள் மின்னஞ்சல்',
  },
  'helpContactMessage': {
    'en-US': 'How can we help you?',
    'hi-IN': 'हम आपकी कैसे मदद कर सकते हैं?',
    'kn-IN': 'ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    'te-IN': 'మేము మీకు ఎలా సహాయం చేయగలము?',
    'ta-IN': 'நாங்கள் உங்களுக்கு எவ்வாறு உதவ முடியும்?',
  },
  'helpContactSend': {
    'en-US': 'Send Message',
    'hi-IN': 'संदेश भेजें',
    'kn-IN': 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
    'te-IN': 'సందేశం పంపండి',
    'ta-IN': 'செய்தி அனுப்பு',
  },
  'helpContactSending': {
    'en-US': 'Sending...',
    'hi-IN': 'भेज रहा है...',
    'kn-IN': 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...',
    'te-IN': 'పంపుతోంది...',
    'ta-IN': 'அனுப்புகிறது...',
  },
  'helpContactSuccess': {
    'en-US': 'Message Sent!',
    'hi-IN': 'संदेश भेजा गया!',
    'kn-IN': 'ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ!',
    'te-IN': 'సందేశం పంపబడింది!',
    'ta-IN': 'செய்தி அனுப்பப்பட்டது!',
  },
  'helpContactSuccessDesc': {
    'en-US': 'We\'ll get back to you within 24 hours.',
    'hi-IN': 'हम 24 घंटे के भीतर आपसे संपर्क करेंगे।',
    'kn-IN': 'ನಾವು 24 ಗಂಟೆಗಳ ಒಳಗೆ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.',
    'te-IN': 'మేము 24 గంటల్లోపు మీకు తిరిగి సమాధానం ఇస్తాము.',
    'ta-IN': 'நாங்கள் 24 மணி நேரத்திற்குள் உங்களைத் தொடர்பு கொள்வோம்.',
  },
  'helpOtherWays': {
    'en-US': 'Other ways to reach us',
    'hi-IN': 'हमसे संपर्क करने के अन्य तरीके',
    'kn-IN': 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಲು ಇತರ ಮಾರ್ಗಗಳು',
    'te-IN': 'మమ్మల్ని సంప్రదించడానికి ఇతర మార్గాలు',
    'ta-IN': 'எங்களைத் தொடர்பு கொள்ள மற்ற வழிகள்',
  },
  'helpLiveChat': {
    'en-US': 'Live Chat (9 AM - 6 PM IST)',
    'hi-IN': 'लाइव चैट (सुबह 9 - शाम 6 IST)',
    'kn-IN': 'ಲೈವ್ ಚಾಟ್ (ಬೆಳಿಗ್ಗೆ 9 - ಸಂಜೆ 6 IST)',
    'te-IN': 'లైవ్ ఛాట్ (ఉ 9 - సా 6 IST)',
    'ta-IN': 'நேரடி அரட்டை (காலை 9 - மாலை 6 IST)',
  },

  // Cart & Orders
  'cart.title': {
    'en-US': 'My Cart',
    'hi-IN': 'मेरी कार्ट',
    'kn-IN': 'ನನ್ನ ಕಾರ್ಟ್',
    'te-IN': 'నా కార్ట్',
    'ta-IN': 'என் வண்டி',
  },
  'cart.empty': {
    'en-US': 'Your cart is empty',
    'hi-IN': 'आपकी कार्ट खाली है',
    'kn-IN': 'ನಿಮ್ಮ ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ',
    'te-IN': 'మీ కార్ట్ ఖాళీగా ఉంది',
    'ta-IN': 'உங்கள் வண்டி காலியாக உள்ளது',
  },
  'cart.deliveryMethod': {
    'en-US': 'Delivery Method',
    'hi-IN': 'डिलीवरी का तरीका',
    'kn-IN': 'ವಿತರಣಾ ವಿಧಾನ',
    'te-IN': 'డెలివరీ పద్ధతి',
    'ta-IN': 'விநியோக முறை',
  },
  'cart.pickup': {
    'en-US': 'Pickup from Shop',
    'hi-IN': 'दुकान से उठाएं',
    'kn-IN': 'ಅಂಗಡಿಯಿಂದ ತೆಗೆದುಕೊಳ್ಳಿ',
    'te-IN': 'షాప్ నుండి పికప్',
    'ta-IN': 'கடையிலிருந்து எடுக்கவும்',
  },
  'cart.delivery': {
    'en-US': 'Home Delivery',
    'hi-IN': 'होम डिलीवरी',
    'kn-IN': 'ಮನೆ ವಿತರಣೆ',
    'te-IN': 'హోమ్ డెలివరీ',
    'ta-IN': 'வீட்டுக்கு விநியோகம்',
  },
  'cart.deliveryAddress': {
    'en-US': 'Delivery Address',
    'hi-IN': 'डिलीवरी पता',
    'kn-IN': 'ವಿತರಣಾ ವಿಳಾಸ',
    'te-IN': 'డెలివరీ చిరునామా',
    'ta-IN': 'விநியோக முகவரி',
  },
  'cart.paymentMethod': {
    'en-US': 'Payment Method',
    'hi-IN': 'भुगतान का तरीका',
    'kn-IN': 'ಪಾವತಿ ವಿಧಾನ',
    'te-IN': 'చెల్లింపు పద్ధతి',
    'ta-IN': 'கட்டண முறை',
  },
  'cart.cod': {
    'en-US': 'Cash on Delivery',
    'hi-IN': 'कैश ऑन डिलीवरी',
    'kn-IN': 'ಡೆಲಿವರಿ ಸಮಯದಲ್ಲಿ ನಗದು',
    'te-IN': 'క్యాష్ ఆన్ డెలివరీ',
    'ta-IN': 'டெலிவரியில் பணம்',
  },
  'cart.notes': {
    'en-US': 'Special Instructions',
    'hi-IN': 'विशेष निर्देश',
    'kn-IN': 'ವಿಶೇಷ ಸೂಚನೆಗಳು',
    'te-IN': 'ప్రత్యేక సూచనలు',
    'ta-IN': 'சிறப்பு அறிவுறுத்தல்கள்',
  },
  'cart.orderSummary': {
    'en-US': 'Order Summary',
    'hi-IN': 'ऑर्डर सारांश',
    'kn-IN': 'ಆದೇಶ ಸಾರಾಂಶ',
    'te-IN': 'ఆర్డర్ సారాంశం',
    'ta-IN': 'ஆர்டர் சுருக்கம்',
  },
  'cart.total': {
    'en-US': 'Total',
    'hi-IN': 'कुल',
    'kn-IN': 'ಒಟ್ಟು',
    'te-IN': 'మొత్తం',
    'ta-IN': 'மொத்தம்',
  },
  'cart.placeOrder': {
    'en-US': 'Place Order',
    'hi-IN': 'ऑर्डर करें',
    'kn-IN': 'ಆದೇಶ ಮಾಡಿ',
    'te-IN': 'ఆర్డర్ చేయండి',
    'ta-IN': 'ஆர்டர் செய்',
  },
  'orders.title': {
    'en-US': 'My Orders',
    'hi-IN': 'मेरे ऑर्डर',
    'kn-IN': 'ನನ್ನ ಆದೇಶಗಳು',
    'te-IN': 'నా ఆర్డర్లు',
    'ta-IN': 'என் ஆர்டர்கள்',
  },
  'orders.empty': {
    'en-US': 'No orders yet',
    'hi-IN': 'अभी तक कोई ऑर्डर नहीं',
    'kn-IN': 'ಇನ್ನೂ ಆದೇಶಗಳಿಲ್ಲ',
    'te-IN': 'ఇంకా ఆర్డర్లు లేవు',
    'ta-IN': 'இன்னும் ஆர்டர்கள் இல்லை',
  },
  'orders.active': {
    'en-US': 'Active',
    'hi-IN': 'सक्रिय',
    'kn-IN': 'ಸಕ್ರಿಯ',
    'te-IN': 'యాక్టివ్',
    'ta-IN': 'செயலில்',
  },
  'orders.past': {
    'en-US': 'Past Orders',
    'hi-IN': 'पिछले ऑर्डर',
    'kn-IN': 'ಹಿಂದಿನ ಆದೇಶಗಳು',
    'te-IN': 'గత ఆర్డర్లు',
    'ta-IN': 'கடந்த ஆர்டர்கள்',
  },
  'orders.received': {
    'en-US': 'Received',
    'hi-IN': 'प्राप्त हुआ',
    'kn-IN': 'ಸ್ವೀಕರಿಸಲಾಗಿದೆ',
    'te-IN': 'అందింది',
    'ta-IN': 'பெறப்பட்டது',
  },
  'services.buyNow': {
    'en-US': 'Buy Now',
    'hi-IN': 'अभी खरीदें',
    'kn-IN': 'ಈಗ ಖರೀದಿಸಿ',
    'te-IN': 'ఇప్పుడే కొనండి',
    'ta-IN': 'இப்போது வாங்கு',
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>('en-US');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation['en-US'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
