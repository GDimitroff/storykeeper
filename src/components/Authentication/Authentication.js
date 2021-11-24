import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../store/auth-context';

import Modal from '../UI/Modal';
import styles from './Authentication.module.css';

const Authentication = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const onSwitchHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const onCloseHandler = () => {
        navigate('/');
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        //TODO: Add validation

        setIsLoading(true);
        let url;
        if (isLogin) {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVW1-WoAnLhsBAjH6vGy8rv3Ked47be8M';
        } else {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVW1-WoAnLhsBAjH6vGy8rv3Ked47be8M';
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
        })
            .then(async (res) => {
                setIsLoading(false);

                if (res.ok) {
                    return res.json();
                } else {
                    const data = await res.json();
                    const errorMessage = data.error.message;
                    throw new Error(errorMessage);
                }
            })
            .then((data) => {
                authCtx.login(data.idToken);
                navigate('/', { replace: true });
            })
            .catch((error) => {
                switch (error.message) {
                    case 'WEAK_PASSWORD : Password should be at least 6 characters':
                        setError('Password should be at least 6 characters');
                        break;
                    case 'EMAIL_EXISTS':
                        setError(
                            'User with this email address is already registered'
                        );
                        break;
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        setError('Too many attempts! Try agin later!');
                        break;
                    case 'EMAIL_NOT_FOUND':
                        setError('Invalid email or password!');
                        break;
                    case 'INVALID_PASSWORD':
                        setError('Invalid email or password!');
                        break;
                    default:
                        setError('Authentication failed!');
                        break;
                }
            });
    };

    return (
        <Modal modalType="auth" onClose={onCloseHandler}>
            <h1 className={styles.heading}>{isLogin ? 'Login' : 'Sign Up'}</h1>

            {error && (
                <p
                    className={styles['error-text']}
                    onClick={() => {
                        setError(null);
                    }}>
                    {error}
                </p>
            )}

            <form onSubmit={submitHandler} className={styles.form}>
                <div className={styles['form-control']}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        required
                        ref={emailInputRef}
                    />
                </div>

                <div className={styles['form-control']}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        ref={passwordInputRef}
                    />
                </div>

                {!isLoading && (
                    <button className={styles.btn}>
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                )}
                {isLoading && <p>Loading...</p>}
                {/* TODO: Add spinner... */}
            </form>
            {!isLoading && (
                <p className={styles['text']}>
                    {isLogin ? 'Not registered?' : 'Already have an account?'}{' '}
                    <span
                        className={styles['switch']}
                        onClick={onSwitchHandler}>
                        {isLogin ? 'Create an account' : 'Login'}
                    </span>
                </p>
            )}
        </Modal>
    );
};

export default Authentication;
