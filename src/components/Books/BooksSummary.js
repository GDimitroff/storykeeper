import { useState } from 'react';

import styles from './BooksSummary.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

const QUOTES = [
    '“Sometimes, you read a book and it fills you with this weird evangelical zeal, and you become convinced that the shattered world will never be put back together unless and until all living humans read the book.” - John Green, The Fault in Our Stars',
    '“A reader lives a thousand lives before he dies . . . The man who never reads lives only one.” - George R.R. Martin',
    '“Until I feared I would lose it, I never loved to read. One does not love breathing.” - Harper Lee',
    '“Never trust anyone who has not brought a book with them.” - Lemony Snicket',
    '“You can never get a cup of tea large enough or a book long enough to suit me.” - C.S. Lewis',
    '“Reading is essential for those who seek to rise above the ordinary.” - Jim Rohn',
    '“I find television very educating. Every time somebody turns on the set, I go into the other room and read a book.” - Groucho Marx',
    '“‘Classic’ – a book which people praise and don’t read.” - Mark Twain',
    '“You don’t have to burn books to destroy a culture. Just get people to stop reading them.” - Ray Bradbury',
    '“So please, oh please, we beg, we pray, go throw your TV set away, and in its place you can install a lovely bookshelf on the wall.” - Roald Dahl',
    '“Think before you speak. Read before you think.” - Fran Lebowitz',
    '“Let’s be reasonable and add an eighth day to the week that is devoted exclusively to reading.” - Lena Dunham',
    '“That’s the thing about books. They let you travel without moving your feet.” - Jhumpa Lahiri',
    '“The reading of all good books is like conversation with the finest (people) of the past centuries.” - Descartes',
    '“In the case of good books, the point is not to see how many of them you can get through, but rather how many can get through to you.” - Mortimer J. Adler',
    '“Reading one book is like eating one potato chip.” - Diane Duane',
];

const BooksSummary = () => {
    const [quote, setQuote] = useState(QUOTES[0]);

    const randomQuoteHandler = () => {
        const index = Math.floor(Math.random() * QUOTES.length);
        setQuote(QUOTES[index]);
    };

    return (
        <section className={styles.summary}>
            <FontAwesomeIcon
                icon={faBookOpen}
                size="4x"
                className={styles.book}
                onClick={randomQuoteHandler}
            />
            <h2>Meet your next favorite story.</h2>
            <p className={styles.quote}>{quote}</p>
        </section>
    );
};

export default BooksSummary;
