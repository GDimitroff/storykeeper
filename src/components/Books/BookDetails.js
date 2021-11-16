import { useState, useEffect } from 'react';

import Modal from '../UI/Modal';

import * as bookService from '../../services/bookService';
import styles from './BookDetails.module.css';

const BookDetails = (props) => {
    const [book, setBook] = useState({});

    useEffect(() => {
        bookService.getBookById(props.id).then((book) => {
            setBook(book);
        });
    });

    return (
        <Modal onClose={props.onClose}>
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
                            onClick={props.onClose}>
                            X
                        </button>
                    </div>
                </div>
            </article>
        </Modal>
    );
};

export default BookDetails;
