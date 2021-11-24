import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal';
import styles from './Authentication.module.css';

const Authentication = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredUsernameIsInvalid, setEnteredUsernameIsInvalid] =
        useState(false);
    const [enteredPassword, setEnteredPassword] = useState('');

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    };

    const onFocusHandler = () => {
        setEnteredUsernameIsInvalid(false);
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    const onSwitchHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const onCloseHandler = () => {
        navigate('/');
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (enteredUsername === '') {
            setEnteredUsernameIsInvalid(true);
            return;
        }

        setEnteredUsername('');
        setEnteredPassword('');

        navigate('/');
    };

    return (
        <Modal modalType="auth" onClose={onCloseHandler}>
            <h1 className={styles.heading}>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form
                onSubmit={submitHandler}
                className={styles.form}
                onFocus={onFocusHandler}>
                <div
                    className={`${styles['form-control']} ${
                        enteredUsernameIsInvalid ? styles['invalid'] : ''
                    }`}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={enteredUsername}
                        onChange={usernameChangeHandler}
                    />
                </div>

                <div className={styles['form-control']}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                    />
                </div>

                {enteredUsernameIsInvalid && (
                    <p className={styles['error-text']}>Error message</p>
                )}

                <button className={styles.btn}>
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            <p className={styles['text']}>
                {isLogin ? 'Not registered?' : 'Already have an account?'}{' '}
                <span className={styles['switch']} onClick={onSwitchHandler}>
                    {isLogin ? 'Create an account' : 'Login'}
                </span>
            </p>
        </Modal>
    );
};

export default Authentication;
