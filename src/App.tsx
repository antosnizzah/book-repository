import  { useReducer, useEffect, useState } from 'react';
import { Book,State,Action} from './types/types';
import useLocalStorage from './hooks/useLocalStorage';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import  './App.scss';

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

const App = () => {
  const [storedBooks, setStoredBooks] = useLocalStorage<Book[]>('books', []);
  const [state, dispatch] = useReducer(bookReducer, {
    books: Array.isArray(storedBooks) ? storedBooks : [],
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setStoredBooks(state.books);
  }, [state.books, setStoredBooks]);

  return (
    <div className="App">
      <h1>Book Repository</h1>
      <button onClick={() => setIsAdding(true)}>Add Book</button>
      <BookList books={state.books} dispatch={dispatch} />
      {isAdding && <BookForm onClose={() => setIsAdding(false)} dispatch={dispatch} />}
    </div>
  );
};

export default App;
