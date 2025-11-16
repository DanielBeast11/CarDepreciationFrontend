import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import mockImage from "assets/mock.png";
import {Link} from "react-router-dom";
import {T_Car} from "modules/types.ts";
import './styles.css'

interface CarCardProps {
    car: T_Car,
    isMock: boolean
}

const CarCard = ({car, isMock}: CarCardProps) => {
    return (
        <Card key={car.id} style={{width: '18rem', margin: "0 auto 50px", height: "calc(100% - 50px)" }}>
            <CardImg
                src={isMock ? mockImage as string : car.image}
                style={{"height": "200px", "width": "100%", "objectFit": "cover"}}
            />
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle tag="h5">
                    {car.name}
                </CardTitle>
                <CardText>
                    Госномер: {car.license_plate}<br />
                    VIN: {car.vin}<br />
                    Стоимость: {car.price}₽
                </CardText>
                <Link to={`/cars/${car.id}`} className="openButton">
                    <Button color="primary">
                        Открыть
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default CarCard
