import { Fragment } from 'react';

import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <Fragment>
            <footer className={styles.footer}>
                <p className={styles.text}>Made with</p>
                <FontAwesomeIcon
                    icon={faHeart}
                    size="2x"
                    color="#9b2226"
                    className={styles.icon}
                />
                <p className={styles.text}>
                    by{' '}
                    <a
                        className={styles.link}
                        href="https://github.com/GDimitroff"
                        target="_blank"
                        rel="noreferrer">
                        Gospodin Dimitrov
                    </a>
                </p>
            </footer>
        </Fragment>
    );
};

export default Footer;
