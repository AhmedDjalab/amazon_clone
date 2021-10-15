module.exports = {
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com"],
  },
  env: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
};
