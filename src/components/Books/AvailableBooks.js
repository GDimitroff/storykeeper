import { useEffect, useState } from 'react';

import classes from './AvailableBooks.module.css';
import BookItem from './BookItem';

const AvailableBooks = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(
                'https://story-keeper-3343a-default-rtdb.europe-west1.firebasedatabase.app/books.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            console.log(data);

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

            console.log(loadedBooks);

            setBooks(loadedBooks);
            setIsLoading(false);
        };

        fetchBooks().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

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
