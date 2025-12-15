import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchCar, removeSelectedCar} from "store/slices/carsSlice.ts";

const CarPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {car} = useAppSelector((state) => state.cars)

    useEffect(() => {
        id && dispatch(fetchCar(id))
        return () => {
            dispatch(removeSelectedCar())
        }
    }, []);

    if (!car) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col xs="12" lg="6">
                    <img
                        alt={car.name}
                        src={car.image}
                        className="w-100"
                        style={{maxHeight: '400px', objectFit: 'cover'}}
                    />
                </Col>
                <Col xs="12" lg="6">
                        <p className="fs-5 mb-3">
                            <strong>Описание:</strong> {car.description}
                        </p>
                        <p className="fs-5 mb-3">
                            <strong>Стоимость:</strong> {car.price.toLocaleString('ru-RU')} руб.
                        </p>
                        <p className="fs-5 mb-3">
                            <strong>VIN:</strong> {car.vin}
                        </p>
                        <p className="fs-5 mb-3">
                            <strong>Госномер:</strong> {car.license_plate}
                        </p>
                </Col>
            </Row>
        </Container>
    );
};

export default CarPage
