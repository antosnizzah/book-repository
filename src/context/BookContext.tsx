import React, { createContext, useReducer, useEffect } from 'react';
import { Book,State,Action } from '../types/types';
import useLocalStorage from '../hooks/useLocalStorage';


function bookReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    default:
      return state;
  }
}

const BookContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const BookProvider = () => {
  const [storedBooks, setStoredBooks] = useLocalStorage<Book[]>('books', []);
  const [state, dispatch] = useReducer(bookReducer, {
    books: Array.isArray(storedBooks) ? storedBooks : [],
  });

  useEffect(() => {

    setStoredBooks(state.books);
  }, [state.books, setStoredBooks]);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
    </BookContext.Provider>
  );
};


