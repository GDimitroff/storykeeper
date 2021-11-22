import React, { useEffect, useState } from 'react';

import * as bookService from '../services/bookService';

const BooksContext = React.createContext({
    books: [],
    httpError: null,
    isLoading: true,
    addNewBook: (book) => {},
    removeBook: (id) => {},
    updateBook: (id, book) => {},
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

    const updateBook = async (id, book) => {
        await bookService.updateBook(id, book);

        const newBooks = [...books];
        const index = newBooks.findIndex((item) => item.id === id);
        newBooks[index] = { ...book, id: id };

        setBooks(newBooks);
    };

    const removeBook = (id) => {
        setBooks((prevState) => prevState.filter((book) => book.id !== id));
    };

    return (
        <BooksContext.Provider
            value={{
                books,
                isLoading,
                httpError,
                addNewBook,
                removeBook,
                updateBook,
            }}>
            {props.children}
        </BooksContext.Provider>
    );
};

export default BooksContext;
