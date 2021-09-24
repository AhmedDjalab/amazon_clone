module.exports = {
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com"],
  },
  env: {
    strip_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
