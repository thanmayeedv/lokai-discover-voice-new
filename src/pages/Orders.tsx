import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle,
  Truck,
  Store,
  Phone,
  MessageCircle,
  Loader2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Order {
  id: string;
  vendor_id: string;
  quantity: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  delivery_type: 'pickup' | 'delivery';
  payment_method: 'upi' | 'cod';
  delivery_address: string | null;
  notes: string | null;
  created_at: string;
  vendor_profiles: {
    business_name: string | null;
    service_type: string | null;
    contact_number: string | null;
    business_photos: string[] | null;
  } | null;
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-500', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-blue-500', icon: CheckCircle },
  preparing: { label: 'Preparing', color: 'bg-orange-500', icon: Package },
  ready: { label: 'Ready', color: 'bg-green-500', icon: Store },
  delivered: { label: 'Delivered', color: 'bg-green-600', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-500', icon: XCircle },
};

const Orders = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          vendor_profiles (
            business_name,
            service_type,
            contact_number,
            business_photos
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders((data as Order[]) || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const confirmReceived = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'delivered' })
        .eq('id', orderId);

      if (error) throw error;
      
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'delivered' as const } : order
      ));
      toast.success('Order marked as received!');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
    }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone: string, businessName: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const message = encodeURIComponent(`Hi, I have an order inquiry about my order from ${businessName}.`);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const activeOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status));
  const pastOrders = orders.filter(o => ['delivered', 'cancelled'].includes(o.status));

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">{t('orders.title')}</h1>
          <p className="text-muted-foreground mb-6">Please sign in to view your orders</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </main>
      </div>
    );
  }

  const OrderCard = ({ order }: { order: Order }) => {
    const status = statusConfig[order.status];
    const StatusIcon = status.icon;

    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Product Image */}
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              {order.vendor_profiles?.business_photos?.[0] ? (
                <img 
                  src={order.vendor_profiles.business_photos[0]} 
                  alt={order.vendor_profiles.business_name || 'Product'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Order Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold truncate">
                    {order.vendor_profiles?.business_name || 'Product'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {order.vendor_profiles?.service_type}
                  </p>
                </div>
                <Badge className={`${status.color} text-white flex items-center gap-1`}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="font-bold text-primary">₹{order.total_amount}</span>
                <span className="text-muted-foreground">Qty: {order.quantity}</span>
                <Badge variant="outline" className="text-xs">
                  {order.delivery_type === 'pickup' ? (
                    <><Store className="w-3 h-3 mr-1" />Pickup</>
                  ) : (
                    <><Truck className="w-3 h-3 mr-1" />Delivery</>
                  )}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground mt-2">
                Ordered: {new Date(order.created_at).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                {order.status === 'ready' && (
                  <Button 
                    size="sm" 
                    onClick={() => confirmReceived(order.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {t('orders.received')}
                  </Button>
                )}
                
                {order.vendor_profiles?.contact_number && (
                  <>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleCall(order.vendor_profiles!.contact_number!)}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="bg-green-600 hover:bg-green-700 text-white border-0"
                      onClick={() => handleWhatsApp(
                        order.vendor_profiles!.contact_number!,
                        order.vendor_profiles?.business_name || 'Vendor'
                      )}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">{t('orders.title')}</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">{t('orders.empty')}</h2>
            <p className="text-muted-foreground mb-6">You haven't placed any orders yet</p>
            <Button onClick={() => navigate('/services')}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="active" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {t('orders.active')} ({activeOrders.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {t('orders.past')} ({pastOrders.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeOrders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No active orders</p>
              ) : (
                activeOrders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastOrders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No past orders</p>
              ) : (
                pastOrders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))
              )}
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default Orders;
