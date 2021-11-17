import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import styles from './BookItem.module.css';

const BookItem = (props) => {
    return (
        <Fragment>
            <Link to={`/books/${props.id}`} className={styles.book}>
                <div className={styles['book-image']}>
                    <img src={props.imageUrl} alt={props.title} />
                </div>
                <div className={styles['book-content']}>
                    <p className={styles['book-heading']}>{props.title}</p>
                    <p className={styles['book-author']}>{props.author}</p>
                    <p className={styles['book-description']}>
                        {props.description.slice(0, 270) + '...'}
                    </p>
                </div>
            </Link>
        </Fragment>
    );
};

export default BookItem;
