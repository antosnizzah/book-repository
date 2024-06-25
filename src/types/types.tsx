
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
    dispatch: React.Dispatch<any>;
  }
  export interface BookFormProps {
    onClose: () => void;
    dispatch: React.Dispatch<any>;
    book?: Book;
  }