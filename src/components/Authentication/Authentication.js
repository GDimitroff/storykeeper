import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal';
import Login from './Login';
import Register from './Register';

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const onClickHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const onCloseHandler = () => {
        navigate('/');
    };

    return (
        <Modal onClose={onCloseHandler}>
            {isLogin ? <Login /> : <Register />}
            <button onClick={onClickHandler}>
                Switch to {isLogin ? 'Register' : 'Login'}
            </button>
        </Modal>
    );
};

export default Authentication;
