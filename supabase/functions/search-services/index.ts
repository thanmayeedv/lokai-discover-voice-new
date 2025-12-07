import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const languageNames: Record<string, string> = {
  'en-US': 'English',
  'hi-IN': 'Hindi',
  'kn-IN': 'Kannada',
  'te-IN': 'Telugu',
  'ta-IN': 'Tamil',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, language, action, vendors, userLocation } = await req.json();

    // Handle AI-based location recommendations
    if (action === 'get-recommendations' && vendors && Array.isArray(vendors)) {
      const targetLang = languageNames[language] || 'English';
      
      console.log('Generating AI recommendations for location:', userLocation);

      // Calculate distance for each vendor if user location is available
      const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      };

      // Parse vendor coordinates and calculate distances
      const vendorsWithDistance = vendors.map((v: any) => {
        let distance: number | null = null;
        if (userLocation && v.location_coordinates) {
          try {
            // location_coordinates is stored as PostgreSQL point type: "(lat,lng)"
            const coordStr = String(v.location_coordinates);
            const match = coordStr.match(/\(([^,]+),([^)]+)\)/);
            if (match) {
              const vendorLat = parseFloat(match[1]);
              const vendorLng = parseFloat(match[2]);
              if (!isNaN(vendorLat) && !isNaN(vendorLng)) {
                distance = calculateDistance(
                  userLocation.latitude,
                  userLocation.longitude,
                  vendorLat,
                  vendorLng
                );
              }
            }
          } catch (e) {
            console.log('Error parsing coordinates for vendor:', v.id);
          }
        }
        return {
          id: v.id,
          name: v.business_name,
          type: v.service_type,
          address: v.business_address,
          cost: v.service_cost,
          distance: distance ? Math.round(distance * 10) / 10 : null,
        };
      });

      // Sort by distance if available
      const sortedByDistance = [...vendorsWithDistance].sort((a, b) => {
        if (a.distance === null && b.distance === null) return 0;
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      });

      const locationContext = userLocation 
        ? `User is located at coordinates (${userLocation.latitude}, ${userLocation.longitude}). Prioritize vendors with shorter distances.` 
        : 'User location not available.';

      const nearbyVendors = sortedByDistance.filter(v => v.distance !== null && v.distance < 10);
      const hasNearby = nearbyVendors.length > 0;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are a local services recommendation assistant for India. ${locationContext}
Analyze the available vendors and provide personalized recommendations based on:
1. Geographic proximity (HIGHEST priority - prefer vendors within 5km)
2. Service relevance and variety
3. Price value proposition
4. Service type diversity

${hasNearby ? `There are ${nearbyVendors.length} vendors within 10km of the user.` : 'No vendors have distance data - recommend based on variety.'}

Return a JSON object with:
- "featured": array of 3-5 vendor IDs that are most recommended (prioritize NEAREST vendors first, then variety)
- "categories": object mapping service categories to arrays of vendor IDs
- "insights": a brief ${targetLang} language insight about local services available nearby (2-3 sentences, mention distance if available)
- "nearbyTip": a helpful ${targetLang} tip about the nearest services

