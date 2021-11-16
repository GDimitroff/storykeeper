import { Fragment, useState } from 'react';

import BookDetails from './BookDetails';
import styles from './BookItem.module.css';

const BookItem = (props) => {
    const [detailsShown, setDetailsShown] = useState(false);

    const showDetailsHandler = () => {
        setDetailsShown(true);
    };

    const hideDetailsHandler = () => {
        setDetailsShown(false);
    };

    return (
        <Fragment>
            {detailsShown && (
                <BookDetails onClose={hideDetailsHandler} book={props} />
            )}
            <article className={styles.book} onClick={showDetailsHandler}>
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
            </article>
        </Fragment>
    );
};

export default BookItem;
