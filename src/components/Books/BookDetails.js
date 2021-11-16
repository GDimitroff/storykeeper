import Modal from '../UI/Modal';

import styles from './BookDetails.module.css';

const BookDetails = ({ onClose, book }) => {
    return (
        <Modal onClose={onClose}>
            <article className={styles['book-details']}>
                <div className={styles['book-image']}>
                    <img src={book.imageUrl} alt={book.title} />
                </div>
                <div className={styles['book-title']}>{book.title}</div>
                <div className={styles['book-author']}>{book.author}</div>
                <div className={styles['book-description']}>
                    {book.description}
                </div>
            </article>

            <button onClick={onClose}>Close</button>
            <button>Edit</button>
            <button>Delete</button>
        </Modal>
    );
};

export default BookDetails;
