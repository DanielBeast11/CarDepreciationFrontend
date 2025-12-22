import {Button, Card, CardText, CardTitle, Col, Row} from "reactstrap";
import {Depreciation} from "src/api/Api.ts";
import {formatDate} from "utils/utils.ts";
import {Link} from "react-router-dom";

type Props = {
    depreciation: Depreciation
}

const STATUSES:Record<number, string> = {
    1: "Введен",
    2: "В работе",
    3: "Завершен",
    4: "Отменён",
    5: "Удалён"
}

const DepreciationCard = ({depreciation}:Props) => {
    return (
        <Card>
            <Row className="p-1">
                <Col md={1} className="d-flex justify-content-center align-items-center">
                    <CardText>{depreciation.id}</CardText>
                </Col>
                <Col md={1} className="d-flex justify-content-center align-items-center">
                    <CardTitle tag="h6">
                        {STATUSES[depreciation.status as unknown as number]}
                    </CardTitle>
                </Col>
                <Col md={1} className="d-flex justify-content-center align-items-center">
                    {depreciation.price &&
                        <CardText className="text-center">
                            {depreciation.price} руб.
                        </CardText>
                    }
                </Col>
                <Col md={1} className="d-flex justify-content-center align-items-center">
                    {depreciation.summ &&
                        <CardText className="text-center">
                            {depreciation.summ} руб.
                        </CardText>
                    }
                </Col>
                <Col md={2} className="d-flex justify-content-center align-items-center">
                    <CardText className="text-center">
                        {formatDate(depreciation.date_created as string)}
                    </CardText>
                </Col>
                <Col md={2} className="d-flex justify-content-center align-items-center gap-3">
                    <CardText className="text-center">
                        {formatDate(depreciation.date_formation as string)}
                    </CardText>
                </Col>
                <Col md={2} className="d-flex justify-content-center align-items-center gap-3">
                    <CardText className="text-center">
                        {formatDate(depreciation.date_complete as string)}
                    </CardText>
                </Col>
                <Col md={2} className="d-flex justify-content-center align-items-center gap-3">
                    <Link to={`/depreciations/${depreciation.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Card>
    )
}

export default DepreciationCard
