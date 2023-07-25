export const getPromoList = (queryParams) => ({
    type: 'GET_PROMO_LIST',
    queryParams
})

export const setPromoList = (data) => ({
    type: 'SET_PROMO_LIST',
    data,
})

export const getPromoDetail = (id) => ({
    type: 'GET_PROMO_DETAIL',
    id,
});

export const setPromoDetail = (data) => ({
    type: 'SET_PROMO_DETAIL',
    data
})

export const postPromo = (submitData,id) => ({
    type: 'POST_PROMO',
    id,
    submitData
})

export const deletePromo = ({ id, queryParams }) => ({
    type: 'DELETE_PROMO',
    id, queryParams
})
