import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const orderStatus = (value = null) => {
    const attr = {
        1: {
            icon: <HourglassEmptyIcon />,
            color: 'warning',
            string: 'On Progress'
        },
        2: {
            icon: <DeliveryDiningIcon />,
            color: 'success',
            string: 'Delivered'
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

const langPreference = (value) => {
    switch (value) {
        case 'id':
            return {
                src: '/static/images/flag/id.webp',
                string: 'Indonesia'
            }
        case 'en':
            return {
                src: '/static/images/flag/us.webp',
                string: 'English'
            }
        case 'jp':
            return {
                src: '/static/images/flag/jp.webp',
                string: 'Japan'
            }
    }
}

export {
    orderStatus,
    langPreference
}