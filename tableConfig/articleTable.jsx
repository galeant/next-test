import dayjs from "dayjs";
import { Badge, Button, ButtonGroup } from "react-bootstrap";
import { articleStatus, promoStatus } from "enums";
import Link from "next/link";

const promoTableConfig = [{
    label: 'Action',
    toDisplay: (row, editAction, deleteAction) => {
        return (
            <ButtonGroup size="sm">
                {/* <Link href={editUrl} className="btn btn-success" target="_blank">Edit</Link> */}
                <Button variant="success" onClick={editAction}>Edit</Button>
                <Button variant="danger" onClick={() => deleteAction(row.id)}>Delete</Button>
            </ButtonGroup>

        )
    }
}, {
    label: 'Title',
    toDisplay: (row) => {
        return row.title.id
    }
}, {
    label: 'Status',
    toDisplay: (row) => {
        const { color, string } = articleStatus(row.status);
        return <Badge pill bg={color} className="p-2">{string}</Badge>
    }
}, {
    label: 'Published At',
    toDisplay: (row) => {
        return dayjs(row.published_at).format('DD-MM-YYYY');
    }
}]

export default promoTableConfig