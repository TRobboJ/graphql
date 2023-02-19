import mongoose from 'mongoose';

interface BookDTO {
  _id: string;
  title: string;
  genre: string;
  authorId: string;
}

const bookSchema = new mongoose.Schema<BookDTO>({
  title: String,
  genre: String,
  authorId: String,
});

export const bookModel = mongoose.model('books', bookSchema, 'Books');
