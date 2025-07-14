import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IChat extends Document {
  userId: Types.ObjectId;
  title: string;
  messages: Types.ObjectId[];
  isActive: boolean;
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new Schema<IChat>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      default: 'New Chat',
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    messages: [{
      type: Schema.Types.ObjectId,
      ref: 'Message',
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastMessageAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);


chatSchema.methods.updateLastMessageAt = function () {
  this.lastMessageAt = new Date();
  return this.save();
};

export const Chat = mongoose.model<IChat>('Chat', chatSchema);