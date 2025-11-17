import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import {T_Car} from "src/modules/types.ts";
import CarCard from "components/CarCard";
import {CarMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect, useState} from "react";
import * as React from "react";
import "./styles.css"
import NoCarsCartIcon from "../../assets/no-cars-cart-icon.png"
import HasCarsCartIcon from "../../assets/cart-icon.png"
import { setCarName } from "src/store/slices/filterSlice";
import { RootState } from '../../store'
import { dest_api } from '../../config/tauri_config'

type Props = {
    cars: T_Car[],
    setCars: React.Dispatch<React.SetStateAction<T_Car[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const CarsListPage = ({cars, setCars, isMock, setIsMock}:Props) => {
    const [carsCount, setCarsCount] = useState<number>(0);
    const dispatch = useDispatch();
    const carName = useSelector((state: RootState) => state.filters.carName)

    const fetchData = async () => {
        try {
            const response = await fetch(`${dest_api}/cars/?car_name=${carName.toLowerCase()}`)
            const data = await response.json()
            setCars(data)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    const fetchCart = async () => {
        try {
            const response = await fetch(`${dest_api}/depreciations/depreciation_cart/`);
            const data = await response.json();
            setCarsCount(data.cars_count);
        } catch {
            console.log('what\'s wrong');
        }
    }

    const createMocks = () => {
        setIsMock(true)
        setCars(CarMocks.filter(car => car.name.toLowerCase().includes(carName.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchData()
        }
    }

    useEffect(() => {
        void fetchData();
    }, []);

    useEffect(() => {
        void fetchCart();
    }, [carsCount])

    return (
        <Container>
            <Row className="align-items-center">
                <Col xs="auto" className="text-center">
                    <img src={carsCount > 0 ? HasCarsCartIcon : NoCarsCartIcon}
                        alt={carsCount > 0 ? "Иконка корзины с автомобилями" : "Иконка пустой корзины"}
                        style={{ maxWidth: '100px' }} />
                </Col>
                <Col xs="auto" className="text-center">
                    <p className="mb-0">Количество автомобилей: {carsCount}</p>
                </Col>
            </Row>
            <Row className="mb-5 justify-content-center">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input value={carName} onChange={(e) => dispatch(setCarName(e.target.value))} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {cars?.map(car => (
                    <Col key={car.id} xs="12" sm="6" md="4" className="mb-4">
                        <CarCard car={car} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CarsListPage