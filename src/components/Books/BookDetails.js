import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faCog, faTrash } from '@fortawesome/free-solid-svg-icons';

import * as bookService from '../../services/bookService';

import Modal from '../UI/Modal';
import styles from './BookDetails.module.css';

const BookDetails = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        bookService.getBookById(bookId).then((book) => {
            setBook(book);
        });
    }, [bookId]);

    const onCloseHandler = () => {
        navigate('/');
    };

    const onDeleteHandler = () => {
        bookService.deleteBook(bookId);
        navigate('/');
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
                    <div className={styles.buttons}>
                        <button
                            className={`${styles.btn} ${styles['btn-close']}`}
                            onClick={onCloseHandler}>
                            <FontAwesomeIcon icon={faMinus} size="lg" />
                        </button>
                        <button
                            className={`${styles.btn} ${styles['btn-settings']}`}>
                            <FontAwesomeIcon icon={faCog} size="lg" />
                        </button>
                        <button
                            className={`${styles.btn} ${styles['btn-delete']}`}
                            onClick={onDeleteHandler}>
                            <FontAwesomeIcon icon={faTrash} size="lg" />
                        </button>
                    </div>
                </div>
            </article>
        </Modal>
    );
};

export default BookDetails;
