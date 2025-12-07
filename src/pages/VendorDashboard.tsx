import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import VendorServiceForm from '@/components/VendorServiceForm';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const VendorDashboard = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [vendorProfile, setVendorProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || profile?.role !== 'vendor')) {
      navigate('/unauthorized');
      return;
    }

    if (user && profile?.role === 'vendor') {
      fetchVendorProfile();
    }
  }, [user, profile, authLoading, navigate]);

  const fetchVendorProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('vendor_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;
      setVendorProfile(data);
    } catch (error) {
      console.error('Error fetching vendor profile:', error);
      toast.error('Failed to load vendor profile');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = () => {
    fetchVendorProfile();
    toast.success('Service details updated successfully');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Vendor Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            Manage your service details and make them searchable to buyers
          </p>
          <VendorServiceForm 
            existingProfile={vendorProfile} 
            onSuccess={handleProfileUpdate}
          />
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
