import React, { useEffect, useState } from 'react';

import * as bookService from '../services/bookService';

const BooksContext = React.createContext({
    books: [],
    httpError: null,
    isLoading: true,
    addNewBook: (book) => {},
    removeBook: (id) => {},
});

export const BooksContextProvider = (props) => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        bookService
            .getAllBooks()
            .then((data) => {
                const loadedBooks = [];
                for (const key in data) {
                    loadedBooks.push({
                        id: key,
                        title: data[key].title,
                        author: data[key].author,
                        description: data[key].description,
                        imageUrl: data[key].imageUrl,
                    });
                }

                setBooks(loadedBooks);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setHttpError(error.message);
            });
    }, []);

    const addNewBook = async (book) => {
        const newBookId = await bookService.addNewBook(book);
        setBooks((prevState) =>
            prevState.concat({
                ...book,
                id: newBookId.name,
                key: newBookId.name,
            })
        );
    };

    return (
        <BooksContext.Provider
            value={{
                books,
                isLoading,
                httpError,
                addNewBook,
            }}>
            {props.children}
        </BooksContext.Provider>
    );
};

export default BooksContext;
