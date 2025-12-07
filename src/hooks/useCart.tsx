import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

// Product-based service types that can be added to cart
export const PRODUCT_SERVICE_TYPES = [
  'Homemade Spices',
  'Boutique Clothes',
  'Dairy Products',
  'Fish Fry',
  'Kirana Store',
  'Bakery',
  'Sweet Shop',
  'Vegetable Shop',
  'Fruit Shop',
  'Meat Shop',
  'Grocery Store',
  'Farm Products',
  'Handicrafts',
  'Pottery',
  'Pickle Shop',
  'Snacks',
];

export const isProductService = (serviceType: string | null): boolean => {
  if (!serviceType) return false;
  return PRODUCT_SERVICE_TYPES.some(
    type => serviceType.toLowerCase().includes(type.toLowerCase()) || 
            type.toLowerCase().includes(serviceType.toLowerCase())
  );
};

interface CartItem {
  id: string;
  vendor_id: string;
  quantity: number;
  vendor?: {
    id: string;
    business_name: string | null;
    service_type: string | null;
    service_cost: number | null;
    business_photos: string[] | null;
  };
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (vendorId: string) => Promise<void>;
  removeFromCart: (vendorId: string) => Promise<void>;
  updateQuantity: (vendorId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getItemCount: () => number;
  getTotal: () => number;
  isInCart: (vendorId: string) => boolean;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) {
      setItems([]);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          vendor_id,
          quantity,
          vendor_profiles (
            id,
            business_name,
            service_type,
            service_cost,
            business_photos
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const formattedItems = (data || []).map(item => ({
        id: item.id,
        vendor_id: item.vendor_id,
        quantity: item.quantity,
        vendor: item.vendor_profiles as any,
      }));

      setItems(formattedItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (vendorId: string) => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      return;
    }

    try {
      const existingItem = items.find(item => item.vendor_id === vendorId);

      if (existingItem) {
        await updateQuantity(vendorId, existingItem.quantity + 1);
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          vendor_id: vendorId,
          quantity: 1,
        });

      if (error) throw error;

      await fetchCart();
      toast.success('Added to cart!');
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const removeFromCart = async (vendorId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('vendor_id', vendorId);

      if (error) throw error;

      setItems(items.filter(item => item.vendor_id !== vendorId));
      toast.success('Removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove from cart');
    }
  };

  const updateQuantity = async (vendorId: string, quantity: number) => {
    if (!user) return;

    if (quantity <= 0) {
      await removeFromCart(vendorId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('vendor_id', vendorId);

      if (error) throw error;

      setItems(items.map(item => 
        item.vendor_id === vendorId ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      const price = item.vendor?.service_cost || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const isInCart = (vendorId: string) => {
    return items.some(item => item.vendor_id === vendorId);
  };

  const refreshCart = async () => {
    await fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemCount,
        getTotal,
        isInCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
