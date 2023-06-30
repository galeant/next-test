const initialState = {
    token: null,
    user: null,
    intendedPath: '/',
    errors: {}
};

const authReducer = (state = initialState, { type, data, path, message }) => {
    switch (type) {
        case 'SET_AUTH':
            return { ...state, ...data };
        case 'SET_INTENDED_PATH':
            return { ...state, intendedPath: path };
        case 'DELETE_AUTH':
            const setEmpty = { token: null, user: null }
            return { ...state, ...setEmpty };
        case 'SET_ERROR':
            return { ...state, errors: message };
        default:
            return state;
    }
};

export default authReducer;
