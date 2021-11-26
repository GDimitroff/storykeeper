import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTimes,
    faCog,
    faTrash,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';

import * as bookService from '../../services/bookService';

import BooksContext from '../../store/books-context';
import AuthContext from '../../store/auth-context';

import Modal from '../UI/Modal';
import styles from './BookDetails.module.css';

const BookDetails = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState({});

    const navigate = useNavigate();

    const ctx = useContext(BooksContext);
    const authCtx = useContext(AuthContext);

    const isCreator = book.creatorId === authCtx.userId;
    const [isLiked, setIsLiked] = useState(null);

    let location = useLocation().pathname.split('/')[1];
    location = location === 'books' ? '/' : '/profile';

    useEffect(() => {
        bookService.getBookById(bookId).then((book) => {
            setBook(book);

            if (!book.likedBy) {
                setIsLiked(false);
            } else {
                if (book.likedBy.includes(authCtx.userId)) {
                    setIsLiked(true);
                } else {
                    setBook(false);
                }
            }
        });
    }, [ctx, bookId, isLiked, authCtx]);

    const onCloseHandler = () => {
        navigate(location);
    };

    const toggleLikeHandler = () => {
        if (isLiked) {
            setIsLiked(false);
            ctx.dislikeBook(bookId, authCtx.userId);
        } else {
            setIsLiked(true);
            ctx.likeBook(bookId, authCtx.userId);
        }
    };

    const onEditHandler = () => {
        if (location === '/') {
            navigate(`/books/${bookId}/edit`, {
                state: { ...book, id: bookId },
            });
        } else {
            navigate(`/profile/mybooks/${bookId}/edit`, {
                state: { ...book, id: bookId },
            });
        }
    };

    const onDeleteHandler = () => {
        bookService.deleteBook(bookId);
        ctx.removeBook(bookId);
        navigate(location);
    };

    return (
        <Modal onClose={onCloseHandler}>
            <article className={styles['book-details']}>
                <div className={styles['book-image']}>
                    <img src={book.imageUrl} alt={book.title} />
                </div>
                <div className={styles['book-content']}>
                    <div className="book-text">
                        <div className={styles['book-title']}>{book.title}</div>
                        <div className={styles['book-author']}>
                            {book.author}
                        </div>
                        <div className={styles['book-description']}>
                            {book.description}
                        </div>
                    </div>
                    <button
                        className={`${styles.btn} ${styles['btn-close']}`}
                        onClick={onCloseHandler}>
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                    {authCtx.isLoggedIn && !isCreator && (
                        <button
                            className={`${styles.btn} ${styles['btn-like']} ${
                                isLiked ? styles['btn-liked'] : ''
                            }`}
                            onClick={toggleLikeHandler}>
                            <FontAwesomeIcon icon={faHeart} size="lg" />
                        </button>
                    )}
                    {isCreator && (
                        <button
                            className={`${styles.btn} ${styles['btn-settings']}`}
                            onClick={onEditHandler}>
                            <FontAwesomeIcon icon={faCog} size="lg" />
                        </button>
                    )}
                    {isCreator && (
                        <button
                            className={`${styles.btn} ${styles['btn-delete']}`}
                            onClick={onDeleteHandler}>
                            <FontAwesomeIcon icon={faTrash} size="lg" />
                        </button>
                    )}
                </div>
            </article>
        </Modal>
    );
};

export default BookDetails;
