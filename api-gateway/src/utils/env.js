export const env = {
  AA_URL: process.env.AA_URL || 'http://analysis-alerts-service:3010',
  NLP_URL: process.env.NLP_URL || process.env.AA_URL || 'http://analysis-alerts-service:3010',
  USER_URL: process.env.USER_URL || 'http://user-service:3050',
  AUTH_URL: process.env.AUTH_URL || 'http://auth-service:3001'
};
