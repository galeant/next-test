import dayjs from "dayjs";
import { Badge, Button, ButtonGroup } from "react-bootstrap";
import Link from "next/link";
import { contactType, langPreference, partnerType, orderType } from "enums";

const contactTableConfig = [{
    label: 'ID',
    toDisplay: ({ row }) => {
        return <a href={`/order/${row.id}/detail`} target="_blank" >#{row.id}</a>
    }
}, {
    label: 'Type',
    toDisplay: ({ row }) => {
        const { string } = contactType(row.type);
        return string;
    }
}, {
    label: 'Name',
    toDisplay: ({ row }) => {
        return row.fullname
    }
}, {
    label: 'Email',
    toDisplay: ({ row }) => {
        return row.email
    }
}, {
    label: 'No.HP',
    toDisplay: ({ row }) => {
        return row.phone
    }
}, {
    label: 'Message',
    toDisplay: ({ row, handleModalShow }) => {
        let string = '-'
        let isMoreLength = false;
        if (row.notes !== null) {
            const max = 25;
            isMoreLength = (row.notes.length > max);
            string = row.notes.substr(0, max) + (isMoreLength ? '...' : '');
        }

        return (
            <>
                <p>{string}</p>
                {
                    isMoreLength && (<a href="#" onClick={() => handleModalShow(row.notes)}> Show more</a>)
                }
            </>
        )
    }
}, {
    label: 'Date',
    toDisplay: ({ row }) => {
        const parsedDate = dayjs(row.created_at).format('dddd, DD-MM-YYYY');
        return parsedDate;
    }
}, {
    label: 'Lang Preference',
    toDisplay: ({ row }) => {
        const { src } = langPreference(row.lang_preference)
        return <img src={src}></img>
    }
}]

const additionalField = {
    1: [
        {
            label: 'Production Code',
            toDisplay: ({ row }) => {
                return row.production_code
            }
        }, {
            label: 'Image',
            toDisplay: ({ row }) => {
                if (row.photo) {
                    return <a href={row.photo} target="_blank" >Show Image</a>
                }
            }
        }, {
            label: 'Exp Date',
            toDisplay: ({ row }) => {
                const parsedDate = row.exp_date ? dayjs(row.exp_date).format('dddd, DD-MM-YYYY') : null;
                return parsedDate;
            }
        }
    ],
    2: [
        {
            label: 'Order Method',
            toDisplay: ({ row }) => {
                const { string } = orderType(row.order_type);
                return string;
            }
        },
        {
            label: 'No.Order',
            toDisplay: ({ row }) => {
                return row.order_number
            }
        }
    ],
    3: [
        {
            label: 'Partner Type',
            toDisplay: ({ row }) => {
                const { string } = partnerType(row.partner_type);
                return string;
            }
        },
        {
            label: 'Distribution Area',
            toDisplay: ({ row }) => {
                return `${row.distribution_sub_district_name} (${row.distribution_postal})`
            }
        }
    ]
};

export {
    contactTableConfig,
    additionalField
}