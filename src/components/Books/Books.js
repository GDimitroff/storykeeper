import { Fragment } from 'react';

import BooksSummary from './BooksSummary';
import AvailableBooks from './AvailableBooks';

const Books = () => {
    return (
        <Fragment>
            <BooksSummary></BooksSummary>
            <AvailableBooks />
        </Fragment>
    );
};

export default Books;
