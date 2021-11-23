import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css';

const Login = () => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredUsernameIsInvalid, setEnteredUsernameIsInvalid] =
        useState(false);
    const [enteredPassword, setEnteredPassword] = useState('');
    const navigate = useNavigate();

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    };

    const onFocusHandler = () => {
        setEnteredUsernameIsInvalid(false);
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
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
        <>
            <h1 className={styles.heading}>Login to your account</h1>
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
                        type="text"
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

                <button className={styles.btn}>Login</button>
            </form>
        </>
    );
};

export default Login;
