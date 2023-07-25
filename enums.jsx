// import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
// import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
// import { DiAndroid } from "react-icons/di";

const orderStatus = (value = null, all = false) => {
    const attr = {
        1: {
            icon: () => {
                return (
                    <i className="fe fe-send"></i>
                )
            },
            color: 'warning',
            string: 'On Progress'
        },
        2: {
            icon: () => {
                return (
                    <i className="fe fe-check-square"></i>
                )
            },
            color: 'success',
            string: 'Delivered'
        }
    };
    if (all) {
        return Object.keys(attr).map(key => ({
            key,
            ...attr[key]
        }));
    }

    if (!value) {
        return {
            icon: () => {
                return ''
            },
            color: '',
            string: ''
        }
    }
    return attr[value];

}


const langPreference = (value = null) => {
    const lang = {
        'id':{
            src: '/flag/id.webp',
            string: 'Indonesia'
        },
        'en':{
            src: '/flag/us.webp',
            string: 'English'
        },
        'jp':{
            src: '/flag/jp.webp',
            string: 'Japan'   
        }
    }
    if (value !== null && attr[value] !== undefined) {
        return attr[value];
    }else if(attr[value] !== undefined){
        return {
            src:'',
            string:''
        }
    }
    return Object.keys(attr).map(key => ({
        key,
        ...attr[key]
    }));
}

const promoStatus = (value = null) => {
    const attr = {
        'publish': {
            icon: <></>,
            color: 'success',
            string: 'Publish'
        },
        'unpublish': {
            icon: <></>,
            color: 'danger',
            string: 'UnPublish'
        },
        'draft': {
            icon: <></>,
            color: 'warning',
            string: 'Draft'
        }
    };
    if (value !== null) {
        return attr[value];
    }
    return Object.keys(attr).map(key => ({
        key,
        ...attr[key]
    }));
}

const articleStatus = (value = null) => {
    const attr = [
        {
            icon: <></>,
            color: 'warning',
            string: 'Draft'
        },
        {
            icon: <></>,
            color: 'success',
            string: 'Live'
        }
    ];
    if (value !== null) {
        return attr[value];
    }
    return attr;
}

export {
    orderStatus,
    langPreference,
    promoStatus,
    articleStatus,
}