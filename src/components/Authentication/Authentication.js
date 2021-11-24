import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal';
import Login from './Login';
import Register from './Register';

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const onSwitchHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const onCloseHandler = () => {
        navigate('/');
    };

    return (
        <Modal modalType="auth" onClose={onCloseHandler}>
            {isLogin ? (
                <Login onSwitch={onSwitchHandler} />
            ) : (
                <Register onSwitch={onSwitchHandler} />
            )}
        </Modal>
    );
};

export default Authentication;
