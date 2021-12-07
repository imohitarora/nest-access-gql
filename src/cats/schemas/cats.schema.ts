import * as mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    breed: String,
    ownerId: String,
  },
  { timestamps: true },
);
