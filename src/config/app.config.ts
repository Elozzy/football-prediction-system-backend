export const AppConfig = () => ({
  port: parseInt(process.env.PORT ?? "4600", 10),
  mongoUri: process.env.MONGO_URI,
  apiBaseUrl: process.env.API_BASE_URL,
  apiKey: process.env.API_KEY,
});
