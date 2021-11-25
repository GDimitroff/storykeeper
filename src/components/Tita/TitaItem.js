import { Fragment } from 'react';
import styles from './TitaItem.module.css';

const TitaItem = () => {
    return (
        <Fragment>
            {/* <Link to={'/tita'} className={styles.book}> */}
            <div className={styles['container']}>
                <h1 className={styles['heading']}>На една поляна разстояние</h1>
                <span className={styles['heart']}>❤️</span>
            </div>
            {/* </Link> */}
        </Fragment>
    );
};

export default TitaItem;
