import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Modal from '../UI/Modal';
import * as bookService from '../../services/bookService';
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

    const onClose = () => {
        navigate('/');
    };

    return (
        <Modal onClose={onClose}>
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
                        <button className="btn btn-primary">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                        <button
                            className={styles['btn-close']}
                            onClick={onClose}>
                            X
                        </button>
                    </div>
                </div>
            </article>
        </Modal>
    );
};

export default BookDetails;
