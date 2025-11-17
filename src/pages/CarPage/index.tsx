import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {T_Car} from "src/modules/types.ts";
import {Col, Container, Row} from "reactstrap";
import {CarMocks} from "src/modules/mocks.ts";
import mockImage from "assets/mock.png";
import { dest_api } from 'src/config/tauri_config';


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
            const response = await fetch(`${dest_api}/cars/${id}`)
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
            <Container>
                <Row>
                    <Col>
                        <div className="text-center py-5">
                            <p>Загрузка...</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        <Container>
            <Row>
                {/* Изображение автомобиля */}
                <Col xs={12} lg={6} className="mb-4 mb-lg-0">
                    <img
                        alt={selectedCar.name}
                        src={isMock ? mockImage as string : selectedCar.image}
                        className="w-100 car-page-image"
                        style={{maxHeight: '400px', objectFit: 'cover'}}
                    />
                </Col>
                
                {/* Информация об автомобиле */}
                <Col xs={12} lg={6}>
                    <h1 className="mb-3 car-page-title">{selectedCar.name}</h1>
                    <div className="car-info">
                        <p className="fs-5 mb-3">
                            <strong>Описание:</strong> {selectedCar.description}
                        </p>
                        <p className="fs-5 mb-3">
                            <strong>Стоимость:</strong> {selectedCar.price.toLocaleString('ru-RU')} руб.
                        </p>
                        <p className="fs-5 mb-3">
                            <strong>VIN:</strong> {selectedCar.vin}
                        </p>
                        <p className="fs-5 mb-3">
                            <strong>Госномер:</strong> {selectedCar.license_plate}
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CarPage;