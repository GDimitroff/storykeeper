import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import useInput from '../../hooks/use-input';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

import Modal from '../UI/Modal';
import styles from './AddNewBook.module.css';

import BooksContext from '../../store/books-context';

const isNotEmpty = (value) => value.trim() !== '';
const startsWithHttps = (value) =>
    value.trim().startsWith('https://') &&
    (value.trim().endsWith('.jpg') || value.trim().endsWith('.png'));
const maxLength = (value) => value.trim().length <= 500 && value.trim() !== '';

const AddNewBook = () => {
    const navigate = useNavigate();

    const ctx = useContext(BooksContext);

    const onClose = () => {
        navigate('/');
    };

    const {
        value: enteredTitle,
        isValid: enteredTitleIsValid,
        hasError: titleInputHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
        reset: resetTitleInput,
    } = useInput(isNotEmpty);

    const {
        value: enteredAuthor,
        isValid: enteredAuthorIsValid,
        hasError: authorInputHasError,
        valueChangeHandler: authorChangeHandler,
        inputBlurHandler: authorBlurHandler,
        reset: resetAuthorInput,
    } = useInput(isNotEmpty);

    const {
        value: enteredDescription,
        isValid: enteredDescriptionIsValid,
        hasError: descriptionInputHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: resetDescriptionInput,
    } = useInput(maxLength);

    const {
        value: enteredImageUrl,
        isValid: enteredImageUrlIsValid,
        hasError: imageUrlInputHasError,
        valueChangeHandler: imageUrlChangeHandler,
        inputBlurHandler: imageUrlBlurHandler,
        reset: resetImageUrlInput,
    } = useInput(startsWithHttps);

    let formIsValid = false;
    if (
        enteredTitleIsValid &&
        enteredAuthorIsValid &&
        enteredDescriptionIsValid &&
        enteredImageUrlIsValid
    ) {
        formIsValid = true;
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        const book = {
            title: enteredTitle,
            author: enteredAuthor,
            description: enteredDescription,
            imageUrl: enteredImageUrl,
        };

        ctx.addNewBook(book);

        resetTitleInput();
        resetAuthorInput();
        resetDescriptionInput();
        resetImageUrlInput();

        navigate('/');
    };

    return (
        <Modal onClose={onClose}>
            <h1 className={styles.heading}>Add New Book</h1>
            <div className={styles.container}>
                <form onSubmit={submitHandler} className={styles.form}>
                    <div
                        className={`${styles['form-control']} ${
                            imageUrlInputHasError ? styles['invalid'] : ''
                        }`}>
                        <label htmlFor="imageUrl">Image URL</label>
                        <input
                            type="text"
                            id="imageUrl"
                            value={enteredImageUrl}
                            onChange={imageUrlChangeHandler}
                            onBlur={imageUrlBlurHandler}
                        />
                        {imageUrlInputHasError && (
                            <p className={styles['error-text']}>
                                Image URL should start with https and ends with
                                .jpg or .png
                            </p>
                        )}
                    </div>

                    <div
                        className={`${styles['form-control']} ${
                            titleInputHasError ? styles['invalid'] : ''
                        }`}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={enteredTitle}
                            onChange={titleChangeHandler}
                            onBlur={titleBlurHandler}
                        />
                        {titleInputHasError && (
                            <p className={styles['error-text']}>
                                Title of the book cannot be empty
                            </p>
                        )}
                    </div>

                    <div
                        className={`${styles['form-control']} ${
                            authorInputHasError ? styles['invalid'] : ''
                        }`}>
                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            id="author"
                            value={enteredAuthor}
                            onChange={authorChangeHandler}
                            onBlur={authorBlurHandler}
                        />
                        {authorInputHasError && (
                            <p className={styles['error-text']}>
                                Author name cannot be empty
                            </p>
                        )}
                    </div>

                    <div
                        className={`${styles['form-control']} ${
                            descriptionInputHasError ? styles['invalid'] : ''
                        }`}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            rows="10"
                            value={enteredDescription}
                            onChange={descriptionChangeHandler}
                            onBlur={descriptionBlurHandler}
                        />
                        {descriptionInputHasError && (
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
                            onClick={onClose}
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

export default AddNewBook;
