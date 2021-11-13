import styles from './BooksSummary.module.css';

const BooksSummary = () => {
    return (
        <section className={styles.summary}>
            <h2>Meet your next favorite story.</h2>
            <p className={styles.quote}>
                “Sometimes, you read a book and it fills you with this weird
                evangelical zeal, and you become convinced that the shattered
                world will never be put back together unless and until all
                living humans read the book.”
            </p>
            <p className={styles.author}>John Green, The Fault in Our Stars</p>
        </section>
    );
};

export default BooksSummary;
