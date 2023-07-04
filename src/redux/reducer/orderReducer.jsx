
const initialState = {
    dataList: [],
    detail: {},
    dataInput: {},
    pagination: {
        perPage: 0,
        currentPage: 0,
        lastPage: 0,
        total: 0,
    },
};

const breedReducer = (state = initialState, { type, data, id }) => {
    switch (type) {
        case 'SET_ORDER_LIST':
            const res = {
                dataList: data.data,
                pagination: {
                    ...state.pagination,
                    perPage: data.meta.per_page,
                    currentPage: data.meta.current_page,
                    lastPage: data.meta.last_page,
                    total: data.meta.total
                }
            }
            return { ...state, ...res };
        case 'GET_BREED_DETAIL':
            return { ...state, list: action.data };
        case 'SET_BREED_DETAIL':
            return { ...state, detail: action.detail };
        case 'POST_BREED':
            return { ...state, input: action.data };
        case 'UPDATE_BREED':
            return { ...state, detail: action.detail, input: action.data };
        case 'DELETE_BREED':
            return { ...state, detail: action.detail };
        default:
            return state;
    }
};

export default breedReducer;
