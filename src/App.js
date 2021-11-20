import { Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AddNewBook from './components/Books/AddNewBook';
import Header from './components/Layout/Header';
import Books from './components/Books/Books';
import BookDetails from './components/Books/BookDetails';
import Footer from './components/Layout/Footer';
import EditBook from './components/Books/EditBook';

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
                <Route
                    path="/books/:bookId/edit"
                    element={
                        <>
                            <Books />
                            <EditBook />
                        </>
                    }
                />
                <Route
                    path="/add-new-book"
                    element={
                        <>
                            <Books />
                            <AddNewBook />
                        </>
                    }
                />
            </Routes>
            <Footer />
        </Fragment>
    );
}

export default App;
