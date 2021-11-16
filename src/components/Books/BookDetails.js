import Modal from '../UI/Modal';

import styles from './BookDetails.module.css';

const BookDetails = ({ onClose, book }) => {
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
                        <div className={styles['main-actions']}>
                            <button className="btn btn-primary">Edit</button>
                            <button className="btn btn-danger">Delete</button>
                        </div>
                        <button className="btn btn-primary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </article>
        </Modal>
    );
};

export default BookDetails;
