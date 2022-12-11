/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    BASE_URL: "http://localhost:3000",
    // BASE_URL: "https://white-hawk.vercel.app",
    JWT_SECRET: "laksdjflaksdnvaasdjhflaksdjfh",
    // MongoDb: "mongodb://localhost:27017/whitehawk",
    SENDGRID_API_KEY:
      "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",
    MongoDb:
      "mongodb+srv://user:ub5VkRFOznLJhfsm@cluster0.m5he2ws.mongodb.net/?retryWrites=true&w=majority",
    MAIL_USERNAME: "whitehawkform@gmail.com",
    MAIL_PASSWORD: "#410KnnBti",
    OAUTH_CLIENTID:
      "146407289222-7c4vascuoflmhh4ih7rcvn4l39cm8tv3.apps.googleusercontent.com",
    OAUTH_CLIENT_SECRET: "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",
    OAUTH_REFRESH_TOKEN:
      "1//04kr_TCGIE4fWCgYIARAAGAQSNwF-L9Ir9rpWYWeBbwXxLu3xEj_LSsJ7onnI27Z6EQrJlQ7KgbqSVvXAPBT4_pCbVwsUNmSgdwo",
  },
};

module.exports = nextConfig;
