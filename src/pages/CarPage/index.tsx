import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {T_Car} from "src/modules/types.ts";
import {Col, Container, Row} from "reactstrap";
import {CarMocks} from "src/modules/mocks.ts";
import mockImage from "assets/mock.png";

type Props = {
    selectedCar: T_Car | null,
    setSelectedCar: React.Dispatch<React.SetStateAction<T_Car | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const CarPage = ({selectedCar, setSelectedCar, isMock, setIsMock}: Props) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/cars/${id}`)
            const data = await response.json()
            setSelectedCar(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedCar(CarMocks.find(car => car?.id == parseInt(id as string)) as T_Car)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedCar(null)
    }, []);

    if (!selectedCar) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={isMock ? mockImage as string : selectedCar.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedCar.name}</h1>
                    <p className="fs-5">Описание: {selectedCar.description}</p>
                    <p className="fs-5">Стоимость: {selectedCar.price} руб.</p>
                    <p className="fs-5">VIN: {selectedCar.vin} </p>
                    <p className="fs-5">Госномер: {selectedCar.license_plate} </p>
                </Col>
            </Row>
        </Container>
    );
};

export default CarPage
