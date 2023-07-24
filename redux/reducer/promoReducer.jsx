import dayjs from "dayjs";

const defaultDetailState = {
    id: null,
    title: null,
    start_date: dayjs().toDate(),
    end_date: dayjs().toDate(),
    voucher_code: null,
    promo_thumbnail: null,
    promo_image: null,
    terms_cond: null,
    galon: 0,
    refill_galon: 0,
    lima_belas_lt: 0,
    enam_ratus_ml: 0,
    empat_ratus_ml: 0,
    status: '',
    max_redeem: null,   
}

const initialState = {
    isLoading: true,
    dataList: [],
    detail: defaultDetailState,
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
            let detailData = data.data;
            detailData.start_date = dayjs(detailData.start_date).toDate()
            detailData.end_date = dayjs(detailData.end_date).toDate()
            return { ...state, detail: detailData, isLoading: false };

        case 'SET_DEFAULT_DETAIL':
            return { ...state, detail: defaultDetailState};
        case 'UPDATE_PROMO':
            return { ...state, detail: action.detail, input: action.data };
        default:
            return state;
    }
};

export default promoReducer;
