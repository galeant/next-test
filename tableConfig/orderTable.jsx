// import { Chip, Link } from "@mui/material";
import { orderStatus, langPreference } from "enums";
import dayjs from "dayjs";
import { Badge } from "react-bootstrap";


const orderTableConfig = [{
    label: 'ID',
    toDisplay: (row) => {
        return <a href={`/order/${row.id}/detail`} target="_blank" >#{row.id}</a>
    }
}, {
    label: 'Status',
    toDisplay: (row) => {
        const { icon, color, string } = orderStatus(row.status);
        return <Badge pill bg={color} className="p-2">{icon()}</Badge>
    }
}, {
    label: 'Name',
    toDisplay: (row) => {
        return row.contact_name
    }
}, {
    label: 'City',
    toDisplay: (row) => {
        return row.city
    }
}, {
    label: 'Email',
    toDisplay: (row) => {
        return row.contact_email
    }
}, {
    label: 'Phone',
    toDisplay: (row) => {
        return row.contact_phone
    }
}, {
    label: 'Voucher / Promo Code',
    toDisplay: (row) => {
        return row.promo_code
    }
}, {
    label: 'Order Date',
    toDisplay: (row) => {
        const parsedDate = dayjs(row.created_at).format('dddd, DD-MM-YYYY');
        return parsedDate;
    }
}, {
    label: 'Lang Preference',
    toDisplay: (row) => {
        const { src, string } = langPreference(row.lang_preference)
        return <img src={src}></img>
    }
}]

export default orderTableConfig