export const getBreedList = (queryParams) => ({
    type: 'GET_BREED_LIST',
    queryParams
})

export const setBreedList = (data) => ({
    type: 'SET_BREED_LIST',
    data,
})

export const getBreedDetail = (id) => ({
    type: 'GET_BREED_DETAIL',
    id,
});

export const setBreedDetail = (data) => ({
    type: 'SET_BREED_DETAIL',
    data
})

export const createBreed = (data) => ({
    type: 'POST_BREED',
    data,
});

export const updateBreed = (id, data) => ({
    type: 'UPDATE_BREED',
    id, data
});

export const deleteBreed = (id) => ({
    type: 'DELETE_BREED',
    id,
});

export const setError = (message) => ({
    type: 'SET_ERROR',
    message
});