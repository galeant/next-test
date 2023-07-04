const initialState = {
    token: null,
    user: null,
    intendedPath: '/',
};

const authReducer = (state = initialState, { type, data, path }) => {
    switch (type) {
        case 'SET_AUTH':
            return { ...state, ...data };
        case 'SET_INTENDED_PATH':
            return { ...state, intendedPath: path };
        case 'DELETE_AUTH':
            const setEmpty = { token: null, user: null }
            return { ...state, ...setEmpty };
        default:
            return state;
    }
};

export default authReducer;
