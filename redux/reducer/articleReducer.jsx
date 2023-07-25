import dayjs from "dayjs";

const defaultDetailState = {
    id: null,
    title: {
        id:null,
        en:null,
        jp:null,
    },
    content:{
        id:null,
        en:null,
        jp:null,
    },
    slug:{
        id:null,
        en:null,
        jp:null,
    },
    status:null,
    published_at:dayjs().toDate(),
    meta_title:null,
    meta_keyword:[],
    meta_description:null,
    banner:null,
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

const articleReducer = (state = initialState, { type, data, id, message }) => {
    switch (type) {
        case 'SET_ARTICLE_LIST':
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

        case 'SET_ARTICLE_DETAIL':
            let detailData = data.data;
            detailData.published_at = dayjs(detailData.published_at).toDate()
            return { ...state, detail: detailData, isLoading: false };

        case 'SET_DEFAULT_DETAIL':
            return { ...state, detail: defaultDetailState};
            
        default:
            return state;
    }
};

export default articleReducer;
