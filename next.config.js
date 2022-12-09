/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    BASE_URL: "http://localhost:3000",
    JWT_SECRET: "laksdjflaksdnvaasdjhflaksdjfh",
    // MongoDb: "mongodb://localhost:27017/whitehawk",
    SENDGRID_API_KEY:
      "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",
    MongoDb:
      "mongodb+srv://user:ub5VkRFOznLJhfsm@cluster0.m5he2ws.mongodb.net/?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
