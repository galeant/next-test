import { Button, ButtonGroup, Chip, IconButton, Link, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { promoStatus } from "src/enums";

const promoTableConfig = [{
    label: 'Action',
    toDisplay: (row, editAction, deleteAction) => {
        return (
            <ButtonGroup>
                <Button size="small" variant="contained" color="warning" onClick={editAction}>Edit</Button>
                <Button size="small" variant="contained" color="error" onClick={() => deleteAction(row.id)}>Delete</Button>
            </ButtonGroup>
        )
    }
}, {
    label: 'Title',
    toDisplay: (row) => {
        return row.title
        // return <Link href={`/order/${row.id}/detail`} target="_blank" >#{row.id}</Link >
    }
}, {
    label: 'Code',
    toDisplay: (row) => {
        return <h3>{row.voucher_code}</h3>
    }
}, {
    label: 'Max Redeem',
    toDisplay: (row) => {
        return row.max_redeem
    }
}, {
    label: 'Total Redeem',
    toDisplay: (row) => {
        return row.total_redeem
    }
}, {
    label: 'status',
    toDisplay: (row) => {
        const { color, string } = promoStatus(row.status);
        return <Chip color={color} label={string} />
    }
}, {
    label: 'Start Date',
    toDisplay: (row) => {
        return row.start_date
    }
}, {
    label: 'End Date',
    toDisplay: (row) => {
        return row.end_date
    }
}]

export default promoTableConfig