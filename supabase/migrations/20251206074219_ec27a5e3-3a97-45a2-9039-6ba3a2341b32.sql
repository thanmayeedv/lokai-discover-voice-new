-- Create cart_items table for storing items users want to buy
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, vendor_id)
);

-- Enable RLS on cart_items
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Cart policies
CREATE POLICY "Users can view their own cart items"
ON public.cart_items FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own cart"
ON public.cart_items FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items"
ON public.cart_items FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own cart"
ON public.cart_items FOR DELETE
USING (auth.uid() = user_id);

-- Create order_status enum
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled');

-- Create delivery_type enum
CREATE TYPE public.delivery_type AS ENUM ('pickup', 'delivery');

-- Create payment_method enum
CREATE TYPE public.payment_method AS ENUM ('upi', 'cod');

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  total_amount NUMERIC NOT NULL,
  status order_status NOT NULL DEFAULT 'pending',
  delivery_type delivery_type NOT NULL DEFAULT 'pickup',
  payment_method payment_method NOT NULL DEFAULT 'cod',
  delivery_address TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Order policies for buyers
CREATE POLICY "Buyers can view their own orders"
ON public.orders FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Buyers can create orders"
ON public.orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Buyers can update their own orders"
ON public.orders FOR UPDATE
USING (auth.uid() = user_id);

-- Order policies for vendors to view orders for their products
CREATE POLICY "Vendors can view orders for their products"
ON public.orders FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.vendor_profiles
    WHERE vendor_profiles.id = orders.vendor_id
    AND vendor_profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Vendors can update orders for their products"
ON public.orders FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.vendor_profiles
    WHERE vendor_profiles.id = orders.vendor_id
    AND vendor_profiles.user_id = auth.uid()
  )
);

-- Trigger for updated_at on cart_items
CREATE TRIGGER update_cart_items_updated_at
BEFORE UPDATE ON public.cart_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for updated_at on orders
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();