Return ONLY valid JSON, no markdown.`
            },
            {
              role: 'user',
              content: `Available vendors with distances: ${JSON.stringify(sortedByDistance)}`
            }
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const recommendationText = data.choices?.[0]?.message?.content?.trim() || '{}';
      
      try {
        const cleanedText = recommendationText.replace(/```json\n?|\n?```/g, '').trim();
        const recommendations = JSON.parse(cleanedText);
        
        // Include distance data in response
        return new Response(JSON.stringify({ 
          recommendations,
          vendorDistances: vendorsWithDistance.reduce((acc: any, v: any) => {
            acc[v.id] = v.distance;
            return acc;
          }, {}),
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (parseError) {
        console.error('Failed to parse recommendations:', parseError);
        // Fallback: use nearest vendors as featured
        const featuredIds = sortedByDistance.slice(0, 3).map((v: any) => v.id);
        
        return new Response(JSON.stringify({ 
          recommendations: {
            featured: featuredIds,
            categories: {},
            insights: userLocation 
              ? 'Showing services based on your location. Closer vendors are prioritized.'
              : 'Discover trusted local services in your neighborhood.',
            nearbyTip: 'Enable location for personalized nearby recommendations.',
          },
          vendorDistances: vendorsWithDistance.reduce((acc: any, v: any) => {
            acc[v.id] = v.distance;
            return acc;
          }, {}),
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Handle vendor data translation
    if (action === 'translate-vendors' && vendors && Array.isArray(vendors)) {
      const targetLang = languageNames[language] || 'English';
      
      // Skip translation if English
      if (language === 'en-US') {
        return new Response(JSON.stringify({ translatedVendors: vendors }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log('Translating vendors to:', targetLang);

      const vendorTexts = vendors.map((v: any) => ({
        id: v.id,
        business_name: v.business_name || '',
        service_type: v.service_type || '',
        business_address: v.business_address || '',
      }));

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are a translator for a local services marketplace in India. Translate the following vendor information to ${targetLang}. 
Keep the translations natural and culturally appropriate for Indian audiences.
Return a JSON array with the same structure, with translated values for business_name, service_type, and business_address.
If a field is empty, keep it empty. Preserve the id field exactly as given.
Return ONLY valid JSON, no markdown or explanations.`
            },
            {
              role: 'user',
              content: JSON.stringify(vendorTexts)
            }
          ],
          max_tokens: 2000,
          temperature: 0.3,
        }),
      });

      const data = await response.json();
      const translatedText = data.choices?.[0]?.message?.content?.trim() || '[]';
      
      try {
        // Parse the JSON response
        const cleanedText = translatedText.replace(/```json\n?|\n?```/g, '').trim();
        const translatedData = JSON.parse(cleanedText);
        
        // Merge translations back with original vendor data
        const translatedVendors = vendors.map((vendor: any) => {
          const translated = translatedData.find((t: any) => t.id === vendor.id);
          if (translated) {
            return {
              ...vendor,
              business_name: translated.business_name || vendor.business_name,
              service_type: translated.service_type || vendor.service_type,
              business_address: translated.business_address || vendor.business_address,
            };
          }
          return vendor;
        });

        return new Response(JSON.stringify({ translatedVendors }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (parseError) {
        console.error('Failed to parse translation response:', parseError);
        return new Response(JSON.stringify({ translatedVendors: vendors }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Handle search query translation (existing logic)
    if (!query || query.trim() === '') {
      return new Response(JSON.stringify({ translatedQuery: '', originalQuery: query }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Received search query:', query, 'Language hint:', language);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a translation and search query optimizer for a local services marketplace in India.
Your task is to:
1. Detect if the input is in Kannada, Hindi, Telugu, Tamil, or English
2. Translate the query to English if it's not already in English
3. Extract the key service terms for search (like "plumber", "electrician", "tutor", "kirana", "chai", "food", "doctor", etc.)
4. Return ONLY the translated/optimized English search term(s), nothing else.

Examples:
- "ಪ್ಲಂಬರ್" → "plumber"
- "प्लम्बर" → "plumber"
- "ಹತ್ತಿರದ ಕಿರಾಣಿ ಅಂಗಡಿ" → "kirana shop"
- "नजदीकी किराना दुकान" → "kirana shop"
- "ಟ್ಯೂಟರ್" → "tutor"
- "शिक्षक" → "tutor teacher"
- "ಚಾಯ್ ಅಂಗಡಿ" → "chai shop tea"
- "खाना" → "food"
- "ಡಾಕ್ಟರ್" → "doctor"
- "plumber near me" → "plumber"

Return only the search terms, no explanations.`
          },
          {
            role: 'user',
            content: query
          }
        ],
        max_tokens: 50,
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const translatedQuery = data.choices?.[0]?.message?.content?.trim() || query;

    console.log('Translated query:', translatedQuery);

    return new Response(JSON.stringify({ 
      translatedQuery, 
      originalQuery: query,
      detected: translatedQuery !== query 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in search-services function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      translatedQuery: '',
      originalQuery: '' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
