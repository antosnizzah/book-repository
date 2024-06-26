
export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
  }
 export interface PaginationProps {
    totalBooks: number;
    booksPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  }
 export interface State {
    books: Book[];
  }
  export interface BookListProps {
    books: Book[];
    dispatch: React.Dispatch<Action>;
  }
  export interface BookFormProps {
    onClose: () => void;
    dispatch: React.Dispatch<Action>;
    book?: Book;
  }
  export type Action =
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'UPDATE_BOOK'; payload: Book }
  | { type: 'DELETE_BOOK'; payload: number };
