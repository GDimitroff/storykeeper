import { Fragment } from 'react';

import Header from './components/Layout/Header';
import Books from './components/Books/Books';

function App() {
    return (
        <Fragment>
            <Header />
            <Books />
        </Fragment>
    );
}

export default App;
