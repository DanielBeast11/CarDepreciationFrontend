import {Button, Card, CardBody, CardText, CardTitle, Col} from "reactstrap";
import {Link} from "react-router-dom";
import {useAppDispatch} from "store/store.ts";
import {addCarToDepreciation} from "store/slices/carsSlice.ts";
import {fetchCartData} from "store/slices/depreciationsSlice.ts";
import {CarItem} from "src/api/Api.ts";

type Props = {
    car: CarItem,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
}

const CarCard = ({car,  showAddBtn=false}:Props) => {

    const dispatch = useAppDispatch()

    const handeAddToDraftDepreciation = async () => {
        if (car) {
            await dispatch(addCarToDepreciation(car.id))
            await dispatch(fetchCartData())
        }
    }

    return (
        <Card key={car.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={car.image}
                style={{"height": "200px", "width": "100%", "objectFit": "cover"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {car.name}
                </CardTitle>
                <CardText>
                    Госномер: {car.license_plate}<br />
                    VIN: {car.vin}<br />
                    Стоимость: {car.price}₽
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/cars/${car.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftDepreciation}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default CarCard
