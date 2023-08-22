export const getContactList = (queryParams) => ({
    type: 'GET_CONTACT_LIST',
    queryParams
})

export const setContactList = (data) => ({
    type: 'SET_CONTACT_LIST',
    data,
})

export const getContactDetail = (id) => ({
    type: 'GET_CONTACT_DETAIL',
    id,
});

export const setContactDetail = (data) => ({
    type: 'SET_CONTACT_DETAIL',
    data
})