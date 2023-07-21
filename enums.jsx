// import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
// import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
// import { DiAndroid } from "react-icons/di";

const orderStatus = (value = null, all = false) => {
    if (!value) {
        return {
            icon: () => {
                return ''
            },
            color: '',
            string: ''
        }
    }

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
    return attr[value];

}


const langPreference = (value) => {
    switch (value) {
        case 'id':
            return {
                src: '/flag/id.webp',
                string: 'Indonesia'
            }
        case 'en':
            return {
                src: '/flag/us.webp',
                string: 'English'
            }
        case 'jp':
            return {
                src: '/flag/jp.webp',
                string: 'Japan'
            }
        default:
            return {
                src: '',
                string: ''
            }
    }
}

const promoStatus = (value = null) => {
    const attr = {
        'publish': {
            icon: <HourglassEmptyIcon />,
            color: 'success',
            string: 'Publish'
        },
        'unpublish': {
            icon: <DeliveryDiningIcon />,
            color: 'error',
            string: 'UnPublish'
        },
        'draft': {
            icon: <DeliveryDiningIcon />,
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

export {
    orderStatus,
    langPreference,
    promoStatus,
}