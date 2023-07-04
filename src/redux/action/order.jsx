export const getOrderList = (queryParams) => ({
    type: 'GET_ORDER_LIST',
    queryParams
})

export const setOrderList = (data) => ({
    type: 'SET_ORDER_LIST',
    data,
})

export const getOrderDetail = (id) => ({
    type: 'GET_ORDER_DETAIL',
    id,
});

export const setOrderDetail = (data) => ({
    type: 'SET_ORDER_DETAIL',
    data
})

export const setError = (error) => ({
    type: 'SET_ERROR',
    error
});