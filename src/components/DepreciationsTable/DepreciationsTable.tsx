import {Depreciation, Depreciations} from "src/api/Api.ts";
import {Col, Row} from "reactstrap";
import DepreciationCard from "components/DepreciationCard/DepreciationCard.tsx";

type Props = {
    depreciations:Depreciations[]
}

const DepreciationsTable = ({depreciations}:Props) => {
    return (
        <div>
            <Row className="mb-3 p-2">
                <Col md="1" className="d-flex justify-content-center">
                    <h6 className="text-center">№</h6>
                </Col>
                <Col md="1" className="d-flex justify-content-center">
                    <h6 className="text-center">Статус</h6>
                </Col>
                <Col md="1" className="d-flex justify-content-center">
                    <h6 className="text-center">Первичная оценка</h6>
                </Col>
                <Col md="1" className="d-flex justify-content-center">
                    <h6 className="text-center">Сумма амортизации</h6>
                </Col>
                <Col md="2" className="d-flex justify-content-center">
                    <h6 className="text-center">Дата создания</h6>
                </Col>
                <Col md="2" className="d-flex justify-content-center">
                    <h6 className="text-center">Дата формирования</h6>
                </Col>
                <Col md="2" className="d-flex justify-content-center">
                    <h6 className="text-center">Дата завершения</h6>
                </Col>
                <Col md="2" className="d-flex justify-content-center">
                    <h6 className="text-center">Действие</h6>
                </Col>
            </Row>
            {depreciations.map((depreciation:Depreciation) => (
                <Row key={depreciation.id} className="d-flex justify-content-center mb-1">
                    <DepreciationCard depreciation={depreciation} />
                </Row>
            ))}
        </div>
    )
};

export default DepreciationsTable
