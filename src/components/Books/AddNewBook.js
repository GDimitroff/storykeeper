import useInput from '../../hooks/use-input';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

import Modal from '../UI/Modal';
import styles from './AddNewBook.module.css';

const isNotEmpty = (value) => value.trim() !== '';

const AddNewBook = () => {
    const navigate = useNavigate();

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
    } = useInput(isNotEmpty);

    const {
        value: enteredImageUrl,
        isValid: enteredImageUrlIsValid,
        hasError: imageUrlInputHasError,
        valueChangeHandler: imageUrlChangeHandler,
        inputBlurHandler: imageUrlBlurHandler,
        reset: resetImageUrlInput,
    } = useInput(isNotEmpty);

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

        console.log('Submitted!');
        console.log(
            enteredTitle,
            enteredAuthor,
            enteredDescription,
            enteredImageUrl
        );

        resetTitleInput();
        resetAuthorInput();
        resetDescriptionInput();
        resetImageUrlInput();
    };

    return (
        <Modal onClose={onClose}>
            <div className={styles.container}>
                <form onSubmit={submitHandler} className={styles.form}>
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
                                First name must not be empty!
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
                                Last name must not be empty!
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
                                Enter valid email address
                            </p>
                        )}
                    </div>

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
                                Last name must not be empty!
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
                        <img
                            src={enteredImageUrl}
                            alt={`Book cover of ${enteredTitle}`}
                        />
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
