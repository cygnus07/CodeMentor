import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMessage extends Document {
  _id: Types.ObjectId;
  chatId: Types.ObjectId;
  role: 'user' | 'assistant' | 'system';
  content: string;
  tokens?: number;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tokens: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export const Message = mongoose.model<IMessage>('Message', messageSchema);