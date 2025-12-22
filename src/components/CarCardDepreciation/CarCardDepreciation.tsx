import {Button, Card, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {useEffect, useState} from "react";
import CustomInputNumber from "components/CustomInputNumber/CustomInputNumber.tsx";
import {removeCarFromDraftDepreciation, updateCarValue} from "store/slices/depreciationsSlice.ts";
import {CarItem} from "src/api/Api.ts";

type Props = {
    car: CarItem,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean,
    saveMM?: boolean,
    onSaveMM?: () => void; // Новая пропса для вызова сохранения пробегов
}

const CarCardDepreciation = ({car, showRemoveBtn=false, editMM=false, saveMM, onSaveMM}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser=false} = useAppSelector((state) => state.user)

    const [local_mmfield, setLocal_mmfield] = useState(car.mileage as number)

    const handleRemoveFromDraftDepreciation = async () => {
        await dispatch(removeCarFromDraftDepreciation(car.id))
    }

    // Сохранение при изменении saveMM (из главной кнопки "Сохранить все")
    useEffect(() => {
        if (saveMM != null) {
            void updateValue()
        }
    }, [saveMM]);

    // Локальное сохранение пробега конкретной машины
    const saveMileage = async () => {
        if (local_mmfield && local_mmfield !== car.mileage) {
            await dispatch(updateCarValue({
                car_id: car.id,
                mileage: local_mmfield
            }))
        }
        
        // Если передан колбэк, вызываем его (для обновления UI или других действий)
        if (onSaveMM) {
            onSaveMM()
        }
    }

    const updateValue = async () => {
        if (local_mmfield && local_mmfield !== car.mileage) {
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
                Стоимость: {car.price} руб.
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
                    {/* Заменяем кнопку "Открыть" на "Сохранить пробег" */}
                    {editMM && (
                        <Button 
                            color="success" 
                            size="sm"
                            onClick={saveMileage}
                            className="px-3"
                            disabled={local_mmfield === car.mileage}
                        >
                            Сохранить пробег
                        </Button>
                    )}
                    
                    {/* Ссылка на детали машины (только для просмотра) */}
                    {!editMM && (
                        <Link to={`/cars/${car.id}`}>
                            <Button color="primary" size="sm" className="px-3">
                                Открыть
                            </Button>
                        </Link>
                    )}
                    
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