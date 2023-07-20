
const initialState = {
    isLoading: true,
    dataList: [],
    detail: {},
    dataInput: {},
    pagination: {
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
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
                },
                isLoading: false,
            }
            return { ...state, ...res };
        case 'SET_ORDER_DETAIL':
            return { ...state, detail: data.data, isLoading: false };
        default:
            return state;
    }
};

export default breedReducer;
