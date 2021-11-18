import { useReducer } from 'react';

const initialInputState = {
    value: '',
    isTouched: false,
};

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return { value: action.value, isTouched: state.isTouched };
        case 'BLUR':
            return { value: state.value, isTouched: true };
        case 'RESET':
            return { value: '', isTouched: false };
        default:
            return initialInputState;
    }
};

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(inputReducer, initialInputState);

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event) => {
        dispatch({ type: 'CHANGE', value: event.target.value });
    };

    const inputBlurHandler = () => {
        dispatch({ type: 'BLUR' });
    };

    const reset = () => {
        dispatch({ type: 'RESET' });
    };

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    };
};

export default useInput;
