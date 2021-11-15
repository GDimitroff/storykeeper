import styles from './BookItem.module.css';

const BookItem = (props) => {
    console.log(props);
    return (
        <article className={styles.book}>
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
    );
};

export default BookItem;
