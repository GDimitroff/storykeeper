import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Layout/Header';
import Books from './components/Books/Books';
import BookDetails from './components/Books/BookDetails';
import AddNewBook from './components/Books/AddNewBook';
import Footer from './components/Layout/Footer';
import EditBook from './components/Books/EditBook';
import Authentication from './components/Authentication/Authentication';
import Profile from './components/Profile/Profile';

import { BooksContextProvider } from './store/books-context';
import AuthContext from './store/auth-context';

function App() {
    const authCtx = useContext(AuthContext);

    return (
        <BooksContextProvider>
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

                {authCtx.isLoggedIn && (
                    <Route
                        path="/books/:bookId/edit"
                        element={
                            <>
                                <Books />
                                <EditBook />
                            </>
                        }
                    />
                )}

                {authCtx.isLoggedIn && (
                    <Route
                        path="/add-new-book"
                        element={
                            <>
                                <Books />
                                <AddNewBook />
                            </>
                        }
                    />
                )}

                {authCtx.isLoggedIn && (
                    <Route path="/profile" element={<Profile />} />
                )}

                <Route
                    path="/profile/mybooks"
                    element={<Navigate to="/profile" replace={true} />}
                />

                {authCtx.isLoggedIn && (
                    <Route
                        path="/profile/mybooks/:bookId"
                        element={
                            <>
                                <Profile />
                                <BookDetails />
                            </>
                        }
                    />
                )}

                {!authCtx.isLoggedIn && (
                    <Route
                        path="/auth"
                        element={
                            <>
                                <Books />
                                <Authentication />
                            </>
                        }
                    />
                )}

                <Route
                    path="/tita"
                    element={
                        <>
                            <Books />
                            {/* <Tita /> */}
                        </>
                    }
                />

                <Route path="/*" element={<Navigate to="/" replace={true} />} />
            </Routes>
            <Footer />
        </BooksContextProvider>
    );
}

export default App;
