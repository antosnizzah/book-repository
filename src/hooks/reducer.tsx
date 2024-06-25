
export interface Book {
    id: number;
    title: string;
    author: string;
    year: string;
  }

  type Action =
    | { type: 'ADD_BOOK'; payload: Book }
    | { type: 'UPDATE_BOOK'; payload: Book }
    | { type: 'DELETE_BOOK'; payload: number };

  export const bookReducer = (state: Book[], action: Action): Book[] => {
    switch (action.type) {
      case 'ADD_BOOK':
        return [...state, action.payload];
      case 'UPDATE_BOOK':
        return state.map((book) => (book.id === action.payload.id ? action.payload : book));
      case 'DELETE_BOOK':
        return state.filter((book) => book.id !== action.payload);
      default:
        return state;
    }
  };
