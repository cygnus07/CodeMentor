// codementor/server/src/config/environment.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('5000'),
  
  // Database configuration
  DATABASE_TYPE: z.enum(['mongodb', 'postgresql']).default('mongodb'),
  MONGODB_URI: z.string().optional(),
  MONGODB_URI_TEST: z.string().optional(),
  
  // Security
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  JWT_EXPIRES_IN: z.string().default('24h'),
  BCRYPT_ROUNDS: z.string().transform(Number).default('12'),
  
  // OpenAI Configuration
  OPENAI_API_KEY: z.string(),
  OPENAI_MODEL: z.string().default('gpt-4-turbo-preview'),
  
  // CORS
  CORS_ORIGIN: z.string().or(z.array(z.string())).default('http://localhost:3000'),
  
  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  
  // Email configuration
  EMAIL_HOST: z.string().default('smtp.gmail.com'),
  EMAIL_PORT: z.string().transform(Number).default('587'),
  EMAIL_USER: z.string().email(),
  EMAIL_PASS: z.string(),
  EMAIL_FROM: z.string().email(),
  EMAIL_SECURE: z.string().transform(val => val === 'true').default('false'),
  
  // Application
  APP_NAME: z.string().default('CodeMentor'),
  CLIENT_URL: z.string().url().optional().default('http://localhost:3000'),
});

type Config = z.infer<typeof envSchema>;

function validateEnvironment(): Config {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment configuration:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
    process.exit(1);
  }
}

export const config = validateEnvironment();

export const getDatabaseConnectionString = (): string => {
  if (config.DATABASE_TYPE === 'mongodb') {
    if (!config.MONGODB_URI) {
      throw new Error('MONGODB_URI is required when DATABASE_TYPE is mongodb');
    }
    return config.MONGODB_URI;
  }
  
  throw new Error('Invalid DATABASE_TYPE');
};

export default config;