import { Fragment } from 'react';

import booksImage from '../../assets/books.jpg';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {
    return (
        <Fragment>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <FontAwesomeIcon
                        icon={faBookOpen}
                        size="3x"
                        color="#3b2f17"
                    />
                    <h1 className={styles.heading}>
                        story<span className={styles.bold}>keeper</span>
                    </h1>
                </div>
                <nav>
                    <ul className={styles['nav-list']}>
                        <li className={styles['nav-list-item']}>
                            <a href="/#">Add New Story</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className={styles['main-image']}>
                <img src={booksImage} alt="Books" />
            </div>
        </Fragment>
    );
};

export default Header;
