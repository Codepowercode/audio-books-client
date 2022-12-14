import React, {useReducer} from 'react';

const initialInputState = {
    value:'',
    isTouched: false,
    disabled:true,
};

const inputStateReducer = (state, action) => {

    switch (action.type) {
        case 'INPUT' :
            return {value: action.value, isTouched: state.isTouched, disabled: false}
            break;
        case 'BLUR' :
            return {isTouched: true, value: state.value, disabled: state.disabled}
            break;
        case 'RESET' :
            return {isTouched: false, value: '',disabled:true}
            break;
        default :
            return initialInputState;
    }
};

const useInput = (validateValue) => {

    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

    const valueIsValid = validateValue(inputState.value);

    const hasError = !valueIsValid && inputState.isTouched;


    const valueChangeHandler = (event) => {
        dispatch({type: 'INPUT', value: event.target.value});
    };

    const inputBlurHandler = () => {
        dispatch({type: 'BLUR'});
    };

    const reset = () => {
        dispatch({type: 'RESET'});
    };


    return {
        value: inputState.value,
        isValid: valueIsValid,
        isTouched: inputState.isTouched,
        disabled:inputState.disabled,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    };
};

export default useInput;