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

    let booksList = books
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

    return (
        <Fragment>
            <section className={styles.books}>
                <h2 className={styles.title}>Added books</h2>
                <ul>{booksList}</ul>
                <h2 className={styles.title}>Liked books</h2>
            </section>
        </Fragment>
    );
};

export default Profile;
