import { contactType } from "enums";


const initialState = {
    isLoading: true,
    dataList: [],
    detail: {},
    pagination: {
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
        total: 0,
    },
    summary:{
        startDate:'',
        endData:'',
        data:[]
    },
};

const contactReducer = (state = initialState, { type, data, id }) => {
    switch (type) {
        case 'SET_CONTACT_LIST':
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
        // case 'SET_CONTACT_DETAIL':
        //     return { ...state, detail: data.data, isLoading: false };
        case 'SET_CONTACT_SUMMARY':
            const dataSummaryMap = contactType().map((v) =>{
                let dataFind = data.data.find((v1) =>v.key == v1.constant)
                if(dataFind){
                    return dataFind.value
                }else{
                    return 0;
                }
            })
            const remapData = {
                startDate: data.start_date,
                endDate: data.end_date,
                data: dataSummaryMap
            }
            return { ...state, summary: remapData, isLoading: false };
        default:
            return state;
    }
};

export default contactReducer;
