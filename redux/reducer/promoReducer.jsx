const initialState = {
    isLoading: true,
    dataList: [],
    detail: {
        id: null,
        title: null,
        start_date: null,
        end_date: null,
        voucher_code: null,
        promo_thumbnail: null,
        promo_image: null,
        terms_cond: null,
        galon: null,
        refill_galon: null,
        lima_belas_lt: null,
        enam_ratus_ml: null,
        empat_ratus_ml: null,
        status: '',
        max_redeem: null,
    },
    dataInput: {},
    pagination: {
        perPage: 0,
        currentPage: 0,
        lastPage: 0,
        total: 0,
    },
};

const promoReducer = (state = initialState, { type, data, id, message }) => {
    switch (type) {
        case 'SET_PROMO_LIST':
            return {
                ...state,
                dataList: data.data,
                pagination: {
                    ...state.pagination,
                    perPage: data.meta.per_page,
                    currentPage: data.meta.current_page,
                    lastPage: data.meta.last_page,
                    total: data.meta.total
                }
            };
        // case 'GET_PROMO_DETAIL':
        //     return { ...state, list: action.data };
        case 'SET_PROMO_DETAIL':
            return { ...state, detail: data.data, isLoading: false };
        case 'POST_PROMO':
            return { ...state, input: action.data };
        case 'UPDATE_PROMO':
            return { ...state, detail: action.detail, input: action.data };
        // case 'DELETE_PROMO':
        //     return { ...state, detail: action.detail };
        default:
            return state;
    }
};

export default promoReducer;
