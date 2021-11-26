import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

import Modal from '../UI/Modal';
import styles from './EditBook.module.css';

import BooksContext from '../../store/books-context';

const isNotEmpty = (value) => value.trim() !== '';
const isImageUrl = (value) =>
    value.trim().startsWith('https://') &&
    (value.trim().endsWith('.jpg') || value.trim().endsWith('.png'));
const maxLength = (value) => value.trim().length <= 500 && value.trim() !== '';

const EditBook = () => {
    const ctx = useContext(BooksContext);
    const location = useLocation();
    const navigate = useNavigate();
    const book = location.state;
    const redirectUrl = location.pathname.split('/')[1];

    const [enteredTitle, setEnteredTitle] = useState(book.title);
    const [enteredTitleTouched, setEnteredTitleTouched] = useState(false);

    const [enteredAuthor, setEnteredAuthor] = useState(book.author);
    const [enteredAuthorTouched, setEnteredAuthorTouched] = useState(false);

    const [enteredDescription, setEnteredDescription] = useState(
        book.description
    );
    const [enteredDescriptionTouched, setEnteredDescriptionTouched] =
        useState(false);

    const [enteredImageUrl, setEnteredImageUrl] = useState(book.imageUrl);
    const [enteredImageUrlTouched, setEnteredImageUrlTouched] = useState(false);

    const enteredTitleIsValid = isNotEmpty(enteredTitle);
    const enteredTitleIsInvalid = !enteredTitleIsValid && enteredTitleTouched;

    const enteredAuthorIsValid = isNotEmpty(enteredAuthor);
    const enteredAuthorIsInvalid =
        !enteredAuthorIsValid && enteredAuthorTouched;

    const enteredDescriptionIsValid = maxLength(enteredDescription);
    const enteredDescriptionIsInvalid =
        !enteredDescriptionIsValid && enteredDescriptionTouched;

    const enteredImageUrlIsValid = isImageUrl(enteredImageUrl);
    const enteredImageUrlIsInvalid =
        !enteredImageUrlIsValid && enteredImageUrlTouched;

    let formIsValid = true;
    if (
        !enteredTitleIsValid ||
        !enteredAuthorIsValid ||
        !enteredDescriptionIsValid ||
        !enteredImageUrlIsValid
    ) {
        formIsValid = false;
    }

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };

    const titleBlurHandler = () => {
        setEnteredTitleTouched(true);
    };

    const authorChangeHandler = (event) => {
        setEnteredAuthor(event.target.value);
    };

    const authorBlurHandler = () => {
        setEnteredAuthorTouched(true);
    };

    const descriptionChangeHandler = (event) => {
        setEnteredDescription(event.target.value);
    };

    const descriptionBlurHandler = () => {
        setEnteredDescriptionTouched(true);
    };

    const imageUrlChangeHandler = (event) => {
        setEnteredImageUrl(event.target.value);
    };

    const imageUrlBlurHandler = () => {
        setEnteredImageUrlTouched(true);
    };

    const onCloseHandler = () => {
        if (redirectUrl === 'books') {
            navigate(`/books/${book.id}`);
        } else {
            navigate(`/profile/mybooks/${book.id}`);
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        const updatedBook = {
            title: enteredTitle,
            author: enteredAuthor,
            description: enteredDescription,
            imageUrl: enteredImageUrl,
            creatorId: book.creatorId,
        };

        ctx.updateBook(book.id, updatedBook);

        setEnteredTitle('');
        setEnteredAuthor('');
        setEnteredDescription('');
        setEnteredImageUrl('');

        if (redirectUrl === 'books') {
            navigate(`/books/${book.id}`);
        } else {
            navigate(`/profile/mybooks/${book.id}`);
        }
    };

    return (
        <Modal onClose={onCloseHandler}>
            <h1 className={styles.heading}>Edit Book</h1>
            <div className={styles.container}>
                <form onSubmit={submitHandler} className={styles.form}>
                    <div
                        className={`${styles['form-control']} ${
                            enteredImageUrlIsInvalid ? styles['invalid'] : ''
                        }`}>
                        <label htmlFor="imageUrl">Image URL</label>
                        <input
                            type="text"
                            id="imageUrl"
                            value={enteredImageUrl}
                            onChange={imageUrlChangeHandler}
                            onBlur={imageUrlBlurHandler}
                        />
                        {enteredImageUrlIsInvalid && (
                            <p className={styles['error-text']}>
                                Image URL should start with https and ends with
                                .jpg or .png
                            </p>
                        )}
                    </div>

                    <div
                        className={`${styles['form-control']} ${
                            enteredTitleIsInvalid ? styles['invalid'] : ''
                        }`}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={enteredTitle}
                            onChange={titleChangeHandler}
                            onBlur={titleBlurHandler}
                        />
                        {enteredTitleIsInvalid && (
                            <p className={styles['error-text']}>
                                Title of the book cannot be empty
                            </p>
                        )}
                    </div>

                    <div
                        className={`${styles['form-control']} ${
                            enteredAuthorIsInvalid ? styles['invalid'] : ''
                        }`}>
                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            id="author"
                            value={enteredAuthor}
                            onChange={authorChangeHandler}
                            onBlur={authorBlurHandler}
                        />
                        {enteredAuthorIsInvalid && (
                            <p className={styles['error-text']}>
                                Author name cannot be empty
                            </p>
                        )}
                    </div>

                    <div
                        className={`${styles['form-control']} ${
                            enteredDescriptionIsInvalid ? styles['invalid'] : ''
                        }`}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            rows="10"
                            value={enteredDescription}
                            onChange={descriptionChangeHandler}
                            onBlur={descriptionBlurHandler}
                        />
                        {enteredDescriptionIsInvalid && (
                            <p className={styles['error-text']}>
                                Description cannot be empty or above 500
                                characters
                            </p>
                        )}
                    </div>

                    <div className={styles['form-actions']}>
                        <button
                            disabled={!formIsValid}
                            className={`${styles.btn} ${styles['btn-add']}`}>
                            <FontAwesomeIcon icon={faCheck} size="lg" />
                        </button>
                        <button
                            onClick={onCloseHandler}
                            className={`${styles.btn} ${styles['btn-close']}`}>
                            <FontAwesomeIcon icon={faTimes} size="lg" />
                        </button>
                    </div>
                </form>

                <article className={styles['book-preview']}>
                    <div className={styles['book-image']}>
                        <img src={enteredImageUrl} alt={enteredTitle} />
                    </div>
                    <div className={styles['book-info']}>
                        <div className={styles['book-title']}>
                            {enteredTitle}
                        </div>
                        <div className={styles['book-author']}>
                            {enteredAuthor}
                        </div>
                        <div className={styles['book-description']}>
                            {enteredDescription}
                        </div>
                    </div>
                </article>
            </div>
        </Modal>
    );
};

export default EditBook;
