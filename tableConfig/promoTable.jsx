import dayjs from "dayjs";
import { Badge, Button, ButtonGroup } from "react-bootstrap";
import { promoStatus } from "enums";

const promoTableConfig = [{
    label: 'Action',
    toDisplay: ({ row, editAction, deleteAction }) => {
        // const editUrl = `promo/${row.id}/detail`
        return (
            <ButtonGroup size="sm">
                {/* <a href={editUrl} className="btn btn-success" target="_blank">Edit</a> */}
                <Button variant="success" onClick={editAction}>Edit</Button>
                <Button variant="danger" onClick={() => deleteAction(row.id)}>Delete</Button>
            </ButtonGroup>

        )
    }
}, {
    label: 'Title',
    toDisplay: ({ row }) => {
        return row.title
        // return <Link href={`/order/${row.id}/detail`} target="_blank" >#{row.id}</Link >
    }
}, {
    label: 'Code',
    toDisplay: ({ row }) => {
        return <h4>{row.voucher_code}</h4>
    }
}, {
    label: 'Max Redeem',
    toDisplay: ({ row }) => {
        return row.max_redeem
    }
}, {
    label: 'Total Redeem',
    toDisplay: ({ row }) => {
        return row.total_redeem
    }
}, {
    label: 'status',
    toDisplay: ({ row }) => {
        const { color, string } = promoStatus(row.status);
        return <Badge pill bg={color} className="p-2">{string}</Badge>
    }
}, {
    label: 'Start Date',
    toDisplay: ({ row }) => {
        return row.start_date
    }
}, {
    label: 'End Date',
    toDisplay: ({ row }) => {
        return row.end_date
    }
}]

export default promoTableConfig