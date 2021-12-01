import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal';
import styles from './Tita.module.css';

const Tita = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onCloseHandler = () => {
        navigate('/');
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name = formData.get('name');
        const date = formData.get('date');

        if (
            name.trim().toLowerCase() !== 'тита' ||
            date.trim() !== '16/02/2021'
        ) {
            setError('Кофти избор на име и дата. Опитай пак!');
            return;
        }

        setSuccess(true);
        event.currentTarget.reset();
    };

    return (
        <Modal modalType="auth" onClose={onCloseHandler}>
            {!success && (
                <>
                    <h1 className={styles.heading}>
                        Студено е, сняг вали, въведи име и дата и се стопли
                    </h1>
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
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Име..."
                            />
                        </div>

                        <div className={styles['form-control']}>
                            <input
                                type="text"
                                id="date"
                                name="date"
                                placeholder="01/01/2000"
                            />
                        </div>

                        <button className={styles.btn}>
                            Искам да се стопля!
                        </button>
                    </form>
                </>
            )}
            {success && (
                <div className={styles['text']}>
                    <h3>Тита ❤️</h3>
                    <br />
                    <p>Моя перфектна Тита,</p>
                    <p>далеч си ми все още ти,</p>
                    <p>но кончето се разплита</p>
                    <p>и малко остава всичко да закипи.</p>
                    <br />
                    <p>Моя неземна Тита,</p>
                    <p>устните ти са ми блян.</p>
                    <p>Нещо страстно връхлита</p>
                    <p>и ще целува без свян.</p>
                    <br />
                    <p>Моя чиста и невинна Тита,</p>
                    <p>ти разпали огъня в мен.</p>
                    <p>Усещаш ли как всичко полита?</p>
                    <p>Бях взет в плен!</p>
                </div>
            )}
        </Modal>
    );
};

export default Tita;
