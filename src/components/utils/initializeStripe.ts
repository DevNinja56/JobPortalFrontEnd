import { loadStripe } from "@stripe/stripe-js";

const stripePublishKey =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_STRIPE_PUBLISHABLE_KEY
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

const initializeStripe = async () => {
  return await loadStripe(stripePublishKey || "");
};

export default initializeStripe;
