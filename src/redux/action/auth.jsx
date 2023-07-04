export const login = (payload) => ({
    type: 'LOGIN',
    payload
})

export const setIntendedPath = (path) => ({
    type: 'SET_INTENDED_PATH',
    path
})

export const logout = () => ({
    type: 'LOGOUT'
})

export const setAuth = (data) => ({
    type: 'SET_AUTH',
    data,
})

export const deleteAuth = () => ({
    type: 'DELETE_AUTH'
});


export const setError = (error) => ({
    type: 'SET_ERROR',
    error
});