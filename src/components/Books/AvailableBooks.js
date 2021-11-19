import { useEffect, useState } from 'react';

import * as bookService from '../../services/bookService';
import BookItem from './BookItem';
import classes from './AvailableBooks.module.css';

const AvailableBooks = () => {
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
    }, [books]);

    if (isLoading) {
        return (
            <section className={classes['books-loading']}>
                <p>Loading...</p>
            </section>
        );
    }

    if (httpError) {
        return (
            <section className={classes['books-error']}>
                <p>{httpError}</p>
            </section>
        );
    }

    const booksList = books.map((book) => {
        return (
            <BookItem
                id={book.id}
                key={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                imageUrl={book.imageUrl}
            />
        );
    });

    return (
        <section className={classes.books}>
            <ul>{booksList}</ul>
        </section>
    );
};

export default AvailableBooks;
