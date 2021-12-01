import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './TitaItem.module.css';

const TitaItem = () => {
    return (
        <Fragment>
            <Link to={'/tita'} className={styles['container']}>
                <h1 className={styles['heading']}>Късче топлинка</h1>
                <span className={styles['heart']}>❤️</span>
            </Link>
        </Fragment>
    );
};

export default TitaItem;
