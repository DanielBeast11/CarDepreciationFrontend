import {useState} from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import CarPage from "pages/CarPage";
import CarsListPage from "pages/CarsListPage";
import {Route, Routes} from "react-router-dom";
import {T_Car} from "src/modules/types.ts";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import "./styles.css"

function App() {

    const [cars, setCars] = useState<T_Car[]>([])

    const [selectedCar, setSelectedCar] = useState<T_Car | null>(null)

    const [isMock, setIsMock] = useState(false);

    const [carName, setCarName] = useState<string>("")

    return (
        <div>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedCar={selectedCar} />
                </Row>
                <Row>
                    <Routes>
						<Route path="/" element={<HomePage />} />
                        <Route path="/cars/" element={<CarsListPage cars={cars} setCars={setCars} isMock={isMock} setIsMock={setIsMock} carName={carName} setCarName={setCarName}/>} />
                        <Route path="/cars/:id" element={<CarPage selectedCar={selectedCar} setSelectedCar={setSelectedCar} isMock={isMock} setIsMock={setIsMock}/>} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
