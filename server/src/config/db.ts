import mongoose, { ConnectOptions } from 'mongoose';
import { config, getDatabaseConnectionString } from './environment';


class MongoDBConnection {
  private static instance: MongoDBConnection;
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('📦 MongoDB already connected');
      return;
    }

    try {
      const connectionString = getDatabaseConnectionString();
      
      const options: ConnectOptions = {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        bufferCommands: false,
      };

      await mongoose.connect(connectionString, options);
      
      this.isConnected = true;
      console.log('🍃 MongoDB connected successfully');

      // Handle connection events
      mongoose.connection.on('error', (error) => {
        console.error('❌ MongoDB connection error:', error);
        this.isConnected = false;
      });

      mongoose.connection.on('disconnected', () => {
        console.log('📦 MongoDB disconnected');
        this.isConnected = false;
      });

      mongoose.connection.on('reconnected', () => {
        console.log('🔄 MongoDB reconnected');
        this.isConnected = true;
      });

    } catch (error) {
      console.error('❌ MongoDB connection failed:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('📦 MongoDB disconnected gracefully');
    } catch (error) {
      console.error('❌ Error disconnecting from MongoDB:', error);
      throw error;
    }
  }

  public getConnection() {
    return mongoose.connection;
  }

  public isHealthy(): boolean {
    return this.isConnected && mongoose.connection.readyState === 1;
  }
}


export async function connectDatabase(): Promise<void> {
  if (config.DATABASE_TYPE !== 'mongodb') {
    throw new Error(`Unsupported database type: ${config.DATABASE_TYPE}. Only MongoDB is supported.`);
  }
  await MongoDBConnection.getInstance().connect();
}

export async function disconnectDatabase(): Promise<void> {
  if (config.DATABASE_TYPE !== 'mongodb') return;
  await MongoDBConnection.getInstance().disconnect();
}

export async function isDatabaseHealthy(): Promise<boolean> {
  if (config.DATABASE_TYPE !== 'mongodb') return false;
  return MongoDBConnection.getInstance().isHealthy();
}


export const mongoConnection = MongoDBConnection.getInstance();