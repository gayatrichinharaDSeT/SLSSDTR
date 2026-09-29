"use client";

// Thin client-side loader for Razorpay's own Checkout widget. We never
// build our own card/UPI form — Razorpay's script renders and owns the
// entire payment UI in a popup; we only get a callback once it's done.
export type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => void;
  modal?: { ondismiss?: () => void };
};

type RazorpayInstance = { open: () => void };
type RazorpayConstructor = new (options: RazorpayCheckoutOptions) => RazorpayInstance;

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

let loadPromise: Promise<void> | null = null;

export function loadRazorpayCheckout(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Razorpay checkout can only load in the browser."));
  }
  if (window.Razorpay) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loadPromise = null;
      reject(new Error("Failed to load Razorpay checkout. Check your connection and try again."));
    };
    document.body.appendChild(script);
  });

  return loadPromise;
}

export function openRazorpayCheckout(options: RazorpayCheckoutOptions): void {
  if (!window.Razorpay) {
    throw new Error("Razorpay checkout script not loaded.");
  }
  new window.Razorpay(options).open();
}
