import { useContext } from 'react';

import BooksContext from '../../store/books-context';

import Loading from '../UI/Loading';
import BookItem from './BookItem';
import TitaItem from '../Tita/TitaItem';
import classes from './AvailableBooks.module.css';

const AvailableBooks = () => {
    const ctx = useContext(BooksContext);

    const books = ctx.books;
    const httpError = ctx.httpError;
    const isLoading = ctx.isLoading;

    if (isLoading) {
        return (
            <section className={classes['books-loading']}>
                <Loading />
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

    let booksList = books.map((book) => {
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

    booksList = [
        ...booksList.slice(0, 4),
        <TitaItem key="tita" />,
        ...booksList.slice(4),
    ];

    return (
        <section className={classes.books}>
            <ul>{booksList}</ul>
        </section>
    );
};

export default AvailableBooks;
