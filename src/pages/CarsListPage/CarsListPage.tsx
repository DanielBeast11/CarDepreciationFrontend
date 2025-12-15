import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import React, {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchCars, updateCarName} from "store/slices/carsSlice.ts";
import CarCard from "components/CarCard/CarCard.tsx";
import Cart from "components/Cart/Cart.tsx";
import {fetchCartData} from "store/slices/depreciationsSlice.ts";

const CarsListPage = () => {

    const dispatch = useAppDispatch()

    const {cars, car_name} = useAppSelector((state) => state.cars)

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {draft_depreciation_id, cars_count} = useAppSelector((state) => state.depreciations)

    const hasDraft = draft_depreciation_id !== 0

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCarName(e.target.value))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(fetchCars())
    }

    useEffect(() => {
        dispatch(fetchCars())
        if (is_authenticated) {
            dispatch(fetchCartData())
        }
    }, [])

    return (
        <Container>
            {is_authenticated && !is_superuser &&
                <Cart isActive={hasDraft} draft_depreciation_id={draft_depreciation_id} cars_count={cars_count} />
            }
            <Row className="mb-5 justify-content-center">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={car_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {cars?.map(car => (
                    <Col key={car.id} className="mb-5 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <CarCard car={car} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CarsListPage
