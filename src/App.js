import { Fragment } from 'react';

import Header from './components/Layout/Header';
import Books from './components/Books/Books';
import Footer from './components/Layout/Footer';

function App() {
    return (
        <Fragment>
            <Header />
            <Books />
            <Footer />
        </Fragment>
    );
}

export default App;
