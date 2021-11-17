import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import booksImage from '../../assets/books.jpg';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <Fragment>
            <header className={styles.header}>
                <Link to="/" className={styles.link}>
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
                </Link>
                <nav>
                    <ul className={styles['nav-list']}>
                        <li className={styles['nav-list-item']}>
                            <Link to="/add-new-book">Add New Book</Link>
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
