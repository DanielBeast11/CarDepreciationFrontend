import {Depreciation, Depreciations} from "src/api/Api.ts";
import {Col, Row} from "reactstrap";
import DepreciationCard from "components/DepreciationCard/DepreciationCard.tsx";
import {useAppSelector} from "store/store.ts";

type Props = {
    depreciations:Depreciations[]
}

const DepreciationsTable = ({depreciations}:Props) => {
    const {is_superuser} = useAppSelector((state) => state.user)

    const getColumns = () => {
        if (is_superuser) {
            return (
                <Row className="mb-3 p-2">
                    <Col md={1} className="d-flex justify-content-center">
                        <h6 className="text-center">id</h6>
                    </Col>
                    <Col md={1} className="d-flex justify-content-center">
                        <h6 className="text-center">Статус</h6>
                    </Col>
                    <Col md={2} className="d-flex justify-content-center">
                        <h6 className="text-center">Сумма амортизации</h6>
                    </Col>
                    <Col md={2} className="d-flex justify-content-center">
                        <h6 className="text-center">Дата формирования</h6>
                    </Col>
                    <Col md={2} className="d-flex justify-content-center">
                        <h6 className="text-center">Дата завершения</h6>
                    </Col>
                    <Col md={2} className="d-flex justify-content-center">
                        <h6 className="text-center">Пользователь</h6>
                    </Col>
                    <Col md={1} className="d-flex justify-content-center">
                        <h6 className="text-center">Действие</h6>
                    </Col>
                    <Col md={1} className="d-flex justify-content-center">
                        <h6 className="text-center">Действие</h6>
                    </Col>
                </Row>
            )
        }

        return (
            <Row className="mb-3 p-2">
                <Col md={1} className="d-flex justify-content-center">
                    <h6 className="text-center">id</h6>
                </Col>
                <Col md={1} className="d-flex justify-content-center">
                    <h6 className="text-center">Статус</h6>
                </Col>
                <Col md={2} className="d-flex justify-content-center">
                    <h6 className="text-center">Сумма амортизации</h6>
                </Col>
                <Col md={2} className="d-flex justify-content-center">
                    <h6 className="text-center">Дата создания</h6>
                </Col>
                <Col md={2} className="d-flex justify-content-center">
                    <h6 className="text-center">Дата формирования</h6>
                </Col>
                <Col md={2} className="d-flex justify-content-center">
                    <h6 className="text-center">Дата завершения</h6>
                </Col>
                <Col md={2} className="d-flex justify-content-center">
                    <h6 className="text-center">Действие</h6>
                </Col>
            </Row>
        )
    }

    return (
        <div>
            {getColumns()}
            {depreciations.map((depreciation:Depreciation) => (
                <Row key={depreciation.id} className="d-flex justify-content-center mb-2">
                    <DepreciationCard depreciation={depreciation} />
                </Row>
            ))}
        </div>
    )
};

export default DepreciationsTable
