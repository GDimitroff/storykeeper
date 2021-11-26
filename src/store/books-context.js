import React, { useEffect, useState } from 'react';

import * as bookService from '../services/bookService';

const BooksContext = React.createContext({
    books: [],
    httpError: null,
    isLoading: true,
    addNewBook: (book) => {},
    removeBook: (id) => {},
    updateBook: (id, book) => {},
    likeBook: (bookId, userId) => {},
    dislikeBook: (bookId, userId) => {},
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
                        creatorId: data[key].creatorId,
                        likedBy: data[key].likedBy || [],
                    });
                }

                setBooks(loadedBooks);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
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

        const index = books.findIndex((item) => item.id === id);
        const newBooks = [...books];
        newBooks[index] = { ...book, id: id };

        setBooks(newBooks);
    };

    const removeBook = (id) => {
        setBooks((prevState) => prevState.filter((book) => book.id !== id));
    };

    const likeBook = async (bookId, userId) => {
        const index = books.findIndex((item) => item.id === bookId);
        const newBooks = [...books];
        let updatedBook = newBooks[index];
        let likedBy = updatedBook.likedBy.slice() || [];
        updatedBook = { ...updatedBook, likedBy: [...likedBy, userId] };
        setBooks(newBooks);

        await bookService.updateBook(bookId, updatedBook);
    };

    const dislikeBook = async (bookId, userId) => {
        const index = books.findIndex((item) => item.id === bookId);
        const newBooks = [...books];
        let updatedBook = newBooks[index];

        const likedByIndex = updatedBook.likedBy.findIndex(
            (id) => id === userId
        );
        let likedBy = [...updatedBook.likedBy];
        likedBy = [
            ...likedBy.slice(0, likedByIndex),
            ...likedBy.slice(likedByIndex + 1),
        ];

        updatedBook = { ...updatedBook, likedBy: likedBy };
        setBooks(newBooks);

        await bookService.updateBook(bookId, updatedBook);
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
                likeBook,
                dislikeBook,
            }}>
            {props.children}
        </BooksContext.Provider>
    );
};

export default BooksContext;
