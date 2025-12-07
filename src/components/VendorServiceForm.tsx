import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const serviceTypes = [
  'Plumber',
  'Kirana',
  'Tutor',
  'Farmer',
  'Teacher',
  'Doctor',
  'Chai shop',
  'Famous local food',
  'Local farm',
  'Bangel shop',
  'Tailor',
  'Food stall',
  'Other'
];

const formSchema = z.object({
  business_name: z.string().trim().min(2, 'Business name must be at least 2 characters').max(100),
  service_type: z.string().min(1, 'Please select a service type'),
  business_address: z.string().trim().min(5, 'Address must be at least 5 characters').max(500),
  contact_number: z.string().trim().min(10, 'Contact number must be at least 10 digits').max(15),
  service_cost: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Service cost must be a valid number',
  }),
  upi_id: z.string().trim().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface VendorServiceFormProps {
  existingProfile?: any;
  onSuccess?: () => void;
}

const VendorServiceForm = ({ existingProfile, onSuccess }: VendorServiceFormProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_name: existingProfile?.business_name || '',
      service_type: existingProfile?.service_type || '',
      business_address: existingProfile?.business_address || '',
      contact_number: existingProfile?.contact_number || '',
      service_cost: existingProfile?.service_cost?.toString() || '',
      upi_id: existingProfile?.upi_id || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast.error('You must be logged in');
      return;
    }

    setIsSubmitting(true);

    try {
      const profileData = {
        user_id: user.id,
        business_name: data.business_name,
        service_type: data.service_type,
        business_address: data.business_address,
        contact_number: data.contact_number,
        service_cost: Number(data.service_cost),
        upi_id: data.upi_id || null,
        updated_at: new Date().toISOString(),
      };

      if (existingProfile) {
        // Update existing profile
        const { error } = await supabase
          .from('vendor_profiles')
          .update(profileData)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Insert new profile
        const { error } = await supabase
          .from('vendor_profiles')
          .insert([profileData]);

        if (error) throw error;
      }

      onSuccess?.();
    } catch (error: any) {
      console.error('Error saving service details:', error);
      toast.error(error.message || 'Failed to save service details');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Details</CardTitle>
        <CardDescription>
          {existingProfile 
            ? 'Update your service information to help buyers find you' 
            : 'Add your service details to get started'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="business_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your business name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="business_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Address</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter your complete business address" 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Include landmarks to help buyers find you easily
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter contact number" 
                      type="tel"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service_cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Cost (₹)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter approximate service cost" 
                      type="number"
                      min="0"
                      step="0.01"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Starting price or average cost of your service
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="upi_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UPI ID (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="yourname@upi" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Add your UPI ID for easy payments
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {existingProfile ? 'Update Service Details' : 'Add Service'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VendorServiceForm;
