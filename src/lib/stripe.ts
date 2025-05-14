import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PRODUCTS } from '../stripe-config';

// Initialize Stripe with error handling
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY).catch(error => {
  console.error('Failed to initialize Stripe:', error);
  return null;
});

export async function createCheckoutSession(priceId: string, mode: 'payment' | 'subscription') {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        price_id: priceId,
        success_url: `${window.location.origin}/recruiter?success=true`,
        cancel_url: `${window.location.origin}/recruiter?canceled=true`,
        mode,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { sessionId, url, error } = await response.json();

    if (error) throw new Error(error);
    if (!sessionId) throw new Error('No session ID returned');

    // If we have a URL, use it for redirect
    if (url) {
      window.location.href = url;
      return;
    }

    // Otherwise use the legacy redirect
    const { error: redirectError } = await stripe.redirectToCheckout({ sessionId });
    if (redirectError) throw redirectError;

  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
}

export async function handlePayment(productId: keyof typeof STRIPE_PRODUCTS) {
  const product = STRIPE_PRODUCTS[productId];
  if (!product) throw new Error('Invalid product');

  await createCheckoutSession(product.priceId, product.mode);
}