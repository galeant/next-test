
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

const orderReducer = (state = initialState, { type, data, id }) => {
    switch (type) {
        case 'SET_ORDER_LIST':
            const res = {
                dataList: data.data,
                pagination: {
                    ...state.pagination,
                    perPage: data.meta?.per_page ?? 10,
                    currentPage: data.meta?.current_page ?? 1,
                    lastPage: data.meta?.last_page ?? 1,
                    total: data.meta?.total ?? 0
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

export default orderReducer;
