import { Chip, Link } from "@mui/material";
import { format, parseISO } from "date-fns";
import { orderStatus, langPreference } from "src/enums";


const orderTableConfig = [{
    label: 'ID',
    toDisplay: (row) => {
        return <Link href={`/order/${row.id}/detail`} target="_blank" >#{row.id}</Link >
    }
}, {
    label: 'Status',
    toDisplay: (row) => {
        const { icon, color, string } = orderStatus(row.status);
        return <Chip icon={icon} color={color} label={string} />
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
        const parsedDate = parseISO(row.created_at);
        const date = format(parsedDate, 'eee, dd-MM-yyyy');
        return date
    }
}, {
    label: 'Lang Preference',
    toDisplay: (row) => {
        const { src, string } = langPreference(row.lang_preference)
        return <img src={src}></img>
    }
}]

export default orderTableConfig