import {Button, Card, CardText, CardTitle, Col, Row} from "reactstrap";
import {Depreciation} from "src/api/Api.ts";
import {formatsumm, formatDate} from "utils/utils.ts";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {acceptDepreciation, fetchDepreciations, rejectDepreciation} from "store/slices/depreciationsSlice.ts";
import {E_DepreciationStatus} from "modules/types.ts";

type Props = {
    depreciation: Depreciation
}

const STATUSES:Record<number, string> = {
    1: "Введен",
    2: "В работе",
    3: "Завершен",
    4: "Отклонён",
    5: "Удалён"
}

const DepreciationCard = ({depreciation}:Props) => {
    const {is_superuser} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const handleAcceptDepreciation = async () => {
        await dispatch(acceptDepreciation(depreciation.id.toString()))
        await dispatch(fetchDepreciations())
    }

    const handleRejectDepreciation = async () => {
        await dispatch(rejectDepreciation(depreciation.id.toString()))
        await dispatch(fetchDepreciations())
    }

    const isInWork = depreciation.status == E_DepreciationStatus.InWork

    if (is_superuser) {
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
                                {formatsumm(depreciation.price)}
                            </CardText>
                        }
                    </Col>
                    <Col md={1} className="d-flex justify-content-center align-items-center">
                        {depreciation.summ &&
                            <CardText className="text-center">
                                {formatsumm(depreciation.summ)}
                            </CardText>
                        }
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
                        {depreciation.owner}
                    </Col>
                    <Col md={1} className="d-flex justify-content-center align-items-center gap-3">
                        {isInWork &&
                            <Button color="success" type="button" onClick={handleAcceptDepreciation}>
                                Завершить
                            </Button>
                        }
                    </Col>
                    <Col md={1} className="d-flex justify-content-center align-items-center gap-3">
                        {isInWork &&
                            <Button color="danger" type="button" onClick={handleRejectDepreciation}>
                                Отклонить
                            </Button>
                        }
                    </Col>
                </Row>
            </Card>
        )
    }

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
                            {formatsumm(depreciation.price)}
                        </CardText>
                    }
                </Col>
                <Col md={1} className="d-flex justify-content-center align-items-center">
                    {depreciation.summ &&
                        <CardText className="text-center">
                            {formatsumm(depreciation.summ)}
                        </CardText>
                    }
                </Col>
                <Col md={2} className="d-flex justify-content-center align-items-center gap-3">
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
