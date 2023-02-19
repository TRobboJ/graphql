import mongoose from 'mongoose';

interface AuthorDTO {
  _id: string;
  name: string;
  age: number;
}

const authorSchema = new mongoose.Schema<AuthorDTO>({
  name: String,
  age: Number,
});

export const authorModel = mongoose.model('authors', authorSchema, 'Authors');
