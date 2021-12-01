import { Fragment, useContext } from 'react';

import BooksContext from '../../store/books-context';
import Loading from '../UI/Loading';
import BookItem from '../Books/BookItem';

import styles from './Profile.module.css';
import AuthContext from '../../store/auth-context';

const Profile = () => {
    const ctx = useContext(BooksContext);
    const authCtx = useContext(AuthContext);

    const books = ctx.books;
    const userId = authCtx.userId;
    const httpError = ctx.httpError;
    const isLoading = ctx.isLoading;

    if (isLoading) {
        return (
            <section className={styles['books-loading']}>
                <Loading />
            </section>
        );
    }

    if (httpError) {
        return (
            <section className={styles['books-error']}>
                <p>{httpError}</p>
            </section>
        );
    }

    const booksList = books
        .filter((book) => book.creatorId === userId)
        .map((book) => {
            return (
                <BookItem
                    id={book.id}
                    key={book.id}
                    title={book.title}
                    author={book.author}
                    description={book.description}
                    imageUrl={book.imageUrl}
                    url={`/profile/mybooks/${book.id}`}
                />
            );
        });

    const likedBooks = books
        .filter((book) => book.likedBy.includes(userId))
        .map((book) => {
            return (
                <BookItem
                    id={book.id}
                    key={book.id}
                    title={book.title}
                    author={book.author}
                    description={book.description}
                    imageUrl={book.imageUrl}
                    url={`/profile/mybooks/${book.id}`}
                />
            );
        });

    return (
        <Fragment>
            <section className={styles.books}>
                <h2 className={styles.title}>
                    Added books: {booksList.length}
                </h2>
                <ul>
                    {booksList.length === 0 ? (
                        <div className={styles['empty']}>
                            You don't have any books added. Add some and they
                            will appear here.
                        </div>
                    ) : (
                        booksList
                    )}
                </ul>
                <h2 className={styles.title}>
                    Liked books: {likedBooks.length}
                </h2>
                <ul>
                    {likedBooks.length === 0 ? (
                        <div className={styles['empty']}>
                            You didn't like any books.
                        </div>
                    ) : (
                        likedBooks
                    )}
                </ul>
            </section>
        </Fragment>
    );
};

export default Profile;
