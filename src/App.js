import { Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Layout/Header';
import Books from './components/Books/Books';
import BookDetails from './components/Books/BookDetails';
import Footer from './components/Layout/Footer';

function App() {
    return (
        <Fragment>
            <Header />
            <Routes>
                <Route path="/" element={<Books />} />
                <Route
                    path="/books"
                    element={<Navigate to="/" replace={true} />}
                />
                <Route
                    path="/books/:bookId"
                    element={
                        <>
                            <Books />
                            <BookDetails />
                        </>
                    }
                />
            </Routes>
            <Footer />
        </Fragment>
    );
}

export default App;
