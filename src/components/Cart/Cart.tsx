import {Link} from "react-router-dom";
import {Row, Col} from "reactstrap";
import HasCarsCartIcon from "../../assets/cart-icon.png"
import NoCarsCartIcon from "../../assets/no-cars-cart-icon.png"

type Props = {
    isActive: boolean,
    draft_depreciation_id: number,
    cars_count: number
}

const Cart = ({isActive, draft_depreciation_id, cars_count}:Props) => {
    if (!isActive) {
        return (<Row className="align-items-center">
                <Col xs="auto" className="text-center">
                    <img src={NoCarsCartIcon}
                        alt="Иконка пустой корзины"
                        style={{ maxWidth: '100px' }} />
                </Col>
                <Col xs="auto" className="text-center">
                    <p className="mb-0">Количество автомобилей: {cars_count}</p>
                </Col>
            </Row>)
    }

    return (
        <Link to={`/depreciations/${draft_depreciation_id}/`} className="bin-wrapper">
                <Row className="align-items-center">
                <Col xs="auto" className="text-center">
                    <img src={HasCarsCartIcon}
                        alt="Иконка корзины с автомобилями"
                        style={{ maxWidth: '100px' }} />
                </Col>
                <Col xs="auto" className="text-center">
                    <p className="mb-0 black">Количество автомобилей: {cars_count}</p>
                </Col>
            </Row>
        </Link>
    )
}

export default Cart
