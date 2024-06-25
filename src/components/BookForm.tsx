import React, { useState, useEffect } from 'react';
import { Book,BookFormProps } from '../types/types';
import '../App.scss';



const BookForm: React.FC<BookFormProps> = ({ onClose, dispatch, book }) => {
  const [formData, setFormData] = useState<Book>(
    book || { id: Date.now(), title: '', author: '', year: 0 }
  );

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (book) {
      dispatch({ type: 'UPDATE_BOOK', payload: formData });
    } else {
      dispatch({ type: 'ADD_BOOK', payload: formData });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Author"
        required
      />
      <input
        type="number"
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="Year"
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default BookForm;
