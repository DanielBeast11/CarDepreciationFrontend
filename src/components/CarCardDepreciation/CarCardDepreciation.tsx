import {Button, Card, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {useEffect, useState} from "react";
import {removeCarFromDraftDepreciation, updateCarValue} from "store/slices/depreciationsSlice.ts";
import {CarItem} from "src/api/Api.ts";
import CustomInputNumber from "components/CustomInputNumber/CustomInputNumber.tsx";

type Props = {
    car: CarItem,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean,
    saveMM?: boolean,
}

const CarCardDepreciation = ({car, showRemoveBtn=false, editMM=false, saveMM}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser=false} = useAppSelector((state) => state.user)

    const [local_mmfield, setLocal_mmfield] = useState(car.mileage as number)

    const handleRemoveFromDraftDepreciation = async () => {
        await dispatch(removeCarFromDraftDepreciation(car.id))
    }

    useEffect(() => {
        if (saveMM != null) {
            void updateValue()
        }
    }, [saveMM]);

    const updateValue = async () => {
        if (local_mmfield) {
            dispatch(updateCarValue({
                car_id: car.id,
                mileage: local_mmfield
            }))
        }
    }

    return (
<Card key={car.id} className="mb-3">
    <Row className="p-3 align-items-center">
        <Col md={4} lg={4} className="d-flex justify-content-center">
            <CardImg
                src={car.image}
                style={{"width": "100%", "height": "300px", "objectFit": "cover"}}
                className="rounded"
            />
        </Col>
        
        {/* Описание по центру */}
        <Col md={4} lg={4} className="text-center">
            <CardTitle tag="h5" className="mb-2">
                {car.name}
            </CardTitle>
            <CardText className="text-muted">
                Госномер: {car.license_plate}
            </CardText>
            <CardText className="text-muted">
                VIN: {car.vin}
            </CardText>
            <CardText className="text-muted">
                Стоимость: {car.price}
            </CardText>
        </Col>
        
        {/* Пробег и кнопки справа - вертикально */}
        <Col md={4} lg={4}>
            <div className="d-flex flex-column align-items-center">
                {/* Пробег */}
                <div className="mb-3 text-center">
                    <label className="form-label mb-1">Пробег (км)</label>
                    <CustomInputNumber
                        value={local_mmfield || 0} 
                        setValue={setLocal_mmfield} 
                        disabled={!editMM || is_superuser}
                        className="text-center"
                    />
                </div>
                
                {/* Кнопки */}
                <div className="d-flex justify-content-center gap-2">
                    <Link to={`/cars/${car.id}`}>
                        <Button color="primary" size="sm" className="px-3">
                            Открыть
                        </Button>
                    </Link>
                    {showRemoveBtn &&
                        <Button 
                            color="danger" 
                            size="sm"
                            onClick={handleRemoveFromDraftDepreciation}
                            className="px-3"
                        >
                            Удалить
                        </Button>
                    }
                </div>
            </div>
        </Col>
    </Row>
</Card>
    );
};

export default CarCardDepreciation
