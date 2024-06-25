import React, { createContext, useReducer, useEffect,  ReactNode } from 'react';
import { Book,State } from '../types/types';
import useLocalStorage from '../hooks/useLocalStorage';



type Action =
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'UPDATE_BOOK'; payload: Book }
  | { type: 'DELETE_BOOK'; payload: number };

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

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [storedBooks, setStoredBooks] = useLocalStorage<Book[]>('books', []);
  const [state, dispatch] = useReducer(bookReducer, {
    books: Array.isArray(storedBooks) ? storedBooks : [],
  });

  useEffect(() => {
    console.log('Books in state:', state.books); // Debugging log
    setStoredBooks(state.books);
  }, [state.books, setStoredBooks]);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};


